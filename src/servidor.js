/* Esse código está criando um servidor básico com o uso do
 "framework Express".js para lidar com requisições HTTP.
*/
const porta = 3033 
const express = require('express')
const app = express()
const bancoDeDados = require('./bancoDeDados')
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/produtos', (req, res) =>{
    res.send(bancoDeDados.getProdutos())
})

app.get('/produtos/:id', (req, res) =>{
    res.send(bancoDeDados.getProduto(req.params.id))
})

app.post('/produtos', (req, res) => {
    const produto = bancoDeDados.salvarProduto({
        name: req.body.name,
        preco: req.body.preco
    })
    res.send(produto)
})

app.listen(porta, ()=>{
console.log(`servidor operando na porta ${porta}`)
})