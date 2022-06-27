
const express = require('express')
const app 	  = express()
const port    = 5000

app.use(express.json())


app.use('/api', require('./routes/'))

app.get('/', (req, res) => {
	res.send('asd')
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
