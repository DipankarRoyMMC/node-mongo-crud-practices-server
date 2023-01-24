const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('WOW Node Server Is Running!!')
})

// use middleware 
app.use(cors());
app.use(express.json());


//user:  dbUser3
//password:R3efqgUUht0tQqSc 

const uri = "mongodb+srv://dbUser3:R3efqgUUht0tQqSc@cluster0.tmkhisl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('nodeMongoCrud2').collection('users');
        // data display from server by get  method 
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        // data send to server by post method 
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);

            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        // get data from server to delete 
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await userCollection.findOne(query);
            res.send(user);
        })
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await userCollection.deleteOne(query);
            res.send(user);
            console.log(user);
        });


    }
    finally {

    }


}
run().catch(err => console.log(err));


app.listen(port, () => {
    console.log(`My server is  ${port}`);
});