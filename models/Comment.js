const { Model, DataTypes } = require('sequelize')
const User = require('./User')
const Recipe = require('./Recipe')

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipe',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
)

module.exports = Comment