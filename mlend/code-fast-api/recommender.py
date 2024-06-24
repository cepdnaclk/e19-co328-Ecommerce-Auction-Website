import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class RecommenderModel:
    def __init__(self, df):
        self.df = df
        matrix = self.df.pivot(index='user_id', columns='auction_id', values='rating') # Pivot the DataFrame to create the utility matrix
        self.data = matrix
        self.utility_matrix = matrix.fillna(0) # Fill NaN values with 0 (or any other value that represents no interaction)
        self.user_mean = self.utility_matrix.mean(axis=0)
        self.user_removed_mean_rating = (self.utility_matrix - self.user_mean).fillna(0)

    def find_neighbours(self, user_removed_mean_rating, user_id):
        n_users = len(user_removed_mean_rating.index)
        # print(n_users)

        similarities = np.zeros(n_users)
        # print(similarities)

        target_user = user_removed_mean_rating.loc[user_id].values.reshape(1, -1)
        # print(target_user)

        for i, user_index in enumerate(user_removed_mean_rating.index):

            # print(user_removed_mean_rating.loc[user_index].values)

            neighbour_user = user_removed_mean_rating.loc[user_index].values.reshape(1, -1)

            similarities[i] = cosine_similarity(target_user, neighbour_user)[0, 0]
            # print(i, similarities[i])

        sorted_idx = np.argsort(similarities)[::-1]
        # print(sorted_idx)

        closest_neighbours = user_removed_mean_rating.index[sorted_idx[1:]].tolist()
        # print(closest_neighbours)

        similarities = np.sort(similarities)[::-1]
        closest_neighbors_similarities = similarities[1:]
        # print(closest_neighbors_similarities)

        return {
            "closest_neighbours": closest_neighbours,
            "closest_neighbors_similarities": closest_neighbors_similarities
        }
    
    # Function to calculate baseline prediction from user and movie
    def baseline_prediction(self, data, user_id, auction_id):

        global_mean = data.stack().dropna().mean() # calculate global mean
        user_mean = data.loc[user_id, :].mean() # calculate user mean
        item_mean = data.loc[:, auction_id].mean() # calculate item mean
        user_bias = global_mean - user_mean # calculate user bias
        item_bias = global_mean - item_mean # calculate item bias
        baseline_ui = global_mean + user_bias + item_bias # calculate baseline

        return baseline_ui
    
    # Function to predict rating on user_id and auction_id
    def predict_item_rating(self, user_id, auction_id, data, neighbor_data, max_rating=5, min_rating=1):

        # calculate baseline (u,i)
        baseline = self.baseline_prediction(data=data,
                                    user_id=user_id, auction_id=auction_id)
        # for sum
        sim_rating_total = 0
        similarity_sum = 0
        k = len(neighbor_data['closest_neighbours'])
        # loop all over neighbor
        for i in range(k):
            # retrieve rating from neighbor
            neighbour_rating = data.loc[neighbor_data['closest_neighbours'][i], auction_id]

            # skip if nan
            if np.isnan(neighbour_rating):
                continue

            # calculate baseline (ji)
            baseline = self.baseline_prediction(data=data,
                                        user_id=neighbor_data['closest_neighbours'][i], auction_id=auction_id)

            # subtract baseline from rating
            adjusted_rating = neighbour_rating - baseline

            # multiply by similarity
            sim_rating = neighbor_data['closest_neighbors_similarities'][i] * adjusted_rating

            # sum similarity * rating
            sim_rating_total += sim_rating

            #
            similarity_sum += neighbor_data['closest_neighbors_similarities'][i]

        # avoiding ZeroDivisionError
        try:
            user_item_predicted_rating = baseline + (sim_rating_total / similarity_sum)

        except ZeroDivisionError:
            user_item_predicted_rating = baseline

        # checking the boundaries of rating,
        if user_item_predicted_rating > max_rating:
            user_item_predicted_rating = max_rating

        elif user_item_predicted_rating < min_rating:
            user_item_predicted_rating = min_rating

        return user_item_predicted_rating
    
    # Function to generate recommendation on given user_id
    def recommend_items(self, data, user_id, recommend_seen=False):

        # find neighbor
        neighbor_data = self.find_neighbours(user_removed_mean_rating=self.user_removed_mean_rating, user_id=user_id)

        # create empty dataframe to store prediction result
        prediction_df = pd.DataFrame()
        # create list to store prediction result
        predicted_ratings = []

        # mask seen item
        mask = np.isnan(data.loc[user_id])
        # print(data.loc[user_id])
        
        item_to_predict = data.columns[mask]

        if recommend_seen:
            item_to_predict = data.columns

        # loop all over movie
        for movie in item_to_predict:
            # predict rating
            preds = self.predict_item_rating(user_id=user_id, auction_id=movie,
                                        data=data,
                                        neighbor_data=neighbor_data)

            # append
            predicted_ratings.append(preds)

        # assign auction_id
        prediction_df['auction_id'] = data.columns[mask]

        # assign prediction result
        prediction_df['predicted_ratings'] = np.round(predicted_ratings, 2)

        #
        prediction_df = (prediction_df
                        .sort_values('predicted_ratings', ascending=False))

        return prediction_df