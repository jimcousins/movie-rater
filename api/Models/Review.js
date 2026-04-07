const db = require("../../db/connect")

class Review {
    constructor({id, rating, movie_name, user_id}){
        this.id = id,
        this.rating = rating,
        this.movie_name = movie_name,
        this.user_id = user_id
    }

    static async getAllByUserID (user_id) {
        const response = await db.query("SELECT * FROM review WHERE user_id = $1:", [user_id])

        if(response.rows.length === 0){
            throw new Error("No reviews from this user")
        }
        return( response.rows.map(r => new Review(r)))
    }

    static async createReview (reviewData) {
        if(!userData.movie_name){throw new Error("Movie name is missing")}
        if(!userData.user_id){throw new Error("User ID is missing")}

        const response = await db.query("INSERT INTO review (rating, movie_name, user_id) VALUES($1, $2, $3) RETURNING *:", [reviewData.rating, reviewData.movie_name, reviewData.user_id])
        return new Review(response)
    }
}

module.exports = Review