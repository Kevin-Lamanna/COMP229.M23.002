let User = require('../models/user');
let passport = require('passport');
let jwt = require('jsonwebtoken');
let config = require('../config/config');


function getErrorMessage(err) {
    console.log("===> Erro: " + err);
    let message = '';
  
    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = 'Username already exists';
          break;
        default:
          message = 'Something went wrong';
      }
    } else {
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
    }
  
    return message;
  };

// helper function for guard purposes
module.exports.requireAuth = function(req, res, next)
{
  passport.authenticate('tokencheck', { session: false }, function(err, payload, info) {
    if (err) return res.status(401).json(
      {
        success: false,
        message: getErrorMessage(err)
      }
    ); 
    if (info) return res.status(401).json(
      {
        sucess: false,
        message: info.message
      }
    ); 
    req.payload = payload;
    next();
  })(req, res, next);
}

// Validates the owner of the item
exports.isAllowed = async function (req, res, next){

  try {
    let id = req.params.id
    let inventoryItem = await Inventory.findById(id).populate('owner');

    // If there is no item found
    if(inventoryItem == null){
      throw new Error('Item not found.') // Express will catch this on its own.
    }
    else
    {
      if(inventoryItem.owner._id != req.payload.id){
        let currentUser = await UserModel.findOne({_id: req.payload.id}, 'admin');
        if(currentUser.admin == false){
          console.log("====> Not authorized");
          return res.status(403).json(
            {
              success: false,
              message: getErrorMessage(err)
            }
          );
        }
      }
    }
  } catch (error) {
    
  }
}

// module.exports.renderSignin = function (req, res, next) {
//     if (!req.user) {
//         res.render('auth/signin', {
//             title: 'Sign-in Form',
//             messages: req.flash('error') || req.flash('info')
//         });
//     } else {
//         console.log(req.user);
//         return res.redirect('/');
//     }
// };


module.exports.signin = function (req, res, next) {
    passport.authenticate(
      'local', 
      // {
      // successRedirect: req.session.url || '/',
      // failureRedirect: '/users/signin',
      // failureFlash: true
      // }
      (err, user, info) => {
        try {
          if (err || !user) {
            return res.status(400).json(
              {
                success: false,
                message: err || info.message
              }
            );
          }

          req.login(user, {session: false}, (error)=>{
            // In case an error is thrown
            if (error) {
              return next(error);
            }

            // Issue the token
            const payload = { id: user._id, username: user.username };
            const token = jwt.sign(
                payload, 
                config.SECRETKEY, 
                {
                algorithm: 'HS512',
                expiresIn: "20min"
              }
            );

            // Send the token to the client
            return res.json(
              {
                success: true,
                token
              }
            );

          });
        } catch (error) {
          console.log(error);
          return next(error);
        }
      }
    )(req, res, next);

    // delete req.session.url;
  }

exports.myprofile = async function(req, res, next){
  try {
    let id = req.payload.id;
    let me = await User.findById(id).select('firstName lastName email username admin created');

    res.status(200).json(me);

  } catch (error) {
    console.log(error);
    return res.status(400).json(
      {
        success: false,
        message: getErrorMessage(error)
      }
    );
  }
}

// module.exports.renderSignup = function (req, res, next) {
//     if (!req.user) {

//         // creates a empty new user object.
//         let newUser = User();

//         res.render('auth/signup', {
//             title: 'Sign-up Form',
//             messages: req.flash('error'),
//             user: newUser
//         });

//     } else {
//         return res.redirect('/');
//     }
// };


module.exports.signup = async (req, res, next) => {
    console.log(req.body);
    // if (!req.user && req.body.password === req.body.password_confirm) {
  
      let user = new User(req.body);
  
      try {
        let result = await user.save();
        console.log(result);
        // req.login(user, (err) => {
        //   if (err) return next(err);
          
        //   return res.redirect('/');
        // });
        return res.json(
          {
            success: true,
            message: "User created successfully!"
          }
        );
      } catch (error) {
        let message = getErrorMessage(error);
  
        // req.flash('error', message);
        // // return res.redirect('/users/signup');
        // return res.render('auth/signup', {
        //   title: 'Sign-up Form',
        //   messages: req.flash('error'),
        //   user: user
        // });

        return res.status(400).json(
          {
            success: false,
            message: message
          }
        );
  
      }
  
    // } else {
    //   return res.redirect('/');
    // }
  };

  // module.exports.signout = function (req, res, next) {
    
  //   // Version 0.6.0
  //   req.logout(function (err) {
  //     if (err) {
  //       return next(err);
  //     }
  //     res.redirect('/');
  //   });
  // };

