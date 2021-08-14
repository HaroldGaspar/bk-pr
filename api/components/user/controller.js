const { nanoid } = require('nanoid');
const auth = require('../auth');

//CONTROLLER WORKS WITH THE DATAACCESS LAYER
//const store = require('../../../store/dummy')
const TABLA = 'user';

const exec = (injectedStored) => {
  let store = injectedStored;
  if (!store) store = require('../../../store/dummy');

  const list = () => store.list(TABLA);


  const get = (id) => store.get(TABLA, id);


  const upsert = async(payload = null) => {
    const user = { 
        name: payload.name,
        username: payload.username
    }; //insert defaultname
    user.id = payload.id ? payload.id : nanoid(); //wheter or not the id is

    //make auth entity to separate the auuthentication
    if(payload.password || payload.username){
        await auth.upsert({//ctrll data is passed as payload
            id: user.id ,//id refered from the user
            username: payload.username,
            password: payload.password
        })
    }

    return store.upsert(TABLA, user);
  }


  return { list, get, upsert };
  // si lo exportamos como objeto {list}
  // se retornara todo el exec()
};

module.exports = exec;
