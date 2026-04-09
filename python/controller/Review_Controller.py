from flask_restful import Resource
from flask import jsonify
import sys
sys.path.append("../")
from models.Review import Review

class Review_Controller(Resource):
    
    def delete(self, id):
        resp = Review.delete_review(id=id)
        data = resp.to_dict()
        return {"reviews": data }, 200
    
