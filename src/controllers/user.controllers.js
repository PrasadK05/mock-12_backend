const User = require("../models/user.model");

const argon2 = require("argon2");

const createUser = async (data) => {
  let { email, password, name } = data;
  let ch = await User.findOne({ email: data.email });
  if (ch) {
    return false;
  }
  let hash = await argon2.hash(password);
  let user = await User.create({ email, password: hash, name });
  if (user) {
    return true;
  } else {
    return false;
  }
};

const findUser = async (data) => {
  let user = await User.findOne({ email: data });
  if (user) {
    return user;
  } else {
    return false;
  }
};

const validateUser = async (data) => {
  let { email, password } = data;
  try {
    let user = await findUser({ email });
    if (user) {
      if (await argon2.verify(user.password, password)) {
        return user;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

module.exports = {
  createUser,
  validateUser,
  findUser,
};
