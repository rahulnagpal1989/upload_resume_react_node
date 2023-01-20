const express = require('express');
const app = express();
const router = express.Router();
const {homePage, saveResume} = require('../controllers/controller');

router.post('/post', saveResume);
router.get('/', homePage);

module.exports = router;