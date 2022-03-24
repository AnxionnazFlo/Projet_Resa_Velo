$(function() {



    getImagesList();

    // Récupération des données du json
    function getImagesList() {
        let url = listurl;
        fetch(url, { mode: "no-cors" })
            .then(response => response.json())
            .then(response => getData(response))
            .catch(error => alert("Erreur: " + error));

    }


    // Récupération des images du json dans un tableau
    function getData(data) {
        let imgTab = new Array();

        for (let i = 0; i < data.length; i++) {
            imgTab.push(data[i]);
        }

        // Random sur les images et return tableau de 3 indices
        let randomTab = Math.floor(Math.random() * (imgTab.length - 2));
        const indiceTab = imgTab[randomTab].id;

        // Affichage des 3 images dans le carousel
        for (let x = indiceTab; x < indiceTab + 3; x++) {
            $(".carousel-blocs").append("<div id='" + x + "' class='carousel-image'></div>");
            $('#' + x).css('background-image', 'url(' + imgTab[x].url + ')');
            $('#' + x).append("<div class='carousel-text'>" + imgTab[x].legend + "</div>");
        }

        // Mouvements du carousel
        let slide1 = indiceTab;
        let slide2 = indiceTab + 1;
        let slide3 = indiceTab + 2;

        $("#" + slide1).addClass("positionLeft");
        $("#" + slide2).addClass("positionCenter active");
        $("#" + slide3).addClass("positionRight");

        setInterval(function() {
            // Animation par les class
            if ($("#0").hasClass("positionLeft")) {
                $("#0").removeClass("positionLeft");
                $("#0").addClass("positionRight");
            } else if ($("#0").hasClass("positionCenter active")) {
                $("#0").removeClass("positionCenter active");
                $("#0").addClass("positionLeft");
            } else if ($("#0").hasClass("positionRight")) {
                $("#0").removeClass("positionRight");
                $("#0").addClass("positionCenter active");
            }
            if ($("#1").hasClass("positionLeft")) {
                $("#1").removeClass("positionLeft");
                $("#1").addClass("positionRight");
            } else if ($("#1").hasClass("positionCenter active")) {
                $("#1").removeClass("positionCenter active");
                $("#1").addClass("positionLeft");
            } else if ($("#1").hasClass("positionRight")) {
                $("#1").removeClass("positionRight");
                $("#1").addClass("positionCenter active");
            }
            if ($("#2").hasClass("positionLeft")) {
                $("#2").removeClass("positionLeft");
                $("#2").addClass("positionRight");
            } else if ($("#2").hasClass("positionCenter active")) {
                $("#2").removeClass("positionCenter active");
                $("#2").addClass("positionLeft");
            } else if ($("#2").hasClass("positionRight")) {
                $("#2").removeClass("positionRight");
                $("#2").addClass("positionCenter active");
            }
            if ($("#3").hasClass("positionLeft")) {
                $("#3").removeClass("positionLeft");
                $("#3").addClass("positionRight");
            } else if ($("#3").hasClass("positionCenter active")) {
                $("#3").removeClass("positionCenter active");
                $("#3").addClass("positionLeft");
            } else if ($("#3").hasClass("positionRight")) {
                $("#3").removeClass("positionRight");
                $("#3").addClass("positionCenter active");
            }
            if ($("#4").hasClass("positionLeft")) {
                $("#4").removeClass("positionLeft");
                $("#4").addClass("positionRight");
            } else if ($("#4").hasClass("positionCenter active")) {
                $("#4").removeClass("positionCenter active");
                $("#4").addClass("positionLeft");
            } else if ($("#4").hasClass("positionRight")) {
                $("#4").removeClass("positionRight");
                $("#4").addClass("positionCenter active");
            }
            if ($("#5").hasClass("positionLeft")) {
                $("#5").removeClass("positionLeft");
                $("#5").addClass("positionRight");
            } else if ($("#5").hasClass("positionCenter active")) {
                $("#5").removeClass("positionCenter active");
                $("#5").addClass("positionLeft");
            } else if ($("#5").hasClass("positionRight")) {
                $("#5").removeClass("positionRight");
                $("#5").addClass("positionCenter active");
            }

        }, 5000);

    }
});