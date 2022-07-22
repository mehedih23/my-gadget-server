const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 1111
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to My Gadget.')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@my-gadget.kbfta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log('database connected')

        const userCollection = client.db("my-gadget").collection("users");
        const itemCollection = client.db("my-gadget").collection("products");


        //-------------- All Post api --------------------//
        app.post('/registeruser', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        app.post('/additem', async (req, res) => {
            const item = req.body;
            const result = await itemCollection.insertOne(item);
            res.send(result);
        })

        //-------------- All Get api --------------------//

        // get user //
        app.get('/user', async (req, res) => {
            const email = req.query.email
            const query = { email: email };
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        app.get('/allitems', async (req, res) => {
            const result = await itemCollection.find().toArray();
            res.send(result);
        })


        //----------------- Patch ---------------//
        // User //
        app.patch('/userDetails/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            const filter = { _id: ObjectId(id) };
            const updatedDoc = { $set: user }
            const result = await userCollection.updateOne(filter, updatedDoc)
            res.send(result);
        })

    }
    finally {

    }
}

run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
