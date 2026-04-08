from flask_restful import Resource
from flask import jsonify

class Review_Controller(Resource):
    def get(self, review_id):
        return {"info": f"hi {review_id}"}
    
    def delete(self, review_id):
        return {"success": f"Review of {review_id} has been deleted"}