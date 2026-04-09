
# Import requirements
from flask import Flask, jsonify
from flask_restful import Api
from controller.Review_Controller import Review_Controller
from controller.Review_List import Review_List
<<<<<<< jimdev3
from controller.Create_Review import Create_Review
=======
from controller.LLM_Controller import Chatbot
>>>>>>> main

#Define technologies
app = Flask(__name__)
api = Api(app)

@app.route('/')
def index():
    return jsonify({'info': 'welcome',
                       'email': 'alice@outlook.com'})


<<<<<<< jimdev3
api.add_resource(Review_List, "/review/list")
api.add_resource(Review_Controller, "/review/delete/<int:id>")
api.add_resource(Create_Review, "/review/create")
=======
api.add_resource(Review_List, "/list/<int:user_id>")
api.add_resource(Review_Controller, "/review/<int:review_id>")
api.add_resource(Chatbot, "/chatbot")
>>>>>>> main

app.run()