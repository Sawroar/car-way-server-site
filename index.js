const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.send('Car Way server is running');
})
app.listen(port, () => console.log(`Car Way running on ${port}`))