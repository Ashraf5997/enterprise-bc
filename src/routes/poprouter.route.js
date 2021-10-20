const express = require('express');
const router  = express.Router(); 
const auth    =     require('../middlewares/auth');
const usersController           = require('../controllers/users.controller');
//const extractTokenController    = require('../controllers/extractToken.controller');
const queryController           = require('../controllers/query.controller');
const profileController         = require('../controllers/profile.controller');
const bankdetailController      = require('../controllers/bankdetail.controller');
const addressdetailController   = require('../controllers/address.controller');
const accountController         = require('../controllers/account.controller');
const pinrequestController      = require('../controllers/pinrequest.controller');
const withdrawalController      = require('../controllers/withdrawal.controller');
// ACTION URL 
router.post('/login',           usersController.loginUser);
router.post('/customerlogin',   usersController.customerLogin);
router.post('/logout',          usersController.logoutUser);
router.post('/register',        usersController.customerRegistration);
router.get('/otpForReg/:number',usersController.getOtp)
// ADMIN USER URL
router.post('/user',            usersController.createAdminUser);
router.get('/get/user/admin' ,  usersController.getAllAdminUser)
router.post('/delete/user/admin',usersController.deleteAdminUser)
router.put('/update/user/admin' ,usersController.updateAdminUser)
router.get('/get/registered/users',usersController.getAllRegisteredUsers)
// PASSWORD
router.post('/forgotPassword',  usersController.forgotPassword);
router.post('/resetPassword',   usersController.resetPassword);
router.post('/query',            queryController.createQuery)
router.get('/query/get/all',     queryController.getQuery)
router.delete('/query/delete/:id',queryController.deleteQuery)
// PROFILE CREATE
router.post('/profile/create',           profileController.createProfile)
router.put('/profile/update',            profileController.updateProfile)
router.get('/profile/get/:userId' ,      profileController.getProfile)
// BANKDETAIL CREATE
router.post('/bankDetail/create',        bankdetailController.createBankDetail)
router.put('/bankDetail/update',         bankdetailController.updateBankDetail)
router.get('/bankDetail/get/:userId',    bankdetailController.getBankDetail)
// ADDRESSDETAIL CREATE
router.post('/addressDetail/create',      addressdetailController.createAddressDetail)
router.put('/addressDetail/update',       addressdetailController.updateAddressDetail)
router.get('/addressDetail/get/:userId',  addressdetailController.getAddressDetail)
// ACCOUNT
router.post('/account/create',          accountController.createAccount )
router.get('/account/get/:userId',      accountController.getAccount )
router.get('/account/get/all/request/active',       accountController.getAllAccountRequest )
router.post('/account/active/deactive',           accountController.deactActAccountRequest)
router.get('/account/search/accountId/:accountId',  accountController.searchAccountId)
router.get('/account/active/users',     accountController.getAllActiveUsers)
router.post('/account/update/TDate',    accountController.updateTDate )
router.post('/account/update/SLITDate', accountController.updateSLITDate )
router.post('/account/update/RI',       accountController.updateRI )
router.put('/account/update/RD/:RD',       accountController.updateRD )
router.get('/account/down/link/members/:accountId',accountController.getDownLinkMembers )
// PIN REQUEST
router.post('/pin-request/create' , pinrequestController.createPinRequest )
router.get('/pin-request/get/all/:usercontact' , pinrequestController.getAllPinRequest )
router.get('/pin-request/getAll' , pinrequestController.getAll )
router.post('/pin-request/active' , pinrequestController.actPinReq )
router.delete('/pin-request/delete/:id' , pinrequestController.delPinReq )
router.get('/pin-request/act/get/all/:userId' , pinrequestController.getAllActPinRequest )
// WITHDRAWAL
router.post('/withdrawal-request/create' , withdrawalController.createWithdrawal)
router.get('/withdrawal-history/get/:userId' , withdrawalController.getWithdrawalHistory)
router.get('/withdrawal-request/getAll' , withdrawalController.getWithdrawalAllRequest)
router.post('/withdrawal-request/pay' , withdrawalController.payWithdrawal)
module.exports = router;