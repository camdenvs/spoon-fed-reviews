const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Saved extends Model {}

Saved.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
                unique: false
            }
        },
        recipe_ids: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            references: {
                model: 'recipe',
                key: 'id',
                unique: false
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'saved',
    }
)

module.exports = Saved