module.exports = function(sequelize, dataTypes) {
    const alias = 'Product_image';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        main: {
            type: dataTypes.TINYINT(1),
            allowNull: false,
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    }
    const config = {
        tableName: 'products_images',
        timestamps: false
    }

    const Product_image = sequelize.define(alias,cols,config);
    
    Product_image.associate = function (models) {
        Product_image.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'product_id'
        })
    }

    return Product_image;
}