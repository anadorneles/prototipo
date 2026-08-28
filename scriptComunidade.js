var cont = parseInt(localStorage.getItem("valorComunidade")) || 0;
var comunidadeAtual = 0;
var editando = false;

$("#criar").click(function () {
    editando = false;
    $("#janelaCadastro").show();
});

$("#fechar").click(function () {
    $("#janelaCadastro").hide();
});

$("#salvar").click(function () {
    salvarComunidade();
});

function salvarComunidade() {

    let nome = $("#nome").val();
    let descricao = $("#descricao").val();
    let imagem = $("#imagem").val();

    if (editando) {

        let comunidade = JSON.parse(
            localStorage.getItem("comunidade" + comunidadeAtual)
        );

        comunidade.nome = nome;
        comunidade.descricao = descricao;
        comunidade.imagem = imagem;

        localStorage.setItem(
            "comunidade" + comunidadeAtual,
            JSON.stringify(comunidade)
        );

        $("#chatNome").text(comunidade.nome);
        $("#chatDescricao").text(comunidade.descricao);
        $("#chatImagem").attr("src", comunidade.imagem);

        $("#minhasComunidades").empty();

        let limite = parseInt(
            localStorage.getItem("valorComunidade")
        ) || 0;

        for (let i = 0; i < limite; i++) {

            let comunidadeJSON = localStorage.getItem(
                "comunidade" + i
            );

            adicionarComunidade(i,JSON.parse(comunidadeJSON));
        }

        editando = false;

        $("#janelaCadastro").hide();

        $("#nome").val("");
        $("#descricao").val("");
        $("#imagem").val("");

        return;
    }

    let comunidade = {
        nome: nome,
        descricao: descricao,
        imagem: imagem
    };

    localStorage.setItem(
        "comunidade" + cont,
        JSON.stringify(comunidade)
    );

    adicionarComunidade(cont, comunidade);

    cont++;

    localStorage.setItem(
        "valorComunidade",
        cont
    );

    $("#janelaCadastro").hide();

    $("#nome").val("");
    $("#descricao").val("");
    $("#imagem").val("");
}

function adicionarComunidade(id, comunidade) {

    $("#minhasComunidades").append(
        '<div id="comunidade' + id + '" class="comunidade" onclick="abrirComunidade(' + id + ')">' +
        '<img src="' + comunidade.imagem + '" alt="Capa da comunidade">' +
        '<p>' + comunidade.nome + '</p>' +
        '</div>'
    );
}

$(document).ready(function () {

    let limite = parseInt(
        localStorage.getItem("valorComunidade")
    ) || 0;

    for (let i = 0; i < limite; i++) {

        let comunidadeJSON = localStorage.getItem(
            "comunidade" + i
        );

        adicionarComunidade(
            i,
            JSON.parse(comunidadeJSON)
        );
    }
});

function abrirComunidade(id) {

    localStorage.setItem(
        "comunidadeAtual",
        id
    );

    let comunidade = JSON.parse(
        localStorage.getItem("comunidade" + id)
    );

    $("#chatNome").text(comunidade.nome);
    $("#chatDescricao").text(comunidade.descricao);
    $("#chatImagem").attr("src", comunidade.imagem);

    carregarMensagens(id);
}

function carregarMensagens(id) {

    $("#mensagens").empty();

    let mensagens = JSON.parse(
        localStorage.getItem("mensagens" + id)
    ) || [];

    for (let mensagem of mensagens) {

        $("#mensagens").append(
            '<div class="mensagem">' +
            mensagem +
            '</div>'
        );
    }
}

$("#enviar").click(function () {

    let texto = $("#textoMensagem").val();

    let id = localStorage.getItem("comunidadeAtual");

    let mensagens = JSON.parse(
        localStorage.getItem("mensagens" + id)
    ) || [];

    mensagens.push(texto);

    localStorage.setItem(
        "mensagens" + id,
        JSON.stringify(mensagens)
    );

    $("#textoMensagem").val("");

    carregarMensagens(id);
});

$("#cabecalhoChat").click(function () {

    let id = localStorage.getItem("comunidadeAtual");

    mostrarComunidade(id);
});

function mostrarComunidade(id) {

    comunidadeAtual = id;

    let comunidade = JSON.parse(
        localStorage.getItem("comunidade" + id)
    );

    $("#infoNome").text(comunidade.nome);
    $("#infoDescricao").text(comunidade.descricao);

    $("#janelaInformacoes").show();
}

$("#editar").click(function () {

    let comunidade = JSON.parse(
        localStorage.getItem("comunidade" + comunidadeAtual)
    );

    $("#nome").val(comunidade.nome);
    $("#descricao").val(comunidade.descricao);
    $("#imagem").val(comunidade.imagem);

    editando = true;

    $("#janelaInformacoes").hide();
    $("#janelaCadastro").show();
});

$("#fecharInformacoes").click(function () {
    $("#janelaInformacoes").hide();
});

function deletar() {

    $("#comunidade" + comunidadeAtual).remove();

    localStorage.removeItem(
        "comunidade" + comunidadeAtual
    );

    $("#janelaInformacoes").hide();
}
