$(function() {

    sessionStorage.clear();

    //construction de l'objet MAP qui s'occuper de recuperer afficher la map et les markeurs
    class Map {
        constructor() {
            this.map = L.map('map').setView([45.764043, 4.835659], 12);;
            this.bikeIcon = L.icon({
                iconUrl: 'veloStation.svg',
                iconSize: [31, 49], // size of the icon
                popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
            });

        }

        init() {
            //on va essayer de récuperer la carte ici

            L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessTokenMapBox}`, {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,

            }).addTo(this.map);

            this.apiConnect();
        }

        apiConnect() {
                // on va essayer de récuperer les data chez JCD
                //on récupere les donnée des contrats de Lyon


                fetch(`https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=${apiKeyJCD}`)
                    .then(response => response.json())
                    .then(response => this.getData(response))
                    .catch(error => alert("Erreur : " + error));

            }
            // ici on récupère les datas 

        getData(data) {
            const dataVelo = new Array();

            // console.log(data);
            for (let i = 0; i < data.length; i++) {
                let open = data[i].status;
                if (open == "OPEN") { //si les stations sont ouvertes, on affiche le marker sur la carte
                    dataVelo.push(data[i]);
                    let lat = data[i].position.lat;
                    let long = data[i].position.lng;
                    let marker = L.marker([lat, long], { icon: this.bikeIcon }).addTo(this.map);
                    //marker.bindPopup("<b>" + data[i].address + "</b><br>Nombre de vélos disponibles : " + data[i].available_bikes + "<br>Nombres de places libres dans la station : " + data[i].available_bike_stands).openPopup();
                    marker.addEventListener('click', function() {
                        // pour remettre les markers en bleu
                        let allMarker = $(".leaflet-marker-icon");
                        for (let i = 0; i < allMarker.length; i++) {
                            allMarker[i].src = "veloStation.svg";
                        }

                        //myMap.map.setView([lat, long], 18); //il faut appeller l'objet construit
                        myMap.map.flyTo([lat, long], 16, { //permet de faire un zomm in animé en 1.5s
                            animate: true,
                            duration: 1.5

                        });

                        marker.valueOf()._icon.src = 'veloSelected.svg'



                        this.bounce(8);
                        displayData(dataVelo[i]);

                    });


                } //else {

                //  let marker = L.marker([lat, long]).addTo(this.map);
                //  }
            }

        }

    }
    //on initialise la map au démarrage de la page 
    let myMap = new Map();
    myMap.init();

    //objet timer qui sera appeller par la reservation (mise en route on click)
    class Timer {
        constructor(timeText, counter) {
            this.time = null;
            this.counter = counter;
            //this.timeText = document.getElementById(timeText);

        }

        initTheTimer() {

            console.log("le timer démare");

            this.time = setInterval(function() {

                counterDown.countDown();

            }, 1000);


        }

        countDown() {

            this.counter--;
            // console.log(this.counter);
            displayCounter(this.counter);
            displayInfoResa();

            if (this.counter <= 0) {
                clearInterval(this.time);

                timeOutResa();

                this.counter = 1200;

            }

        }
        stopCounter() {
            clearInterval(this.time);

            timeOutResa();
            this.counter = 1200;
        }


    }
    //cette fonction va afficher les datas du marker dans la div de droite en haut

    function displayData(dataVelo) {
        console.log(dataVelo);
        const name = $('#spanName')
        const adress = $('#spanAdress');
        const haut = $('#haut');
        const bas = $('#bas');
        const veloDispo = $('#spanVeloDispo');
        const placesDispo = $('#spanPlacesDispo');
        const reserver = $('#reserver');
        name.text(dataVelo.name.substring(7))
            // $('#Canvas').show();

        veloDispo.text(dataVelo.available_bikes);
        placesDispo.text(dataVelo.available_bike_stands);
        adress.text(dataVelo.address);
        if (adress.text() == "") {

            adress.text("Non renseignée");
        }
        reserver.prop('disabled', false);
        haut.fadeIn();
        if (dataVelo.available_bikes == 0) {

            reserver.prop('disabled', true);
        }
        const firstName = sessionStorage.getItem('firstname');
        console.log(firstName);
        if (firstName) {
            reserver.prop('disabled', true);
        }
        bas.fadeIn();


    }

    const counterDown = new Timer('time', 1200); //initialisation du timer

    //quand on click sur reserver

    $('#reserver').on('click', function(e) {
        e.preventDefault();
        $('#error').text("");

        if ($('#firstname').val() == "" || $('#lastname').val() == "") {
            $('#error').text("Vous n'avez pas rempli tout le formulaire");
        } else {
            // console.log("tout est rempli");
            sessionStorage.setItem('firstname', $('#firstname').val());
            sessionStorage.setItem('lastname', $('#lastname').val())
            sessionStorage.setItem('stationvelo', $('#spanName').text());
            $('#reserver').prop('disabled', true);

            counterDown.initTheTimer();
        }
    })

    // affichage du compteur

    function displayCounter(counter) {
        var m = Math.floor(counter % 3600 / 60);
        var s = Math.floor(counter % 3600 % 60);
        $('#timer').text("Votre réservation expire dans : " + m + "m et " + s + " s");
        $('#cancel').show();

    }

    // affichage des infos de la réservation

    function displayInfoResa() {
        $('#infoResa').text("Bonjour " + sessionStorage.getItem('firstname') + " " + sessionStorage.getItem('lastname') + " vous avez réservé un vélo à la station de " + sessionStorage.getItem('stationvelo'));

    }

    //fonction qui stop la résa après le temps imparti et qui vide le session storage 
    function timeOutResa() {
        // console.log("votre resa a expiré !");
        $('#timer').text("");
        $('#cancel').hide();
        $('#infoResa').text("Votre réservation a été annulée !");
        $('#reserver').prop('disabled', false);
        const myFirstName = sessionStorage.getItem('firstname');
        const myLastName = sessionStorage.getItem('lastname');
        const mySationVelo = sessionStorage.getItem('stationvelo');
        if (myFirstName && myLastName && mySationVelo) {

            sessionStorage.removeItem('firstname');
            sessionStorage.removeItem('lastname');
            sessionStorage.removeItem('stationvelo');
        } else {
            alert("Il y a un souci avec votre réservation");
            return;
        }
    }


    // fonction pour annuler la reservation

    $('#cancel').on('click', function(e) {
        e.preventDefault();
        if (confirm("Vous aller annuler votre réservation ! ") == true) {
            counterDown.stopCounter();
        }
    })


})