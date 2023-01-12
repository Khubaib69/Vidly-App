module.exports = function (req, res, next) {
    // auth middleware is set before this so we have req.user which contains user id and isAdmin property 
    // and if isAdmin is true then we can delete the request
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) return res.status(403).send("You Are Forbidden From This Request");
    next();
}