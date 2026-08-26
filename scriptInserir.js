$("#abrirr").click(function () {
    $("#janelaa").show();
});

$("#fechar").click(function () {
    $("#janelaa").hide();
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

        // Atualiza o livro existente
        localStorage.setItem("livro" + livroAtual, livroJSON);

        // Atualiza a capa
        $('#livro' + livroAtual + ' img').attr("src", imagem);

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

        $("#livro").append(modelo);

        localStorage.setItem("livro" + cont, livroJSON);

        cont++;

        localStorage.setItem("valor", cont);
    }

    $("#janelaa").hide();
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
        $("#janelaa").show();
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

            $("#livro").append(modelo);
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