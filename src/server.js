import express from 'express'

import productRouter from './routers/productsRouter.js'

const app = express()
app.use(express.json())


app.use('/api/v1/products',productRouter)


const PORT = process.env.PORT || 3002

app.listen(PORT,() => {      
    console.log(`Servidor esta rodando na porta: ${[PORT]}`)
})