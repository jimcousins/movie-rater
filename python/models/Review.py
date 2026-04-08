from db.connect import cur
# import psycopg2
# from dotenv import load_dotenv
# import os

# load_dotenv()

# DATABASE = os.getenv("DATABASE")
# USER = os.getenv("USER")
# PASSWORD = os.getenv("PASSWORD")
# HOST = os.getenv("HOST")
# PORT = os.getenv("PORT")

# conn = psycopg2.connect(database=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)

# cur = conn.cursor()

class Review:

    def __init__(self, id, rating, movie_name, user_id):
        self.id = id
        self.rating = rating
        self.movie_name = movie_name
        self.user_id = user_id

    def get_all_by_user_id(user_id):
        cur.execute("SELECT * FROM review WHERE user_id = %s", [user_id])
        revs = cur.fetchall()
        reviews = [Review(id=rev[0], rating=rev[1], movie_name=[2], user_id=[3]) for rev in revs]
        return reviews

    def create_review(rating, movie_name, user_id):
        cur.execute("INSERT INTO review (rating, movie_name, user_id) VALUES (%s, %s, %s) RETURNING *", [rating, movie_name, user_id])
        rev = cur.fetchall()[0]
        return Review(id=rev[0], rating=rev[1], movie_name=[2], user_id=[3])

    def delete_review(id):
        cur.execute("DELETE FROM review WHERE id = %s RETURNING *", [id])
        rev = cur.fetchall()[0]
        return Review(id=rev[0], rating=rev[1], movie_name=[2], user_id=[3])
    

