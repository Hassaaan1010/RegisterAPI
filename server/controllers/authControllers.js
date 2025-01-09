import { sendErrResp } from "../utils/errorHandling.js";
import {
  createJwtToken,
  createUser,
  saveUser,
  authenticateUser,
} from "./helpers/authHelpers.js";

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // authenticate user
    const user = await authenticateUser(identifier, password);
    console.log("authed");
    // create token
    const token = await createJwtToken(user);
    console.log("tokened");
    // Response: token, username, _id
    return res.status(201).json({
      token: token,
      username: user.username,
      _id: user._id,
    });
  } catch (error) {
    sendErrResp(res, { status: error.status, message: error.message });
  }
};

const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    // validate and create new user
    const newUser = await createUser(username, email, password);

    // save to db
    await saveUser(newUser);

    // create jwt token
    const token = await createJwtToken(newUser);

    // Response: token, username, _id
    return res.status(201).json({
      token: token,
      username: newUser.username,
      _id: newUser._id,
    });
  } catch (error) {
    console.log(error);
    sendErrResp(res, { status: error.status, message: error.message });
  }
};

export { login, register };
