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
        { type: 'video', src: 'destaques/2024/1.MP4', legenda: 'minha carinha de quem tava doido por um beijo' },
        { type: 'image', src: 'destaques/2024/2.JPEG', legenda: ''},
        { type: 'image', src: 'destaques/2024/3.JPEG', legenda: ''},
        { type: 'image', src: 'destaques/2024/4.JPEG', legenda: ''},
        { type: 'image', src: 'destaques/2024/5.JPEG', legenda: ''},
        { type: 'image', src: 'destaques/2024/6.JPEG', legenda: ''},
        { type: 'image', src: 'destaques/2024/7.JPEG', legenda: ''},
        { type: 'image', src: 'destaques/2024/8.JPEG', legenda: ''},
        { type: 'image', src: 'destaques/2024/9.JPEG', legenda: ''},
        { type: 'image', src: 'destaques/2024/10.JPEG', legenda: ''},
        { type: 'image', src: 'destaques/2024/11.JPEG', legenda: ''},
        { type: 'image', src: 'destaques/2024/12.JPEG', legenda: ''},
        { type: 'image', src: 'destaques/2024/13.JPEG', legenda: ''},
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

// ... (Mantenha o seu banco de dados 'storiesData' e as variáveis 'currentStoryKey' e 'currentStoryIndex' como estão) ...

const storyItems = document.querySelectorAll('.story-item');
const galleryModalVid = document.getElementById('gallery-modal-vid');

// SELECIONA AS NOVAS SETAS AQUI:
const prevBtn = document.getElementById('story-prev-btn');
const nextBtn = document.getElementById('story-next-btn');

// Quando ela clica na bolinha do destaque
storyItems.forEach(item => {
    item.addEventListener('click', () => {
        currentStoryKey = item.getAttribute('data-story');
        currentStoryIndex = 0; 
        
        mostrarStoryAtual();
        galleryModal.classList.add('active');
    });
});

// Função centralizada atualizada para gerenciar a visibilidade da seta "Voltar"
function mostrarStoryAtual() {
    const listaMidias = storiesData[currentStoryKey];
    const itemAtual = listaMidias[currentStoryIndex];
    
    galleryModalCaption.textContent = itemAtual.legenda;

    // Se for o primeiro story, esconde a seta de voltar. Se não for, mostra!
    if (currentStoryIndex === 0) {
        prevBtn.classList.add('escondido');
    } else {
        prevBtn.classList.remove('escondido');
    }

    if (itemAtual.type === 'video') {
        galleryModalImg.style.display = 'none';
        galleryModalVid.style.display = 'block';
        galleryModalVid.src = itemAtual.src;
        galleryModalVid.play();
    } else {
        galleryModalVid.style.display = 'none';
        galleryModalVid.pause();
        galleryModalImg.style.display = 'block';
        galleryModalImg.src = itemAtual.src;
    }
}

// LÓGICA DA SETA ESQUERDA (VOLTAR)
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede o clique de se propagar para o modal e avançar a foto por acidente
    if (currentStoryKey !== '' && currentStoryIndex > 0) {
        currentStoryIndex--;
        mostrarStoryAtual();
    }
});

// LÓGICA DA SETA DIREITA (AVANÇAR)
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede cliques duplicados
    avancarAcao();
});

// Função auxiliar que faz o story ir para frente
function avancarAcao() {
    if (currentStoryKey !== '') {
        const listaMidias = storiesData[currentStoryKey];
        
        if (currentStoryIndex < listaMidias.length - 1) {
            currentStoryIndex++;
            mostrarStoryAtual();
        } else {
            galleryModal.classList.remove('active');
            galleryModalVid.pause();
            currentStoryKey = ''; 
        }
    }
}

// O clique geral no modal continua funcionando (ótimo para telas touch no PC ou cliques rápidos na imagem)
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal || e.target === closeBtn) {
        currentStoryKey = '';
        galleryModalVid.pause();
        return;
    }
    // Se não clicou nas setas nem no fundo, avança normalmente
    avancarAcao();
});

closeBtn.addEventListener('click', () => {
    currentStoryKey = '';
    galleryModalVid.pause();
});