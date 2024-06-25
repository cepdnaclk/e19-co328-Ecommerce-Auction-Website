## Example Usecase of `RecommenderModel` and `DatabaseConnection` modules

### Import necessary modules

```
import pandas as pd
from dbcon import DatabaseConnection
from recommender import RecommenderModel
```

### Connection URI and MongoDB collection names

```
# replace `<password>` in the uri with actual one

uri = "mongodb+srv://e19163:<password>@cluster45204.sxzufw7.mongodb.net/?retryWrites=true&w=majority"
db_name = "bid_circle"
ratings_collection_name = "ratings"
recommendations_collection_name = "recommendations"
```

### Database connection instances for 2 collections

```
db_connection_ratings = DatabaseConnection(uri, db_name, ratings_collection_name)
db_connection_recommendations = DatabaseConnection(uri, db_name, recommendations_collection_name)
```

### Example rating comming from the frontend

```
user_id = '0x01'
auction_id = '0001'
rating = '2'
```

### Save ratings to MongoDB

```
db_connection_ratings.connect()
db_connection_ratings.save_rating(user_id, auction_id, rating)
db_connection_ratings.close()
```

### To delete a rating if needed

```
db_connection_ratings.connect()
db_connection_ratings.delete_rating(user_id, auction_id)
db_connection_ratings.close()
```

### Fetch ratings from MongoDB

```
db_connection_ratings.connect()
movies_list = db_connection_ratings.fetch_ratings()
db_connection_ratings.close()
```

### Convert ratings data to DataFrame

```
movies_df = pd.DataFrame(movies_list)
data_df = movies_df.drop('_id', axis=1)
```

### Initialize recommender model

```
recommenderModel = RecommenderModel(data_df)
```

### Generate recommendations

```
recommendations = recommenderModel.recommend()
```

### Save recommendations to MongoDB

```
db_connection_recommendations.connect()
db_connection_recommendations.clear_recommendations()  # Clear previous recommendations
db_connection_recommendations.save_recommendations(recommendations)
db_connection_recommendations.close()
```

### fetch recommendations from MongoDB

```
db_connection_recommendations.connect()
recommendations = db_connection_recommendations.fetch_recommendations(user_id)
db_connection_recommendations.close()
```

### print the recommendations

```
print(recommendations)
```

### Run `main.py`

```
# to test the database connections and the recommender module run
python .\main.py
```

### Final output of above configuration should look like this

```
Pinged your deployment. You successfully connected to MongoDB!
Rating successfully saved to MongoDB!
Closed the MongoDB connection.
Pinged your deployment. You successfully connected to MongoDB!
Rating for user 0x01 and auction 0001 deleted successfully.
Closed the MongoDB connection.
Pinged your deployment. You successfully connected to MongoDB!
Closed the MongoDB connection.
Pinged your deployment. You successfully connected to MongoDB!
Collection recommendations cleared.
Recommendations successfully saved to MongoDB!
Closed the MongoDB connection.
Pinged your deployment. You successfully connected to MongoDB!
Closed the MongoDB connection.
[{'_id': ObjectId('667ab35bebd4bf42254308d4'), 'user_id': '0x01', 'recommendations': [{'auction_id': '0005', 'predicted_ratings': 4.65}, {'auction_id': '0004', 'predicted_ratings': 4.06}, {'auction_id': '0001', 'predicted_ratings': 1.97}]}]
```
