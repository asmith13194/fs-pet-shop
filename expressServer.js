const express = require('express');
const parser = require("body-parser");
const fs = require('fs');
const path = require('path');
const ev = require('express-validation');
const validations = require('./validations/pets.js');
const router = express.Router();

router.use(parser.urlencoded({
  extended: false
}));

router.use(parser.json());


// router.get('/pets', ev(validations.get), (req, res, next) => {
//   // Route handler logic
//   console.log(req.body);
//   next()
// });

router.get("/pets", (req, res) => {
  console.log(req.header);
  fs.readFile("./pets.json", "utf8", (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  })
})

router.get("/pets/:id", (req,res,next) => {
  fs.readFile("./pets.json", "utf8", (err, data) => {
    if (err) throw err;
    data = JSON.parse(data)
    if (req.params.id < data.length && req.params.id >= 0) {
      res.send(data[req.params.id])
    } else {
      res.setHeader("Content-type", "text/plain");
      res.status(404);
      res.send("Not Found");
    }
  })
})

router.post("/pets", (req, res) => {
  for (let key in req.body) {
    if (req.body[key] == "") {
      return res.sendStatus(400)
    }
  }
  fs.readFile("./pets.json", "utf8", (err, data) => {
    if (err) throw err;
    data = JSON.parse(data)
    data.push(req.body);
    data = JSON.stringify(data)
    fs.writeFile("./pets.json", data, (err) => {
      if (err) throw err;
      res.send(req.body)
    })
  })
})

router.patch('/pets/:id', (req, res) => {
  fs.readFile("./pets.json", 'utf8', (err, data) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let id = Number.parseInt(req.params.id);
    data = JSON.parse(data);
    if (id < 0 || id >= data.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    let pet = req.body;
    if (!pet) {
      return res.sendStatus(400);
    }
    for (let key in req.body) {
      data[id][key] = req.body[key]
    }
    pet = data[id];
    data = JSON.stringify(data);
    fs.writeFile("./pets.json", data, (err) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
      res.send(pet);
    });
  });
});

router.delete("/pets/:id", (req, res) => {
  fs.readFile("./pets.json", 'utf8', (err, data) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let id = Number.parseInt(req.params.id);
    data = JSON.parse(data);
    if (id < 0 || id >= data.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    let removed = data.splice(id, 1)[0]
    data = JSON.stringify(data);
    fs.writeFile("./pets.json", data, (err) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
      res.send(removed);
    });
  });
})

router.get("/", (req, res) => {
  res.sendStatus(404)
})

router.use((req, res) => {
  res.sendStatus(404)
})



module.exports = router;
