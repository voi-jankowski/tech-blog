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
        len: [3],
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
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
