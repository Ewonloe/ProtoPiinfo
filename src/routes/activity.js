const express = require('express')
const router = express.Router()

const pool = require('../config/connection')

router.get('/', (req, res) => {
	query = 'SELECT * FROM public."Activities"'
	const result = pool.query(query)
	result.then(result => {
		res.send(result.rows)
		})
})

router.get('/:id', (req, res) => {
	query = `SELECT * FROM public."Activities" WHERE id = ${req.params.id}`
	const result = pool.query(query)
	result.then(result => {
		res.send(result.rows)
		})
})

router.post('/', (req, res) => {
	query = `INSERT INTO public."Activities" (name, skill)
								VALUES ('${req.body.name}', '${req.body.skill}')`
	const result = pool.query(query)
	res.send(result)
})

router.put('/:id', (req, res) => {
	query = `UPDATE public."Activities" SET (name, skill) =
			('${req.body.name}', '${req.body.skill}') 
			WHERE id = ${req.params.id}`

	const result = pool.query(query)
	res.send(result)
})

router.delete('/:id', (req, res) => {
	query = `DELETE FROM public."Activities" WHERE id = ${req.params.id}`
	const result = pool.query(query)
	res.send(result)
})

//---------------------------------------------------------------

//Custom services





module.exports = router