 import { Prisma } from "../lib/prisma";

 export const createProduct = async (req,res) =>{
    try {
        const {nome,sku,quantity,minQuantity,description,price,categoryId} = req.body

        if (!nome || !sku || !price || !quantity||!categoryId){
            return res.status(400).json({ message :'Campos Obrigatorios faltando '})
        }

        const newProduct = await Prisma.product.create({
            data :{
                nome,
                sku,
                description,
                price,
                quantity,
                minQuantity,
                categoryId
            }
        })
        res.status(201).json(newProduct)
    }
    catch (error){
        res.status(500).json({message :'Erro Ao Criar Novo Produto', error : error.message})
    }
    
 }