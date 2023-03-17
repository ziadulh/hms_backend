const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authUser = (req, res, next) => {
    const token = req.header('auth_token');
    if(!token){
        return res.status(401).send({ status: false, errors: [{ msg: "Please login first" }] });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ status: false, errors: [{ msg: "Please login first" }], error });
    }
}

module.exports = authUser;