const { Usermodel } = require("../Models/user.model.js");

// user Update Route

const UpdatedUser = async (User, update) => {
  try {
    let doc = await Usermodel.findOneAndUpdate({ _id: User._id }, update, {
      new: true,
    });
    console.log(doc);
    return { user: doc, message: "Your Informtion Updated Successfully" };
  } catch (error) {
    return { message: "Something went wrong" };
  }
};

module.exports = { UpdatedUser };
