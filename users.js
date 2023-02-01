const { User } = require("./schemas");
const mongoose = require("mongoose");

const options = { upsert: true, new: true, overwrite: true };

const getUser = async (userEmail) => {
    console.log(`users - getUser ${userEmail}`);
    try {
        foo =  await User.findOne({
            email: userEmail,
        });
        console.log(foo);
        return foo;
    } catch (e) {
      console.log(e);
    }
};

const createUser = async ({ name, userEmail}) => {
  try {
    console.log("name", name);
    const user = await User.create({
      name,
      userEmail,
      history: [{}],
    });
    console.log("user", user);
    await User.findOneAndUpdate(
      { email: userEmail },
      { $push: { email: user.email } },
      options
    );
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (user) => {
  try {
    console.log(user.history[0].date);
    console.log(user.history[0].timeChunks);
    let date = user.history[0].date;
    return await User.findOneAndUpdate(
      { email: user.email, "history.date": date }, 
      { $set: { "history.timeChunks": user.history[0].timeChunks }}, 
      options);
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (userEmail) => {
  
  try {

    const userPromise = User.findOneAndDelete({email: userEmail});

    await Promise.all([userPromise]);
    
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
};