var express = require("express"),       //expressowe poczatki
    app = express(),                    //express

    port = process.env.PORT || 3000,                        //port 3000
    path = require("path"),             //do sciezki do statica

    bodyParser = require("body-parser"),
    session = require("express-session")


app.listen(port, () => console.log('Serwer rusza na porcie 3000'))


app.use(bodyParser.json())             //body parser, chce uzywac jsona
app.use(express.static(path.join(__dirname, "static", "/")))    //sciezka do static


app.use(session(
    {
        secret: 'topsecret',    //bez stringa secret dostep do sesji bylby denied
        saveUninitialized: true,    //to nwm gdzies bylo na specu chyba ale bez tego wywala bledy
        resave: true
    })
)






app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "strona", "index.html"))    //sciezka do stronki glownej
})




app.post("/nowy_uzytkownik", function (req, res) {          //dodanie nowego uzytkownika
    var uzytkownik = new User(req.body.wprowadzenie_nicku)  //z klasy tworze nowrgo uzytkownika

    req.session.wprowadzenie_nicku = uzytkownik.wprowadzenie_nicku  //zapisz mu nick
    req.session.color = uzytkownik.color                    //zapisz mu kolor

    res.sendStatus(200)     //tutaj te statusy nwm kto mi to polecil ale dobrze to miec podobno
})




app.get("/czeka", (req, res) => {
    odpowiada.push(res)              //czeka na pierwsza wiadomosc
})





app.get("/color", (req, res) => {   //zmiana kolorku
    req.session.color = Math.floor(Math.random() * 16777215).toString(16)   //wylosuj random kolor
    res.sendStatus(200)
})




app.post("/newNickname", function (req, res) {  //zmiana nicku
    req.session.wprowadzenie_nicku = req.body.wprowadzenie_nicku    //wprowadzony nowy nick
    res.sendStatus(200)
})





app.post("/poszla_wiadomosc", function (req, res) {

    var nowa_wiadomosc = {          //obiekt nowej wiadomosci

        from: req.session.wprowadzenie_nicku,     //info: od kogo, kolor, czas i sama tresc
        color: req.session.color,
        czas_wiadomosci: req.body.czas_wiadomosci,
        tresc_wiadomosci: req.body.tresc_wiadomosci,
    }

    podana_wiadomosc.lolo_wiadomosc = JSON.stringify(nowa_wiadomosc)

    res.sendStatus(200)
})





var podana_wiadomosc = {

    string_wiadomosci: JSON.stringify({

    }),
    nasluchuje_wiadomosci: function (val) { },

    set lolo_wiadomosc(val) {               //ustaw nowa wiadomosc
        this.string_wiadomosci = val        //jego wartosc

        this.nasluchuje_wiadomosci(val)
    },

    get lolo_wiadomosc() {                  //oddaj
        return this.string_wiadomosci
    },



    registerListener: function (listener) {
        this.nasluchuje_wiadomosci = listener
    },
}



var odpowiada = []
podana_wiadomosc.registerListener(function (val) {
    odpowiada.forEach((res) => res.json(podana_wiadomosc.string_wiadomosci))
    odpowiada = []
})




class User {

    constructor(wprowadzenie_nicku) {
        this.wprowadzenie_nicku = wprowadzenie_nicku
        this.color = Math.floor(Math.random() * 16777215).toString(16)
    }
}

