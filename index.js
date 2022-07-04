// npm init -y
// npm install express
// npm install nodemon -D
// npm run dev
// npm install prisma -D
// npm install @prisma/client
// npx prisma init
// npx prisma migrate dev
// npx prisma generate

// INSTÂNCIA DO EXPRESS
const express = require('express');
const app = express();

// CONFIGURAÇÃO DO PRISMA
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// CONFIGURAÇÃO PARA ACEITAR JSON
app.use(express.json())

// ROTA GET -> PUXAR DADOS
app.get("/", (req, res) => {
    return res.send("Hello World")
})

// ROTA POST -> RECEBER DADOS
app.post("/formulario", async (req, res) => {
    const { nome, email, senha } = req.body

    await prisma.usuario.create({
        data: {
            nome,
            email,
            senha
        }
    })

    return res.status(201).send("Usuário criado com sucesso");
})

// LISTAGEM DE USUÁRIOS
app.get("/usuarios", async(req, res) => {
    const usuarios = await prisma.usuario.findMany()

    return res.status(200).send(usuarios)
})

// INICIAR O SERVIDOR
app.listen(3030, ()=> {
    console.log("Servidor Rodando");
});
