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

    var access_code = '';
    var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for ( var i = 0; i < 6; i++ ) {
      	access_code += characters.charAt(Math.floor(Math.random() * 
 		characters.length));
   	}

	query = `INSERT INTO public."CVP" (user_id, p_fname, p_lname1, p_lname2, access_code)
								VALUES ('${req.body.user_id}', '${req.body.p_fname}', '${req.body.p_lname1}', '${req.body.p_lname2}', '${access_code}')`
	const result = pool.query(query)
	res.send(result)
})

router.put('/:id', (req, res) => {
	query = `UPDATE public."CVP" SET (user_id, p_fname, p_lname1, p_lname2, access_code, status) =
			('${req.body.user_id}', '${req.body.p_fname}', '${req.body.p_lname1}', '${req.body.p_lname2}', '${req.body.access_code}', ${req.body.status})
			WHERE id = ${req.params.id}`

	const result = pool.query(query)
	res.send(result)
})

router.delete('/:id', (req, res) => {
	query = `DELETE FROM public."CVP" WHERE id = ${req.params.id}`
	const result = pool.query(query)
	res.send(result)
})

//---------------------------------------------------------------

//Custom services


// Input: CVP
// Output: Skills and levels asociated with such CVP
// Approach: Get all act_sels. Then join with the 'activities' table. Group by skill and return skills and levels.
router.get('/:id/skills', (req, res) => {
	query = `WITH cte1 AS (SELECT * FROM public."Activities"),
	              cte2 AS (SELECT * FROM cte1 JOIN public."Act_sel" ON cte1.id = public."Act_sel".act_id)

			 SELECT skill, MAX(level) FROM cte2 WHERE cvp_id = ${req.params.id} GROUP BY skill`

	const result = pool.query(query)
	result.then(result => {
		//results.rows
		res.send(result.rows)
	})
})


// Input: CVP, Skill, Level
// Output: Add 1st game of the Skill in the input level and assign to CVP.
router.post('/:id/addSkill', (req, res) => {
	query = `SELECT min(id) FROM public."Activities"  WHERE skill = '${req.body.skill}'`	

	const result = pool.query(query)
	result.then(result => {
		query2 = `INSERT INTO public."Act_sel" (cvp_id, act_id, tries, success, level)
								VALUES ('${req.params.id}', '${result.rows[0].min}', '0', '0', '${req.body.level}')`

		const result2 = pool.query(query2);
		res.send(result2.rows)
	})

})

// Input : CVP, Skill
// Output: All activities of that skill, indicating ID, name, and if exists an act_sel that links it to the CVP received as input.

router.get('/:id/getActs', (req, res) => {
	query = `SELECT public."Activities".id, public."Activities".name, public."Act_sel".tries
			FROM public."Activities" LEFT OUTER JOIN public."Act_sel" ON public."Activities".id = public."Act_sel".act_id
			WHERE public."Activities".skill = '${req.body.skill}'`

	result = pool.query(query)
	result.then(result => {

		for (i=0; i < result.rows.length; i++)
		{
			if (result.rows[i].tries == null)
				result.rows[i].selected = false

			else
				result.rows[i].selected = true
		}

		res.send(result.rows)
	})
})



module.exports = router