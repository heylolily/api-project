const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8000
const cors = require('cors')
// this line ensures that all files in this folder are public for all servers to use and handle. aka all the stuff in there is viewable to all pcs
app.use(express.static('public'))



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lilycodes98:IPR5OZ8TpRw167I7@cluster0.llyb1rh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
        // .then(client => {
        //     const db = client.db('list-quotes')
        //     const quotesCollection = db.collection('quotes')
        //     // app.use()
        //     // app.get()
        //     app.post('/quotes', async (req,res) => {
        //         await quotesCollection
        //             .insertOne(req.body)
        //             .then(result => console.log(result))
        //             .catch(err => console.log(err))
        //     })
        //     // app.listen()
        // })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

// =====================================================================================

    // lets create a new collection to store all the stuff
    const db = client.db('quotes-list')
    const quotesCollection = db.collection('quotes')
    // // app.use()
    // // app.get()
    app.post('/quotes', (req,res) => {
        quotesCollection
            .insertOne(req.body)
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err))
    })
    app.listen()

// ==================================================================================

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run mongodb to connect to db
run().catch(console.dir);


MongoClient.connect(uri)
    .then(client => {
        const db = client.db('list-quotes')
        const quotesCollection = db.collection('quotes')
        app.post('/quotes', (req, res) => {
            quotesCollection
                .insertOne(req.body)
                .then(result => console.log(result))
                .catch(err => console.log(err))
        })
    })
app.use(cors())



// the urlencoded method within body-parser tells body-parser to extract data from the form element and add them to the body property in the request object
// this basically turns the form into an object, with the key being the name, and whatever was typed the input box to be the value (key : value pair)
app.use(bodyParser.urlencoded({ extended: true }))

// const obj = {
//     'lily': {
//         'class': 'mage',
//         'level': 25,
//     },
//     'kim': {
//         'class': 'mage',
//         'level': 25,
//     },
//     'austin': {
//         'class': 'adc',
//         'level': 23
//     }
// }

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// app.get('/api/:name', (req, res) => {
//     const user = req.params.name
//     res.json(obj[user])
// })

app.post('/quotes', (req,res) => {
    console.log('This is a quote')
    quotesCollection
        .insertOne(req.body)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
})

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})