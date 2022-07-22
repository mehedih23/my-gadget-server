const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 1111
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@my-gadget.kbfta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log('database connected')

    }
    finally {

    }
}

run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
