const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const Article = require('./models/article')

// routes
const userRouters = require('./routes/user');

const app = express();

// mongoose db connection
mongoose.connect('mongodb://localhost:27017/sampleblog', {
    useNewUrlParser: true
});

// view engine
app.set('view engine', 'ejs');

// rout
app.get('/', async(req, res) => {
    const article = await Article.find();
     console.log(article)
    res.render('index',{article:article})
})



// set up layouts
app.use(expressLayouts);  // Use expressLayouts middleware
app.set('layout', 'layouts/layout');

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// userRouters
app.use('/article', userRouters);

// public folder for css and js
app.use(express.static('public'));



// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server is running on port 8080');
});
