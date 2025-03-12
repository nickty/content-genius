import numpy as np
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
import pandas as pd

# Sample data - in a real application, this would come from a database
sample_content = [
    "AI and machine learning are transforming the tech industry",
    "Cloud computing provides scalable infrastructure for businesses",
    "Python is a versatile language for data science and web development",
    "Next.js and React make frontend development more efficient",
    "TensorFlow enables powerful machine learning models",
    "AWS and Azure offer comprehensive cloud solutions",
    "Node.js is great for building scalable network applications",
    "Full-stack development requires knowledge of multiple technologies",
    "Artificial intelligence is changing how we interact with technology",
    "Cloud platforms provide flexible computing resources"
]

# Sample engagement metrics
sample_metrics = {
    "views": [120, 85, 210, 150, 95, 180, 75, 130, 190, 110],
    "engagement_rate": [0.23, 0.18, 0.32, 0.27, 0.21, 0.29, 0.17, 0.24, 0.31, 0.22]
}

class ContentAnalyzer:
    def __init__(self, content_list):
        self.content_list = content_list
        self.vectorizer = TfidfVectorizer(stop_words='english', max_features=100)
        
    def analyze_topics(self):
        """Identify main topics in the content"""
        # Vectorize the content
        X = self.vectorizer.fit_transform(self.content_list)
        
        # Use KMeans to cluster the content
        kmeans = KMeans(n_clusters=3, random_state=42)
        kmeans.fit(X)
        
        # Get the most important terms for each cluster
        order_centroids = kmeans.cluster_centers_.argsort()[:, ::-1]
        terms = self.vectorizer.get_feature_names_out()
        
        topics = []
        for i in range(3):
            topic_terms = [terms[ind] for ind in order_centroids[i, :5]]
            topics.append(f"Topic {i+1}: {', '.join(topic_terms)}")
        
        return topics
    
    def visualize_content_clusters(self):
        """Create a visualization of content clusters"""
        # Vectorize the content
        X = self.vectorizer.fit_transform(self.content_list)
        
        # Reduce dimensions for visualization
        pca = PCA(n_components=2, random_state=42)
        reduced_features = pca.fit_transform(X.toarray())
        
        # Cluster the content
        kmeans = KMeans(n_clusters=3, random_state=42)
        clusters = kmeans.fit_predict(X)
        
        # Create a scatter plot
        plt.figure(figsize=(10, 6))
        scatter = plt.scatter(reduced_features[:, 0], reduced_features[:, 1], c=clusters, cmap='viridis')
        plt.title('Content Clusters Visualization')
        plt.xlabel('PCA Feature 1')
        plt.ylabel('PCA Feature 2')
        plt.colorbar(scatter, label='Cluster')
        
        # Save the plot to a file (in a real app, you'd return this to the frontend)
        plt.savefig('content_clusters.png')
        plt.close()
        
        print("Content clusters visualization created")
        return clusters

class EngagementAnalyzer:
    def __init__(self, content_list, metrics):
        self.content_list = content_list
        self.metrics = metrics
        
    def analyze_performance(self):
        """Analyze content performance based on metrics"""
        df = pd.DataFrame({
            'content': self.content_list,
            'views': self.metrics['views'],
            'engagement_rate': self.metrics['engagement_rate']
        })
        
        # Calculate a performance score
        df['performance_score'] = (df['views'] / max(df['views'])) * 0.5 + (df['engagement_rate'] / max(df['engagement_rate'])) * 0.5
        
        # Sort by performance score
        top_content = df.sort_values('performance_score', ascending=False).head(3)
        
        return top_content[['content', 'performance_score']].values.tolist()
    
    def visualize_engagement(self):
        """Create a visualization of engagement metrics"""
        df = pd.DataFrame({
            'content_id': range(1, len(self.content_list) + 1),
            'views': self.metrics['views'],
            'engagement_rate': self.metrics['engagement_rate']
        })
        
        # Create a bar chart
        fig, ax1 = plt.subplots(figsize=(12, 6))
        
        x = df['content_id']
        ax1.bar(x, df['views'], color='skyblue', alpha=0.7, label='Views')
        ax1.set_xlabel('Content ID')
        ax1.set_ylabel('Views', color='skyblue')
        ax1.tick_params(axis='y', labelcolor='skyblue')
        
        ax2 = ax1.twinx()
        ax2.plot(x, df['engagement_rate'], color='red', marker='o', label='Engagement Rate')
        ax2.set_ylabel('Engagement Rate', color='red')
        ax2.tick_params(axis='y', labelcolor='red')
        
        fig.tight_layout()
        plt.title('Content Engagement Metrics')
        
        # Add legend
        lines1, labels1 = ax1.get_legend_handles_labels()
        lines2, labels2 = ax2.get_legend_handles_labels()
        ax1.legend(lines1 + lines2, labels1 + labels2, loc='upper left')
        
        # Save the plot to a file (in a real app, you'd return this to the frontend)
        plt.savefig('engagement_metrics.png')
        plt.close()
        
        print("Engagement metrics visualization created")
        return df[['content_id', 'views', 'engagement_rate']].values.tolist()

# Run the analysis
content_analyzer = ContentAnalyzer(sample_content)
topics = content_analyzer.analyze_topics()
clusters = content_analyzer.visualize_content_clusters()

engagement_analyzer = EngagementAnalyzer(sample_content, sample_metrics)
top_performing = engagement_analyzer.analyze_performance()
engagement_metrics = engagement_analyzer.visualize_engagement()

print("\nContent Topics:")
for topic in topics:
    print(topic)

print("\nTop Performing Content:")
for content, score in top_performing:
    print(f"- {content[:50]}... (Score: {score:.2f})")

print("\nContent has been clustered into groups:")
for i, cluster in enumerate(clusters):
    print(f"Content {i+1}: Cluster {cluster}")