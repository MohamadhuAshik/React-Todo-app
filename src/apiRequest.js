const apiRequest = async (url="", optionsObj=null ,errMsg=null) =>{
   try{
    const response = await fetch(url,optionsObj);
    if(!response.ok) throw Error("Please ReLoad The App");

   }catch(err){
     errMsg = err.Message
   }finally{
     return errMsg;
   }
}

export default apiRequest