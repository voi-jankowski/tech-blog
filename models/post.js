const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcryptjs");

// Create a Post model
class Post extends Model {}

// Define table columns and configuration
Post.init(
  {
    // define id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // define title column
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define content column
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        // content must be at least 10 characters long
        len: [10],
      },
    },
    // define user_id column
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    // define created_at column
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // define updated_at column
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // add hooks to format date and time
    // hooks: {
    //   beforeCreate: async (newPostData) => {
    //     newPostData.title = await newPostData.title.toLowerCase();
    //     return newPostData;
    //   },
    //   beforeUpdate: async (updatedPostData) => {
    //     updatedPostData.title = await updatedPostData.title.toLowerCase();
    //     return updatedPostData;
    //   },
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
