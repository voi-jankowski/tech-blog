const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcryptjs");

// Create a User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Define table columns and configuration
User.init(
  {
    // define id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // define username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // define email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // make sure email is in valid format
        isEmail: true,
      },
    },
    // define password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // password must be at least 8 characters long
        len: [8],
      },
    },
  },
  {
    // add hooks to hash password before creating and updating new user
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(
          newUserData.password,
          await bcrypt.genSalt(10)
        );
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          await bcrypt.genSalt(10)
        );
        return updatedUserData;
      },
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
