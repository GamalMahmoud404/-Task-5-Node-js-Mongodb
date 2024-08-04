
const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient
const connectionUrl = "mongodb://127.0.0.1:27017"
const dbname = "mydb-2"

mongoClient.connect(connectionUrl, (error, myres) => {
    if (error) {
        console.log("Error in connection !!")
    }
    console.log("Connection is ok :)")
    const db = myres.db(dbname)

    // --------->> 1- insertOne 2 Documens

    db.collection("users").insertOne({
        name: "Gemy",
        age: 24
    }, (error, myData) => {
        if (error) {
            console.log("Can't insert data (insertOne)")
        }
        // console.log(myData.insertedId)
    })

    db.collection("users").insertOne({
        name: "Yossef",
        age: 40
    }, (error, myData) => {
        if (error) {
            console.log("Can't insert data (insertOne)")
        }
        // console.log(myData.insertedId)
    })

    // --------->> 2- insertMany 10 Documents , 5 of them age 27 years

    db.collection("users").insertMany([
        {
            name: "Ahmed",
            age: 40
        },
        {
            name: "Mohamed",
            age: 27
        },
        {
            name: "Sara",
            age: 27
        },
        {
            name: "Basem",
            age: 15
        },
        {
            name: "Ali",
            age: 27
        },
        {
            name: "Khaled",
            age: 30
        },
        {
            name: "Islam",
            age: 27
        },
        {
            name: "Akram",
            age: 27
        },
        {
            name: "Maha",
            age: 22
        },
        {
            name: "Ramy",
            age: 29
        },
    ], (error, myData) => {
        if (error) {
            console.log("Can't insert data (insertMany)")
        }
    })

    // --------->> 3- find match {} 27 years

    db.collection("users").find({age : 27}).toArray((error , myUsers) => {
        if(error){
            console.log("Can't find any thing or error has occurred !!")
        }
        console.log(myUsers)
    })

    // --------->> 4- find limit(3) 27 years

    db.collection("users").find({age : 27}).limit(3).toArray((error , myUsers) => {
        if(error){
            console.log("Can't find any thing or error has occurred !!")
        }
        console.log(myUsers)
    })

    // --------->> 5- $set name for first 4 Documens

    db.collection("users").find().limit(4).toArray()
        .then((docs) => {
            const bulkUpdate = docs.map((doc, index) => {
                const names = ["Osama", "Ahmed", "Rasha", "Anas"];
                return {
                    updateOne: {
                        filter: { _id: doc._id },
                        update: { $set: { name: names[index] } }
                    },
                };
            });
            return db.collection("users").bulkWrite(bulkUpdate);
        })
        .then((result) => console.log(result.modifiedCount))
        .catch((error) => console.log(error));


    // --------->> 6- $inc age for the first 4 => 4 years

    db.collection("users").find().limit(4).toArray()
    .then((docs) => {
        const bulkUpdate = docs.map((doc, index) => {
            return {
                updateOne: {
                    filter: { _id: doc._id },
                    update: { $inc: { age: 4 } }
                },
            };
        });
        return db.collection("users").bulkWrite(bulkUpdate);
    })
    .then((result) => console.log(result.modifiedCount))
    .catch((error) => console.log(error));


    // --------->> 5 & 6 Together

    db.collection("users").find().limit(4).toArray()
        .then((docs) => {
            const bulkUpdate = docs.map((doc, index) => {
                const names = ["Sameh", "Billy", "Sofia", "Maha"];
                return {
                    updateOne: {
                        filter: { _id: doc._id },
                        update: { $set: { name: names[index] }, $inc: { age: 4 } }
                    },
                };
            });
            return db.collection("users").bulkWrite(bulkUpdate);
        })
        .then((result) => console.log(result.modifiedCount))
        .catch((error) => console.log(error));


    // --------->> 7- updateone for 1  inc age 5

    db.collection("users").updateOne({ _id: mongodb.ObjectId("66af8ba6c8be36e826b3df2c") }, {
        $inc: { age: 5 }
    })
    .then((myData) => { console.log(myData.modifiedCount) })
    .catch((error) => { console.log(error) })


    // --------->> 8- updateMany  inc to all age 10

    db.collection("users").updateMany({}, {
        $inc: { age: 10 }
    })
    .then((myData) => { console.log(myData.modifiedCount) })
    .catch((error) => { console.log(error) })


    // --------->> 9-  deleteMany  age 41   ==>> deletedCount 

    db.collection("users").deleteMany({age : 41})
    .then((myData) => { console.log(myData.deletedCount) })
    .catch((error) => { console.log(error) })

})












