const express = require('express')
const router = express.Router()
const Code = require('./code')


// Getting all
router.get('/', async (req, res) => {
    try {
      const code = await Code.find()
      res.json(code)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  // Getting One
  router.get('/:id', getCode, (req, res) => {
    res.json(res.code)
  })

  // Getting by code
  router.get('/:code', getCodebycode, (req, res) => {
    res.json(res.code)
  })
  
  // Creating one
  router.post('/', async (req, res) => {
    const code = new Code({
      code: req.body.code
    })
    try {
      const newCode = await code.save()
      res.status(201).json(newCode)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
  // Updating One
  router.patch('/:id', getCode, async (req, res) => {
    if (req.body.code != null) {
      res.code.code = req.body.code
    }
    try {
      const updatedCode = await res.code.save()
      res.json(updatedCode)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
  // Deleting One
  router.delete('/:id', getCode, async (req, res) => {
    try {
      await res.code.remove()
      res.json({ message: 'Deleted Code' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  async function getCode(req, res, next) {
    let code
    try {
      code = await Code.findById(req.params.id)
      if (code == null) {
        return res.status(404).json({ message: 'Cannot find code' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.code = code
    next()
  }

  


  async function getCodebycode(req, res, next) {
    let code
    try {
      code = await Code.findById(req.params.id)
      if (code == null) {
        return res.status(404).json({ message: 'Cannot find code' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.code = code
    next()
  }


  module.exports = router