/**
 * Created by wubo on 2017/6/1.
 */
'use strict';

var express = require('express');
var router = express.Router();

router.use("/local", require('./local'));

module.exports = router;