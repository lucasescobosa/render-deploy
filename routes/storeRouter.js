const express = require('express');
const multer = require('multer');
const path = require('path');
const storeController = require('../controllers/storeController')

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images/products');
    },
    filename: (req, file, cb) => {
      cb(null, 'img-' + Date.now() + file.originalname);
    },
  });

const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const upload = multer({ storage, fileFilter });

router.get('/', storeController.allStore)
router.get('/detail/:id', storeController.detail)

router.post('/create', upload.fields([{name: 'mainImage', maxCount: 1} , {name: 'images' , maxCount: 3}]), storeController.create)
router.put('/edit/:id', storeController.edit)

module.exports = router;