const express = require("express");
const app = express();
const port = process.env.PORT||3000;
const path = require("path");
const session = require("express-session");
const User = require("./User");

app.use(express.static(path.join(__dirname, "static")));
//pryjmowanie jsonow
app.use(express.json());
//tworzenie sesji
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
//tworzenie tablicy
let tablica_wyslanych = [];

app.get("/", (req, res) => res.sendFile("index.html"));

//tworzenie wiadomosci
app.post("/nowaWiadomosc", function (req, res) {

  //obiekt z wlasciwosciami wiadomosci
  try {
    let wiadomosc = {
      tresc: req.body.tresc,

      autor: req.session.user.nick,
      kolor: req.session.user.kolor,
      czas: req.body.czas,
    };
    for (let i in tablica_wyslanych) {
      tablica_wyslanych[i].json(wiadomosc);
    }
    tablica_wyslanych = [];
    res.sendStatus(200);
  }
  catch (error) {
    let wiadomosc = {
      tresc: req.body.tresc,

      autor: "",
      color: "#ffffff",
      czas: req.body.czas,
    };
    for (let i in tablica_wyslanych) {
      tablica_wyslanych[i].json(wiadomosc);
    }
    tablica_wyslanych = [];
    res.sendStatus(200);
  }
});

//dodawanie userow do tablicy
app.get("/dajWiadomosc", (req, res) => {
  tablica_wyslanych.push(res);
});

//dodawanie usera z randomowym kolorem
app.post("/register", function (req, res) {
  console.log(req.body);
  req.session.user = new User(req.body.nick);
  console.log(req.session);
  res.sendStatus(200);
});


//na komende zmiany koloru
app.get("/zmienKolor", function (req, res) {
	console.log(req.session.user.kolor)
  req.session.user.kolor =
    "#" + Math.floor(Math.random() * 16777215).toString(16);
	console.log(req.session.user.kolor)
    //losowanie koloru w hexie
  res.sendStatus(200);
});

//na komende zmiany nicku zmiana
app.post("/zmienNick", function (req, res) {
  req.session.user.nick = req.body.nick;
  console.log(req.session.user.nick);
  console.log(req.body.nick);
  res.sendStatus(200);
});
app.listen(port, () => console.log(`Example app listening on port ` + port));
