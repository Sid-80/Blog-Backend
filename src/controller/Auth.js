import { User } from "../models/User.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById({ _id: userId });
    const accessToken = user.generateAccessToken();
    await user.save({ validateBeforeSave: false });

    return { accessToken };
  } catch (err) {
    console.log(err);
  }
};

export const SigninController = async (req, res) => {
  const { email, lastname, firstname, phone, password } = req.body;

  try {
    const userCheck = await User.find({ email: email });

    if (!userCheck) {
      return res.status(409).json({ error: "User already exits!" });
    }

    const user = await User.create({
      firstname,
      lastname,
      phone,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password");

    const { accessToken } = await generateAccessAndRefreshToken(
      createdUser._id.toString()
    );

    res.status(201).json({
      status: "success",
      data: createdUser,
      accessToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error occured!" });
  }
};

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Credentials error!" });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({ error: "User not registered!" });
    }

    const isPassCorrectValid = await user.isPasswordCorrect(password);

    if (!isPassCorrectValid) {
      return res.status(401).json({ error: "Password invalid!" });
    }

    const { accessToken } = await generateAccessAndRefreshToken(
      user._id.toString()
    );

    const loggedInUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("accessToken", accessToken, options).json({
      user: loggedInUser,
      accessToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error occured!" });
  }
};

export const getSelfDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error occured!" });
  }
};
