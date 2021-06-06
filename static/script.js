var gadanie = {

  async wiadomosci(podana_wiadomosc) {

    var container = document.createElement("div")  //musze sobie utworzyc boxa na wiadomosci
    //tam beda wrzucane wpisywane wiadomosci z inputa

    var info = document.createElement("div")     //tworze kolejnego boxa na czas i nick osoby piszacej

    var czas = document.createElement("span")        //tworze spany dla czasu, nicku i znaczkow malpy
    var nick = document.createElement("span")
    var znaczki = document.createElement("span")



    znaczki.innerText = '@'             //dodaje znaczkowi innertext z malpa zeby mial 
    znaczki.style.color = `#${podana_wiadomosc.color}` //taki sam wylosowany kolor jak bedzie nick 

    nick.innerText = podana_wiadomosc.from       //ustawiam dla nicka text od kogo przyszla wiadomosc
    nick.style.color = `#${podana_wiadomosc.color}`  //ustawiam mu wylosowany kolor 

    czas.innerText = podana_wiadomosc.czas_wiadomosci    //ustawiam czas




    info.appendChild(czas)          //do informacji nad wiadomoscia wrzucam czas

    info.append("<")                //na glupa zrobione znaczki bo nie wiedzialam
    info.appendChild(znaczki)       //jak zrobic kolorowa malpe automatycznie dodawana

    info.appendChild(nick)          //dodaje nick

    info.append(">")



    var wiadomosc = document.createElement("span") //robie spana dla wiadomosci z inputa

    wiadomosc.innerText = " " + podana_wiadomosc.tresc_wiadomosci  //dodaj mu dynamicznie wiadomosc
    wiadomosc.style.color = `lightblue`       //kolor pan mial niebieski to bedzie niebieski



    info.appendChild(wiadomosc)         //dodaj info (czas, nick)
    container.appendChild(info)    //dodaj wiadomosc

    $(wiadomosc).emoticonize()        //emotki z biblioteki, funkcja 
    document.querySelector(".ss-content").appendChild(container)  //z scrollbara
  },



  polecenia(podana_wiadomosc) {        //polecenia systemowe nick, color, quit 


    if (podana_wiadomosc.startsWith("/nick")) {    //jesli wiadomosc w inpucie zaczyna sie od /nick

      if (podana_wiadomosc.slice(5, podana_wiadomosc.length) != "") { //wez od 5 (od 0 i spacja), nie moze byc puste

        fetch("/nick_podany", {       //wyslij fetchem -> fetch jest sam w sobie asynchroniczny
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ wprowadzenie_nicku: podana_wiadomosc.slice(6, podana_wiadomosc.length) }),
        })

      }

      else {
        alert("Podano pusty nick")         //jesli nick byl pusty to alert proszacy o nick
      }

      return false
    }



    else if (podana_wiadomosc.startsWith("/color")) {  //jesli zaczyna sie od /color

      fetch("/color")       //wyslij fetchem -> fetch jest sam w sobie asynchroniczny
      return false
    }



    else if (podana_wiadomosc.startsWith("/quit")) {  //jesli zaczyna sie od /quit

      window.location.reload()      //odswiez stronke (czysci sie)
    }



    else {
      return true   //jak nie ma takich polecen to dawaj z wiadomosciami
    }
  },



  async nowy_uzytkownik() {

    var wprowadzenie_nicku = prompt("Podaj swój nick") //wyświetla okno dialogowe z prośbą do użytkownika o wpisanie jakiegoś tekstu
    //w przeciwienstwie do alert() ma inputa do wpisania nicku

    if (wprowadzenie_nicku === "" || wprowadzenie_nicku === null) {
      return this.nowy_uzytkownik()   //jak podal pusty nick to wroc go zeby wpisal ponownie
    }

    fetch("/nowy_uzytkownik", {     //wyslij fetchem -> fetch jest sam w sobie asynchroniczny
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wprowadzenie_nicku }),
    })

  },




  async wyslane() {

    fetch("/czeka")
      .then((response) => response.json())  //odpowiedz

      .then((data) => {

        this.wyslane()
        this.wiadomosci(JSON.parse(data))     //parsuj
      })
  },

}

gadanie.nowy_uzytkownik() //zrob uzytwkonika -> wyslij alert
gadanie.wyslane()         //wyslane wiadomosci




window.addEventListener("keypress", (e) => {  //nasluchuj entera wyslanie


  if (e.code == "Enter") {

    var tresc_wiadomosci = document.querySelector("input").value  //pobierz wartosc z inputa jako tresc wiadomosci

    if (tresc_wiadomosci === "") { }
    document.querySelector("input").value = ""      //czyszczenie inputa po wyslaniu wiadomosci

    if (gadanie.polecenia(tresc_wiadomosci)) {
      var czas_wiadomosci = `[${new Date().getHours()}:${new Date().getMinutes()}]` //wrzuc swiezy czas w [00:00]


      fetch("/poszla_wiadomosc", {     //wyslij fetchem -> fetch jest sam w sobie asynchroniczny
        method: "POST",     //wysylaj postem
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ tresc_wiadomosci, czas_wiadomosci }),
      })
    }     //tutaj zeby dzialaly te polecenia


  }
  SimpleScrollbar.initEl(document.querySelector(".wiadomosc"))    //ze scrollbara wiadomosci
});

