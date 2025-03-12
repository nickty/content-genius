import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Input, Embedding, Flatten, Dense, Concatenate
from tensorflow.keras.models import Model
import matplotlib.pyplot as plt

# Sample data - in a real application, this would come from a database
# User IDs
user_ids = np.array([0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3])

# Content IDs
content_ids = np.array([0, 1, 2, 0, 3, 4, 0, 5, 6, 1, 7, 8])

# Ratings (engagement scores)
ratings = np.array([5, 4, 3, 4, 5, 3, 3, 4, 5, 2, 4, 5])

# Number of unique users and content items
n_users = len(np.unique(user_ids))
n_content = len(np.unique(content_ids))

print(f"Number of users: {n_users}")
print(f"Number of content items: {n_content}")

# Define the model architecture
def create_recommendation_model(n_users, n_content, n_factors=50):
    # User input
    user_input = Input(shape=(1,), name='user_input')
    user_embedding = Embedding(n_users + 1, n_factors, name='user_embedding')(user_input)
    user_vec = Flatten(name='flatten_users')(user_embedding)
    
    # Content input
    content_input = Input(shape=(1,), name='content_input')
    content_embedding = Embedding(n_content + 1, n_factors, name='content_embedding')(content_input)
    content_vec = Flatten(name='flatten_content')(content_embedding)
    
    # Concatenate features
    concat = Concatenate()([user_vec, content_vec])
    
    # Dense layers
    dense1 = Dense(128, activation='relu')(concat)
    dense2 = Dense(64, activation='relu')(dense1)
    dense3 = Dense(32, activation='relu')(dense2)
    
    # Output layer
    output = Dense(1)(dense3)
    
    # Create and compile the model
    model = Model([user_input, content_input], output)
    model.compile(
        optimizer='adam',
        loss='mean_squared_error'
    )
    
    return model

# Create and train the model
model = create_recommendation_model(n_users, n_content)
print(model.summary())

# Train the model
history = model.fit(
    [user_ids, content_ids],
    ratings,
    epochs=100,
    verbose=0,
    validation_split=0.2
)

# Plot training history
plt.figure(figsize=(10, 6))
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Model Training History')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend()
plt.savefig('training_history.png')
plt.close()

print("Model training complete")

# Function to get recommendations for a user
def get_recommendations(user_id, n_recommendations=3):
    # Generate all possible content IDs
    all_content_ids = np.arange(n_content)
    
    # Create user input array with the same user ID repeated
    user_input = np.array([user_id] * len(all_content_ids))
    
    # Predict ratings for all content items
    predictions = model.predict([user_input, all_content_ids], verbose=0)
    
    # Get the indices of the top N predictions
    top_indices = np.argsort(predictions.flatten())[-n_recommendations:][::-1]
    
    # Return the content IDs and predicted ratings
    recommended_content_ids = all_content_ids[top_indices]
    predicted_ratings = predictions.flatten()[top_indices]
    
    return recommended_content_ids, predicted_ratings

# Sample content titles for demonstration
content_titles = [
    "Introduction to AI and Machine Learning",
    "Cloud Computing Fundamentals",
    "Python for Data Science",
    "Next.js and React Development",
    "TensorFlow Tutorial",
    "AWS and Azure Comparison",
    "Node.js for Backend Development",
    "Full-Stack Development Guide",
    "AI in Modern Applications"
]

# Get recommendations for each user
for user_id in range(n_users):
    print(f"\nRecommendations for User {user_id}:")
    content_ids, ratings = get_recommendations(user_id)
    for i, (content_id, rating) in enumerate(zip(content_ids, ratings)):
        print(f"{i+1}. {content_titles[content_id]} (Predicted Rating: {rating:.2f})")

# Visualize the embeddings
user_embedding_weights = model.get_layer('user_embedding').get_weights()[0]
content_embedding_weights = model.get_layer('content_embedding').get_weights()[0]

# Use PCA to reduce to 2 dimensions for visualization
from sklearn.decomposition import PCA

# Skip the first row (index 0) as it's padding
user_embeddings = user_embedding_weights[1:n_users+1]
content_embeddings = content_embedding_weights[1:n_content+1]

# Apply PCA
pca = PCA(n_components=2)
user_embeddings_2d = pca.fit_transform(user_embeddings)
content_embeddings_2d = pca.transform(content_embeddings)

# Plot the embeddings
plt.figure(figsize=(12, 8))
plt.scatter(user_embeddings_2d[:, 0], user_embeddings_2d[:, 1], c='r', marker='o', s=100, label='Users')
plt.scatter(content_embeddings_2d[:, 0], content_embeddings_2d[:, 1], c='b', marker='^', s=100, label='Content')

# Add labels
for i, (x, y) in enumerate(user_embeddings_2d):
    plt.annotate(f'User {i}', (x, y), xytext=(5, 5), textcoords='offset points')

for i, (x, y) in enumerate(content_embeddings_2d):
    plt.annotate(f'Content {i}', (x, y), xytext=(5, 5), textcoords='offset points')

plt.title('User and Content Embeddings')
plt.legend()
plt.grid(True)
plt.savefig('embeddings.png')
plt.close()

print("Embeddings visualization created")