const router = require('express').Router();
const fs = require('fs');
var path = require('path');
const { v4: uuidv4 } = require('uuid');
let Profile = require('../models/Profile');
let User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
  })
let upload = multer({ dest: 'uploads/' })

router.route('/').get((req, res) => {
    Profile.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

formatCloudinaryUrl = (url, size, thumb) => {
    const splitUrl = url.split('upload/');
    splitUrl[0] += `upload/${
      size.y && size.z ? `x_${size.x},y_${size.y},` : ''
    }w_${size.width},h_${size.height}${thumb && ',c_thumb'}/`;
    const formattedUrl = splitUrl[0] + splitUrl[1];
    return formattedUrl;
};

router.route('/upload').post(upload.single('file'), async (req, res) => {
    const user = await User.findOne(req.body.user.email);
    console.log('user', user);
    const file = req.file;
    
    if (!file) {
        return res
            .status(400)
            .send({ error: 'Please provide the image to upload.' });
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        const response = await cloudinary.uploader.upload(req.file.path);
        const thumbnailUrl = formatCloudinaryUrl(
            response.secure_url,
            {
              width: 400,
              height: 400,
            },
            true
        );
        fs.unlinkSync(req.file.path);
        const profile = Profile.create({
            user: user,
            name: req.body.name,
            bio: req.body.bio,
            photo: response.secure_url,
        })    
        
        res.status(201).send({
            profile
        });
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;