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

 export const listarProductsPorID = async (req,res) => {
    try{
        const {id} = req.params
        const product =  await Prisma.product.findUnique({
            where:{id},
            include : {
                categoryId: true
            }
        })
        if (!product){
            return res.status(404).json({message : 'Produto Nao Encontrado  '})
        }
        res.status(200).json(product)
    } catch (error){
        res.status(500).json({message: 'error ao buscar produto', error : error.message})
    }
 } 

 export const atualizarProduct = async  (req,res) => {
    try {
        const {id} = req.params
        const dataoUpdate = req.body

        const atualizarProduct =  await Prisma.product.update({
                where : {id},
                data: dataoUpdate
        })
        res.status(200).json(atualizarProduct)
    } catch (error){
        if (error.code === 'P2025'){
            return res.status(404).json({message :' Produto Nao Encotrado Para Atualizacao'})
        }
        res.status(500).json({message: 'Produto Nao Encontrado', error : error.message})
    }
 }

 export const deletarProduct = async (req,res) =>{
    try{
        const {id} = req.params

        await Prisma.product.delete({
            where: {id}
        })
        res.status(204).send()
    } catch(error){
        if(error.code === 'P2025'){
            return res.status(404).json({message : 'Produto Nao encontrado para delete'})
        }
        res.status(500).json({message: 'Nao foi possivel deletar produto', error :error.message})
    }
 }