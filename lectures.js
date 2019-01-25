const fs = require('fs');
const util = require('util');
const express = require('express');
const content = require('./content');

const readFileAsync = util.promisify(fs.readFile);
const router = express.Router();

// lesa lectures.json skrá
async function readJson() {
  const file = await readFileAsync('./lectures.json');

  const json = JSON.parse(file);
  console.log("json skra");

  return json
}

// catch them errors
function catchErrors(fn) {
  console.error("hello er error i lecture.js");
  return (req, res, next) => fn(req, res, next).catch(next);
}

// búa til fall sem les lectures.json af disk. (async)
async function list(req, res) {
  // lesa fyrirlestrana inn og birta 
    const title = 'Fyrirlestrar';
    const data = await readJson(); 
    const { lectures } = data;
  res.render('index', {title, lectures});
}

// sækja upplýs um hvernig lecture fyrir sig
async function lecture(req, res, next) {
  const { slug } = req.params;
  const data = await readJson();
  const foundContent = data.lectures.find(a => a.slug === slug);

  if(!foundContent) {
    return next();
  }

  const { title } = foundContent;
  const { category } = foundContent;

  // Hér tengjum item.js skrána við og skilum niðurstöðunni úr því inn í html.
  const html = content.createContent(foundContent.content);
  res.render('lecture', {
    title, html, category, lecture: foundContent,
  });

}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
