const container = document.getElementById("cards-container");

let nextPageUrl = "https://rickandmortyapi.com/api/character";
let carregando = false;

function carregarPersonagens() {
    if (!nextPageUrl || carregando) return;

    carregando = true;

    fetch(nextPageUrl)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(personagem => {
                criarCard(personagem);
            });

            nextPageUrl = data.info.next;
            carregando = false;
        })
        .catch(error => {
            console.error("Erro ao carregar personagens:", error);
            carregando = false;
        });
}

function criarCard(personagem) {
    const card = document.createElement("div");
    card.classList.add("card");

    const imagem = document.createElement("img");
    imagem.src = personagem.image;
    imagem.alt = personagem.name;

    const nome = document.createElement("h3");
    nome.textContent = personagem.name;

    const status = document.createElement("p");
    status.textContent = `Status: ${personagem.status}`;

    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(status);

    container.appendChild(card);
}

// Detecta o scroll da página
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
        carregarPersonagens();
    }
});

// Primeira carga
carregarPersonagens();