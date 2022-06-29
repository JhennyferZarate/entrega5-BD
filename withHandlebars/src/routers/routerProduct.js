//call all the required packages
import { Router } from "express";
import { productsContainer } from "../containers/products.js";

//create router()
const routerProducts = Router();

//class Products
const container = new productsContainer();

//API RESTful
routerProducts.get('/', (req,res) => {
    const response = container.getAll();
    if (!response) res.send({ error: "products not found" });
    res.render('products', {products: response});
});

routerProducts.post('/', (req,res) => {
    const product = req.body
    product.id = container.getId();
    container.add(product);
    res.redirect('/');
});

routerProducts.put('/:id', (req,res) => {
    const productUpdated = req.body
    container.updateById(parseInt(req.params.id), productUpdated);
});

routerProducts.delete('/:id', (req,res) => {
    container.deleteById(parseInt(req.params.id));
    res.json(container.getAll());
});

export { routerProducts };