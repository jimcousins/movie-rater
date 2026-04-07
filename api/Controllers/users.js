const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const User = require("../Models/User")

async function userByID(req, res){}

async function userByEmail(req, res){
        try{
        const data = req.body
        const user = await User.getUserByEmail(data.email)
        if(!user){
            throw new Error("No user with that email available")
        }
                const match = await bcrypt.compare(data.password, user.password);
        console.log(match)
        if(match) {
            const payload = {username: user.email}
            const sendToken = (err, token) => {
                if(err) {
                    throw new Error("Error in token generation")
                }
                res.status(200).json({
                    success:true,
                    token:token,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    user_id: user.user_id
                });
            }
            jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn: 3600}, sendToken);
        }
        else {
            throw new Error("User could not be authenticated")
        }
    }catch(e) {
        res.status(401).json({error: e.message});
    }
}

async function newUser(req, res){}

module.exports = { userByID, userByEmail, newUser }