console.log('working');
function move(direction) {

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/requestsAPI', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({
			value: direction
	}));

}

document.body.onkeyup = function(e) {
  switch(e.which) {
    case 37: move('left'); break;
    case 39: move('right'); break;
    case 38: move('up'); break;
    case 40: move('down'); break;
  }
};

var fired = false;
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

document.onkeydown = function(event) {
    if(!fired) {
        fired = true;
          if (event.keyCode == 38){
            move('up');
          }
          else if (event.keyCode == 40){
            move('down');
          }
          else if (event.keyCode == 37){
						move('left');
          }
          else if (event.keyCode == 39){
            move('right');
          }
          else if (event.keyCode == 32){
            move('drop');
          }
    }
};

document.onkeyup = function(event) {
    fired = false;
		move('stop');
};

