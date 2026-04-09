from models.db.connect import cur, conn

class Review:

    def __init__(self, id, rating, song_name, artist):
        self.id = id
        self.rating = rating
        self.song_name = song_name
        self.artist = artist

    def to_dict(self):
        return {"id": self.id, "rating":self.rating, "song_name": self.song_name, "artist": self.artist}

    def get_all():
        cur.execute("SELECT * FROM review")
        revs = cur.fetchall()
        reviews = [Review(id=rev[0], rating=rev[1], song_name=rev[2], artist=rev[3]) for rev in revs]
        conn.commit()
        return reviews

    def create_review(rating, song_name, artist):
        cur.execute("INSERT INTO review (rating, song_name, artist) VALUES (%s, %s, %s) RETURNING *", [rating, song_name, artist])
        rev = cur.fetchall()[0]
        conn.commit()
        return Review(id=rev[0], rating=rev[1], song_name=rev[2], artist=rev[3])

    def delete_review(id):
        cur.execute("DELETE FROM review WHERE id = %s RETURNING *", [id])
        rev = cur.fetchall()[0]
        conn.commit()
        return Review(id=rev[0], rating=rev[1], song_name=rev[2], artist=rev[3])
    

