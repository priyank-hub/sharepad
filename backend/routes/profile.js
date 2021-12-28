const router = require('express').Router();
const fs = require('fs');
var path = require('path');
const { v4: uuidv4 } = require('uuid');
let Profile = require('../models/Profile');
var multer = require('multer');

// var aws = require('aws-sdk')
var multerS3 = require('multer-s3')

//current
// var s3 = new aws.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     Bucket: process.env.BUCKET_NAME
//  })

//  var upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.BUCKET_NAME,
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             cb(null, file.originalname);
//         }
//     })
//  })

 const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, path.extname(file.originalname));
    }
})

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter });

// const s3 = new aws.S3({
//     accessKeyId:process.env.AWS_ACCESS_KEY,              // accessKeyId that is stored in .env file
//     secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY       // secretAccessKey is also store in .env file
// })
  
//previous
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
    // filename: (req, file, cb) => {
    //     cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    // }
// });
  
// var upload = multer({ storage: storage });

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

router.route('/upload').post(upload.single('photo'), (req, res) => {
    console.log('uploaded file', req.file)

    const params = {
        Bucket:process.env.BUCKET_NAME,      // bucket that we made earlier
        Key:req.file.originalname,               // Name of the image
        Body:req.file.buffer,                    // Body which will contain the image in buffer format
        ACL:"public-read",                 // defining the permissions to get the public link
        ContentType: req.file.mimetype,                 // Necessary to define the image content-type to view the photo in the browser with the link
    };

    s3.upload(params,(error,data)=>{
        // console.log('uploading to s3...');
        console.log('error', error);
        if(error){
            // console.log('params', params);
            // if we get any error while uploading error message will be returned.
            res.status(500).send({"err":error})  
        }
  
        // If not then below code will be executed
        
        console.log('data', data)                      // this will give the information about the object in which photo is stored 
    
        // saving the information in the database.   
        // const profile = new Profile({
        //     name: req.body.name,
        //     bio: req.body.bio,
        //     photo: data.Location
        // });
        
        // profile.save()
        //     .then(result => {
        //         res.status(200).send({
        //             name: result.name,
        //             bio: result.bio,
        //             photo: data.Location,
        //         })
        //     })
        //     .catch(err => {
        //         res.send({ message: err })
        //   })
    })

    // const name = req.body.name;
    // const bio = req.body.bio;
    // const photo = req.file.filename;

    // const newUserData = {
    //     name,
    //     bio,
    //     photo
    // }

    // const profile = new Profile(newUserData);

    // profile.save()
    //        .then(() => res.json('Profile Added'))
    //        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;