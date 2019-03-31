

var user = undefined

function postRequisition(obj, command){
	var url = 'http://localhost:7070' + command; 
	data=obj;
	$.ajax({
		type: 'POST',
		url: url,
		data: data,
		dataType: 'json',
		success: (data) =>  this.user = data,
		async: false
	 });
}


if((window.location.pathname).localeCompare('/home/gabriel/Documentos/Ic-room-manager/home-page.html') == 0){
	postRequisition({}, '/get-user')
	document.getElementById('userName').innerHTML = this.user.name;
	((document.getElementById('roomButton'))).innerHTML = (this.user.reserve.room == "") ? "Reservar sala" : "Entregar chaves";

}

if((window.location.pathname).localeCompare('/home/gabriel/Documentos/Ic-room-manager/index.html') == 0 && this.user != undefined){
	postRequisition({}, '/set-undf')
}
function onSubmit(){
	var data ={}
	data.login = (document.getElementById('login').value)
	data.password = document.getElementById('password').value
	postRequisition(data, '/authentication');
	(this.user	 == undefined) ? alert("Senha ou login incorretos!") : location.replace("file:///home/gabriel/Documentos/Ic-room-manager/home-page.html");
}

function onRegister(){
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
	else {postRequisition(data, '/register');
	if(user == undefined) document.getElementById('errorMsg').innerHTML = "Não foi possível cadastrar o usuário!";
	else {
		alert("Cadastro realizado com sucesso!");
		location.replace("file:///home/gabriel/Documentos/Ic-room-manager/index.html");
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



