const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      username: {
        type: Sequelize.STRING(20),
        primaryKey : true,
      },
      password : {
        type: Sequelize.STRING(20),
        allowNull : false,
        // validate : {
        //     notNull : {
        //         msg: 'A password id required'
        //     },
        //     notEmpty: {
        //         ms: 'Please privides a password'
        //     },
        //     len:{
        //         args: [8, 20],
        //         msg: 'The password should be between 8 and 20 chracters'
        //     },

        // }
      }, 
      name : {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      email : {
        type : Sequelize.STRING(50),
        allowNull : true,
      },
      passwordConfirmation : {
          type : Sequelize.VIRTUAL,
          get : function(val)
          validate : {
              
          },
      },
      originalPassword : {
        type : Sequelize.VIRTUAL,

        validate : {
            
        },
    },
    currentPassword : {
        type : Sequelize.VIRTUAL,

        validate : {
            
        },
    },
    newPassword : {
        type : Sequelize.VIRTUAL,

        validate : {
            
        },
    },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};