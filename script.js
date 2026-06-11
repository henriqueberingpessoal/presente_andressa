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
// 2. LÓGICA DA GALERIA DE FAVORITOS E STORIES (ELEMENTOS)
// ==========================================
const imagensGaleria = document.querySelectorAll('.gallery-grid img');
const galleryModal = document.getElementById('gallery-modal');
const galleryModalImg = document.getElementById('gallery-modal-img');
const galleryModalVid = document.getElementById('gallery-modal-vid');
const closeBtn = document.getElementById('close-btn');
const galleryModalCaption = document.getElementById('gallery-modal-caption'); 

// SELECIONA AS SETAS DOS STORIES:
const prevBtn = document.getElementById('story-prev-btn');
const nextBtn = document.getElementById('story-next-btn');

// Clique na Galeria de Favoritos (Fotos Estáticas)
imagensGaleria.forEach(img => {
    img.addEventListener('click', (e) => {
        currentStoryKey = ''; // Garante que o sistema saiba que NÃO é um story
        if(galleryModalVid) { galleryModalVid.style.display = 'none'; galleryModalVid.pause(); }
        
        // Oculta as setas de navegação de stories na galeria normal
        if(prevBtn) prevBtn.classList.add('escondido');
        if(nextBtn) nextBtn.classList.add('escondido');

        galleryModalImg.style.display = 'block';
        galleryModalImg.src = e.target.src; 
        const legenda = e.target.getAttribute('data-legenda');
        galleryModalCaption.textContent = legenda || ''; 
        galleryModal.classList.add('active'); 
    });
});

// ==========================================
// 3. LÓGICA DA SURPRESA FINAL (CARTINHA)
// ==========================================
const surpriseBtn = document.getElementById('surprise-btn');
const surpriseContent = document.getElementById('surprise-content');

if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
        // --- INICIO DO GATILHO DA CHUVA DE CORAÇÕES ---
        for (let i = 0; i < 40; i++) {
            setTimeout(criarCoracao, i * 120); 
        }
        // --- FIM DO GATILHO ---

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
// 4. LÓGICA DOS STORIES (FOTOS E VÍDEOS)
// ==========================================

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
        { type: 'image', src: 'destaques/2025/27.jpeg', legenda: 'tão gatinha meu amor'},
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

let currentStoryKey = '';
let currentStoryIndex = 0;

const storyItems = document.querySelectorAll('.story-item');

// Quando clica no Destaque (Story)
storyItems.forEach(item => {
    item.addEventListener('click', () => {
        currentStoryKey = item.getAttribute('data-story');
        currentStoryIndex = 0; 
        
        // Exibe as setas de controle dos Stories
        if(prevBtn) prevBtn.classList.remove('escondido');
        if(nextBtn) nextBtn.classList.remove('escondido');

        mostrarStoryAtual();
        galleryModal.classList.add('active');
    });
});

function mostrarStoryAtual() {
    if (!currentStoryKey) return;

    const listaMidias = storiesData[currentStoryKey];
    const itemAtual = listaMidias[currentStoryIndex];
    
    galleryModalCaption.textContent = itemAtual.legenda || '';

    // Gerencia visibilidade da seta Voltar
    if (currentStoryIndex === 0) {
        if(prevBtn) prevBtn.classList.add('escondido');
    } else {
        if(prevBtn) prevBtn.classList.remove('escondido');
    }

    // Tratamento para texto/final sem foto (último item de 2026)
    if (itemAtual.src === '') {
        if(galleryModalVid) { galleryModalVid.style.display = 'none'; galleryModalVid.pause(); }
        galleryModalImg.style.display = 'block';
        galleryModalImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="rgba(0,0,0,0)"/></svg>'; // Imagem transparente
        return;
    }

    if (itemAtual.type === 'video') {
        galleryModalImg.style.display = 'none';
        if(galleryModalVid) {
            galleryModalVid.style.display = 'block';
            galleryModalVid.src = itemAtual.src;
            galleryModalVid.play().catch(() => console.log("O navegador bloqueou o autoplay imediato."));
        }
    } else {
        if(galleryModalVid) { galleryModalVid.style.display = 'none'; galleryModalVid.pause(); }
        galleryModalImg.style.display = 'block';
        galleryModalImg.src = itemAtual.src;
    }
}

// LÓGICA DA SETA ESQUERDA (VOLTAR)
if(prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentStoryKey !== '' && currentStoryIndex > 0) {
            currentStoryIndex--;
            mostrarStoryAtual();
        }
    });
}

// LÓGICA DA SETA DIREITA (AVANÇAR)
if(nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        avancarAcao();
    });
}

function avancarAcao() {
    if (currentStoryKey !== '') {
        const listaMidias = storiesData[currentStoryKey];
        
        if (currentStoryIndex < listaMidias.length - 1) {
            currentStoryIndex++;
            mostrarStoryAtual();
        } else {
            fecharGeralModal();
        }
    }
}

// TOQUE INTELIGENTE (ESTILO INSTAGRAM NATIVO)
function toqueInteligenteMidia(e) {
    if (!currentStoryKey) return; // Se não for um Story ativo (for galeria normal), ignora
    
    e.stopPropagation(); 
    
    const clickX = e.clientX || (e.touches && e.touches[0].clientX);
    const larguraTela = window.innerWidth;
    
    if (clickX < larguraTela * 0.35) {
        if (currentStoryIndex > 0) {
            currentStoryIndex--;
            mostrarStoryAtual();
        }
    } else {
        avancarAcao();
    }
}

// Aplica a inteligência de clique nas mídias do modal
galleryModalImg.addEventListener('click', toqueInteligenteMidia);
if(galleryModalVid) galleryModalVid.addEventListener('click', toqueInteligenteMidia);

// Função unificada para fechar móbile/modal
function fecharGeralModal() {
    currentStoryKey = '';
    if(galleryModalVid) galleryModalVid.pause();
    galleryModal.classList.remove('active');
}

// Fechar ao clicar no fundo preto ou no botão X
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        fecharGeralModal();
    }
});

if(closeBtn) {
    closeBtn.addEventListener('click', fecharGeralModal);
}

// ==========================================
// 5. LÓGICA DO CONTADOR DE TEMPO JUNTOS
// ==========================================
const dataInicio = new Date('2024-10-19T00:00:00');

function atualizarContador() {
    const agora = new Date();
    const diferenca = agora - dataInicio;
    
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    
    const elementoContador = document.getElementById('contador');
    if (elementoContador) {
        elementoContador.innerHTML = `
            <span><strong>${dias}</strong>dias</span>
            <span><strong>${String(horas).padStart(2, '0')}</strong>horas</span>
            <span><strong>${String(minutos).padStart(2, '0')}</strong>min</span>
            <span><strong>${String(segundos).padStart(2, '0')}</strong>seg</span>
        `;
    }
}

setInterval(atualizarContador, 1000);
atualizarContador();

// ==========================================
// 6. FUNÇÃO AUXILIAR: CRIAR CHUVA DE CORAÇÕES
// ==========================================
function criarCoracao() {
    const coracao = document.createElement('div');
    
    coracao.style.position = 'fixed'; 
    coracao.style.top = '-5vh'; 
    coracao.style.left = Math.random() * 100 + 'vw'; 
    coracao.style.fontSize = Math.random() * 15 + 15 + 'px'; 
    coracao.style.pointerEvents = 'none'; 
    coracao.style.zIndex = '9999'; 
    coracao.style.transition = 'transform 4s linear, opacity 4s ease-out';
    coracao.innerText = '❤️'; 
    
    document.body.appendChild(coracao);
    
    setTimeout(() => {
        coracao.style.transform = `translateY(115vh) rotate(${Math.random() * 360}deg)`;
        coracao.style.opacity = '0';
    }, 50); 
    
    setTimeout(() => {
        coracao.remove();
    }, 4050);
}

// ==========================================
// 7. CONTROLE DA PLAYLIST (POP-UP)
// ==========================================
const musicBtn = document.getElementById('music-btn');
const playlistModal = document.getElementById('playlist-modal');
const closePlaylistBtn = document.getElementById('close-playlist-btn');
const pauseTrackBtn = document.getElementById('pause-track-btn');
const bgMusic = document.getElementById('bg-music');
const trackBtns = document.querySelectorAll('.track-btn');

if(musicBtn && playlistModal) {
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playlistModal.classList.add('active');
    });

    if(closePlaylistBtn) {
        closePlaylistBtn.addEventListener('click', () => {
            playlistModal.classList.remove('active');
        });
    }

    playlistModal.addEventListener('click', (e) => {
        if (e.target === playlistModal) {
            playlistModal.classList.remove('active');
        }
    });
}

// Lógica de seleção e play das músicas
trackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const musicSrc = btn.getAttribute('data-src');
        
        // Verifica se é uma nova faixa comparando o atributo relativo diretamente
        if (bgMusic.getAttribute('src') !== musicSrc || bgMusic.paused) {
            bgMusic.src = musicSrc;
            bgMusic.play().catch(() => console.log("O navegador exigiu clique prévio para som."));
            if(musicBtn) musicBtn.innerText = '🔊'; 
        }
        
        trackBtns.forEach(b => b.classList.remove('playing'));
        btn.classList.add('playing');
    });
});

if(pauseTrackBtn && bgMusic) {
    pauseTrackBtn.addEventListener('click', () => {
        bgMusic.pause();
        if(musicBtn) musicBtn.innerText = '🎵'; 
        trackBtns.forEach(b => b.classList.remove('playing')); 
    });
}