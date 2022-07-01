import { MongoClient } from 'mongodb'

export default async function connect() {

    const uri = process.env.DATABASE_URL
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }

    let client
    let clientPromise
    let db

    client = new MongoClient(uri, options)
    clientPromise = await client.connect()

    if (process.env.NODE_ENV === 'development') {
        // In development mode, use a global variable so that the value
        // is preserved across module reloads caused by HMR (Hot Module Replacement).
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options)
            global._mongoClientPromise = await client.connect()
        }
        clientPromise = global._mongoClientPromise
        db = client.db('CO2Blue')
    } else {
        // In production mode, it's best to not use a global variable.
        client = new MongoClient(uri, options)
        clientPromise = await client.connect()

        db = client.db('CO2Blue')
    }

    return { db, client }
}