var cont = parseInt(localStorage.getItem("valorGrupo")) || 0;
var grupoAtual = 0;
var editando = false;

// ABRIR CADASTRO
$("#criar").click(function () {
    editando = false;
    $("#janelaCadastro").show();
});

// FECHAR CADASTRO
$("#fechar").click(function () {
    $("#janelaCadastro").hide();
});

// SALVAR
$("#salvar").click(function () {
    salvarGrupo();
});

// SALVAR GRUPO
function salvarGrupo() {

    let nome = $("#nome").val();
    let descricao = $("#descricao").val();
    let imagem = $("#imagem").val();

    // EDITAR
    if (editando) {
        let grupo = JSON.parse(localStorage.getItem("grupo" + grupoAtual));

        grupo.nome = nome;
        grupo.descricao = descricao;
        grupo.imagem = imagem;

        localStorage.setItem("grupo" + grupoAtual,JSON.stringify(grupo));

        $("#chatNome").text(grupo.nome);
        $("#chatDescricao").text(grupo.descricao);
        $("#chatImagem").attr("src", grupo.imagem);

        $("#meusGrupos").empty();

        let limite = parseInt(localStorage.getItem("valorGrupo")) || 0;

        for (let i = 0; i < limite; i++) {
            let grupoJSON = localStorage.getItem("grupo" + i);
            if (grupoJSON) {
                adicionarGrupo(i, JSON.parse(grupoJSON));
            }
        }

        editando = false;

        $("#janelaCadastro").hide();

        $("#nome").val("");
        $("#descricao").val("");
        $("#imagem").val("");

        return;
    }

    // CRIAR
    let codigo = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");

    let grupo = {
        nome: nome,
        descricao: descricao,
        codigo: codigo,
        imagem: imagem
    };

    localStorage.setItem("grupo" + cont,JSON.stringify(grupo));

    adicionarGrupo(cont, grupo);

    cont++;

    localStorage.setItem("valorGrupo", cont);

    $("#janelaCadastro").hide();

    $("#nome").val("");
    $("#descricao").val("");
    $("#imagem").val("");
}

// ADICIONAR GRUPO
function adicionarGrupo(id, grupo) {

    $("#meusGrupos").append(
        '<div id="grupo' + id + '" class="grupo" onclick="abrirGrupo(' + id + ')">' +
        '<img src="' + grupo.imagem + '" alt="Capa do grupo">' +
        '<p>' + grupo.nome + '</p>' +
        '</div>'
    );
}

// CARREGAR GRUPOS
$(document).ready(function () {

    let limite = parseInt(localStorage.getItem("valorGrupo")) || 0;

    for (let i = 0; i < limite; i++) {
        let grupoJSON = localStorage.getItem("grupo" + i);
        if (grupoJSON) {
            adicionarGrupo(i, JSON.parse(grupoJSON));
        }
    }
});

// ABRIR GRUPO
function abrirGrupo(id) {

    localStorage.setItem("grupoAtual", id);

    let grupoJSON = localStorage.getItem("grupo" + id);

    if (grupoJSON) {
        let grupo = JSON.parse(grupoJSON);

        $("#chatNome").text(grupo.nome);
        $("#chatDescricao").text(grupo.descricao);
        $("#chatImagem").attr("src", grupo.imagem);

        carregarMensagens(id);
    }
}

// CARREGAR MENSAGENS
function carregarMensagens(id) {

    $("#mensagens").empty();

    let mensagens = JSON.parse( localStorage.getItem("mensagens" + id) ) || [];

    for (let mensagem of mensagens) {

        $("#mensagens").append(
            '<div class="mensagem">' +
            mensagem +
            '</div>'
        );
    }
}

// ENVIAR MENSAGEM
$("#enviar").click(function () {

    let texto = $("#textoMensagem").val();

    if (texto == "") {
        return;
    }

    let id = localStorage.getItem("grupoAtual");

    if (id === null) {
        alert("Selecione um grupo primeiro.");
        return;
    }

    let mensagens = JSON.parse(localStorage.getItem("mensagens" + id)) || [];

    mensagens.push(texto);

    localStorage.setItem(
        "mensagens" + id,
        JSON.stringify(mensagens)
    );

    $("#textoMensagem").val("");

    carregarMensagens(id);
});

// ENTRAR NO GRUPO
$("#entrar").click(function () {

    let codigo = $("#codigo").val();

    if (codigo == "") {
        alert("Digite o código do grupo.");
        return;
    }

    let limite = parseInt(localStorage.getItem("valorGrupo")) || 0;

    for (let i = 0; i < limite; i++) {

        let grupoJSON = localStorage.getItem("grupo" + i);

        if (grupoJSON) {
            let grupo = JSON.parse(grupoJSON);

            if (grupo.codigo == codigo) {
                adicionarGrupo(i, grupo);
                alert("Você entrou no grupo " + grupo.nome + "!");
                $("#codigo").val("");
                return;
            }
        }
    }

    alert("Código inválido. Grupo não encontrado.");
});

// ABRIR INFORMAÇÕES
$("#cabecalhoChat").click(function () {

    let id = localStorage.getItem("grupoAtual");

    if (id !== null) {
        mostrarGrupo(id);
    }
});

// MOSTRAR INFORMAÇÕES
function mostrarGrupo(id) {

    grupoAtual = id;

    let grupoJSON = localStorage.getItem("grupo" + id);

    if (grupoJSON) {

        let grupo = JSON.parse(grupoJSON);

        $("#infoNome").text(grupo.nome);
        $("#infoDescricao").text(grupo.descricao);
        $("#infoCodigo").text(grupo.codigo);

        $("#janelaInformacoes").show();
    }
}

// EDITAR
$("#editar").click(function () {

    let grupoJSON = localStorage.getItem("grupo" + grupoAtual);

    if (grupoJSON) {

        let grupo = JSON.parse(grupoJSON);

        $("#nome").val(grupo.nome);
        $("#descricao").val(grupo.descricao);
        $("#imagem").val(grupo.imagem);

        editando = true;

        $("#janelaInformacoes").hide();
        $("#janelaCadastro").show();
    }
});

// FECHAR INFORMAÇÕES
$("#fecharInformacoes").click(function () {
    $("#janelaInformacoes").hide();
});

function deletar() {

    $("#grupo" + grupoAtual).remove();

    localStorage.removeItem("grupo" + grupoAtual);

    $("#janelaInformacoes").hide();
}
