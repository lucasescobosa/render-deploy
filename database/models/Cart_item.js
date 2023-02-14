module.exports = function(sequelize, dataTypes) {
    const alias = 'Cart_item';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        cart_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: dataTypes.TINYINT,
            allowNull: false,
        }
    }
    const config = {
        tableName: 'cart_items',
        timestamps: false
    }

    const Cart_item = sequelize.define(alias,cols,config);

    return Cart_item;
}