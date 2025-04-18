const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Mahek@tha';

const fetchuser = (req, res, next) => {

    // Get the user from the jwt token and add id to the request object
    const token = req.header("auth-token"); // auth-token in double quotes as it is a string literal
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })

    }

}

module.exports = fetchuser;