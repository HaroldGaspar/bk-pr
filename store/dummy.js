const db = {
    'user': [
        { id: '1', name: 'Carlos' },
        { id: '2', name: 'Pedro' },
    ],
};

async function list(tabla) {
    return db[tabla];
}

async function get(tabla, id) {
    let col = await list(tabla);
    user = col.filter(item => item.id === id)[0] || null;
    console.log(user, id)
    return user
}

async function upsert(tabla, data) {
    //db[tabla] ? db[tabla] : []
    if (!data[tabla])
        db[tabla]=[]
    await db[tabla].push(data);
    console.log(db)
}

async function remove(tabla, id) {
    return true;
}

async function query(tabla, q){
    let col = await list(tabla);
    let key = Object.keys(q)[0]
    console.log( q,' ', key)
    user = col.filter(item => item[q] === q[q])[0] || null;
    return user
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
};