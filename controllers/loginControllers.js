
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');



  
async function login(req, res) {


  try {
    
    const { email, password } = req.body
    if (!email) {
      throw new Error("Please provide email")
    }
    if (!password) {
      throw new Error("Please provide password")
    }

    const user = await User.findOne({email})
    if (!user) {
       throw new Error("user not found")
      };
   
   const checkPassword =   bcrypt.compareSync(password,user.password)

   if(checkPassword){

  const tokenData = {
    _ID : user._id,
    email : user.email
  }

   const token =  jwt.sign(tokenData,process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 8 });
    
   const tokenOption = {
    httpOnly : true,
    secure : true
   }

    res.cookie('token',token,tokenOption).json({
      message:"login success",
      data : token,
      success : true,
      error : false
    })  

   }else{
    throw new Error("check the password")
   }

    
    

  } catch (err) {
    res.json({
      message: err.message,
      error: true,
      success: false
    })
  }

}


const veriyLogin = async (req,res)=>{
  console.log(req.user);
  res.json({
    message:"verification success",
    data:req.user,
    success:true,
    error:false
  })
}




module.exports = {
  login,
  veriyLogin
 
}
