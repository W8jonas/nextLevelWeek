import express from 'express'

const app = express()

app.get('/users', ()=> {
    console.log('alo voce')
})

app.listen(3333)