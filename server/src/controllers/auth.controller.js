const User = require("../models/user.model");
const jwt = require('jsonwebtoken');


const createToken = (user) => jwt.sign({ user }, process.env.JWT_ASSESS_KEY);


const signup = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("JWT KEY:", process.env.JWT_ASSESS_KEY);

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Please try with different email'
      });
    }

    user = await User.create(req.body);

    const token = createToken(user);

    return res.status(201).json({ user, token });

  } catch (e) {
    console.error("SIGNUP ERROR:", e);
    return res.status(500).json({
      message: e.message,
      status: 'Failed'
    });
  }
};



const login = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(500).json({ status: 'failed', message: 'Please check your email' });
        }

        const match = await user.checkPassword(req.body.password);

        if (!match) {
            return res.status(500).json({ status: 'failed', message: 'Please check your password' });
        }

        const token = createToken(user);

        return res.status(201).json({ user, token });

    } catch (e) {

        return res.status(500).json({ message: e.message, status: 'Failed' });
    }
};


module.exports = { signup, login };