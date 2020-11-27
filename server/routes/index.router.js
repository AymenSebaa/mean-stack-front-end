const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const employeeController = require('../controllers/employee.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/user/register', userController.register);
router.post('/user/authenticate', userController.authenticate);
router.get('/user/profile', jwtHelper.verifyJWT, userController.profile);

router.get('/employee/', employeeController.getAll);
router.post('/employee/', employeeController.create);
router.get('/employee/:id',  employeeController.get);
router.put('/employee/:id',  employeeController.update);
router.delete('/employee/:id',  employeeController.delete);

module.exports = router; 