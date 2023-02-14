const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const db = require('../database/models');

const usersController = {

    register: async (req, res) => {
        console.log(req.body)
        const {fullName, email, phoneNumber, password} = req.body;
        const user = await db.User.findOne({where: {email: email}});

        if(user){
            res.status(409).json({error: 'user already exist'})
        }
        else{
            try{
                const newUser = await db.User.create({
                    fullName: fullName,
                    email: email,
                    phoneNumber: parseInt(phoneNumber),
                    address: "",
                    password: bcrypt.hashSync(password , 10),
                    image: "default.jpg",
                    role_id: 3
                })
                res.json('Successful');
    
            } catch(e) {
                res.status(500).json({ error: 'could not connect to database' })
            }
        }
    },

    login: async (req, res) => {
        const {email, password} = req.body;
        const user = await db.User.findOne({where: {email: email}});
        
        const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)
        if(!passwordCorrect){
            res.status(401).json({error: 'invalid credentials'})
        }
        else{
            const token = jwt.sign({
                email: user.email,
                fullName: user.fullName,
                role_id: user.role_id
            }, 'titabesecret')

            res.json({
                email: user.email,
                fullName: user.fullName,
                role_id: user.role_id,
                token
            })
        }
    },

    logged: (req, res) => {
        res.json({
            email: req.user.email,
            fullName: req.user.fullName,
            role_id: req.user.role_id,
        })
    }
    
}

module.exports = usersController;