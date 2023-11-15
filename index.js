const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// parsers 
app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@tour-guide.cgkp9xo.mongodb.net/?retryWrites=true&w=majority`;


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
      await client.connect();


      const serviceCollection = client.db('tour-guide').collection('services');
      const bookingCollection = client.db('tour-guide').collection('bookings');



      app.get('/api/v1/services', async (req, res) => {
        try {
          const cursor = serviceCollection.find();
          const result = await cursor.toArray();
          res.send(result);
        } catch (error) {
          console.error("Error fetching services:", error);
          res.status(500).send("Internal Server Error");
        }
      });

      // get data GET 
      // app.get('/api/v1/services', async (req, res) => {
      //   const cursor = serviceCollection.find();
      //   const result = await cursor.toArray();
      //   res.send(result);
      // });  

      // // POST method 
      // app.post('/api/v1/user/create-booking', async (req, res) =>{
      //   const booking =req.body;
      //   const result = await bookingCollection.insertOne(booking)
      //   res.send(result);
      // });

      app.post('/api/v1/user/create-booking', async (req, res) => {
        try {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        } catch (error) {
            console.error("Error creating booking:", error);
            res.status(500).send("Internal Server Error");
        }
    });
    






      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally{
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);






app.get('/',(req, res) =>{
    res.send("Helow World"); 
    
})

app.listen(port, () => {
    console.log(`Example app listeniing on port ${port}`);
})