from flask import Flask, jsonify, request, Response
import json
import random
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Mock data for content
mock_content = [
    {
        "id": 1,
        "title": "Introduction to AI and Machine Learning",
        "excerpt": "Learn the basics of AI and machine learning in this comprehensive guide.",
        "created_at": "2023-05-15T10:30:00Z",
        "views": 1250,
        "engagement_rate": 0.32
    },
    {
        "id": 2,
        "title": "Cloud Computing Fundamentals",
        "excerpt": "Understand the core concepts of cloud computing and its benefits.",
        "created_at": "2023-06-02T14:45:00Z",
        "views": 980,
        "engagement_rate": 0.28
    },
    {
        "id": 3,
        "title": "Full-Stack Development with Next.js",
        "excerpt": "Build modern web applications with Next.js and React.",
        "created_at": "2023-06-20T09:15:00Z",
        "views": 1560,
        "engagement_rate": 0.35
    },
    {
        "id": 4,
        "title": "Python for Data Science",
        "excerpt": "Master Python for data analysis and machine learning.",
        "created_at": "2023-07-05T11:20:00Z",
        "views": 2100,
        "engagement_rate": 0.41
    },
    {
        "id": 5,
        "title": "AWS vs Azure: Cloud Comparison",
        "excerpt": "Compare the leading cloud platforms for your next project.",
        "created_at": "2023-07-18T16:30:00Z",
        "views": 1320,
        "engagement_rate": 0.29
    }
]

# Mock data for analytics
mock_analytics = {
    "total_views": 7210,
    "avg_engagement_rate": 0.33,
    "top_performing_content": [4, 3, 1],
    "content_by_category": {
        "AI & ML": 35,
        "Cloud": 28,
        "Development": 22,
        "Data Science": 15
    },
    "views_by_day": [
        {"date": "2023-08-01", "views": 320},
        {"date": "2023-08-02", "views": 345},
        {"date": "2023-08-03", "views": 290},
        {"date": "2023-08-04", "views": 410},
        {"date": "2023-08-05", "views": 380},
        {"date": "2023-08-06", "views": 320},
        {"date": "2023-08-07", "views": 450}
    ]
}

# Mock data for recommendations
mock_recommendations = [
    {
        "id": 6,
        "title": "TensorFlow vs PyTorch: A Comparison",
        "confidence": 0.89
    },
    {
        "id": 7,
        "title": "Serverless Architecture Best Practices",
        "confidence": 0.82
    },
    {
        "id": 8,
        "title": "Advanced React Patterns",
        "confidence": 0.78
    }
]

# Mock topics
mock_topics = [
    "Topic 1: ai, machine, learning, models, neural",
    "Topic 2: cloud, computing, aws, azure, services",
    "Topic 3: development, web, react, nextjs, frontend"
]

@app.route('/api/content', methods=['GET'])
def get_content():
    return jsonify({"content": mock_content})

@app.route('/api/content/<int:content_id>', methods=['GET'])
def get_content_by_id(content_id):
    content = next((item for item in mock_content if item["id"] == content_id), None)
    if content:
        return jsonify({"content": content})
    return jsonify({"error": "Content not found"}), 404

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    return jsonify(mock_analytics)

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    user_id = request.args.get('user_id', default=1, type=int)
    # In a real app, we'd use the user_id to get personalized recommendations
    return jsonify({"recommendations": mock_recommendations})

@app.route('/api/topics', methods=['GET'])
def get_topics():
    return jsonify({"topics": mock_topics})

@app.route('/api/generate-content', methods=['POST'])
def generate_content():
    data = request.json
    
    # Simulate processing time
    import time
    time.sleep(2)
    
    # Mock content generation
    generated_content = f"This is a generated {data.get('contentType', 'article')} about {data.get('topic', 'general topic')}.\n\n"
    generated_content += "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n"
    generated_content += "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    
    return jsonify({"content": generated_content})

@app.route('/api/stream-content', methods=['POST'])
def stream_content():
    data = request.json
    
    def generate():
        sentences = [
            f"This is a generated {data.get('contentType', 'article')} about {data.get('topic', 'general topic')}.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ]
        
        for sentence in sentences:
            # Split sentence into words for more granular streaming
            words = sentence.split()
            for i in range(len(words)):
                chunk = " ".join(words[:i+1])
                if i > 0:
                    chunk = " " + chunk
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
                time.sleep(0.1)
            yield f"data: {json.dumps({'chunk': '. '})}\n\n"
            time.sleep(0.5)
        
        yield f"data: {json.dumps({'done': True})}\n\n"
    
    return Response(generate(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True, port=5000)

