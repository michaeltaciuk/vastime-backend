const { User } = require("./schemas");
const mongoose = require("mongoose");

const options = { upsert: true, new: true};

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

const updateUser = async (data) => {
  try {
    console.log(data.history[0].date)
    foo = await User.findOneAndRemove([{email: data.email}, { history: {date: data.history[0].date}}])
    console.log(foo)
    await User.findOneAndUpdate(
      { email: data.email}, 
      { $push: { history: data.history }}, 
      options
    );
    console.log(data);
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