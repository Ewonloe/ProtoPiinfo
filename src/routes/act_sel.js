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
								VALUES ('${req.body.cvp_id}', '${req.body.act_id}', '0', '0', '${req.body.level}')`
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

//---------------------------------------------------------------

//Custom services

// Input: cvp_id and act_id
// Output: Identify the only match and delete

router.delete('/sp/delete', (req, res) => {
		query = `DELETE FROM public."Act_sel" WHERE cvp_id = '${req.query.cvp_id}' AND act_id = '${req.query.act_id}'`
		const result = pool.query(query)
		res.send(result)
})

module.exports = router