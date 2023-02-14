module.exports = function(sequelize, dataTypes) {
    const alias = 'Product';
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
        descriptionShort: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        descriptionLong: {
            type: dataTypes.STRING(500),
            allowNull: false,
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        offer: {
            type: dataTypes.TINYINT(1),
            allowNull: true,
        },
        discount: {
            type: dataTypes.FLOAT,
            allowNull: true,
        },
        stock: {
            type: dataTypes.TINYINT(1),
            allowNull: true,
        },
        subcategory_id: {
            type: dataTypes.TINYINT,
            allowNull: false,
        }
    }
    const config = {
        tableName: 'products',
        timestamps: true
    }

    const Product = sequelize.define(alias,cols,config);

    Product.associate = function (models) {
        Product.hasMany(models.Product_image, {
            as: 'products_images',
            foreignKey: 'product_id'
        })
        Product.belongsTo(models.Subcategory, {
            as: 'subcategories',
            foreignKey: 'subcategory_id'
        })
        Product.belongsToMany(models.Cart, {
            as: 'cart',
            through: 'cart_items',
            foreignKey: 'cart_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }

    return Product;
}