const express = require('express');
// const system = require('../app/controllers/system');
const router = express.Router();

const welcome = require('../app/controllers/welcome')

// middleware
const firstAuth = require("../app/middleware/firstAuth")

router.get('/', welcome.welcome)
// router.get("/system/device", firstAuth, system.deviceRegister)

module.exports = router;