const express = require ("express")
const morgan = require ('morgan') //logger
const cors = require ('cors')
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
const db = require('./database/models')

const app = module.exports = express()
require('dotenv').config();

const port = process.env.PORT || 3001
process.env.NODE_ENV !== "prod" && app.use(morgan("dev"))

app.use(express.json())
app.use(methodOverride('_method'));
app.use(cors())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept, Authorization")
    next()
})
app.use(express.urlencoded({ extended: false }))

app.get('/', function(req, res){
    res.json('Hello World');
});

//Routers
const storeRouter = require ('./routes/storeRouter')
app.use('/api/store', storeRouter)
const usersRouter = require ('./routes/usersRouter')
app.use('/api/users', usersRouter)
app.use('/images/', express.static('images'));

if(!module.parent){
    app.listen(port);
    console.log(`Express started on port ${port}`);
}

db.sequelize.sync().then(()=>{
    console.log('Database sync')
})