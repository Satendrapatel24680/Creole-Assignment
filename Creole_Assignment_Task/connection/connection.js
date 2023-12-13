const mongoose = require('mongoose')
const conn = mongoose.createConnection('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true
  })

if(conn){
    console.log('connected')
}else{
    console.log('connection failed')
}

exports.mongoose = mongoose;
exports.conn = conn