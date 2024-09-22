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


// Retornar uma lista de todos os produtos disponíveis no BD.
app.get('/produtos', (req, res) =>{
    res.send(bancoDeDados.getProdutos())
})
// mostrar produtos específico por ID
app.get('/produtos/:id', (req, res) =>{
    res.send(bancoDeDados.getProduto(req.params.id))
})
// postar produto
app.post('/produtos', (req, res) => {
    const produto = bancoDeDados.salvarProduto({
        
        name: req.body.name,
        preco: req.body.preco
    })
    res.send(produto)
})
// modificar produto por ID
app.put('/produtos/:id', (req, res) => {
    const produto = bancoDeDados.salvarProduto({
        id: req.params.id,
        name: req.body.name,
        preco: req.body.preco
    })
    res.send(produto)
})
// deletar produto por ID
app.delete('/produtos/:id', (req, res) => {
    const produto = bancoDeDados.excluirProduto(req.params.id)
    if(produto){
        res.send({message: 'Produto deletado', produto})
    } else{
        res.send({message: 'produto não encontrado'})
    }
   
})

app.listen(porta, ()=>{
console.log(`servidor operando na porta ${porta}`)
})