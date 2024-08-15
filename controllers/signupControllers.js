const User = require("../models/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 10;

const addUser = async (req,res)=>{
  try{
    console.log(req.body);
    const {name,email,password} = req.body
    if (!email) {
      throw new Error("Please provide email")
    }
    if (!password) {
      throw new Error("Please provide password")
    }
    if (!name) {
      throw new Error("Please provide password")
    }
    
    const existingUser = await User.findOne({email})
    if(existingUser){
     throw new Error('User already exists')
    }
    if(!existingUser){

      const hashPassword = bcrypt.hashSync(password, saltRounds);

      if(!hashPassword){
        throw new Error("Couldnt hash the password")
   
      }

      const data = {
        ...req.body,
        password:hashPassword
      }
     
     const user =  new User(data)
   const newUser =   await user.save()
     console.log(newUser);
     res.status(201).json({
       message:"user created successfully",
       error:false,
       success:true,
       data:newUser
     })
    }
  }
  catch(err){
    console.log(err);
    res.status(400).json({
      message:err.message,
      success:false,
      error:true
    })
  }
 

}

module.exports ={
  addUser
}