const express = require('express')
const BioData = require('../models/BioData')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const upload = require('../middleware/upload')
const Post = require('../models/Post')
const postImageUploads = require('../middleware/postImageUploads')
const postVideoUplods = require('../middleware/postVideoUplods')

//Route:1 Get FeedsData
router.post('/GetFeeds', [], async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //return BioData
    let bioData = await Post.find()
    return res.json(bioData)
  })

  //Route:1 Get FeedsData
router.post('/GetUserFeeds', [], async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //return BioData
    let bioData = await Post.find({UploadsRelation: req.body.Email})
    return res.json(bioData)
  })

//Route:2 Set PostText
router.post('/CreatePostText', [
    body('id', 'Unauthorised').isEmail(),
    body('Type', 'Unauthorised').equals('0'),
    body('Title', 'No Title Found').exists(),
    body('TextContent', 'A Text Post must Have Valid Text in post Content with atleast 1 characters').isLength({min:5}),
    body('publicAck', 'All acknowledgements must be checked True').isBoolean(boolean = false),
    body('saveAck', 'All acknowledgements must be checked True').isBoolean(boolean = false),
], async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //return BioData
    Post.create({
        UploadsRelation: req.body.id,
        Type: req.body.Type,
        Title: req.body.Title,
        TextContent: req.body.TextContent,
        Activity: req.body.Activity,
        publicAck: req.body.publicAck,
        saveAck: req.body.saveAck,
    })
    return res.json('Success')
})

//Route:3 Set BioData
// let validator = function(req,res,next){
//     req.checkBody('id').notEmpty().withMessage('Unauthorised').isEmail().withMessage('Unauthorised');
//     req.checkBody('Type').equals('1').withMessage('Unauthorised');
//     req.checkBody('Title').notEmpty().withMessage('No Title Found');
//     req.checkBody('publicAck').isBoolean(boolean = false).withMessage('All acknowledgements must be checked True');
//     req.checkBody('saveAck').isBoolean(boolean = false).withMessage('All acknowledgements must be checked True');
//     req.asyncValidationErrors().then(function() {
//         next();
//     }).catch(function(errors) {
//         req.flash('errors',errors);
//         res.status(500).redirect('back');
//     });

// }
router.post('/CreatePostImage',postImageUploads.single('FileImage'), async (req, res) => {
    //return errors if found
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() })
    // }
    Post.create({
        UploadsRelation: req.body.UploadsRelation,
        Type: req.body.Type,
        Title: req.body.Title,
        TextContent: req.body.TextContent,
        FileContent:'/ImageContent/' + req.file.filename,
        Activity: req.body.Activity,
        publicAck: req.body.publicAck,
        saveAck: req.body.saveAck,
    })
    return res.json('Success')
})

router.post('/CreatePostVideo',postVideoUplods.single('FileVideo'), async (req, res) => {
    //return errors if found
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() })
    // }
    Post.create({
        UploadsRelation: req.body.UploadsRelation,
        Type: req.body.Type,
        Title: req.body.Title,
        TextContent: req.body.TextContent,
        FileContent:'/VideoContent/' + req.file.filename,
        Activity: req.body.Activity,
        publicAck: req.body.publicAck,
        saveAck: req.body.saveAck,
    })
    return res.json('Success')
})

router.post('/CreateNurseryListing',postVideoUplods.single('FileImage'), async (req, res) => {
    //return errors if found
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() })
    // }
    let Fields=[]
    req.body.FieldName?.map((function (fieldname) {
        Fields.push({'FieldName':fieldname,'FieldValue':req.body.FieldValue[req.body.FieldName.indexOf(fieldname)]})
    }))
    console.log(Fields)
    Post.create({
        UploadsRelation: req.body.UploadsRelation,
        Type: req.body.Type,
        Title: req.body.Title,
        TextContent: req.body.TextContent,
        FileContent:'/VideoContent/' + req.file.filename,
        Fields: Fields,
        Activity: req.body.Activity,
        publicAck: req.body.publicAck,
        saveAck: req.body.saveAck,
    })
    return res.json('Success')
})

//Route:3 Set ProfilePhoto
//   router.post('/AddPhoto', upload.single('file'), async (req, res) => {
//     //return errors if found
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }
//     let bioData = await BioData.findOne({ id: req.body.Email})
//     console.log(bioData)
//     bioData.image='/ProfilePics/'+req.file.filename
//     bioData.save(function (err) {
//         if (err) {
//           console.error('ERROR!')
//         }
//       })
//     return res.json('/ProfilePics/'+req.file.filename)
//   })

//Route:4 Get ProfilePhoto
//   router.post('/GetPhoto',[
//     body('Email', 'Enter a valid email').isEmail(),
//   ], async (req, res) => {
//     //return errors if found
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }
//     let bioData = await BioData.findOne({ id: req.body.Email})
//     return res.json(bioData.image)
//   })







module.exports = router