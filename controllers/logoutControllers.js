const logout = async(req,res)=>{
  try{
    res.clearCookie("token")

    res.json({
      message:"logout succes",
      error : false,
      success : true,
      data : []
    })
  }catch(err){
    res.json({
      message: err.message,
      error: true,
      success: false
    })
  }
  
}

module.exports = logout