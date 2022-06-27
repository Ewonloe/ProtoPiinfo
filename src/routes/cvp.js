const express = require('express')
const router = express.Router()

const pool = require('../config/connection')


router.get('/', (req, res) => {
	query = 'SELECT * FROM public."CVP"'
	const result = pool.query(query)
	result.then(result => {
		res.send(result.rows)
		})
})

router.get('/:id', (req, res) => {
	query = `SELECT * FROM public."CVP" WHERE ${req.params.id} = id`
	const result = pool.query(query)
	result.then(result => {
		res.send(result.rows)
		})
})

router.post('/', (req, res) => {
	query = `INSERT INTO public."CVP" (user_id, p_fname, p_lname1, p_lname2, access_code, status)
								VALUES ('${req.body.user_id}', '${req.body.p_fname}', '${req.body.p_lname1}', '${req.body.p_lname2}', '${req.body.access_code}', '${req.body.status}')`
	const result = pool.query(query)
	res.send(result)
})

router.put('/:id', (req, res) => {
	query = `UPDATE public."CVP" SET (user_id, p_fname, p_lname1, p_lname2, access_code, status) =
			('${req.body.user_id}', '${req.body.p_fname}', '${req.body.p_lname1}', '${req.body.p_lname2}', '${req.body.access_code}', '${req.body.status}')
			WHERE id = ${req.params.id}`

	const result = pool.query(query)
	res.send(result)
})

router.delete('/:id', (req, res) => {
	query = `DELETE FROM public."CVP" WHERE id = ${req.params.id}`
	const result = pool.query(query)
	res.send(result)
})

module.exports = router