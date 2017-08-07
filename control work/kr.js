function handler(i){
	var display = document.getElementById('display');
	if (display.innerHTML == this.innerHTML){
		alert("succes");
	}
	else{
		alert("fail");
	}
}

function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }


function generate(max){
	var display = document.getElementById('display');
	display.innerHTML = random(1, max);
}


function makeButton(i){

	return function(){
		var parentElem = document.getElementById('buttons');
		var button = document.createElement('a');
		button.setAttribute('href', '#');
		button.onclick=handler;
		button.className = "button " + i;
		button.innerHTML = i;
		parentElem.appendChild(button);
	}

}

for (var i=1; i<=5; i++){
	button=makeButton(i);
	button();
}

setInterval(function(){
	generate(5);
}, 2000);

