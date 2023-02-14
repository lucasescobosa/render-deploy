module.exports = function(sequelize, dataTypes) {
    const alias = 'Subcategory';
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
        },
        category_id: {
            type: dataTypes.TINYINT,
            allowNull: false,
        }
    }
    const config = {
        tableName: 'subcategories',
        timestamps: false
    }

    const Subcategory = sequelize.define(alias,cols,config);
    
    Subcategory.associate = function (models) {
        Subcategory.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'subcategory_id'
        })
        Subcategory.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'category_id'
        })
    }

    return Subcategory;
}