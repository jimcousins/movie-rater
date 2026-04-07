const db = require("../../db/connect")

class User {
    constructor({id, first_name, last_name, email, password, security_question_id, security_question_answer}){
        this.id = id,
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.password = password,
        this.security_question_id = security_question_id,
        this.security_question_answer =security_question_answer
    }

    static async getUserByID (id) {
        const response = await db.query("SELECT * FROM user_table WHERE id = $1;", [id])
        if(response.rows.length != 1){
            throw new Error("Cannot find user details with this ID.")
        }
        return new User(response.rows[0])
    }

    static async getUserByEmail (email) {
        const response = await db.query("SELECT * FROM user_table WHERE email = $1;", [email])
        if(response.rows.length != 1){
            throw new Error("Cannot find user details with this email.")
        }
        return new User(response.rows[0])
    }

    static async createUser (userData) {
        if(!userData){throw new Error ("User data is missing.")}
        if(!userData.first_name){throw new Error ("User first name is missing.")}
        if(!userData.last_name){throw new Error ("User last name is missing.")}
        if(!userData.email){throw new Error ("User email is missing.")}
        const response = await db.query("INSERT INTO user_table VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
            [userData.first_name, userData.last_name, userData.email, userData.password, userData.security_question_id, userData.security_question_answer])
        return new User (response)
    }
}

module.exports = User