const { Model, DataTypes, Sequelize } = require('sequelize');
//Table name
const USER_TABLE = 'users';
//Schema to define the structure of the table
//Fields, data-types etc.
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    defaultValue: 'customer',
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    //The field name, to follow good practices at DB naming
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate() {
    //associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
