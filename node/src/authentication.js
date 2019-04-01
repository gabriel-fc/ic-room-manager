const file = (require('../json-files/users.json'))

const comparePassword = (clientInput, user)=>{
    if((user.password).localeCompare(clientInput.password) == 0){
        return user;
    }
    return undefined

}

const compareLogin = (clientInput)=>{

 var obj = undefined
 var usersList = file.users;
    Object.values(usersList).forEach( user =>{
        console.log(user)
        if((user.login).localeCompare(clientInput.login) == 0){
            obj = comparePassword(clientInput, user)
        }
    })
    console.log(obj)
    return obj

}

module.exports = {
    compareLogin
}

