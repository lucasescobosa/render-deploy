module.exports = function(sequelize, dataTypes) {
    const alias = 'User';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        fullName: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },
        phoneNumber: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        address: {
            type: dataTypes.STRING(200),
            allowNull: true,
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        role_id: {
            type: dataTypes.TINYINT,
            allowNull: false,
        },
    }
    const config = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define(alias,cols,config);

    User.associate = function (models) {
        User.belongsTo(models.Role, {
            as: 'roles',
            foreignKey: 'role_id'
        })
        User.hasMany(models.Cart, {
            as: 'cart',
            foreignKey: 'user_id'
        })
    }

    return User;
}