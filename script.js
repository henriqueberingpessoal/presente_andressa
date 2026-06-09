// Seleciona todas as imagens que estão dentro dos cards
const imagensCards = document.querySelectorAll('.card img');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');

// Função para abrir a foto em tela cheia
function abrirModal(e) {
    e.preventDefault(); // Evita que o celular tente abrir o menu padrão
    modalImg.src = e.target.src; // Copia a foto que foi tocada para o telão
    modal.classList.add('active'); // Mostra a tela escura
}

// Função para fechar a foto
function fecharModal(e) {
    e.preventDefault();
    modal.classList.remove('active'); // Esconde a tela escura
}

// Adiciona o "ouvido" em cada imagem para saber quando ela toca e solta
imagensCards.forEach(img => {
    // Eventos para Celular (Toque do dedo)
    img.addEventListener('touchstart', abrirModal); // Tocou a tela
    img.addEventListener('touchend', fecharModal);  // Tirou o dedo da tela
    img.addEventListener('touchcancel', fecharModal); // Se o dedo deslizar para fora

    // Eventos para Computador (Mouse) - caso você teste no PC
    img.addEventListener('mousedown', abrirModal);
    img.addEventListener('mouseup', fecharModal);
    img.addEventListener('mouseleave', fecharModal);

    // Bloqueia o menu de contexto do celular/PC
    img.addEventListener('contextmenu', (e) => e.preventDefault());
});

// --- Lógica da Galeria de Favoritos (Clique para abrir, X para fechar e Mostrar Legenda) ---
const imagensGaleria = document.querySelectorAll('.gallery-grid img');
const galleryModal = document.getElementById('gallery-modal');
const galleryModalImg = document.getElementById('gallery-modal-img');
const closeBtn = document.getElementById('close-btn');
const galleryModalCaption = document.getElementById('gallery-modal-caption'); // Nova seleção

// 1. Abre a foto ao clicar e injeta o texto correspondente
imagensGaleria.forEach(img => {
    img.addEventListener('click', (e) => {
        galleryModalImg.src = e.target.src; // Pega a foto exata que foi clicada
        
        // Puxa o texto que está escondido no HTML 'data-legenda'
        const legenda = e.target.getAttribute('data-legenda');
        galleryModalCaption.textContent = legenda; // Joga o texto na tela
        
        galleryModal.classList.add('active'); // Mostra a tela escura
    });
});

// 2. Fecha ao clicar no botão X
closeBtn.addEventListener('click', () => {
    galleryModal.classList.remove('active');
});

// 3. Fecha ao clicar em qualquer lugar da tela escura (fora da foto)
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        galleryModal.classList.remove('active');
    }
});

// --- Lógica da Surpresa Final ---
const surpriseBtn = document.getElementById('surprise-btn');
const surpriseContent = document.getElementById('surprise-content');

if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
        // Esconde o botão sumindo com ele aos poucos
        surpriseBtn.style.opacity = '0';
        
        setTimeout(() => {
            surpriseBtn.style.display = 'none'; // Tira o botão do espaço
            surpriseContent.classList.add('show'); // Mostra a cartinha
            
            // Dá um tempinho extra e desce a tela automaticamente para ela ler a carta
            setTimeout(() => {
                surpriseContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            
        }, 500); // Espera meio segundo (tempo do botão sumir)
    });
}

// ==========================================
// LÓGICA DOS STORIES (MÚLTIPLAS FOTOS)
// ==========================================

// 1. O nosso "Banco de Dados" dos Stories
// Você pode adicionar quantas fotos quiser dentro de cada colchete [ ]
const storiesData = {
    viagens: [
        { src: 'imagens/viagem1.JPEG', legenda: 'Nossa melhor viagem ✈️' },
        { src: 'imagens/viagem2.JPEG', legenda: 'Aproveitando muito na praia 🏖️' },
        { src: 'imagens/viagem3.JPEG', legenda: 'Olha que vista linda 😍' }
    ],
    lanches: [
        { src: 'imagens/fofinha.JPEG', legenda: 'Sempre comendo kkkk 🍔' },
        { src: 'imagens/doce.JPEG', legenda: 'Aquele docinho de lei 🍫' }
    ],
    roles: [
        { src: 'imagens/bailechave.JPEG', legenda: 'A gente é muito chique 🥂' },
        { src: 'imagens/festa.JPEG', legenda: 'Dançamos a noite toda 💃🕺' }
    ]
};

// Variáveis de controle para saber onde estamos
let currentStoryKey = '';
let currentStoryIndex = 0;

const storyItems = document.querySelectorAll('.story-item');

// 2. Quando ela clica na bolinha do destaque
storyItems.forEach(item => {
    item.addEventListener('click', () => {
        currentStoryKey = item.getAttribute('data-story');
        currentStoryIndex = 0; // Sempre começa da primeira foto
        
        mostrarStoryAtual();
        galleryModal.classList.add('active');
    });
});

// Função que joga a foto e a legenda na tela
function mostrarStoryAtual() {
    const listaFotos = storiesData[currentStoryKey];
    galleryModalImg.src = listaFotos[currentStoryIndex].src;
    galleryModalCaption.textContent = listaFotos[currentStoryIndex].legenda;
}

// 3. O efeito Instagram: Tocar na foto para avançar
galleryModalImg.addEventListener('click', () => {
    // Só funciona se estivermos dentro do modo "Story"
    if (currentStoryKey !== '') {
        const listaFotos = storiesData[currentStoryKey];
        
        // Se ainda tem fotos na lista, vai para a próxima
        if (currentStoryIndex < listaFotos.length - 1) {
            currentStoryIndex++;
            mostrarStoryAtual();
        } else {
            // Se as fotos acabaram, fecha o modal automaticamente
            galleryModal.classList.remove('active');
            currentStoryKey = ''; // Reseta para o padrão
        }
    }
});

// 4. Limpar a memória caso ela feche no "X" ou clique no fundo preto
closeBtn.addEventListener('click', () => {
    currentStoryKey = ''; 
});

galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        currentStoryKey = ''; 
    }
});