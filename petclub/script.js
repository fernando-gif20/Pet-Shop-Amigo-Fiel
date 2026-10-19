let pets = [];

let petEditando = -1;


// ========================================
// CADASTRAR OU SALVAR ALTERAÇÃO
// ========================================

function cadastrarPet() {

    let nome = document.getElementById("nome").value;
    let especie = document.getElementById("especie").value;
    let porte = document.getElementById("porte").value;
    let idade = Number(document.getElementById("idade").value);
    let tutor = document.getElementById("tutor").value;

    let arquivoFoto =
        document.getElementById("foto").files[0];


    // Verificar campos

    if (
        nome == "" ||
        especie == "" ||
        porte == "" ||
        idade <= 0 ||
        tutor == ""
    ) {

        alert("Preencha todos os campos.");

        return;
    }


    // ========================================
    // SE ESTIVER EDITANDO
    // ========================================

    if (petEditando != -1) {

        pets[petEditando].nome = nome;

        pets[petEditando].especie = especie;

        pets[petEditando].porte = porte;

        pets[petEditando].idade = idade;

        pets[petEditando].tutor = tutor;


        // Se escolher uma nova foto

        if (arquivoFoto != undefined) {

            pets[petEditando].foto =
                URL.createObjectURL(arquivoFoto);

        }


        alert("Pet editado com sucesso!");


        petEditando = -1;


        document.getElementById(
            "botaoCadastro"
        ).textContent = "Cadastrar Pet";


        limparFormulario();

        mostrarPets();

        return;
    }


    // ========================================
    // NOVO CADASTRO
    // ========================================

    if (arquivoFoto == undefined) {

        alert("Selecione uma foto.");

        return;
    }


    let foto =
        URL.createObjectURL(arquivoFoto);


    let pet = {

        nome: nome,

        especie: especie,

        porte: porte,

        idade: idade,

        tutor: tutor,

        foto: foto

    };


    pets.push(pet);


    mostrarPets();


    limparFormulario();

}


// ========================================
// MOSTRAR PETS
// ========================================

function mostrarPets() {

    let lista =
        document.getElementById("listaPets");


    if (pets.length == 0) {

        lista.innerHTML =
            "<p>Nenhum pet cadastrado.</p>";

    } else {

        lista.innerHTML = "";


        for (
            let i = 0;
            i < pets.length;
            i++
        ) {

            let pet = pets[i];


            lista.innerHTML +=

                "<div class='pet'>" +

                "<img src='" +
                pet.foto +
                "'>" +

                "<h3>" +
                pet.nome +
                "</h3>" +

                "<p>Espécie: " +
                pet.especie +
                "</p>" +

                "<p>Porte: " +
                pet.porte +
                "</p>" +

                "<p>Idade: " +
                pet.idade +
                " ano(s)</p>" +

                "<p>Tutor: " +
                pet.tutor +
                "</p>" +

                "<button " +
                "class='botaoEditar' " +
                "onclick='editarPet(" +
                i +
                ")'>" +

                "✏️ Editar" +

                "</button>" +

                "</div>";
        }
    }


    document.getElementById(
        "totalPets"
    ).textContent = pets.length;

}


// ========================================
// EDITAR PET
// ========================================

function editarPet(indice) {

    let pet = pets[indice];


    document.getElementById("nome").value =
        pet.nome;


    document.getElementById("especie").value =
        pet.especie;


    document.getElementById("porte").value =
        pet.porte;


    document.getElementById("idade").value =
        pet.idade;


    document.getElementById("tutor").value =
        pet.tutor;


    petEditando = indice;


    document.getElementById(
        "botaoCadastro"
    ).textContent = "Salvar alteração";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ========================================
// LIMPAR FORMULÁRIO
// ========================================

function limparFormulario() {

    document.getElementById("nome").value = "";

    document.getElementById("especie").value = "";

    document.getElementById("porte").value = "";

    document.getElementById("idade").value = "";

    document.getElementById("tutor").value = "";

    document.getElementById("foto").value = "";

}


// ========================================
// REMOVER ÚLTIMO
// ========================================

function removerUltimo() {

    if (pets.length == 0) {

        alert("Não existem pets para remover.");

        return;
    }


    pets.pop();

    mostrarPets();

}
HHHHH444444444444

// ========================================
// LIMPAR LISTA
// ========================================

function limparLista() {

    if (pets.length == 0) {

        alert("A lista já está vazia.");

        return;
    }


    let confirmar = confirm(
        "Deseja realmente remover todos os pets?"
    );


    if (confirmar == true) {

        pets = [];

        mostrarPets();

    }

}