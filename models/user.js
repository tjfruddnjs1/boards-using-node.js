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
        validate : {
          isConfirm(value){
            if(value != this.passwordConfirmation){
              throw new Error('password confirmation does not matched!');
            }
          },
        },
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
        validate : {
          isConfirm(value){
            if(!value){
              throw new Error('password confirmation is required!');
            }
          }
        }
      },
      originalPassword : {
        type : Sequelize.VIRTUAL,
      },
      currentPassword : {
        type : Sequelize.VIRTUAL,
        validate : {
          isConfirm(value){
            if(value != this.password){
              throw new Error('Current Password is invalid!');
            }else if(!value){
              throw new Error('Current Password is required!');
            }
          }
        }
      },
      newPassword : {
          type : Sequelize.VIRTUAL,
          validate : {
            isConfirm(value){
              if(value != this.passwordConfirmation){
                throw new Error('Password Confirmation does not matched!');
              }
            }
          }
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