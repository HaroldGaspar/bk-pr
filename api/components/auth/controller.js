//CONTROLLER WORKS WITH THE DATAACCESS LAYER
const { nanoid } = require('nanoid')
const auth = require('../../../auth')
const bcrypt = require('bcrypt')
const TABLA = 'auth'

const exec =(injectedStored)=>{
    let store = injectedStored
    if(!store) store = require('../../../store/dummy') 

    async function login(username, password) {
        console.log('data from user ',username, password)
        const data = await store.query(TABLA,  username );//por q pasarlo como objeto? {username}? dummy 33 require trasnform
        //return data;
        const areEquals = await bcrypt.compare(password, data.password)
        if (areEquals){//data.password === password) {
            // Generar token;
            return auth.sign(data);
        } else {
            throw new Error('Informacion invalida');
        }
    }

    const upsert = async(payload) =>{
        const authData = {id: payload.id}//insert defaultname

        authData.username = payload.username ? 
            payload.username:null
            
        authData.password = payload.password ?  //payload.password:null
        await bcrypt.hash(payload.password, 5):null

        return store.upsert(TABLA, authData)
    }
    return {upsert, login}
}

module.exports = exec