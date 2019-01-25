/* todo, setja upp express */
const express = require('express');
const path = require('path');
const lectures = require('./lectures');
const hostname = '127.0.0.1';
const port = 3000;

const app = express();

// crucial shit bruv, nota lectures puntur mikilvægur (?!)
app.use(lectures); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

function notFoundHandler(req, res, next) {
  //res.status(404).send('404 Not Found');
  res.render('error', { title: '404 Fannst ekki', error: 'Síða fannst ekki' });
}

function errorHandler(err, req, res, next) {
  //res.status(500).send('Villa!');
  res.render('error', { title: 'Villa kom upp', error: 'Server niðri' });
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.info(`Server runnning at http://${hostname}:${port}/`); 
  // regex aftur komma - ekki strengur inní sviga :o
});