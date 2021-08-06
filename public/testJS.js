console.log('js running');

var msgPopup = document.getElementById("error-msg");
msgPopup.style.display = "none";

// --- Vars needed for success 
var moveDirection = 'start';
var machineID = 'iD8WS9W7PmRweY4YG1PZ';
var userID = 'charliekmcmahon';
// ---

const userAction = async () => {
  const rawResponse = await fetch('https://pain.netclaw.com.au/api', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({direction: moveDirection, machineID: machineID, userID: userID})
  });
  const content = await rawResponse.json();

	if (content.code == "Success"){
		// Do nothing! The request worked
		console.log('Server responded with OK.');
	}
	else if (content.code == "Unauthorised"){
		// Redirect the user or something
		alert('Unauthorised Access.');
	}
	else {
		// Something horrible has happened.
		alert('Something horrible has happened. Please contact the developer and bring some tissues.');
	}
}

// Get the directions / btn presses / vars for movement

function up(){
	moveDirection = 'up';
	userAction();
	setTimeout(function(){ stop(); }, 750);
}
function down(){
	moveDirection = 'down';
	userAction();
	setTimeout(function(){ stop(); }, 750);
}
function left(){
	moveDirection = 'left';
	userAction();
	setTimeout(function(){ stop(); }, 750);
}
function right(){
	moveDirection = 'right';
	userAction();
	setTimeout(function(){ stop(); }, 750);
}
function drop(){
	moveDirection = 'drop';
	userAction();
	setTimeout(function(){ stop(); }, 750);
}
function go(){
	moveDirection = 'go';
	userAction();
}
function start(){
	moveDirection = 'start';
	userAction();
}
function stop(){
	moveDirection = 'stop';
	userAction();
}

upBtn = document.getElementById('up-opad');
upBtn.addEventListener('click', up);
downBtn = document.getElementById('down-opad');
downBtn.addEventListener('click', down);
leftBtn = document.getElementById('left-opad');
leftBtn.addEventListener('click', left);
rightBtn = document.getElementById('right-opad');
rightBtn.addEventListener('click', right);
