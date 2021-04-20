const express = require('express')
const app = express()

const PORT = process.env.PORT || 4200

app.get('/', (req, res)=>{
    res.send({hi:'Larhendiel', user:{lala:[1,2,3,4,5], bobo:true}, ata:el=>{bobo}})
})

app.listen(PORT)