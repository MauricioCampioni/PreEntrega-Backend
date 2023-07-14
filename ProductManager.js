import fs from "fs/promises";


class ProductManager {

    constructor () {
        this.products = [];
    }
    
    addProduct= async (
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    ) => {
    
        try {
            const file = await fs.readFile("./products.json", "utf-8");
        
            this.products = JSON.parse(file); 
        
            let checkId = 0 
            this.products.forEach ((prod) => { 
                if (checkId < prod.id ) {
                    checkId = prod.id;
                }
            }) 

            const newProduct = {
            id:
            checkId +1,
               
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            };
            
            
            const productAlreadyExists= this.products.find(prod => prod.code==newProduct.code);
            if (productAlreadyExists){
                return console.log("El producto ya fue agregado");
            }
            
            this.products.push(newProduct);

            await fs.writeFile("./products.json", JSON.stringify(this.products));
            
        } catch (e) {
            console.log (e);
        }
    }

     getProducts = async () =>  {
        return this.products;
    }
     
    
    
     getProductById = async (id) => {

      const findProduct  = products.find ((findProduct) => findProduct.id === id)

        if (!findProduct) {
            console.error ("Not Found");
        }
        return findProduct;
    }

    updateProduct = async (id, productUpdated) => {

        try{
            const file = await fs.readFile("./products.json", "utf-8");
            this.products = JSON.parse(file);
             this.products.splice (id -1, 1, productUpdated)    
             await fs.writeFile("./products.json", JSON.stringify(this.products));           
        }catch (e) {
            console.error(e)
        }
    } 

    deleteProduct = async (id) => {
        try {
            const file = await fs.readFile("./products.json", "utf-8");
            this.products = JSON.parse(file);

            this.products.splice(id -1, 1);
            await fs.writeFile("./products.json", JSON.stringify(this.products));

        }catch (e) {
            console.error(e)
        }
    }

}
 export default {ProductManager}

