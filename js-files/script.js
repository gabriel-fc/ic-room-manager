var port = 2222
var user = undefined
var rooms = undefined

function postRequisition(obj, command){
	var url = `http://localhost:${port}` + command;
	var obj; 
	$.ajax({
		type: 'POST',
		url: url,
		data: obj,
		dataType: 'json',
		success: (data) =>  obj = data,
		async: false
	 });
	 return obj;
}


if((window.location.pathname).localeCompare('/home/gabriel/Documentos/ic-room-manager/home-page.html') == 0){
	this.user = postRequisition({}, '/get-user')
	document.getElementById('userName').innerHTML = this.user.name;
	((document.getElementById('roomButton'))).value = (this.user.room == "") ? "Reservar sala" : "Entregar chaves";

}

if((window.location.pathname).localeCompare('/home/gabriel/Documentos/ic-room-manager/index.html') == 0 && this.user != undefined){
	this.user = postRequisition({}, '/get-user');
}

function toTable(){
	location.replace("file:///home/gabriel/Documentos/ic-room-manager/room-table.html");
}


function onSubmit(){
	var data ={}
	data.login = (document.getElementById('login').value)
	data.password = document.getElementById('password').value
	this.user = postRequisition(data, '/authentication');
	(this.user	 == undefined) ? alert("Senha ou login incorretos!") : location.replace("file:///home/gabriel/Documentos/ic-room-manager/home-page.html");
}

function onRegister(){
	this.user = undefined;
	var data = {};
	data.login = (document.getElementById('login')).value;
	data.password = (document.getElementById('password')).value;
	data.name = (document.getElementById('name')).value;
	var radios =  (document.getElementsByName('category'));
	radios.forEach(radio=>{
		if(radio.checked){
			data.category = radio.value;
		}
	})
	if(isEmpty(data)) {
		document.getElementById('errorMsg').innerHTML = "Preencha todos os campos!"; 
		return null;
	}
	else {this.user = postRequisition(data, '/register');
	if(this.user == undefined) document.getElementById('errorMsg').innerHTML = "Não foi possível cadastrar o usuário!";
	else {
		alert("Cadastro realizado com sucesso!");
		location.replace("file:///home/gabriel/Documentos/ic-room-manager/index.html");
	}

}
}
function isEmpty(obj){
	var bool = false;
	if(obj.login == "" || obj.password == "" || obj.name == "" || obj.category == undefined){
		bool = true;
	}
	return bool;
}

if((window.location.pathname).localeCompare('/home/gabriel/Documentos/ic-room-manager/room-table.html') == 0 && this.user == undefined){
	this.user = postRequisition({}, '/get-user');
	this.rooms = postRequisition({}, '/rooms-info');
	roomArray = Object.entries(rooms);
	var table = document.getElementById("table");
	for(var i = 1; i < 10; i++){
		var obj = roomArray[i-1][1];
		var key = roomArray[i-1][0];
		var radioFather = table.rows[i].cells[4];
		if(obj.isAvailable && (((obj.to).localeCompare("all") == 0) || this.user.category.localeCompare("P") == 0 )){	
			createRadio(radioFather, i);
		}
		else{
			radioFather.innerHTML = '-';
		
		}
		table.rows[i].cells[1].innerHTML = (obj.isAvailable) ? 'Disponível' : 'Indisponível';
		if(!obj.isAvailable){
			table.rows[i].cells[2].innerHTML = `${obj.reserveTime} - ${obj.timeReserved}`;

		}
		table.rows[i].cells[3].innerHTML = `${obj.material}`;
	}
	createSelect();
}



function createRadio(father, value){
	var radio = document.createElement('input');
	radio.type = 'radio';
	radio.name = 'radioInput';
	radio.value = value;
	father.appendChild(radio);
}

function createSelect(){
	if(this.user.category.localeCompare("P") == 0){
		var father = document.getElementById("select");
		var option = document.createElement("option");
		option.value = "2.5";
		option.text = "2 horas e 30 minutos";
		father.appendChild(option);
		option = document.createElement("option");
		option.value = "3.0";
		option.text = "3 horas";
		father.appendChild(option);
		option = document.createElement("option");
		option.value = "3.5";
		option.text = "3 horas e 30 minutos";
		father.appendChild(option);
		option = document.createElement("option");
		option.value = "4.0";
		option.text = "4 horas";
		father.appendChild(option);
	}

}

function onAlocar(){
	var radio = document.getElementsByName('radioInput');
	var keyObj;
	for(var i = 0; i < radio.length; i++){
		if(radio[i].checked){
			keyObj = radio[i].value;
		}
	}

	var obj = {
		key:keyObj,
		time:document.getElementById("select").value,
		login:this.user.login
	}
	alert(Object.values(obj))
	postRequisition(obj, '/alloc');
	this.user = undefined;
}
