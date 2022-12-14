// Export mongoose
require("dotenv").config()
const mongoose = require("mongoose");
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: process.env.PUSHERAPPID,
    key: process.env.PUSHERKEY,
    secret: process.env.PUSHERSECRET,
    cluster: process.env.PUSHERCLUSTER,
    useTLS: true
});

//Assign MongoDB connection string to Uri and declare options settings
// Important!!! set your real login and passwd in connection string
const uri = "mongodb+srv://"+process.env.MONGOUSER+":"+process.env.MONGOPASSWORD+"@"+process.env.CLUSTERNAME+"."+process.env.RANDOMMONGONAME+".mongodb.net/?retryWrites=true&w=majority";
// Declare a variable named option and assign optional settings
const options = {
useNewUrlParser: true,
useUnifiedTopology: true
};

mongoose.Promise = global.Promise;
// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(uri, options).then(() => {
console.log("Database connection established!");
console.log("Successfully connected to Atlas MongoDB.");
},
err => {
{
console.log("Error connecting Database instance due to:", err);
}
})
.catch(err=>{
console.log(err);
console.log('Could not connect to MongoDB.');
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {
    const taskCollection = db.collection('users');
    const changeStream = taskCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change)
        pusher.trigger('my-channel', 'my-event', {
            "message": "hello world"
        });
    });
});
