var usersList = require("../json-files/users.json");
var fs = require('fs');
var roomFilePath = `${__dirname}/../json-files/rooms.json`
var roomFile = (require(roomFilePath))
var currentDate = new Date();

function getRoom(key){
    var roomList = roomFile;
    var obj;
    Object.values(roomList).forEach(room=>{
        
        if(room.key == key){
            obj = room;
        }
    });
    return obj;
}

function setRoom(key, obj){
    Object.values(roomFile).forEach(room=>{
        if(room.key == key){
            room = obj;
        }
    });
    return room;
}

var setAllocation = (obj)=>{
    console.log(obj);
    var room = getRoom(obj.key);
    room.reserveTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    var time = parseInt(parseFloat(obj.time) * 60);
    currentDate.setHours(currentDate.getHours() + parseInt(time/60));
    currentDate.setMinutes(currentDate.getMinutes() + parseInt(time%60))
    console.log(`${currentDate.getHours()} - ${currentDate.getMinutes()}`)
    room.timeReserved = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    room.isAvailable = false;
    fs.writeFile(roomFilePath, JSON.stringify(roomFile, null, 2), function (err) {
        if (err) return console.log(err);
        //console.log(JSON.stringify(roomFile));
       // console.log('writing to ' + roomFilePath);
    });
}

module.exports = {
    setAllocation
}

