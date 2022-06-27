const express = require('express')
const router = express.Router()

const pool = require('../config/connection')


router.get('/', (req, res) => {
	query = 'SELECT * FROM public."Act_sel"'
	const result = pool.query(query)
	result.then(result => {
		res.send(result.rows)
		})
})

router.get('/:id', (req, res) => {
	query = `SELECT * FROM public."Act_sel" WHERE ${req.params.id} = id`
	const result = pool.query(query)
	result.then(result => {
		res.send(result.rows)
		})
})

router.post('/', (req, res) => {
	query = `INSERT INTO public."Act_sel" (cvp_id, act_id, tries, success, level)
								VALUES ('${req.body.cvp_id}', '${req.body.act_id}', '${req.body.tries}', '${req.body.success}', '${req.body.level}')`
	const result = pool.query(query)
	res.send(result)
})

router.put('/:id', (req, res) => {
	query = `UPDATE public."Act_sel" SET (cvp_id, act_id, tries, success, level) =
			('${req.body.cvp_id}', '${req.body.act_id}', '${req.body.tries}', '${req.body.success}', '${req.body.level}')
			WHERE id = ${req.params.id}`

	const result = pool.query(query)
	res.send(result)
})

router.delete('/:id', (req, res) => {
	query = `DELETE FROM public."Act_sel" WHERE id = ${req.params.id}`
	const result = pool.query(query)
	res.send(result)
})

module.exports = router