// ==========================================
// 1. LÓGICA DOS CARDS (TOQUE E SEGURE COM DELEGAÇÃO)
// ==========================================
const containerCards = document.getElementById('container-divertido');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
let pressTimer = null;

function exibirPreviewCard(src) {
    modalImg.src = src;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
}

function fecharPreviewCard() {
    clearTimeout(pressTimer);
    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
}

if (containerCards && modal && modalImg) {
    containerCards.addEventListener('touchstart', (e) => {
        const img = e.target.closest('.card img');
        if (!img) return;
        pressTimer = setTimeout(() => exibirPreviewCard(img.src), 150);
    }, { passive: true });

    containerCards.addEventListener('touchmove', () => clearTimeout(pressTimer), { passive: true });
    containerCards.addEventListener('touchend', fecharPreviewCard);
    containerCards.addEventListener('touchcancel', fecharPreviewCard);

    containerCards.addEventListener('mousedown', (e) => {
        const img = e.target.closest('.card img');
        if (!img) return;
        e.preventDefault();
        exibirPreviewCard(img.src);
    });

    window.addEventListener('mouseup', fecharPreviewCard);
    containerCards.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.card img')) e.preventDefault();
    });
}

// ==========================================
// 2. LÓGICA DA GALERIA DE FAVORITOS E STORIES
// ==========================================
const galeriaFotos = document.getElementById('galeria-fotos');
const galleryModal = document.getElementById('gallery-modal');
const galleryModalImg = document.getElementById('gallery-modal-img');
const galleryModalVid = document.getElementById('gallery-modal-vid');
const closeBtn = document.getElementById('close-btn');
const galleryModalCaption = document.getElementById('gallery-modal-caption');
const prevBtn = document.getElementById('story-prev-btn');
const nextBtn = document.getElementById('story-next-btn');

const TRANSPARENT_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="rgba(0,0,0,0)"/></svg>';

let currentStoryKey = '';
let currentStoryIndex = 0;

function abrirGalleryModal() {
    galleryModal.classList.add('active');
    galleryModal.setAttribute('aria-hidden', 'false');
}

function fecharGeralModal() {
    currentStoryKey = '';
    if (galleryModalVid) {
        galleryModalVid.pause();
        galleryModalVid.removeAttribute('src');
    }
    galleryModal.classList.remove('active');
    galleryModal.setAttribute('aria-hidden', 'true');
}

if (galeriaFotos) {
    galeriaFotos.addEventListener('click', (e) => {
        const img = e.target.closest('img');
        if (!img) return;

        currentStoryKey = '';
        if (galleryModalVid) {
            galleryModalVid.style.display = 'none';
            galleryModalVid.pause();
        }

        if (prevBtn) prevBtn.classList.add('escondido');
        if (nextBtn) nextBtn.classList.add('escondido');

        galleryModalImg.style.display = 'block';
        galleryModalImg.src = img.src;
        galleryModalCaption.textContent = img.dataset.legenda || '';
        abrirGalleryModal();
    });
}

// ==========================================
// 3. LÓGICA DA SURPRESA FINAL (CARTINHA)
// ==========================================
const surpriseBtn = document.getElementById('surprise-btn');
const surpriseContent = document.getElementById('surprise-content');

if (surpriseBtn && surpriseContent) {
    surpriseBtn.addEventListener('click', () => {
        for (let i = 0; i < 40; i++) {
            setTimeout(criarCoracao, i * 120);
        }

        surpriseBtn.style.opacity = '0';

        setTimeout(() => {
            surpriseBtn.style.display = 'none';
            surpriseContent.classList.add('show');

            setTimeout(() => {
                surpriseContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }, 500);
    }, { once: true });
}

// ==========================================
// 4. LÓGICA DOS STORIES (FOTOS E VÍDEOS)
// ==========================================
const storiesData = {
    viagens: [
        { type: 'video', src: 'destaques/2024/1.mp4', legenda: 'minha carinha de quem tava doido por um beijo' },
        { type: 'image', src: 'destaques/2024/2.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2024/3.jpeg', legenda: 'só de você ter sentado do meu lado meu dia já tinha fica melhor kkkkkk' },
        { type: 'image', src: 'destaques/2024/4.jpeg', legenda: 'eu completamente apaixonado' },
        { type: 'image', src: 'destaques/2024/5.jpeg', legenda: 'acho que esse seria nosso primeiro encontro, né?' },
        { type: 'image', src: 'destaques/2024/6.jpeg', legenda: 'um dos melhores dias do ano, fiquei tão feliz' },
        { type: 'image', src: 'destaques/2024/7.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2024/8.jpeg', legenda: 'fiquei muito triste quando você foi embora, mas a felicidade de você pelo menos ter ido foi maior' },
        { type: 'image', src: 'destaques/2024/9.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2024/10.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2024/11.jpeg', legenda: 'eu gosto muito dessa foto' },
        { type: 'image', src: 'destaques/2024/12.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2024/13.jpeg', legenda: 'fofinhos' }
    ],
    lanches: [
        { type: 'image', src: 'destaques/2025/1.jpeg', legenda: 'gosto muito dessa foto, você toda fofinha' },
        { type: 'image', src: 'destaques/2025/2.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2025/3.jpeg', legenda: 'o beijo mais gostoso' },
        { type: 'image', src: 'destaques/2025/4.jpeg', legenda: 'nóis depois do café da manhã, saudades' },
        { type: 'image', src: 'destaques/2025/5.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2025/6.jpeg', legenda: 'toda se querendo' },
        { type: 'image', src: 'destaques/2025/7.jpeg', legenda: 'amo beijinhos' },
        { type: 'video', src: 'destaques/2025/8.mp4', legenda: 'minha cantora' },
        { type: 'image', src: 'destaques/2025/9.jpeg', legenda: 'os mais estilosos' },
        { type: 'image', src: 'destaques/2025/10.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2025/11.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2025/12.jpeg', legenda: 'adorou essa foto né' },
        { type: 'image', src: 'destaques/2025/13.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2025/14.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2025/15.jpeg', legenda: 'beijinho na lindona' },
        { type: 'image', src: 'destaques/2025/16.jpeg', legenda: 'as melhores fantasias do trote' },
        { type: 'image', src: 'destaques/2025/17.jpeg', legenda: 'os melhores dançarinos' },
        { type: 'image', src: 'destaques/2025/18.jpeg', legenda: 'fofa' },
        { type: 'image', src: 'destaques/2025/27.jpeg', legenda: 'tão gatinha meu amor' },
        { type: 'image', src: 'destaques/2025/19.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2025/20.jpeg', legenda: 'tão bom ir dormir com meu amor, eu tava estiloso demais' },
        { type: 'image', src: 'destaques/2025/21.jpeg', legenda: 'tão linda meu amor' },
        { type: 'image', src: 'destaques/2025/22.jpeg', legenda: '"primeira" vez na casa da lindona, foi massa' },
        { type: 'image', src: 'destaques/2025/23.jpeg', legenda: 'lindos' },
        { type: 'image', src: 'destaques/2025/24.jpeg', legenda: 'eu extremamente apaixonado, como sempre' },
        { type: 'image', src: 'destaques/2025/25.jpeg', legenda: '' },
        { type: 'image', src: 'destaques/2025/26.jpeg', legenda: 'fofinha linda' }
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
        { type: 'image', src: 'destaques/2026/16.jpeg', legenda: 'muito bom esse final de semana, te amo' },
        { type: 'image', src: 'destaques/2026/17.jpeg', legenda: '🤨' },
        { type: 'image', src: 'destaques/2026/18.jpeg', legenda: 'modelos' },
        { type: 'image', src: 'destaques/2026/19.jpeg', legenda: 'gatinha pspspsps' },
        { type: 'image', src: 'destaques/2026/20.jpeg', legenda: 'palhacinha, alá teu pai' },
        { type: 'image', src: 'destaques/2026/21.jpeg', legenda: 'linda demais meu deus' },
        { type: 'image', src: 'destaques/2026/22.jpeg', legenda: 'chave' },
        { type: 'image', src: 'destaques/2026/23.jpeg', legenda: 'lindos' },
        { type: 'image', src: 'destaques/2026/24.jpeg', legenda: 'feliz' },
        { type: 'image', src: 'destaques/2026/25.jpeg', legenda: 'abotoa ai meu amor' },
        { type: 'image', src: 'destaques/2026/26.jpeg', legenda: 'esse dia foi massa' },
        { type: 'video', src: 'destaques/2026/27.mp4', legenda: 'minha dançarina favorita' },
        { type: 'video', src: 'destaques/2026/28.mp4', legenda: 'manja muito do passinho do jamal' },
        { type: 'image', src: 'destaques/2026/29.jpeg', legenda: 'nóis no aniversário da rafaela' },
        { type: 'image', src: 'destaques/2026/30.jpeg', legenda: 'de ontem' },
        { type: 'image', src: 'destaques/2026/31.jpeg', legenda: 'esse dia foi louco demais😭' },
        { type: 'image', src: '', legenda: 'Ainda temos muito tempo pra tirar muitas fotos esse ano, e nos próximos, beijos lindona' }
    ]
};

const storiesWrapper = document.querySelector('.stories-wrapper');

if (storiesWrapper) {
    storiesWrapper.addEventListener('click', (e) => {
        const item = e.target.closest('.story-item');
        if (!item) return;

        currentStoryKey = item.dataset.story;
        currentStoryIndex = 0;

        if (prevBtn) prevBtn.classList.remove('escondido');
        if (nextBtn) nextBtn.classList.remove('escondido');

        mostrarStoryAtual();
        abrirGalleryModal();
    });
}

function preCarregarProximoStory(listaMidias, indiceAtual) {
    const proximoItem = listaMidias[indiceAtual + 1];
    if (proximoItem && proximoItem.type === 'image' && proximoItem.src) {
        const preloadImg = new Image();
        preloadImg.src = proximoItem.src;
    }
}

function mostrarStoryAtual() {
    if (!currentStoryKey) return;

    const listaMidias = storiesData[currentStoryKey];
    const itemAtual = listaMidias[currentStoryIndex];

    galleryModalCaption.textContent = itemAtual.legenda || '';

    if (prevBtn) {
        prevBtn.classList.toggle('escondido', currentStoryIndex === 0);
    }

    preCarregarProximoStory(listaMidias, currentStoryIndex);

    if (itemAtual.src === '') {
        if (galleryModalVid) {
            galleryModalVid.style.display = 'none';
            galleryModalVid.pause();
        }
        galleryModalImg.style.display = 'block';
        galleryModalImg.src = TRANSPARENT_SVG;
        return;
    }

    if (itemAtual.type === 'video') {
        galleryModalImg.style.display = 'none';
        if (galleryModalVid) {
            galleryModalVid.style.display = 'block';
            galleryModalVid.src = itemAtual.src;
            galleryModalVid.play().catch(() => {});
        }
    } else {
        if (galleryModalVid) {
            galleryModalVid.style.display = 'none';
            galleryModalVid.pause();
        }
        galleryModalImg.style.display = 'block';
        galleryModalImg.src = itemAtual.src;
    }
}

function voltarAcao() {
    if (currentStoryKey !== '' && currentStoryIndex > 0) {
        currentStoryIndex--;
        mostrarStoryAtual();
    }
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

if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        voltarAcao();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        avancarAcao();
    });
}

function toqueInteligenteMidia(e) {
    if (!currentStoryKey) return;
    e.stopPropagation();

    const clickX = e.clientX || (e.touches && e.touches[0].clientX);
    if (clickX < window.innerWidth * 0.35) {
        voltarAcao();
    } else {
        avancarAcao();
    }
}

if (galleryModalImg) galleryModalImg.addEventListener('click', toqueInteligenteMidia);
if (galleryModalVid) galleryModalVid.addEventListener('click', toqueInteligenteMidia);

if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) fecharGeralModal();
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', fecharGeralModal);
}

// ==========================================
// 5. LÓGICA DO CONTADOR DE TEMPO JUNTOS
// ==========================================
const dataInicio = new Date('2024-10-19T00:00:00').getTime();
const elDias = document.getElementById('cnt-dias');
const elHoras = document.getElementById('cnt-horas');
const elMin = document.getElementById('cnt-min');
const elSeg = document.getElementById('cnt-seg');

function atualizarContador() {
    const diferenca = Date.now() - dataInicio;

    const dias = String(Math.floor(diferenca / 86400000));
    const horas = String(Math.floor((diferenca % 86400000) / 3600000)).padStart(2, '0');
    const minutos = String(Math.floor((diferenca % 3600000) / 60000)).padStart(2, '0');
    const segundos = String(Math.floor((diferenca % 60000) / 1000)).padStart(2, '0');

    if (elDias && elDias.textContent !== dias) elDias.textContent = dias;
    if (elHoras && elHoras.textContent !== horas) elHoras.textContent = horas;
    if (elMin && elMin.textContent !== minutos) elMin.textContent = minutos;
    if (elSeg && elSeg.textContent !== segundos) elSeg.textContent = segundos;
}

atualizarContador();
setInterval(atualizarContador, 1000);

// ==========================================
// 6. FUNÇÃO AUXILIAR: CHUVA DE CORAÇÕES
// ==========================================
function criarCoracao() {
    const coracao = document.createElement('div');
    coracao.className = 'coracao-chuva';
    coracao.style.left = `${Math.random() * 100}vw`;
    coracao.style.fontSize = `${Math.random() * 15 + 15}px`;
    coracao.textContent = '❤️';

    document.body.appendChild(coracao);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            coracao.style.transform = `translateY(115vh) rotate(${Math.random() * 360}deg)`;
            coracao.style.opacity = '0';
        });
    });

    setTimeout(() => coracao.remove(), 4050);
}

// ==========================================
// 7. PLAYLIST + ILHA DINÂMICA (MINI PLAYER ESTILO IPHONE / SPOTIFY)
// ==========================================
const musicBtn = document.getElementById('music-btn');
const fabIconIdle = document.getElementById('fab-icon-idle');
const fabIconPlaying = document.getElementById('fab-icon-playing');

const playlistModal = document.getElementById('playlist-modal');
const closePlaylistBtn = document.getElementById('close-playlist-btn');
const playlistOptions = document.querySelector('.playlist-options');
const trackBtns = Array.from(document.querySelectorAll('.track-btn'));
const bgMusic = document.getElementById('bg-music');

// Elementos da Ilha Dinâmica
const dynamicIsland = document.getElementById('dynamic-island');
const islandOpenPlaylist = document.getElementById('island-open-playlist');
const islandEq = document.getElementById('island-eq');
const islandTrackName = document.getElementById('island-track-name');
const islandPrevBtn = document.getElementById('island-prev-btn');
const islandPlayBtn = document.getElementById('island-play-btn');
const islandNextBtn = document.getElementById('island-next-btn');
const islandVolBtn = document.getElementById('island-vol-btn');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const iconVolHigh = document.getElementById('icon-vol-high');
const iconVolMute = document.getElementById('icon-vol-mute');
const islandVolumePanel = document.getElementById('island-volume-panel');
const islandVolumeSlider = document.getElementById('island-volume-slider');
const islandVolumePct = document.getElementById('island-volume-pct');

let currentTrackIndex = -1;
let audioCtx = null;
let gainNode = null;

// Inicializa controle de ganho Web Audio (permite controlar o volume do site mesmo no iOS)
function garantirControleVolumeWebAudio() {
    if (audioCtx || !bgMusic) return;
    if (window.location.protocol === 'file:') return; // Evita restrição CORS em arquivo local
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
        const source = audioCtx.createMediaElementSource(bgMusic);
        gainNode = audioCtx.createGain();
        gainNode.gain.value = parseFloat(islandVolumeSlider ? islandVolumeSlider.value : 0.8);
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
    } catch (_) {
        // Caso o navegador não permita, usa bgMusic.volume normalmente
    }
}

function aplicarVolumeSite(valor) {
    const vol = Math.max(0, Math.min(1, parseFloat(valor)));
    if (bgMusic) {
        bgMusic.volume = vol;
        bgMusic.muted = (vol === 0);
    }
    if (gainNode) {
        gainNode.gain.value = vol;
    }
    if (islandVolumePct) {
        islandVolumePct.textContent = `${Math.round(vol * 100)}%`;
    }
    if (iconVolHigh && iconVolMute) {
        iconVolHigh.style.display = vol === 0 ? 'none' : 'block';
        iconVolMute.style.display = vol === 0 ? 'block' : 'none';
    }
}

// Configura volume inicial (80%)
aplicarVolumeSite(0.8);

function atualizarInterfacePlayer(estaTocando) {
    // Ícone do botão flutuante inferior
    if (musicBtn && fabIconIdle && fabIconPlaying) {
        musicBtn.classList.toggle('is-playing', estaTocando);
        fabIconIdle.style.display = estaTocando ? 'none' : 'block';
        fabIconPlaying.style.display = estaTocando ? 'flex' : 'none';
    }

    // Ícones e equalizador da Ilha Dinâmica
    if (iconPlay && iconPause) {
        iconPlay.style.display = estaTocando ? 'none' : 'block';
        iconPause.style.display = estaTocando ? 'block' : 'none';
    }
    if (islandEq) {
        islandEq.classList.toggle('playing', estaTocando);
    }

    // Destaque na lista da playlist
    trackBtns.forEach((btn, idx) => {
        btn.classList.toggle('playing', idx === currentTrackIndex && estaTocando);
    });
}

function mostrarIlhaDinamica() {
    if (!dynamicIsland) return;
    dynamicIsland.classList.remove('dismissing');
    dynamicIsland.style.setProperty('--drag-x', '0px');
    dynamicIsland.style.opacity = '';
    dynamicIsland.classList.add('active');
    dynamicIsland.setAttribute('aria-hidden', 'false');
}

function fecharIlhaEPausar() {
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
    currentTrackIndex = -1;
    atualizarInterfacePlayer(false);

    if (islandVolumePanel) {
        islandVolumePanel.classList.remove('open');
        islandVolumePanel.setAttribute('aria-hidden', 'true');
    }

    if (dynamicIsland) {
        dynamicIsland.classList.remove('active', 'dragging');
        dynamicIsland.classList.add('dismissing');
        dynamicIsland.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            dynamicIsland.classList.remove('dismissing');
            dynamicIsland.style.setProperty('--drag-x', '0px');
            dynamicIsland.style.opacity = '';
        }, 380);
    }
}

function tocarFaixaPorIndice(index) {
    if (!bgMusic || trackBtns.length === 0) return;

    currentTrackIndex = (index + trackBtns.length) % trackBtns.length;
    const btnAlvo = trackBtns[currentTrackIndex];
    const musicSrc = btnAlvo.dataset.src;
    const nomeFaixa = btnAlvo.textContent.trim();

    garantirControleVolumeWebAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
    }

    if (bgMusic.getAttribute('src') !== musicSrc) {
        bgMusic.src = musicSrc;
    }

    if (islandTrackName) {
        islandTrackName.textContent = nomeFaixa;
    }

    mostrarIlhaDinamica();

    bgMusic.play()
        .then(() => atualizarInterfacePlayer(true))
        .catch(() => atualizarInterfacePlayer(false));
}

function alternarPlayPause() {
    if (!bgMusic) return;

    if (currentTrackIndex === -1) {
        tocarFaixaPorIndice(0);
        return;
    }

    if (bgMusic.paused) {
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().catch(() => {});
        }
        bgMusic.play()
            .then(() => atualizarInterfacePlayer(true))
            .catch(() => {});
    } else {
        bgMusic.pause();
        atualizarInterfacePlayer(false);
    }
}

function proximaFaixa() {
    tocarFaixaPorIndice(currentTrackIndex + 1);
}

function faixaAnterior() {
    if (bgMusic && bgMusic.currentTime > 3) {
        bgMusic.currentTime = 0;
    } else {
        tocarFaixaPorIndice(currentTrackIndex <= 0 ? trackBtns.length - 1 : currentTrackIndex - 1);
    }
}

function abrirPlaylist() {
    if (!playlistModal) return;
    playlistModal.classList.add('active');
    playlistModal.setAttribute('aria-hidden', 'false');
}

function fecharPlaylist() {
    if (!playlistModal) return;
    playlistModal.classList.remove('active');
    playlistModal.setAttribute('aria-hidden', 'true');
}

// Eventos do Modal de Playlist
if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        abrirPlaylist();
    });
}

if (islandOpenPlaylist) {
    islandOpenPlaylist.addEventListener('click', () => {
        abrirPlaylist();
    });
}

if (closePlaylistBtn) {
    closePlaylistBtn.addEventListener('click', fecharPlaylist);
}

if (playlistModal) {
    playlistModal.addEventListener('click', (e) => {
        if (e.target === playlistModal) fecharPlaylist();
    });
}

// Seleção de música na lista: toca a música, fecha o modal e abre a Ilha Dinâmica no topo
if (playlistOptions) {
    playlistOptions.addEventListener('click', (e) => {
        const btn = e.target.closest('.track-btn');
        if (!btn) return;

        const idx = trackBtns.indexOf(btn);
        if (idx !== -1) {
            tocarFaixaPorIndice(idx);
            fecharPlaylist();
        }
    });
}

// Controles da Ilha Dinâmica
if (islandPlayBtn) {
    islandPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        alternarPlayPause();
    });
}

if (islandNextBtn) {
    islandNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        proximaFaixa();
    });
}

if (islandPrevBtn) {
    islandPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        faixaAnterior();
    });
}

if (islandVolBtn && islandVolumePanel) {
    islandVolBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const aberto = islandVolumePanel.classList.toggle('open');
        islandVolumePanel.setAttribute('aria-hidden', String(!aberto));
    });
}

if (islandVolumeSlider) {
    islandVolumeSlider.addEventListener('input', (e) => {
        aplicarVolumeSite(e.target.value);
    });
}

if (bgMusic) {
    // Avança automaticamente para a próxima música ao terminar
    bgMusic.addEventListener('ended', proximaFaixa);
}

// ==========================================
// 8. GESTO DE ARRASTAR A ILHA PARA A ESQUERDA (FECHAR E PARAR MÚSICA)
// ==========================================
if (dynamicIsland) {
    let startX = 0;
    let currentX = 0;
    let isDraggingIsland = false;

    function iniciarArrasto(clientX, target) {
        // Não inicia arrasto da ilha se estiver mexendo na barra de volume
        if (target.closest('#island-volume-slider')) return;
        startX = clientX;
        currentX = 0;
        isDraggingIsland = true;
        dynamicIsland.classList.add('dragging');
    }

    function moverArrasto(clientX) {
        if (!isDraggingIsland) return;
        const deltaX = clientX - startX;
        // Permite arrastar para a esquerda (com leve resistência se puxar para a direita)
        currentX = deltaX < 0 ? deltaX : deltaX * 0.2;
        dynamicIsland.style.setProperty('--drag-x', `${currentX}px`);

        if (currentX < 0) {
            const opacidade = Math.max(0.25, 1 - Math.abs(currentX) / 180);
            dynamicIsland.style.opacity = String(opacidade);
        }
    }

    function finalizarArrasto() {
        if (!isDraggingIsland) return;
        isDraggingIsland = false;
        dynamicIsland.classList.remove('dragging');

        // Se arrastou mais de 65px para a esquerda, fecha a ilha e para a música
        if (currentX < -65) {
            fecharIlhaEPausar();
        } else {
            dynamicIsland.style.setProperty('--drag-x', '0px');
            dynamicIsland.style.opacity = '';
        }
        currentX = 0;
    }

    // Eventos Touch (Celular)
    dynamicIsland.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            iniciarArrasto(e.touches[0].clientX, e.target);
        }
    }, { passive: true });

    dynamicIsland.addEventListener('touchmove', (e) => {
        if (isDraggingIsland && e.touches.length === 1) {
            moverArrasto(e.touches[0].clientX);
        }
    }, { passive: true });

    dynamicIsland.addEventListener('touchend', finalizarArrasto);
    dynamicIsland.addEventListener('touchcancel', finalizarArrasto);

    // Eventos Mouse (Computador)
    dynamicIsland.addEventListener('mousedown', (e) => {
        if (e.target.closest('button')) return;
        iniciarArrasto(e.clientX, e.target);
    });

    window.addEventListener('mousemove', (e) => {
        if (isDraggingIsland) moverArrasto(e.clientX);
    });

    window.addEventListener('mouseup', finalizarArrasto);
}

// ==========================================
// 9. NAVEGAÇÃO POR TECLADO (ACESSIBILIDADE / DESKTOP)
// ==========================================
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        fecharPreviewCard();
        fecharGeralModal();
        fecharPlaylist();
    } else if (galleryModal && galleryModal.classList.contains('active') && currentStoryKey !== '') {
        if (e.key === 'ArrowLeft') voltarAcao();
        if (e.key === 'ArrowRight') avancarAcao();
    }
});
