from flask_restful import Resource
import sys
sys.path.append("../")
from models.Review import Review
from flask import jsonify

class Review_List(Resource):
    def get(self):
        resp = Review.get_all()
        data = [review.to_dict() for review in resp]
        print(data)
        return {"reviews": data }, 200