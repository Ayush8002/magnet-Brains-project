import jwt from "jsonwebtoken";


const isAuthenticated = (req, res, next) => {
    const token = req.cookies[`magnet-brains`];
    if (!token) {
        res.status(401).send({ error: "Please login to access this route" })
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = data._id;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
};

export { isAuthenticated };