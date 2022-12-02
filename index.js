const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wzcp5kk.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const carWay = client.db('carWay').collection('products')
        const bookingsCollection = client.db('carWay').collection('bookings')

        app.get('/options', async (req, res) => {
            const query = {}
            const products = await carWay.find(query).toArray()
            res.send(products)
        })


        app.get('/options/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const option = await carWay.findOne(query)
            res.send(option)
        })
        app.get('/bookings', async (req, res) => {

            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const bookings = await bookingsCollection.find(query).toArray()
            res.send(bookings)
        })
        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            console.log(booking);
            const result = await bookingsCollection.insertOne(booking)
            res.send(result)

        })
    }
    finally {

    }
}
run().catch(console.log)


app.get('/', async (req, res) => {
    res.send('Car Way server is running');
})
app.listen(port, () => console.log(`Car Way running on ${port}`))