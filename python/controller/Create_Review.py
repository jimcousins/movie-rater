from flask_restful import Resource, reqparse
from flask import jsonify
import sys
sys.path.append("../")
from models.Review import Review

parser = reqparse.RequestParser()
parser.add_argument("rating")
parser.add_argument("song_name")
parser.add_argument("artist")

class Create_Review(Resource):
    def post(self):
        args = parser.parse_args()
        print(args)
        resp = Review.create_review(rating=args["rating"], song_name=args["song_name"], artist=args["artist"])
        data = resp.to_dict()
        return {"reviews": data}, 201
    
    