const express = require('express')
const BioData = require('../models/BioData')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const upload=require('../middleware/upload')

//Route:1 Get BioData
router.post('/ViewBioData', [
    body('Email', 'Enter a valid email').isEmail(),
], async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //return BioData
    let bioData = await BioData.findOne({ id: req.body.Email})
    return res.json(bioData)
  })

//Route:2 Set BioData
router.post('/SetBioData', [
], async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //return BioData
    let bioData = await BioData.findOne({ id: req.body.id})
    bioData.id=req.body.id
    bioData.fName=req.body.fName
    bioData.mName=req.body.mName
    bioData.lName=req.body.lName
    bioData.gender=req.body.gender
    bioData.dateOfBirth=req.body.dateOfBirth
    bioData.address=req.body.address
    bioData.country= req.body.country
    bioData.state= req.body.state
    bioData.city=req.body.city
    bioData.zip=req.body.zip
    bioData.publicAck=req.body.publicAck
    bioData.saveAck=req.body.saveAck
    bioData.save(function (err) {
        if (err) {
          console.error('ERROR!')
          return res.json('Failer')
        }
      })
    return res.json('Success')
  })

  //Route:3 Set ProfilePhoto
  router.post('/AddPhoto', upload.single('file'), async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    let bioData = await BioData.findOne({ id: req.body.Email})
    console.log(bioData)
    bioData.image='/ProfilePics/'+req.file.filename
    bioData.save(function (err) {
        if (err) {
          console.error('ERROR!')
        }
      })
    return res.json('/ProfilePics/'+req.file.filename)
  })

  //Route:4 Get ProfilePhoto
  router.post('/GetPhoto',[
    body('Email', 'Enter a valid email').isEmail(),
  ], async (req, res) => {
    //return errors if found
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    let bioData = await BioData.findOne({ id: req.body.Email})
    return res.json(bioData.image)
  })







  module.exports = router