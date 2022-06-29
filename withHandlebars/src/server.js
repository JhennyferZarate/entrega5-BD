//call all the required packages
import express from "express";
import handlebars from "express-handlebars";
import { routerProducts } from "./routers/routerProduct.js";

//create express app
const app = express();

app.engine("hbs",
    handlebars.engine({
      extname: ".hbs",
      defaultLayout: "index.hbs",
    })
  );

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json()); //body parser (put)
app.use(express.urlencoded({extended: true}));
app.use('/productos', routerProducts);

app.get('/', (req,res) => {
    res.render('home');
});

//listen to server
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`)
});

//error handling
server.on('error', error => console.log(`Server error ${error}`));