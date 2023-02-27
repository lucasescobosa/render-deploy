const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const db = require('../database/models');

const storeController = {

    allStore: async (req, res) => {

        try{
			const allStore = await db.Product.findAll({
				//Incluir la tabla imagenes y obtener la principal
				include: [{
							association: 'products_images',
							where: { main: 1 }
						},{
							association: 'subcategories'
						}],
				//Ordenar para que aparezcan primero las ofertas y al último los productos sin stock
				order: [
					['offer', 'DESC'],  
					['stock', 'DESC']
				]
			})
			if(!allStore) {
				res.status(404).json({error: 'No items'});
				return
			};
			res.json(allStore)

		} catch(e) {
      		res.status(500).json({ error: 'Could not connect to database'})
		}     
    },

	detail: async (req, res) => {

        try{
			const item = await db.Product.findByPk(req.params.id , {
				//Incluir la tabla imagenes y obtener la principal
				include: [{
							association: 'products_images'},{
							association: 'subcategories'
						}]
			})
			if(!item) {
				res.status(404).json({error: 'No item'});
				return
			};
			res.json(item)

		} catch(e) {
      		res.status(500).json({ error: 'Could not connect to database'})
		}     
    },

	create: async (req,res) => {
		try {
			const products_images = [{name : req.files.mainImage[0].filename, main : 1}]
			req.files.images.map((image)=>{products_images.push({name: image.filename, main: 0})})
			const product = await db.Product.create({
				name : req.body.name,
				descriptionShort : req.body.descriptionShort,
				descriptionLong : req.body.descriptionLong,
				price : parseInt(req.body.price),
				subcategory_id : req.body.subcategory,
				offer : parseInt(req.body.discount) !== 0 ? 1 : 0,
				discount : parseInt(req.body.discount) !== 0 ? parseInt(req.body.discount) : 0,
				stock : req.body.productStock != undefined ? 1 : 0,
				products_images : products_images
			},{
				include : {association : 'products_images'}
			});
			
			res.json('Successful')

		} catch(e) {
			res.status(500).json({ error: e })
		}
	},

	edit: async (req, res) => {
		try {
			console.log(req.body)
			const product = await db.Product.update({
				name : req.body.name,
				descriptionShort : req.body.descriptionShort,
				descriptionLong : req.body.descriptionLong,
				price : parseInt(req.body.price),
				subcategory_id : req.body.subcategory,
				offer : parseInt(req.body.discount) !== 0 ? 1 : 0,
				discount : parseInt(req.body.discount) !== 0 ? parseInt(req.body.discount) : 0,
				stock : (req.body.stock == 1 || req.body.stock[0] == 'on') ? 1 : 0,
			},{
				where: { id : req.params.id	}
			})
			res.json('Successful')

		} catch(e) {
			res.status(500).json({ error: e })
		}
	},

	delete: async (req, res) => {
		try {
			const images = await db.Product_image.destroy({
				where: { product_id : req.params.id	}
			})
			const product = await db.Product.destroy({
				where: { id : req.params.id	}
			})

			res.json('Successful')

		} catch(e) {
			res.status(500).json({ error: e })
		}
    },

}

module.exports = storeController;