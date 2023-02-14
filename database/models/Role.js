module.exports = function(sequelize, dataTypes) {
    const alias = 'Role';
    const cols = {
        id: {
            type: dataTypes.TINYINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        }
    }
    const config = {
        tableName: 'roles',
        timestamps: false
    }

    const Role = sequelize.define(alias,cols,config);

    Role.associate = function (models) {
        Role.hasMany(models.User, {
            as: 'users',
            foreignKey: 'role_id'
        })
    }

    return Role;
}