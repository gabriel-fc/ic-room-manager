var fs = require('fs');
var filePath = `${__dirname}/../json-files/users.json`
var file = (require(filePath))



const createUser = (obj)=>{
    if(isValid(obj) && !isDoubled(obj)){
        console.log('haha');
        file.currentId++;
        obj.room = "";
        var aux =file.users; 
        file.users = Object.assign(aux, {[file.currentId]:obj}) 
        console.log(obj);
        fs.writeFile(filePath, JSON.stringify(file, null, 2), function (err) {
            if (err) return console.log(err);
            //console.log(JSON.stringify(file));
            //console.log('writing to ' + filePath);
        });
     return obj;
    }
    return undefined;
}

const isValid = (obj)=>{
    return ((obj.login).includes("@ic.ufal.br", 3)) 
}

const isDoubled = (obj)=>{
    var bool = false;
    ((Object.values(file.users)).forEach(user=>{
        if(((user.login).localeCompare(obj.login)) == 0){ 
            bool = true;
        }
    }))
    return bool;
}

module.exports ={
    createUser
}

