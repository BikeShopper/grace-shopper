// obtain the model from db
const {
  models: { User },
} = require('../db');
// Store all of the functions that will act as a middleware between our request and our responce and we will use it as we see fit
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // classmethod comes from user.js in db
    const user = await User.findByToken(token);
    //if successful we attach the user instance to the req.user
    req.user = user;
    // we need to move on to the next piece use next
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  //if we managed to make it PAST required token, we can guarantee that we have a user
  // this means we have access to req.user
  //isAdmin GATE established line below
  if (!req.user.isAdmin) {
    return res.status(403).send('Restricted data!!! Try me again hahaha!!!');
  } else {
    //if my user is an Admin, pass them forward
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
