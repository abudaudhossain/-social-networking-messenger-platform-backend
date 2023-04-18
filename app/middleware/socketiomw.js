module.exports = (io) => {
    console.log("idsjkj")
    try {
        return (req, res, next) => {
            req.io = io;
            next();
        };
    } catch (error) {
        
    }
    
};
