
const express = require('express')
const cors    = require('cors')
const app 	  = express()
const port    = 5000

app.use(express.json())
app.use(cors())

app.use('/api', require('./routes/'))

app.get('/', (req, res) => {
	res.send('asd')
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
