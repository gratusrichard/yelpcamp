function tryCatch (fn){

    try{
        fn(req,res,next)
    } catch(e){
        next(e)
    }



};

module.exports = tryCatch();