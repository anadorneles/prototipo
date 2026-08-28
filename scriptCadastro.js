var cont = parseInt(localStorage.getItem("valorUser")) || 0;

$("#salvar").click(function () {
    cadastrar();
});

function cadastrar() {

    let email = $("#email").val();
    let usuario = $("#usuario").val();
    let senha = $("#senha").val();

    if (email == "" || usuario == "" || senha == "") {
        alert("Preencha todos os campos!");
        return;
    }

    // CRIAR

    let user = {
        email: email,
        usuario: usuario,
        senha: senha,
    };

    localStorage.setItem("user" + cont,JSON.stringify(user));

    cont++;

    localStorage.setItem("valorUser", cont);

    localStorage.setItem("usuarioAtual", JSON.stringify(user));
    
    window.location.href = "telaInicio.html";
}