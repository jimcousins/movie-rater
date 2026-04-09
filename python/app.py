
# Import requirements
from flask import Flask, jsonify
from flask_restful import Api
from controller.Review_Controller import Review_Controller
from controller.Review_List import Review_List
from controller.Create_Review import Create_Review

#Define technologies
app = Flask(__name__)
api = Api(app)

@app.route('/')
def index():
    return jsonify({'info': 'welcome',
                       'email': 'alice@outlook.com'})


api.add_resource(Review_List, "/review/list")
api.add_resource(Review_Controller, "/review/delete/<int:id>")
api.add_resource(Create_Review, "/review/create")

app.run()