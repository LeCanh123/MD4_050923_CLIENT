if (err.toString().includes("Duplicate") && err.toString().includes("@")) {

}


if (err.toString().includes("Duplicate") ) {
    
}

if(addCategoryResult.status){
    return res.status(200).json({
        status:true,
        message:addCategoryResult.messsage,
        data:"null"
    }) 
}else{
    return res.status(201).json({
        status:false,
        message:addCategoryResult.messsage,
        data:"null"
    }) 
}