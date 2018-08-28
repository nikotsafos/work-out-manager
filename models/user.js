'use strict';
var bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
          type: DataTypes.STRING,
          validate: {
            isEmail: {
              msg: 'Hey, give me a valid email address'
            }
          }
        },
    password: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [8, 16],
              msg: 'Your password should be between 8 and 16 characters long'
            }
          }
        },
    dob: DataTypes.DATE,
    weight: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    image: {
          type: DataTypes.STRING,
          validate: {
            isUrl: {
              msg: 'aww no pic?'
            }
          }
        },
    facebookId: DataTypes.STRING,
    facebookToken: DataTypes.STRING
  }, {
        hooks: {
          beforeCreate: function(pendingUser){
            if(pendingUser && pendingUser.password){
              var hash = bcrypt.hashSync(pendingUser.password, 10);
              pendingUser.password = hash;
            }
          }
        }
  });
  user.associate = function(models) {
    models.user.hasMany(models.workout)
  };

    user.prototype.isValidPassword = function(typedPassword){
      return bcrypt.compareSync(typedPassword, this.password);
    }

  return user;
};


// 'use strict';
// var bcrypt = require('bcrypt')
// module.exports = (sequelize, DataTypes) => {
//   var user = sequelize.define('user', {
//     firstname: DataTypes.STRING,
//     lastname: DataTypes.STRING,
//     email: {
//       type: DataTypes.STRING,
//       validate: {
//         isEmail: {
//           msg: 'Hey, give me a valid email address'
//         }
//       }
//     },
//     password: {
//       type: DataTypes.STRING,
//       validate: {
//         len: {
//           args: [8, 16],
//           msg: 'Your password should be between 8 and 16 characters long'
//         }
//       }
//     },
//     dob: DataTypes.DATE,
//     weight: DataTypes.INTEGER,
//     height: DataTypes.INTEGER,
//     facebookId: DataTypes.STRING,
//     facebookToken: DataTypes.STRING,
//     image: {
//       type: DataTypes.STRING,
//       validate: {
//         isUrl: {
//           msg: 'aww no pic?'
//         }
//       }
//     }
//   }, {
//     hooks: {
//       beforeCreate: function(pendingUser){
//         if(pendingUser && pendingUser.password){
//           var hash = bcrypt.hashSync(pendingUser.password, 10);
//           pendingUser.password = hash;
//         }
//       }
//     }
//   });
//   user.associate = function(models) {
//     // associations can be defined here
//   };
//
//   user.prototype.isValidPassword = function(typedPassword){
//     return bcrypt.compareSync(typedPassword, this.password);
//   }
//
//
//   return user;
// };
