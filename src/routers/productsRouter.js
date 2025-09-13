import express from 'express'

import {
    createProduct,
    listarProductsPorID,
    atualizarProduct,
    deletarProduct
} from '../controllers/productCotroller.js'


const router = express.Router()

router.route('/')

.post(createProduct)
.get(listarProductsPorID)


router.route('/:id')

.get(listarProductsPorID)
.put(atualizarProduct)
.delete(deletarProduct)

export default router