$("#acessar").click(function () {

    let usuarioDigitado = $("#usuario").val().trim();
    let senhaDigitada = $("#senha").val();

    if (usuarioDigitado == "" || senhaDigitada == "") {
        alert("Preencha todos os campos!");
        return;
    }

    let cont = parseInt(localStorage.getItem("valorUser")) || 0;

    let encontrou = false;

    for (let i = 0; i < cont; i++) {

        let userJSON = localStorage.getItem("user" + i);

        if (userJSON) {

            let user = JSON.parse(userJSON);

            if (user.usuario == usuarioDigitado && user.senha == senhaDigitada) {

                // Guarda o usuário que fez login
                localStorage.setItem("usuarioAtual", JSON.stringify(user));

                encontrou = true;

                break;
            }
        }
    }

    if (encontrou) {

        window.location.href = "telaInicio.html";

    } else {

        alert("Usuário ou senha incorretos!");
    }

});

$(document).ready(function () {

    let usuarioJSON = localStorage.getItem("usuarioAtual");

    if (usuarioJSON) {

        let usuario = JSON.parse(usuarioJSON);

        $("#nomeUsuario").text(usuario.usuario);
    }

});