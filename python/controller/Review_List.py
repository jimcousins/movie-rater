from flask_restful import Resource

class Review_List(Resource):
    def get(self, user_id):
        return {"reviews": [{"name": "SW: ANH", "score": 4}]}