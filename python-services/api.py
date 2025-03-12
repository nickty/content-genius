from flask import Flask, jsonify, request
import ml_service
import recommendation_system
import json

app = Flask(__name__)

# Sample data
content_analyzer = ml_service.ContentAnalyzer(ml_service.sample_content)
engagement_analyzer = ml_service.EngagementAnalyzer(ml_service.sample_content, ml_service.sample_metrics)

@app.route('/api/topics', methods=['GET'])
def get_topics():
    topics = content_analyzer.analyze_topics()
    return jsonify({"topics": topics})

@app.route('/api/performance', methods=['GET'])
def get_performance():
    top_performing = engagement_analyzer.analyze_performance()
    return jsonify({
        "top_performing": [
            {"content": content, "score": float(score)} 
            for content, score in top_performing
        ]
    })

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    user_id = int(request.args.get('user_id', 0))
    content_ids, ratings = recommendation_system.get_recommendations(user_id)
    
    recommendations = []
    for i, (content_id, rating) in enumerate(zip(content_ids, ratings)):
        recommendations.append({
            "id": int(content_id),
            "title": recommendation_system.content_titles[int(content_id)],
            "rating": float(rating)
        })
    
    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(debug=True, port=5000)