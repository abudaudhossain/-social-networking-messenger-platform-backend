module.exports = (io) => {
    console.log("socket.io")
    try {
        return (req, res, next) => {
            req.io = io;
            next();
        };
    } catch (error) {
        
    }
    
};
