///Script para salvar, editar, excluir e exibir dados dos livros

$("#abrir").click(function () {
    $("#cadastrar").show();
});

$("#fechar").click(function () {
    $("#cadastrar").hide();
});

$("#salvar").click(function () {
    alert('Livro salvo com sucesso!')
    salvar();
});

var cont = parseInt(localStorage.getItem('valor')) || 0;
var editando = false;

function salvar() {

    let nome = $("#nomeLivro").val();
    let autor = $("#autorLivro").val();
    let editora = $("#editoraLivro").val();
    let paginas = $("#paginasLivro").val();
    let genero = $("#generoLivro").val();
    let status = $("#statusLivro").val();
    let imagem = $("#imagem").val();

    let livro = {
        nome: nome,
        autor: autor,
        editora: editora,
        paginas: paginas,
        genero: genero,
        status: status,
        imagem: imagem
    };

    let livroJSON = JSON.stringify(livro);

    // SE ESTIVER EDITANDO
    if (editando) {

        // Atualiza o livro no localStorage
        localStorage.setItem("livro" + livroAtual, livroJSON);

        // Remove o livro da estante antiga
        $("#livro" + livroAtual).remove();

        // Adiciona novamente na estante correta
        var modelo =
            '<div class="livro" id="livro' + livroAtual + '">' +
            '<div class="capa" onclick="mostrarLivro(' + livroAtual + ')">' +
            '<img src="' + imagem + '">' +
            '</div>' +
            '</div>';

        if (status == "Lendo") {
            $("#lendo").append(modelo);
        }

        if (status == "Quero Ler") {
            $("#queroLer").append(modelo);
        }

        if (status == "Lido") {
            $("#lidos").append(modelo);
        }

        editando = false;
    }

    // SE FOR UM NOVO LIVRO
    else {

        var modelo =
            '<div class="livro" id="livro' + cont + '">' +
            '<div class="capa" onclick="mostrarLivro(' + cont + ')">' +
            '<img src="' + imagem + '">' +
            '</div>' +
            '</div>';

        if (status == "Lendo") {
            $("#lendo").append(modelo);
        }

        if (status == "Quero Ler") {
            $("#queroLer").append(modelo);
        }

        if (status == "Lido") {
            $("#lidos").append(modelo);
        }

        localStorage.setItem("livro" + cont, livroJSON);

        cont++;

        localStorage.setItem("valor", cont);
    }

    $("#cadastrar").hide();
}

$("#editar").click(function () {

    let livroJSON = localStorage.getItem("livro" + livroAtual);

    if (livroJSON) {

        let livro = JSON.parse(livroJSON);

        $("#nomeLivro").val(livro.nome);
        $("#autorLivro").val(livro.autor);
        $("#editoraLivro").val(livro.editora);
        $("#paginasLivro").val(livro.paginas);
        $("#generoLivro").val(livro.genero);
        $("#statusLivro").val(livro.status);
        $("#imagem").val(livro.imagem);

        editando = true;

        $("#janelaInformacoes").hide();
        $("#cadastrar").show();
    }
});

$(document).ready(function buscar() {

    let limite = parseInt(localStorage.getItem("valor")) || 0;

    for (let i = 0; i < limite; i++) {

        let livroJSON = localStorage.getItem("livro" + i);

        if (livroJSON) {

            let livro = JSON.parse(livroJSON);

            let modelo =
                '<div class="livro" id="livro' + i + '">' +
                '<div class="capa" onclick="mostrarLivro(' + i + ')">' +
                '<img src="' + livro.imagem + '">' +
                '</div>' +
                '</div>';

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

    // Pega o livro do localStorage
    let livroJSON = localStorage.getItem("livro" + id);

    // Verifica se o livro existe
    if (livroJSON) {

        // Transforma JSON em objeto
        let livro = JSON.parse(livroJSON);

        // Coloca as informações na janela
        $("#infoNome").text(livro.nome);
        $("#infoAutor").text(livro.autor);
        $("#infoEditora").text(livro.editora);
        $("#infoPaginas").text(livro.paginas);
        $("#infoGenero").text(livro.genero);
        $("#infoStatus").text(livro.status);

        // Mostra a janela
        $("#janelaInformacoes").show();
    }
}

$("#fecharInformacoes").click(function () {
    $("#janelaInformacoes").hide();
});

function deletar() {

    $('#livro' + livroAtual).remove();

    localStorage.removeItem('livro' + livroAtual);

    $("#janelaInformacoes").hide();
}

/*
// ======================================================
// EDITAR LIVRO
// ======================================================

$("#editar").click(function () {

    // Pega o livro selecionado
    let livroJSON = localStorage.getItem("livro" + livroAtual);

    if (livroJSON) {

        let livro = JSON.parse(livroJSON);

        // Preenche os campos com os dados do livro
        $("#nomeLivro").val(livro.nome);
        $("#autorLivro").val(livro.autor);
        $("#editoraLivro").val(livro.editora);
        $("#paginasLivro").val(livro.paginas);
        $("#generoLivro").val(livro.genero);
        $("#statusLivro").val(livro.status);
        $("#imagem").val(livro.imagem);

        // Fecha a janela de informações
        $("#janelaInformacoes").hide();

        // Abre a janela de edição
        $("#cadastrar").show();
    }
});


// ======================================================
// SALVAR ALTERAÇÕES
// ======================================================

$("#salvar").click(function () {

    exibir();

});


// ======================================================
// FUNÇÃO PARA ATUALIZAR O LIVRO
// ======================================================

function exibir() {

    // Pega os valores dos campos
    let nome = $("#nomeLivro").val();
    let autor = $("#autorLivro").val();
    let editora = $("#editoraLivro").val();
    let paginas = $("#paginasLivro").val();
    let genero = $("#generoLivro").val();
    let status = $("#statusLivro").val();
    let imagem = $("#imagem").val();

    // Cria o objeto livro
    let livro = {

        nome: nome,
        autor: autor,
        editora: editora,
        paginas: paginas,
        genero: genero,
        status: status,
        imagem: imagem

    };

    // Transforma o objeto em JSON
    let livroJSON = JSON.stringify(livro);

    // Atualiza o livro no localStorage
    localStorage.setItem("livro" + livroAtual, livroJSON);


    // ==================================================
    // REMOVE O LIVRO DA ESTANTE ANTIGA
    // ==================================================

    $("#livro" + livroAtual).remove();


    // ==================================================
    // CRIA NOVAMENTE A CAPA
    // ==================================================

    let modelo =
        '<div class="livro" id="livro' + livroAtual + '">' +
            '<div class="capa" onclick="mostrarLivro(' + livroAtual + ')">' +
                '<img src="' + imagem + '">' +
            '</div>' +
        '</div>';


    // ==================================================
    // COLOCA NA ESTANTE CORRETA
    // ==================================================

    if (status == "Lendo") {

        $("#lendo").append(modelo);

    }

    if (status == "Quero Ler") {

        $("#queroLer").append(modelo);

    }

    if (status == "Lido") {

        $("#lidos").append(modelo);

    }


    // Fecha a janela de edição
    $("#cadastrar").hide();

}


// ======================================================
// BUSCAR LIVROS SALVOS
// ======================================================

$(document).ready(function buscar() {

    // Pega a quantidade de livros salvos
    let limite = parseInt(localStorage.getItem("valor")) || 0;


    // Percorre os livros
    for (let i = 0; i < limite; i++) {

        let livroJSON = localStorage.getItem("livro" + i);


        // Verifica se o livro existe
        if (livroJSON) {

            // Converte JSON para objeto
            let livro = JSON.parse(livroJSON);


            // Cria a capa
            let modelo =
                '<div class="livro" id="livro' + i + '">' +
                    '<div class="capa" onclick="mostrarLivro(' + i + ')">' +
                        '<img src="' + livro.imagem + '">' +
                    '</div>' +
                '</div>';


            // Coloca o livro na estante correspondente
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


// ======================================================
// LIVRO ATUAL
// ======================================================

var livroAtual = 0;


// ======================================================
// MOSTRAR INFORMAÇÕES DO LIVRO
// ======================================================

function mostrarLivro(id) {

    // Guarda o ID do livro clicado
    livroAtual = id;


    // Pega o livro no localStorage
    let livroJSON = localStorage.getItem("livro" + id);


    // Verifica se o livro existe
    if (livroJSON) {

        // Converte JSON para objeto
        let livro = JSON.parse(livroJSON);


        // Coloca as informações na janela
        $("#infoNome").text(livro.nome);
        $("#infoAutor").text(livro.autor);
        $("#infoEditora").text(livro.editora);
        $("#infoPaginas").text(livro.paginas);
        $("#infoGenero").text(livro.genero);
        $("#infoStatus").text(livro.status);


        // Mostra a janela de informações
        $("#janelaInformacoes").show();

    }

}


// ======================================================
// FECHAR JANELA DE INFORMAÇÕES
// ======================================================

$("#fecharInformacoes").click(function () {

    $("#janelaInformacoes").hide();

});


// ======================================================
// EXCLUIR LIVRO
// ======================================================

function deletar() {

    // Remove a capa da tela
    $("#livro" + livroAtual).remove();

    // Remove o livro do localStorage
    localStorage.removeItem("livro" + livroAtual);

    // Fecha a janela de informações
    $("#janelaInformacoes").hide();

}
*/