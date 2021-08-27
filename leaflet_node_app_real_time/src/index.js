const express = require('express');
const engine = require('ejs-mate');
const path = require('path'); 
// initializations
const app = express();

// settings-> indicate all views are ejs
app.engine('ejs', engine);
app.set('view engine', 'ejs');
path.join(__dirname, 'views');
app.set('views', path.join(__dirname, 'views')); // show views folder
//console.log(__dirname + '/views')


// rotes
app.use(require('./routes/'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting server
app.listen(3000, () => {
    console.log('Server on port 3000');
});