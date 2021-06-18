
//dodawanie nicka
let nickname = prompt("Podaj nick :");
wyslij_dane({ nick: nickname }, "/register", () =>
  console.log("operacja udana")
);

//na załadowanie dokumentu odpala sie funkcja bioraca wiadomosc i na enter wysyla
$(document).ready(() => {
  pobierz_wiadomosc();
  $("button").on("click", wysylacz);
  $(window).on("keypress", (e) => {
    if (e.keyCode == 13) {
      wysylacz();
    }
  });
});

//zbieranie wartosci z inputa
function wysylacz() {
  let input = $("input").val();
  //czysczenie inputa
  $("input").val("");
  //komendy
  if (input == "/quit") window.location.reload();
  else if (input == "/color") $.ajax("/zmienKolor");
  else if (input.startsWith("/nick"))
    wyslij_dane({ nick: input.substring(5) }, "/zmienNick", () =>
      console.log("Jak szef")
    );
  else
    wyslij_dane(
      { tresc: input, czas: new Date().toTimeString().substring(0, 8) },
      "/nowaWiadomosc",
      () => {}
    );
    //wyslanie nicka z czasem
}

//emotikony
function tworca_wiadomosci(wiadomosc) {
  let wiadomoscCTN = $("<div/>");
  let tresc = $("<div/>", {
    text: ` ${[wiadomosc.tresc]} `,
  });
  tresc.emoticonize();
  //dodawanie appendem wiadomosci jako diva z autorem i czasem
  console.log(wiadomosc);
  $(".wiadomosci").append(
    wiadomoscCTN.append([
      $("<div/>", {
        css: {
          color: wiadomosc.kolor,
        },
        text: `<@${[wiadomosc.autor]}>`,
      }),
      $("<div/>", {
        text: ` <${[wiadomosc.czas]}>`,
      }),
      tresc,
    ])
  );
}

function wyslij_dane(dane, address, callback) {
  $.ajax({
    type: "POST",
    url: address,
    data: JSON.stringify(dane),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  })
    .done(function (data) {
      callback(data);
    })
    .fail(function () {
      // console.warn("Coś się zepsuło");
    })
    .always(function () {
      console.log("dziala");
    });
}

function pobierz_wiadomosc() {
  $.ajax("/dajWiadomosc")
    .done(function (dane) {
      tworca_wiadomosci(dane);
      pobierz_wiadomosc();
    })
    .fail(function () {
      console.warn("zepsute");
    })
    .always(function () {
      console.log("jest git");
    });
}
