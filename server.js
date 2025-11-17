const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

let menu = [
    {
        "_id":1,
        "name": "Parmesan Bread Bites",
        "img": "/images/apps/bread-bites.jpg",
        "type": "appetizer",
        "description": "Bite-size pieces of bread coated with butter, parmesan, and garlic seasoning.",
        "price": "6" 
    },
    {
        "_id":2,
        "name": "Meatballs",
        "img": "/images/apps/meatballs.jpg",
        "type": "appetizer",
        "description": "Pork meatballs covered with marinara sauce, parmesan, and garnish.",
        "price": "8" 
    },
    {
        "_id":3,
        "name": "House Salad",
        "img": "/images/apps/salad.jpg",
        "type": "appetizer",
        "description": "Spring mix, tomatoes, red onions, bell pepper, and your choice of dressing: Ranch, Balsamic Vinagrette, Blue Cheese, or Italian.",
        "price": "5" 
    },
    {
        "_id":4,
        "name": "Chicken Wings",
        "img": "/images/apps/wings.png",
        "type": "appetizer",
        "description": "Six chicken wings coated in your choice of our housemade sauces: Buffalo, BBQ, Garlic Parmesan, Teriyaki, or Hot Honey.",
        "price": "10" 
    },
    {
        "_id":5,
        "name": "Pepperoni",
        "img": "/images/pizzas/pep.jpeg",
        "type": "pizza",
        "description": "Fresh mozzarella, parmesan, pepperoni.",
        "price": "11" 
    },
    {
        "_id":6,
        "name": "Cheese",
        "img": "/images/pizzas/cheese.jpg",
        "type": "pizza",
        "description": "Fresh mozzarella, parmesan.",
        "price": "10" 
    },
    {
        "_id":7,
        "name": "Meat Lovers",
        "img": "/images/pizzas/meat-lovers.png",
        "type": "pizza",
        "description": "Fresh mozzarella, bacon, pepperoni, sausage, hamburger.",
        "price": "15" 
    },
    {
        "_id":8,
        "name": "Four Cheese",
        "img": "/images/pizzas/four-cheese.png",
        "type": "pizza",
        "description": "Fresh mozzarella, parmesan, feta, and provolone.",
        "price": "11" 
    },
    {
        "_id":9,
        "name": "Hamburger",
        "img": "/images/pizzas/hamburger.png",
        "type": "pizza",
        "description": "Fresh mozzarella, ground beef, purple onions.",
        "price": "14" 
    },
    {
        "_id":10,
        "name": "Margherita",
        "img": "/images/pizzas/margherita.jpg",
        "type": "pizza",
        "description": "Fresh mozzarella, tomatoes, basil.",
        "price": "12" 
    },
    {
        "_id":11,
        "name": "Shrimp Marinara",
        "img": "/images/pizzas/shrimp-mari.jpg",
        "type": "pizza",
        "description": "Fresh mozzarella, sauteed shrimp, basil.",
        "price": "16" 
    },
    {
        "_id":12,
        "name": "Chicken Fajita",
        "img": "/images/pizzas/chicken-fajita.jpg",
        "type": "pizza",
        "description": "Fresh mozzarella, chicken, caramelized onions, bell peppers, sauteed mushroom.",
        "price": "15" 
    },
    {
        "_id":13,
        "name": "Mediterranean",
        "img": "/images/pizzas/mediterranean.jpg",
        "type": "pizza",
        "description": "Feta, black olives, pepperoncini, bell pepper, purple onion, tomatoes.",
        "price": "14" 
    },
    {
        "_id":14,
        "name": "Philly Cheese Steak",
        "img": "/images/pizzas/philly.png",
        "type": "pizza",
        "description": "Fresh mozzarella, steak, fresh onions, bell pepper.",
        "price": "16" 
    },
    {
        "_id":15,
        "name": "Buffalo Chicken",
        "img": "/images/pizzas/buffalo.png",
        "type": "pizza",
        "description": "Fresh mozzarella, chicken, purple onions, cheddar cheese, buffalo seasoning.",
        "price": "14" 
    },
    {
        "_id":16,
        "name": "Spinach",
        "img": "/images/pizzas/spinach.jpg",
        "type": "pizza",
        "description": "Feta, spinach, purple onions.",
        "price": "11" 
    },
    {
        "_id":17,
        "name": "Slice of Cheesecake",
        "img": "/images/desserts/cheesecake.jpg",
        "type": "dessert",
        "description": "Made from scratch, topped with fresh strawberries and drizzle.",
        "price": "5" 
    },
    {
        "_id":18,
        "name": "Slice of Chocolate Cake",
        "img": "/images/desserts/chocolate-cake.jpg",
        "type": "dessert",
        "description": "Made from scratch, three-layered chocolate cake with chocolate fudge icing.",
        "price": "6" 
    },
    {
        "_id":19,
        "name": "S'mores Pizza",
        "img": "/images/desserts/smores.png",
        "type": "dessert",
        "description": "Pizza dough base with chocolate, marshmallows, and crushed graham crackers.",
        "price": "12" 
    },
    {
        "_id":20,
        "name": "Apple Pie Pizza",
        "img": "/images/desserts/apple-pie.jpg",
        "type": "dessert",
        "description": "Pizza dough base with caramelized apples, brown sugar crumbles, and icing drizzle.",
        "price": "10" 
    }
]

app.get("/api/menu", (req, res) => {
    console.log("in get request");

    const { type } = req.query;
    let filteredMenu = menu;

    if (type) {
        filteredMenu = menu.filter(item => item.type === type);
    }

    res.send(filteredMenu);
});

app.get("/api/menu/:id", (req, res)=>{
    const item = menu.find((menu)=>menu._id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send("Item not found");
    }
    res.send(item);
});


/* AI SOLUTION UNTIL I FIGURE OUT IF THERE'S ANOTHER WAY */
app.post("/api/menu", upload.single("img"), (req, res) => {
    const { name, ingredients } = req.body;
    const file = req.file;

    if (!name || !ingredients) {
        return res.status(400).send("Missing required fields");
    }

    const newItem = {
        _id: menu.length ? menu[menu.length - 1]._id + 1 : 1,
        name,
        ingredients,
        type: "suggestion",
        img: "http://localhost:3001/images/" + file.originalname
    };

    menu.push(newItem);

    res.status(200).json(menu); // return updated menu
});


app.listen(3001, () => {
    console.log("Server is up and running");
});