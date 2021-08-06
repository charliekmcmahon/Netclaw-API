const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const got = require('got');
const Bottleneck = require("bottleneck");
var admin = require('firebase-admin');
var firebase = require('firebase');

console.log('🚀  Server is up!');

// Initialise firebase
console.log('Initialising 🔥 ⚾');
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

console.log('🔥 ⚾ Successfully Initialised')

function makeRequest(fullNodeURL, command){
	// Make the web reqest to the node
	got.get(`${fullNodeURL}/${command}`, {responseType: 'text'})
  .then(res => {
		console.log(`Request Sent! Response from server:`);
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });
}

function moveClaw(nodeURL, direction){
	// On a joystick / keyb button press, move the claw
	const limiter = new Bottleneck({
		minTime: 200,
		reservoir: 5,
		strategy: Bottleneck.strategy.OVERFLOW // When the function is spammed for whatever reason, only 5 requests are executed per 200ms.
	}); // Limit requests to once every 200ms
	limiter.schedule(() => makeRequest(nodeURL, direction))
	.then((result) => {
	});
	
}
app.use(cors());
app.set('view-engine', 'ejs')
app.use( express.static( "public" ) );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Root directory
app.get('/', (req, res) => {
	res.render('index.ejs', { name: 'Charlie'})
})

app.get('/dashboard', (req, res) => {
	res.render('dashboard.ejs', { name: 'Charlie'})
})

app.get('/playingTest', (req, res) => {
	// Start the machine
	//moveClaw('start');
	//moveClaw('go');
	res.render('playTest.ejs', { name: 'Charlie'});
})

// API calls 
app.post('/api', function (req, res) {
	console.log('API Accessed')

	async function apiAsync() {
		reqMove = req.body.direction;
		reqMachineID = req.body.machineID;
		reqUsername = req.body.userID;
		reqTime = new Date().toLocaleTimeString();

		console.log("data received => ", reqMove, reqMachineID, reqUsername, ` @ ${reqTime}`);

		const usersRef = db.collection('users');

		var userSnapshot = await usersRef.where('username', '==', reqUsername).get();
		userSnapshot.forEach(doc => {
			userID = doc.id; // get ID of user
		});

		const machinesRef = db.collection('machines');

		const machine = machinesRef.doc(reqMachineID);
		const doc = await machine.get();
		if (!doc.exists) {
			console.log('Error - FATAL – machine does not exist');
			res.json({code: "Error"});
		} else {
			currentlyPlayingDB = doc.data().currentlyPlaying;
			machineNodeURL = doc.data().nodeURL;
		}

		if (reqUsername == currentlyPlayingDB) {
			// Send the request to the machine!
			moveClaw(machineNodeURL, reqMove);
			res.json({code: "Success"});
		}
		else if (reqUsername != currentlyPlayingDB) {
			res.json({code: "Unauthorised"});
		}
		else {
			res.json({code: "Error"});
		}	

		

	}

	apiAsync();

	
	
	// ->> if req is 
});

app.post('/apiCheck', function (req, res) {
	console.log('API Checked! sending back 400.');
	res.status(400);
});

app.listen(80);