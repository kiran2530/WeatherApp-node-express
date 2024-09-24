const express = require('express');
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

const app = express();
const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');

app.set('views', views_path);
hbs.registerPartials(partials_path);

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/weather", (req, res) => {
    res.render("weather");
})

app.get("*", (req, res) => {
    res.render("404error");
})

app.listen(port, () => {
    console.log(`listening http://localhost:${port}/`);
})
