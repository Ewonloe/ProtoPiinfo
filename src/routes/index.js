const router = require('express').Router()

router.use('/users', require('./user.js'))
router.use('/activities', require('./activity.js'))
router.use('/cvp', require('./cvp.js'))
router.use('/act_sel', require('./act_sel.js'))


module.exports = router