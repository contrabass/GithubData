const axios = require ('axios');

let test=null;

axios.get('http://localhost:4568/temp')
.then(test2 => test=test2)
.then(console.log(test))
