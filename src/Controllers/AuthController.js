const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../Helpers/dbErrorHandler')
const expressJwt = require('express-jwt');
 

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err)
        });
      }
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({
        user,
      })
    })
}

exports.signin = (req, res) => {
  // Find the user based on email
  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if(err || !user) {
      return res.status(400).json({ error:"User with that email does not exist. Please signup"})
    }
    // if user is found make sure the email and password matches
    // create authenticate method in user models
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and passowrd dont match'
      })
    }
    // generate a signed token with user id and secret
    const token = jwt.sign(
      {
        _id: user._id
      },
      process.env.JWT_SECRET
    )
    //persist the token as 't' cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 })
    
    const { _id, name, email, role } = user

    return res.json({ token, user: {_id, name, email, role} })
  })
}

exports.signout = (req, res) => {
  res.clearCookie('t')
  res.json({message: "Signout Sucess"})
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
})

exports.isAuth = (req, res, next) => {
  //Check token With User ID
  let user = req.profile && req.auth && req.profile._id == req.auth._id
 
  if (!user) {
      return res.status(403).json({error: "Acess denied"})
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
      return res.status(403).json({error: "Admin resource! Access denied"})
  }
  next()
}