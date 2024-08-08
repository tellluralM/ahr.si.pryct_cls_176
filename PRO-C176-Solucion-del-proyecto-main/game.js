
let words = [
    {
        "inputs": 7,
        "category": "Deportes",
        "word": "Ajedrez"
    },
    {
        "inputs": 7,
        "category": "Nombre de países europeos",
        "word": "Francia"
    },

]

$(document).ready(function () {
    fillBlanks();
})

function fillBlanks() {
    //Seleccionar una palabra aleatoria
    const randomWord = words[Math.floor(Math.random() * words.length)];

    //Asegurar de que los espacios en blanco están vacíos para empezar
    $("#blanks").empty();

    //Mostrar los espacios en blanco usando <span>
    for (let i = 0; i < randomWord.inputs; i++) {
        let input_html = `<span class="fill_blanks" id="input_${i}">_</span>`
        $("#blanks").append(input_html)
    }

    //Mostrar la pista
    $("#hint").html(randomWord.category)

    var gameOver=false
    //Rellenar los espacios en blanco solo si se encuentra la coincidencia de caracteres
    $(".clickable").click(function () {
        var correctGuess = false;      

        //Obtener el id del botón pulsado
        let id = $(this).attr("id");

        //Obtener la vida
        var life = parseInt($("#life").text())

        //Bucle por todas las letras 
        for (var i = 0; i < randomWord.word.length; i++) {
            //Recorrer todas las letras
            if (randomWord.word.charAt(i).toLowerCase() == id) {
                //Comprobar si aún queda vida y si el espacio en blanco está vacío o ya está lleno
                if (life > 0 && ($(".fill_blanks").eq(i).html() == "_" || $(".fill_blanks").eq(i).html() == id)) {

                    //Llenar el espacio en blanco
                    $(".fill_blanks").eq(i).html(id);
                    correctGuess = true;

                    //Comprobar si la palabra adivinada está completa
                    if ($("#blanks").text() === randomWord.word.toLowerCase()) {
                        $("#result").text("¡¡Ganaste!!")
                        correctGuess = true;
                        gameOver=true
                    }
                }                
            }
            
        }
       
        if (life > 0 && correctGuess!=true && gameOver!=true) {           
            life = life - 1
            $("#life").text(life)
        }
        else if (life == 0) {
            $("#result").text("¡¡Perdiste!!")
        }
    })
}

    
