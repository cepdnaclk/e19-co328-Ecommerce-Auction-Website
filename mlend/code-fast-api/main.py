from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
from dbcon import DatabaseConnection
from recommender import RecommenderModel
from bson import ObjectId

# Initialize FastAPI
app = FastAPI()

# Connection URI and MongoDB collection names
uri = "mongodb+srv://<username>:<password>@cluster45204.sxzufw7.mongodb.net/?retryWrites=true&w=majority"
db_name = "bid_circle"
ratings_collection_name = "ratings"
recommendations_collection_name = "recommendations"

# Database connection instance
db_connection_ratings = DatabaseConnection(uri, db_name, ratings_collection_name)
db_connection_recommendations = DatabaseConnection(uri, db_name, recommendations_collection_name)

# Pydantic model for recommendation item
class RecommendationItem(BaseModel):
    auction_id: str
    predicted_ratings: float

# Pydantic model for user recommendations
class UserRecommendations(BaseModel):
    user_id: str
    recommendations: List[RecommendationItem]

# Function to convert BSON ObjectId to string
def convert_obj_id(document):
    if isinstance(document, list):
        return [convert_obj_id(item) for item in document]
    elif isinstance(document, dict):
        for key, value in document.items():
            if isinstance(value, ObjectId):
                document[key] = str(value)
            elif isinstance(value, (dict, list)):
                document[key] = convert_obj_id(value)
        return document
    return document


# Function to fetch recommendations for a user
@app.get("/recommendations/{user_id}", response_model=UserRecommendations)
async def get_recommendations(user_id: str):
    try:
        db_connection_recommendations.connect()
        recommendations = db_connection_recommendations.fetch_recommendations(user_id)
        db_connection_recommendations.close()

        if recommendations:
            # Find the correct user's recommendations
            user_recommendations = next((rec for rec in recommendations if rec["user_id"] == user_id), None)
            if user_recommendations:
                recommendations_list = user_recommendations.get("recommendations", [])
                recommendations_list = convert_obj_id(recommendations_list)
                return UserRecommendations(user_id=user_id, recommendations=recommendations_list)
            else:
                raise HTTPException(status_code=404, detail=f"Recommendations not found for user {user_id}")
        else:
            raise HTTPException(status_code=404, detail=f"Recommendations not found for user {user_id}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# Function to save a new rating to MongoDB
@app.post("/ratings/save", status_code=201)
async def save_rating(user_id: str, auction_id: str, rating: float):
    try:
        db_connection_ratings.connect()
        db_connection_ratings.save_rating(user_id, auction_id, rating)
        db_connection_ratings.close()
        return {"message": "Rating successfully saved."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


# Function to retrain the model and save new recommendations
@app.post("/recommendations/retrain", status_code=201)
async def retrain_and_save_recommendations():
    try:
        # Fetch data from MongoDB
        db_connection_ratings.connect()
        movies_list = db_connection_ratings.fetch_ratings()
        db_connection_ratings.close()

        # Convert data to DataFrame
        movies_df = pd.DataFrame(movies_list)
        data_df = movies_df.drop('_id', axis=1)

        # Initialize recommender model
        recommenderModel = RecommenderModel(data_df)

        # Generate recommendations and prepare for saving
        recommendations = []
        for user_id in recommenderModel.utility_matrix.index:
            recommendation = recommenderModel.recommend_items(data=recommenderModel.data, user_id=user_id, recommend_seen=False)
            for auction_id in recommendation['auction_id']:
                recommenderModel.utility_matrix.loc[user_id, auction_id] = float(recommendation[recommendation['auction_id'] == auction_id]['predicted_ratings'].iloc[0])
            user_recommendations = {
                "user_id": user_id,
                "recommendations": recommendation.to_dict(orient='records')
            }
            recommendations.append(user_recommendations)

        # Save recommendations to MongoDB
        db_connection_recommendations.connect()
        db_connection_recommendations.clear_collection()  # Clear previous recommendations
        db_connection_recommendations.save_recommendations(recommendations)
        db_connection_recommendations.close()

        return {"message": "Recommendations retrained and saved."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


# Main entry point to run the FastAPI application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

