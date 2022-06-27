const express = require('express')
const router = express.Router()

const pool = require('../config/connection')


router.get('/', (req, res) => {
	query = 'SELECT * FROM public."Users"'
	const result = pool.query(query)
	result.then(result => {
		res.send(result.rows)
		})
})

router.get('/:id', (req, res) => {
	query = `SELECT * FROM public."Users" WHERE ${req.params.id} = id`
	const result = pool.query(query)
	result.then(result => {
		res.send(result.rows)
		})
})

router.post('/', (req, res) => {
	query = `INSERT INTO public."Users" (fname, lname1, lname2, password)
								VALUES ('${req.body.fname}', '${req.body.lname1}', '${req.body.lname2}', '${req.body.password}')`
	const result = pool.query(query)
	res.send(result)
})

router.put('/:id', (req, res) => {
	query = `UPDATE public."Users" SET (fname, lname1, lname2, password) =
			('${req.body.fname}', '${req.body.lname1}', '${req.body.lname2}', '${req.body.password}') 
			WHERE id = ${req.params.id}`

	const result = pool.query(query)
	res.send(result)
})

router.delete('/:id', (req, res) => {
	query = `DELETE FROM public."Users" WHERE id = ${req.params.id}`
	const result = pool.query(query)
	res.send(result)
})

module.exports = router