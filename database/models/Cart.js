module.exports = function(sequelize, dataTypes) {
    const alias = 'Cart';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        quantity: {
            type: dataTypes.TINYINT,
            allowNull: false,
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        address: {
            type: dataTypes.STRING(200),
            allowNull: true,
        },
        status_id: {
            type: dataTypes.TINYINT,
            allowNull: false,
        }
    }
    const config = {
        tableName: 'cart',
        timestamps: false
    }

    const Cart = sequelize.define(alias,cols,config);

    Cart.associate = function (models) {
        Cart.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_id'
        })
        Cart.belongsTo(models.Cart_status, {
            as: 'cart_status',
            foreignKey: 'status_id'
        })
        Cart.belongsToMany(models.Product, {
            as: 'products',
            through: 'cart_items',
            foreignKey: 'product_id',
            otherKey: 'cart_id',
            timestamps: false
        })
    }

    return Cart;
}