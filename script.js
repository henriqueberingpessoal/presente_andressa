// ==========================================
// 1. LÓGICA DOS CARDS (TOQUE E SEGURE)
// ==========================================
const imagensCards = document.querySelectorAll('.card img');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');

function abrirModal(e) {
    e.preventDefault(); 
    modalImg.src = e.target.src; 
    modal.classList.add('active'); 
}

function fecharModal(e) {
    e.preventDefault();
    modal.classList.remove('active'); 
}

imagensCards.forEach(img => {
    img.addEventListener('touchstart', abrirModal); 
    img.addEventListener('touchend', fecharModal);  
    img.addEventListener('touchcancel', fecharModal); 

    img.addEventListener('mousedown', abrirModal);
    img.addEventListener('mouseup', fecharModal);
    img.addEventListener('mouseleave', fecharModal);

    img.addEventListener('contextmenu', (e) => e.preventDefault());
});

// ==========================================
// 2. LÓGICA DA GALERIA DE FAVORITOS
// ==========================================
const imagensGaleria = document.querySelectorAll('.gallery-grid img');
const galleryModal = document.getElementById('gallery-modal');
const galleryModalImg = document.getElementById('gallery-modal-img');
const closeBtn = document.getElementById('close-btn');
const galleryModalCaption = document.getElementById('gallery-modal-caption'); 

imagensGaleria.forEach(img => {
    img.addEventListener('click', (e) => {
        galleryModalImg.src = e.target.src; 
        const legenda = e.target.getAttribute('data-legenda');
        galleryModalCaption.textContent = legenda; 
        galleryModal.classList.add('active'); 
    });
});

closeBtn.addEventListener('click', () => {
    galleryModal.classList.remove('active');
});

galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        galleryModal.classList.remove('active');
    }
});

// ==========================================
// 3. LÓGICA DA SURPRESA FINAL (CARTINHA)
// ==========================================
const surpriseBtn = document.getElementById('surprise-btn');
const surpriseContent = document.getElementById('surprise-content');

if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
        surpriseBtn.style.opacity = '0';
        
        setTimeout(() => {
            surpriseBtn.style.display = 'none'; 
            surpriseContent.classList.add('show'); 
            
            setTimeout(() => {
                surpriseContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            
        }, 500); 
    });
}

// ==========================================
// 4. NOVA LÓGICA DOS STORIES (FOTOS E VÍDEOS)
// ==========================================

// O Banco de Dados dos seus Stories - Configure os caminhos reais aqui!
const storiesData = {
    viagens: [
        { type: 'image', src: 'imagens/viagem1.JPEG', legenda: 'Nossa melhor viagem ✈️' },
        { type: 'video', src: 'imagens/videozinho.mp4', legenda: 'Aquele dia especial 🎥' }, // Exemplo de vídeo
        { type: 'image', src: 'imagens/viagem3.JPEG', legenda: 'Olha que vista linda 😍' }
    ],
    lanches: [
        { type: 'image', src: 'imagens/fofinha.JPEG', legenda: 'Sempre comendo kkkk 🍔' },
        { type: 'image', src: 'imagens/doce.JPEG', legenda: 'Aquele docinho de lei 🍫' }
    ],
    roles: [
        { type: 'image', src: 'destaques/bailechave.JPEG', legenda: 'A gente é muito chique 🥂' },
        { type: 'image', src: 'destaques/festa.JPEG', legenda: 'Dançamos a noite toda 💃🕺' }
    ]
};

// Variáveis de controle do sistema de Stories
let currentStoryKey = '';
let currentStoryIndex = 0;

const storyItems = document.querySelectorAll('.story-item');
const galleryModalVid = document.getElementById('gallery-modal-vid'); // Seleciona a tag de vídeo do HTML

// Quando ela clica na bolinha do destaque
storyItems.forEach(item => {
    item.addEventListener('click', () => {
        currentStoryKey = item.getAttribute('data-story');
        currentStoryIndex = 0; // Sempre começa do primeiro item da lista
        
        mostrarStoryAtual();
        galleryModal.classList.add('active');
    });
});

// Função central que decide se exibe foto ou vídeo na tela
function mostrarStoryAtual() {
    const listaMidias = storiesData[currentStoryKey];
    const itemAtual = listaMidias[currentStoryIndex];
    
    galleryModalCaption.textContent = itemAtual.legenda;

    if (itemAtual.type === 'video') {
        // Se for vídeo: esconde a imagem, exibe o vídeo e dá play
        galleryModalImg.style.display = 'none';
        galleryModalVid.style.display = 'block';
        galleryModalVid.src = itemAtual.src;
        galleryModalVid.play();
    } else {
        // Se for foto: esconde o vídeo, pausa ele por segurança e exibe a imagem
        galleryModalVid.style.display = 'none';
        galleryModalVid.pause();
        galleryModalImg.style.display = 'block';
        galleryModalImg.src = itemAtual.src;
    }
}

// O Efeito Instagram Avançado: Controla os cliques dentro do modal
galleryModal.addEventListener('click', (e) => {
    // Se ela clicar nas bordas pretas (fundo) ou no botão X, fecha e pausa a mídia
    if (e.target === galleryModal || e.target === closeBtn) {
        currentStoryKey = '';
        galleryModalVid.pause();
        return;
    }

    // Se estivermos visualizando um story e ela tocar na tela (na foto ou no vídeo)
    if (currentStoryKey !== '') {
        const listaMidias = storiesData[currentStoryKey];
        
        // Se ainda tem próximos itens na lista, avança
        if (currentStoryIndex < listaMidias.length - 1) {
            currentStoryIndex++;
            mostrarStoryAtual();
        } else {
            // Se os stories acabaram, fecha o modal e reseta
            galleryModal.classList.remove('active');
            galleryModalVid.pause();
            currentStoryKey = ''; 
        }
    }
});

// Força o vídeo a pausar se ela clicar especificamente em cima do X
closeBtn.addEventListener('click', () => {
    currentStoryKey = '';
    galleryModalVid.pause();
});