from pymongo import MongoClient
from pymongo.server_api import ServerApi

class DatabaseConnection:
    def __init__(self, uri, db_name, ratings_collection_name):
        self.uri = uri
        self.db_name = db_name
        self.ratings_collection_name = ratings_collection_name
        self.client = None
        self.db = None
        self.collection = None

    def connect(self):
        try:
            self.client = MongoClient(self.uri, server_api=ServerApi('1'))
            self.db = self.client[self.db_name]
            self.collection = self.db[self.ratings_collection_name]
            self.client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(f"An error occurred: {e}")
    
    def fetch_ratings(self):
        try:
            if self.collection is not None:
                data = self.collection.find()
                return list(data)
            else:
                print("No collection selected.")
                return []
        except Exception as e:
            print(f"An error occurred while fetching data: {e}")
            return []
        
    def save_rating(self, user_id, auction_id, rating):
        try:
            if self.collection is not None:
                self.collection.update_one(
                    {"user_id": user_id, "auction_id": auction_id},
                    {"$set": {"rating": rating}},
                    upsert=True
                )
                print("Rating successfully saved to MongoDB!")
            else:
                print("No collection selected.")
        except Exception as e:
            print(f"An error occurred while saving data: {e}")
    
    def delete_rating(self, user_id, auction_id):
        try:
            if self.collection is not None:
                result = self.collection.delete_one({"user_id": user_id, "auction_id": auction_id})
                if result.deleted_count == 1:
                    print(f"Rating for user {user_id} and auction {auction_id} deleted successfully.")
                else:
                    print(f"No rating found for user {user_id} and auction {auction_id}.")
            else:
                print("No collection selected.")
        except Exception as e:
            print(f"An error occurred while deleting data: {e}")

    def save_recommendations(self, recommendations):
        try:
            if self.collection is not None:
                self.collection.insert_many(recommendations)
                print("Recommendations successfully saved to MongoDB!")
            else:
                print("No collection selected.")
        except Exception as e:
            print(f"An error occurred while saving data: {e}")

    def fetch_recommendations(self, user_id):
        try:
            if self.collection is not None:
                recommendations = self.collection.find({"user_id": user_id})
                return list(recommendations)
            else:
                print("No collection selected.")
                return []
        except Exception as e:
            print(f"An error occurred while fetching recommendations: {e}")
            return []

    def clear_recommendations(self):
        try:
            if self.collection is not None:
                self.collection.delete_many({})
                print(f"Collection {self.ratings_collection_name} cleared.")
            else:
                print("No collection selected.")
        except Exception as e:
            print(f"An error occurred while clearing the collection: {e}")

    def close(self):
        if self.client:
            self.client.close()
            print("Closed the MongoDB connection.")

