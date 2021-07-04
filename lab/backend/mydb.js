const { Console } = require('console');
const express=require("express");
const mongoose=require('mongoose');
const cors=require('cors')
//const bcrypt=require('bcrypt');
var bodyParser=require('body-parser');
var mybodyParser=bodyParser.json();
var app=express();
app.use(cors());
const Db='mongodb+srv://sudip1998:Sudip123@@cluster0.r9pxt.mongodb.net/Studentinfo?retryWrites=true&w=majority';
const userSchema=new mongoose.Schema({
    name:{
        type:"string",
        require:true

    },
    email:{
        type:"string",
        require:true

    },
    mobile:{
        type:Number,
        require:true
    },
    gender:{
        type:"string",
        require:true
    },
    
    universityroll:{
        type:Number,
        require:true
    },
    registrationno:{
        type:Number,
        require:true
    },
    avgCGPA:{
type:Number,
require:true
    }
   

})
const User=mongoose.model('recs',userSchema);
mongoose.connect(Db,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {console.log('mongoDB connected...')}
).catch((err)=>console.log('not connected'));
app.use(bodyParser.json());
app.get('/err',(req,res)=>{
    res.send("Email exist")
});
app.post('/info',mybodyParser,function(req,res,next){
    const {name,email,mobile,gender,registrationno,universityroll,avgCGPA}=req.body;
    if(!name||!email || !mobile|| !gender || !registrationno || !universityroll||!avgCGPA ){
        return res.status(422).json({error:"please fill the field currect"});
    }
   else{ 
    User.findOne({email:email}).then((userExist)=>{
        if(userExist){
            res.send('email exist');
           // window.alert({message:"email already exist"});
            return res.status(422).json({error:"Email already Exist"});
        }
        const user= new User({name:name,email:email,mobile:mobile,gender:gender,registrationno:registrationno,universityroll:universityroll,avgCGPA:avgCGPA});
    user.save().then(()=>{
        res.status(201).json({message:"user register successfully"});
    }).catch((err)=>res.status(500).json({error:"failed to sign up"}));
    
}).catch(err=>{console.log(err);});
   
    


   }

});



app.listen(3001,function(){
    
    console.log("server port 3001");
}) 