const User = require('../../models/faculty/FacultyUser.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//------------------------------------------------------REGISTER------------------------------------------------------
const register = async (req, res) => {
  const SecurityCode = '1111';
  try {
    let { email, password, confirmPassword, fn, ln ,code} = req.body;


    //===========================Validation===========================

    if (!email || !password || !confirmPassword || !fn || !ln || !code)
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered.' });

    if(SecurityCode!==code)
     return res
      .status(400)
      .json({ message: 'Invalid Security code.' });

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail)
      return res
        .status(400)
        .json({ message: 'An account with this email already exists.' });

    
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: 'The password needs to be atleast 6 characters.' });
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: 'Please enter the same password twice' });

    //========================SAVING-USER=======================================

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: fn +' '+ln,
      email,
      password: passwordHash
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//----------------------------------------------------------LOGIN-----------------------------------------------------
const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password)
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered.' });

    //Checking for registered email or username and assigning it to "user"
    let user;

      const emailCheck = await User.findOne({ email: emailOrUsername });
      if (emailCheck) {
        user = emailCheck;
      } else {
        return res.status(400).json({
          message: 'No account with this email or username is registered.'
        });
      }
    

    //Checking password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid Credentials' });

    //Assigning Json Web Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
     // , {expiresIn: '3h'}
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name:user.name,
        email:user.email
      },
      student:false
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//-----------------------------------------------TOKEN-IS-VALID---------------------------------------------------------
const tokenIsValid = async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }

    return res.json(true);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//------------------------------------------------GET-LOGGED-IN-USER------------------------------------------------
const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({
        id: user._id,
        name:user.name,
        email:user.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//------------------------------------------------EXPORTS-----------------------------------------------------------
exports.register = register;
exports.login = login;
exports.tokenIsValid = tokenIsValid;
exports.getLoggedInUser = getLoggedInUser;
