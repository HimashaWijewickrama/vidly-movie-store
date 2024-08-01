const router = require("express").Router();

let User = require("../models/user");

//add new user
router.route("/vidly/sign-up").post((req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const adminlevel = req.body.adminlevel;
  const email = req.body.email;
  const pnumber = req.body.pnumber;
  const age = Number(req.body.age);
  const password = req.body.password;

  const newUser = new User({
    fname,
    lname,
    adminlevel,
    email,
    pnumber,
    age,
    password,
  });

  newUser
    .save()
    .then(() => {
      res.json("User Created");
    })
    .catch((err) => {
      console.log(err);
    });
});

//view users

router.route("/users").get((req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});
//update user
router.route("/user/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { fname, lname, adminlevel, email, pnumber, age, password } = req.body;

  const updateUser = {
    fname,
    lname,
    adminlevel,
    email,
    pnumber,
    age,
    password,
  };

  const update = await User.findByIdAndUpdate(userId, updateUser)
    .then(() => {
      res.status(200).send({ status: "User updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});
//delete user
router.route("/user/delete/:id").delete((req, res) => {
  let userId = req.params.id;

  User.findByIdAndDelete(userId)
    .then(() => {
      res.json("Delete Succussfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

//fetch data of users by id
router.route("/user/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  await User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with get item", error: err.message });
    });
});

//fetch data of users by password
// Fetch user's email by password (insecure method)
router.route("/user/get-email/:password").get(async (req, res) => {
  let userPwd = req.params.password;
  try {
    // Query user by password (insecure)
    let user = await User.findOne({ password: userPwd });
    if (!user) {
      return res.status(404).send({ status: "User not found" });
    }

    // Return user's email
    res.json({ email: user.email });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error with fetching email", error: err.message });
  }
});

module.exports = router;
