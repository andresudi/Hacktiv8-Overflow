const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUser = (req, res) => {
  User.find({})
    .then(data => {
      if (data.length == 0) {
        res.status(400).json({
          message: `Cannot get users data`,
          data
        });
      } else {
        res.status(200).json({
          message: `Succes get all users`,
          data
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: `Something is wrong`,
        err
      });
    });
};

const register = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({
    email: email
  })
    .then(user => {
      if (!user || user == undefined) {
        User.create({
          name: name,
          email: email,
          password: password
        })
          .then(data => {
            res.status(200).json({
              message: `Welcome new user!`,
              data
            });
          })
          .catch(err => {
            res.status(400).json({
              message: "Please input all fields correctly"
            });
          });
      } else {
        res.status(400).json({
          message: "Email is already exist"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    email: email
  })
    .then(data => {
      if (data) {
        let passwordCheck = bcrypt.compareSync(password, data.password);
        if (passwordCheck) {
          let token = jwt.sign(
            {
              id: data._id,
              name: data.name,
              email: data.email
            },
            process.env.jwt_secret
          );
          res.status(200).json({
            message: `Welcome to Hacktiv Overflow!`,
            token: token,
            token2: token + ',' + data._id,
            email: data.email
          });
        } else {
          res.status(400).json({
            message: `Password is invalid`
          });
        }
      } else {
        res.status(400).json({
          message: `Email not found`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const loginfb = (req, res) => {
  let urlUser = `https://graph.facebook.com/me?fields=id,name,email&access_token=${
    req.body.token
  }`;

  axios
    .get(urlUser)
    .then(data => {
      User.findOne({
        email: data.data.email
      })
        .then(dataUser => {
          if (dataUser == null) {
            User.create({
              name: data.data.name,
              email: data.data.email,
              password: data.data.email
            })
              .then(newUser => {
                let token = jwt.sign(
                  {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                  },
                  process.env.jwt_secret
                );

                res.status(200).json({
                  message: `succesfully registered`,
                  token: token,
                  name: newUser.name,
                  email: newUser.email
                });
              })
              .catch(err => {
                res.status(400).json({
                  message: err.message
                });
              });
          } else {
            let token = jwt.sign(
              {
                id: dataUser.id,
                name: dataUser.name,
                email: dataUser.email
              },
              process.env.jwt_secret
            );

            res.status(200).json({
              message: `login succesfully`,
              token: token,
              name: dataUser.name,
              email: dataUser.email
            });
          }
        })
        .catch(err => {
          res.status(400).json({
            err
          });
        });
    })
    .catch(err => {
      res.status(400).json({
        err
      });
    });
};

const loginOath2 = (req, res) => {
  // 1 untuk semua login yang di firebase
  User.findOne({email: req.body.email})
  
  .then(dataUser => {
    
    if (!dataUser) {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.email
      })
        .then(newUser => {

          let token = jwt.sign(
            {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email
            },
            process.env.jwt_secret
          );
          res.status(200).json({
            message: `succesfully registered`,
            token: token,
            name: newUser.name,
            email: newUser.email
          });
        })
        .catch(err => {
          res.status(400).json({
            message: err.message
          });
        });
    } else {
      let token = jwt.sign(
        {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email
        },
        process.env.jwt_secret
      );

      res.status(200).json({
        message: `login succesfully`,
        token: token,
        name: dataUser.name,
        email: dataUser.email
      });
    }
  })
  .catch(err => {
    res.status(400).json({
      err
    });
  });
}


module.exports = {
  getAllUser,
  register,
  login,
  loginfb,
  loginOath2
};
