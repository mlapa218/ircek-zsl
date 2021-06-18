module.exports = class User {
  constructor(nick) {
    this.nick = nick;
    //randomowy kolor usera
    this.kolor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
};
