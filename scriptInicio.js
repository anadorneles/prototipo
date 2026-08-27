///Script para salvar, editar, excluir e exibir dados dos livros

// ABRIR CADASTRO
$("#abrir").click(function () {
    $("#cadastrar").show();
});


// FECHAR CADASTRO
$("#fechar").click(function () {
    $("#cadastrar").hide();
});


// SALVAR
$("#salvar").click(function () {
    salvar();
});


var cont = parseInt(localStorage.getItem("valor")) || 0;
var livroAtual = 0;
var editando = false;


// CALCULAR PROGRESSO
function calcularProgresso(paginas, paginasLidas) {

    paginas = parseInt(paginas) || 0;
    paginasLidas = parseInt(paginasLidas) || 0;

    if (paginas <= 0) {
        return 0;
    }

    let porcentagem = (paginasLidas / paginas) * 100;

    if (porcentagem > 100) {
        porcentagem = 100;
    }

    if (porcentagem < 0) {
        porcentagem = 0;
    }

    return Math.round(porcentagem);
}


// CRIAR LIVRO
function criarLivro(id, livro) {

    let porcentagem = calcularProgresso(livro.paginas, livro.paginasLidas);

    let capa = `
        <div class="capa" onclick="mostrarLivro(${id})">
            <img src="${livro.imagem}" alt="Capa do livro">
        </div>
    `;

    if (livro.status == "Lendo") {
        return `
            <div class="livroLendo livro" id="livro${id}">
                ${capa}
                <div class="informacoesLendo">
                    <p><strong>Nome:</strong> ${livro.nome}</p>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p><strong>Páginas:</strong> ${livro.paginas}</p>
                    <p><strong>Páginas concluídas:</strong> ${livro.paginasLidas}</p>
                    <div class="barraProgresso">
                        <div class="barraProgressoPreenchida" style="width:${porcentagem}%;">
                            ${porcentagem}%
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    return `<div class="livro" id="livro${id}">${capa}</div>`;
}

// SALVAR OU EDITAR
function salvar() {

    let livro = {
        nome: $("#nomeLivro").val(),
        autor: $("#autorLivro").val(),
        editora: $("#editoraLivro").val(),
        paginas: $("#paginasLivro").val(),
        paginasLidas: $("#paginasLidas").val(),
        genero: $("#generoLivro").val(),
        status: $("#statusLivro").val(),
        imagem: $("#imagem").val()
    };

    let livroJSON = JSON.stringify(livro);

    if (editando) {

        localStorage.setItem(
            "livro" + livroAtual,
            livroJSON
        );

        $("#livro" + livroAtual).remove();

        let modelo = criarLivro(livroAtual, livro);

        if (livro.status == "Lendo") {
            $("#lendo").append(modelo);
        }

        if (livro.status == "Quero Ler") {
            $("#queroLer").append(modelo);
        }

        if (livro.status == "Lido") {
            $("#lidos").append(modelo);
        }

        editando = false;

    } else {

        localStorage.setItem(
            "livro" + cont,
            livroJSON
        );

        let modelo = criarLivro(cont, livro);

        if (livro.status == "Lendo") {
            $("#lendo").append(modelo);
        }

        if (livro.status == "Quero Ler") {
            $("#queroLer").append(modelo);
        }

        if (livro.status == "Lido") {
            $("#lidos").append(modelo);
        }

        cont++;

        localStorage.setItem("valor", cont);
    }

    $("#cadastrar").hide();
}


// EDITAR
$("#editar").click(function () {

    let livroJSON = localStorage.getItem(
        "livro" + livroAtual
    );

    if (!livroJSON) {
        return;
    }

    let livro = JSON.parse(livroJSON);

    $("#nomeLivro").val(livro.nome);
    $("#autorLivro").val(livro.autor);
    $("#editoraLivro").val(livro.editora);
    $("#paginasLivro").val(livro.paginas);
    $("#paginasLidas").val(livro.paginasLidas);
    $("#generoLivro").val(livro.genero);
    $("#statusLivro").val(livro.status);
    $("#imagem").val(livro.imagem);

    editando = true;

    $("#janelaInformacoes").hide();
    $("#cadastrar").show();
});


// BUSCAR LIVROS
$(document).ready(function () {

    let limite = parseInt(localStorage.getItem("valor")) || 0;

    for (let i = 0; i < limite; i++) {

        let livroJSON = localStorage.getItem("livro" + i);

        if (!livroJSON) {
            continue;
        }

        let livro = JSON.parse(livroJSON);
        let modelo = criarLivro(i, livro);

        if (livro.status == "Lendo") {
            $("#lendo").append(modelo);
        }

        if (livro.status == "Quero Ler") {
            $("#queroLer").append(modelo);
        }

        if (livro.status == "Lido") {
            $("#lidos").append(modelo);
        }
    }
});


// MOSTRAR INFORMAÇÕES
function mostrarLivro(id) {

    livroAtual = id;

    let livroJSON = localStorage.getItem(
        "livro" + id
    );

    if (!livroJSON) {
        return;
    }

    let livro = JSON.parse(livroJSON);

    $("#infoNome").text(livro.nome);
    $("#infoAutor").text(livro.autor);
    $("#infoEditora").text(livro.editora);
    $("#infoPaginas").text(livro.paginas);
    $("#infoPaginasLidas").text(livro.paginasLidas);
    $("#infoGenero").text(livro.genero);
    $("#infoStatus").text(livro.status);

    $("#janelaInformacoes").show();
}


// FECHAR INFORMAÇÕES
$("#fecharInformacoes").click(function () {
    $("#janelaInformacoes").hide();
});


// EXCLUIR
function deletar() {

    $("#livro" + livroAtual).remove();

    localStorage.removeItem(
        "livro" + livroAtual
    );

    $("#janelaInformacoes").hide();
}
/*
$("#editar").click(function () {

    let livroJSON = localStorage.getItem("livro" + livroAtual);

    if (livroJSON) {

        let livro = JSON.parse(livroJSON);

        $("#nomeLivro").val(livro.nome);
        $("#autorLivro").val(livro.autor);
        $("#editoraLivro").val(livro.editora);
        $("#paginasLivro").val(livro.paginas);
        $("#paginasLidas").val(livro.paginasLidas);
        $("#generoLivro").val(livro.genero);
        $("#statusLivro").val(livro.status);
        $("#imagem").val(livro.imagem);

        $("#janelaInformacoes").hide();
        $("#cadastrar").show();
    }
});


$("#salvar").click(function () {
    exibir();
});


function calcularProgresso(paginas, paginasLidas) {

    paginas = parseInt(paginas) || 0;
    paginasLidas = parseInt(paginasLidas) || 0;

    if (paginas <= 0) {
        return 0;
    }

    let porcentagem = (paginasLidas / paginas) * 100;

    if (porcentagem > 100) {
        porcentagem = 100;
    }

    if (porcentagem < 0) {
        porcentagem = 0;
    }

    return Math.round(porcentagem);
}


function criarLivro(id, livro) {

    let modelo =
        '<div class="livro" id="livro' + id + '">' +
            '<div class="capa" onclick="mostrarLivro(' + id + ')">' +
                '<img src="' + livro.imagem + '">' +
            '</div>' +
        '</div>';

    if (livro.status == "Lendo") {

        let porcentagem = calcularProgresso(
            livro.paginas,
            livro.paginasLidas
        );

        modelo =
            '<div class="livro" id="livro' + id + '">' +
                '<div class="capa" onclick="mostrarLivro(' + id + ')">' +
                    '<img src="' + livro.imagem + '">' +
                '</div>' +
                '<div class="barraProgresso">' +
                    '<div class="barraProgressoPreenchida" style="width:' + porcentagem + '%;">' +
                        porcentagem + '%' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    return modelo;
}


function exibir() {

    let livro = {
        nome: $("#nomeLivro").val(),
        autor: $("#autorLivro").val(),
        editora: $("#editoraLivro").val(),
        paginas: $("#paginasLivro").val(),
        paginasLidas: $("#paginasLidas").val(),
        genero: $("#generoLivro").val(),
        status: $("#statusLivro").val(),
        imagem: $("#imagem").val()
    };

    localStorage.setItem(
        "livro" + livroAtual,
        JSON.stringify(livro)
    );

    $("#livro" + livroAtual).remove();

    let modelo = criarLivro(livroAtual, livro);

    if (livro.status == "Lendo") {
        $("#lendo").append(modelo);
    }

    if (livro.status == "Quero Ler") {
        $("#queroLer").append(modelo);
    }

    if (livro.status == "Lido") {
        $("#lidos").append(modelo);
    }

    $("#cadastrar").hide();
}


$(document).ready(function () {

    let limite = parseInt(localStorage.getItem("valor")) || 0;

    for (let i = 0; i < limite; i++) {

        let livroJSON = localStorage.getItem("livro" + i);

        if (livroJSON) {

            let livro = JSON.parse(livroJSON);
            let modelo = criarLivro(i, livro);

            if (livro.status == "Lendo") {
                $("#lendo").append(modelo);
            }

            if (livro.status == "Quero Ler") {
                $("#queroLer").append(modelo);
            }

            if (livro.status == "Lido") {
                $("#lidos").append(modelo);
            }
        }
    }
});


var livroAtual = 0;


function mostrarLivro(id) {

    livroAtual = id;

    let livroJSON = localStorage.getItem("livro" + id);

    if (livroJSON) {

        let livro = JSON.parse(livroJSON);

        $("#infoNome").text(livro.nome);
        $("#infoAutor").text(livro.autor);
        $("#infoEditora").text(livro.editora);
        $("#infoPaginas").text(livro.paginas);
        $("#infoPaginasLidas").text(livro.paginasLidas);
        $("#infoGenero").text(livro.genero);
        $("#infoStatus").text(livro.status);

        $("#janelaInformacoes").show();
    }
}


$("#fecharInformacoes").click(function () {
    $("#janelaInformacoes").hide();
});


function deletar() {

    $("#livro" + livroAtual).remove();

    localStorage.removeItem("livro" + livroAtual);

    $("#janelaInformacoes").hide();
}
*/
