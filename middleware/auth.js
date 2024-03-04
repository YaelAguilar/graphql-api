
const authenticate = (req, res, next) => {

    const token = req.headers.autorization?.split(" ")[1];
    console.log(token)
    next()
};

module.exports = {
    authenticate
};