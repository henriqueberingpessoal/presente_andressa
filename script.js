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
        { type: 'video', src: 'destaques/2024/1.mp4', legenda: 'minha carinha de quem tava doido por um beijo' },
        { type: 'image', src: 'destaques/2024/2.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2024/3.jpeg', legenda: 'só de você ter sentado do meu lado meu dia já tinha fica melhor kkkkkk'},
        { type: 'image', src: 'destaques/2024/4.jpeg', legenda: 'eu completamente apaixonado'},
        { type: 'image', src: 'destaques/2024/5.jpeg', legenda: 'acho que esse seria nosso primeiro encontro, né?'},
        { type: 'image', src: 'destaques/2024/6.jpeg', legenda: 'um dos melhores dias do ano, fiquei tão feliz'},
        { type: 'image', src: 'destaques/2024/7.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2024/8.jpeg', legenda: 'fiquei muito triste quando você foi embora, mas a felicidade de você pelo menos ter ido foi maior'},
        { type: 'image', src: 'destaques/2024/9.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2024/10.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2024/11.jpeg', legenda: 'eu gosto muito dessa foto'},
        { type: 'image', src: 'destaques/2024/12.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2024/13.jpeg', legenda: 'fofinhos'}
    ],
    lanches: [
        { type: 'image', src: 'destaques/2025/1.jpeg', legenda: 'gosto muito dessa foto, você toda fofinha'},
        { type: 'image', src: 'destaques/2025/2.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2025/3.jpeg', legenda: 'o beijo mais gostoso'},
        { type: 'image', src: 'destaques/2025/4.jpeg', legenda: 'nóis depois do café da manhã, saudades'},
        { type: 'image', src: 'destaques/2025/5.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2025/6.jpeg', legenda: 'toda se querendo'},
        { type: 'image', src: 'destaques/2025/7.jpeg', legenda: 'amo beijinhos'},
        { type: 'video', src: 'destaques/2025/8.mp4', legenda: 'minha cantora'},
        { type: 'image', src: 'destaques/2025/9.jpeg', legenda: 'os mais estilosos'},
        { type: 'image', src: 'destaques/2025/10.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2025/11.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2025/12.jpeg', legenda: 'adorou essa foto né'},
        { type: 'image', src: 'destaques/2025/13.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2025/14.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2025/15.jpeg', legenda: 'beijinho na lindona'},
        { type: 'image', src: 'destaques/2025/16.jpeg', legenda: 'as melhores fantasias do trote'},
        { type: 'image', src: 'destaques/2025/17.jpeg', legenda: 'os melhores dançarinos'},
        { type: 'image', src: 'destaques/2025/18.jpeg', legenda: 'fofa'},
        { type: 'image', src: 'destaques/2025/19.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2025/20.jpeg', legenda: 'tão bom ir dormir com meu amor, eu tava estiloso demais'},
        { type: 'image', src: 'destaques/2025/21.jpeg', legenda: 'tão linda meu amor'},
        { type: 'image', src: 'destaques/2025/22.jpeg', legenda: '"primeira" vez na casa da lindona, foi massa'},
        { type: 'image', src: 'destaques/2025/23.jpeg', legenda: 'lindos'},
        { type: 'image', src: 'destaques/2025/24.jpeg', legenda: 'eu extremamente apaixonado, como sempre'},
        { type: 'image', src: 'destaques/2025/25.jpeg', legenda: ''},
        { type: 'image', src: 'destaques/2025/26.jpeg', legenda: 'fofinha linda'}
    ],
    roles: [
        { type: 'image', src: 'destaques/2026/1.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2026/2.jpeg', legenda: 'linda de todos os ângulos, impressionante' },
        { type: 'image', src: 'destaques/2026/3.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2026/4.jpeg', legenda: 'fofos' },
        { type: 'image', src: 'destaques/2026/5.jpeg', legenda: 'fofos 2, esse seu olhar hein, gostei' },
        { type: 'image', src: 'destaques/2026/6.jpeg', legenda: 'sempre chave' },
        { type: 'image', src: 'destaques/2026/7.jpeg', legenda: 'esse dia foi muito bom, obrigado meu amor' },
        { type: 'image', src: 'destaques/2026/8.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2026/9.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2026/10.jpeg', legenda: 'lindíssima, gosto dessa foto' },
        { type: 'image', src: 'destaques/2026/11.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2026/12.jpeg', legenda: 'fofinha cheia de fome' },
        { type: 'image', src: 'destaques/2026/13.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2026/14.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2026/15.jpeg', legenda: '' },
        { type: 'image', src: '', legenda: 'Ainda temos muito tempo pra tirar muitas fotos esse ano, e nos próximos, beijos lindona' }
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