
var express=require("express"); 
var bodyParser=require("body-parser"); 
  
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
  
var app=express() 
app.set('view engine','ejs');
 const path=require('path'); 
  
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
app.use(express.static(path.join(__dirname,'views')));

var todoSchema=new mongoose.Schema({
name:{type: String},
level:{type: Number},
time: {type: Date, default: Date.now}
    })
var Todo=mongoose.model('Todo',todoSchema);
app.get('/',function(req,res){  
 res.render('index');
})
app.post('/', function(req,res){ 
    var name = req.body.name; 
    var level =req.body.level; 
            var todo=new Todo({name:name,level:level});
todo.save();
    console.log('inserted');
res.render('signup');
    });  
app.get('/display', function(req,res){ 
Todo.find().sort([["level","descending"],["time","ascending"]]).
then(data=>{
res.render('display',{
  pageTitle :'leaderboard',
  todos:data
}); 
    }).
catch(err=>
{
    console.log('error')
})
})

app.listen(3000); 
  
  
console.log("server listening at port 3000"); 