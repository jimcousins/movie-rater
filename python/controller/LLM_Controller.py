from flask_restful import Resource, reqparse

import requests
import json

from dotenv import load_dotenv
import os

load_dotenv()

KEY = os.getenv("OPENROUTERKEY")


parser = reqparse.RequestParser()
parser.add_argument("prompt")





class Chatbot(Resource): 
    def post(self):
        args = parser.parse_args()
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {KEY}"
            },
            data=json.dumps({
                "model": "openai/gpt-oss-120b:free", # Optional
                "messages": [
                {
                    "role": "user",
                    "content": args['prompt']
                }
                ]
            })
        )
        main = response.json()
        return {"content": main["choices"][0]["message"]["content"]}


