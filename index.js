const fs = require('fs')

// JSON.parse --> string => objeto
// JSON.stringify --> objeto => string

class Contenedor{
    constructor(name){
        this.name = name
    }

    save = async (product) => {
        try{
            const list = await this.getAll()
            const duplicate = list.find(item =>item.title === product.title)
            const savedIds = []
            let id 
            list.forEach(i => {savedIds.push(i.id)})
            const queryId = Math.max.apply(null, savedIds)
            if(list.length==0){
                id = 1
            } else{
                id = queryId +1
            }
            
            if(!duplicate){
                
                list.push({...product, id: id})
                
                await fs.promises.writeFile(this.name, JSON.stringify(list, null, 2))
            }else{
                console.log('Producto duplicado')
            }            
        }catch(err){
            console.log(`Hubo un error al guardar: ${err.message}`)
        }}    

    getAll = async () => {
        try{
            const products = await fs.promises.readFile(this.name, 'utf-8')
            console.log(JSON.parse(products))
            return JSON.parse(products)
        }catch(err) {
        console.log(`Hubo un error al obtener todo: ${err.message}`)
    }}

    deleteAll = async () => {
        try{
            await fs.promises.writeFile(this.name, '[]')
        }catch(err) {
        console.log(`Hubo un error al borrar todo: ${err.message}`)
    }}

    getById = async (id) => {
        try{
            const items = await this.getAll()
            const getId = items.find(item => item.id == id)
            if(getId){
                console.log(getId) 
            } 
            else return null;
        }catch(err) {
            console.log(`Hubo un error al obtener el producto: ${err.message}`)
        }
    }

    deleteById = async (id) => {
        try{
            const items = await this.getAll()
            const deleteId = items.filter(item => item.id != id)
            await fs.promises.writeFile(this.name, JSON.stringify(deleteId, null, 2))
        }catch(err) {
            console.log(`Hubo un error al borrar el producto: ${err.message}`)
        }
    }
}

const newProduct = new Contenedor ('./productos.txt')

//newProduct.save({title: 'Libro', price: 1.70})
newProduct.getAll()
//newProduct.getById(4)
//newProduct.deleteById(3)
//newProduct.deleteAll()