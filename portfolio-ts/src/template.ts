import './styles/template-bundle.css';
import { projetosData } from './projects-data';

class CacheImg {
  private cache = new Map<string, boolean>();
  private readonly atrasoCascata = 160;

  async loadCascade(
    urls: string[],
    onLoad: (url: string, index: number) => void,
    onError?: (url: string, index: number) => void
  ): Promise<void> {
    for (let i = 0; i < urls.length; i++) {
      if (i > 0) await this.dormir(this.atrasoCascata);
      try {
        await this.carregarUm(urls[i]);
        onLoad(urls[i], i);
      } catch {
        onError?.(urls[i], i);
      }
    }
  }

  private carregarUm(url: string): Promise<void> {
    if (this.cache.get(url)) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => { this.cache.set(url, true); resolve(); };
      img.onerror = () => reject();
      img.src = url;
    });
  }

  private dormir(ms: number) {
    return new Promise<void>((r) => setTimeout(r, ms));
  }
}

const parametros = new URLSearchParams(window.location.search);
const chaveProjeto = parametros.get('project') ?? '';
const projeto = projetosData[chaveProjeto];

const modalZoom = document.getElementById('zoomModal')!;
const imgZoom = document.getElementById('zoomImg') as HTMLImageElement;
const fundoZoom = document.getElementById('zoomBackdrop')!;
const fecharZoomBtn = document.getElementById('zoomClose')!;
const infoInsp = document.getElementById('inspectInfo')!;

const elPrev = document.getElementById('zoomPrev')!;
const elNext = document.getElementById('zoomNext')!;

let idxAtu = 0;

function abrirZoom(index: number) {
  idxAtu = index;
  atualizarModalZoom();
  modalZoom.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function atualizarModalZoom() {
  const url = projeto.images[idxAtu];
  const total = projeto.images.length;
  imgZoom.src = url;
  infoInsp.textContent = `Screenshot ${idxAtu + 1} de ${total} | Resolução original carregada`;
}

function navegarZoom(dir: number) {
  const total = projeto.images.length;
  idxAtu = (idxAtu + dir + total) % total;
  atualizarModalZoom();
}

function fecharZoom() {
  modalZoom.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

fecharZoomBtn.addEventListener('click', fecharZoom);
fundoZoom.addEventListener('click', fecharZoom);
elPrev.addEventListener('click', (e) => { e.stopPropagation(); navegarZoom(-1); });
elNext.addEventListener('click', (e) => { e.stopPropagation(); navegarZoom(1); });

document.addEventListener('keydown', (e) => {
  if (modalZoom.getAttribute('aria-hidden') === 'false') {
    if (e.key === 'Escape') fecharZoom();
    if (e.key === 'ArrowLeft') navegarZoom(-1);
    if (e.key === 'ArrowRight') navegarZoom(1);
  }
});

if (!projeto) {
  const elErro = document.getElementById('not-found');
  const elMain = document.getElementById('template-main');
  if (elErro) elErro.style.display = 'flex';
  if (elMain) elMain.style.display = 'none';
} else {
  document.title = `${projeto.title} | Portfólio`;
  
  const elTit = document.getElementById('tpl-title');
  const elTitHero = document.getElementById('tpl-title-hero');
  const elSub = document.getElementById('tpl-subtitle');
  const elDesc = document.getElementById('tpl-description');
  const elCapa = document.getElementById('tpl-cover') as HTMLImageElement;
  const elCont = document.getElementById('tpl-counter');

  if (elTit) elTit.textContent = projeto.title;
  if (elTitHero) elTitHero.textContent = projeto.title;
  if (elSub) elSub.textContent = projeto.subtitle;
  if (elDesc) elDesc.textContent = projeto.description;
  if (elCapa) { 
    elCapa.src = projeto.cover; 
    elCapa.alt = projeto.title; 
  }
  if (elCont) elCont.textContent = `${projeto.images.length} imagens`;

  const tagsEl = document.getElementById('tpl-tags');
  if (tagsEl) {
    projeto.tags.forEach((tag) => {
      const s = document.createElement('span');
      s.className = 'tag';
      s.textContent = tag;
      tagsEl.appendChild(s);
    });
  }

  const techEl = document.getElementById('tpl-tech');
  if (techEl) {
    projeto.tech.forEach((t) => {
      const s = document.createElement('span');
      s.className = 'sr-tag';
      s.textContent = t;
      techEl.appendChild(s);
    });
  }

  const statsSection = document.getElementById('tpl-stats-section');
  const statsBar = document.getElementById('lang-stats-bar');
  const statsLabels = document.getElementById('lang-stats-labels');
  if (projeto.stats && statsSection && statsBar && statsLabels) {
    projeto.stats.forEach(stat => {
      const barPart = document.createElement('div');
      barPart.className = 'lang-bar-part';
      barPart.style.width = stat.value;
      barPart.style.backgroundColor = stat.color;
      statsBar.appendChild(barPart);

      const label = document.createElement('div');
      label.className = 'lang-label';
      label.innerHTML = `<span class="lang-dot" style="background-color: ${stat.color}"></span> <strong>${stat.label}</strong> ${stat.value}`;
      statsLabels.appendChild(label);
    });
  } else if (statsSection) {
    statsSection.style.display = 'none';
  }

  const featuresSection = document.getElementById('tpl-features-section');
  const featuresEl = document.getElementById('tpl-features');
  if (projeto.features && featuresSection && featuresEl) {
    projeto.features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      featuresEl.appendChild(li);
    });
  } else if (featuresSection) {
    featuresSection.style.display = 'none';
  }

  const teamSection = document.getElementById('tpl-team-section');
  const teamEl = document.getElementById('tpl-team');
  if (projeto.team && teamSection && teamEl) {
    Object.entries(projeto.team).forEach(([role, name]) => {
      const div = document.createElement('div');
      div.className = 'team-member';
      div.innerHTML = `<span class="team-role">${role}:</span> <span class="team-name">${name}</span>`;
      teamEl.appendChild(div);
    });
  } else if (teamSection) {
    teamSection.style.display = 'none';
  }

  const galleryEl = document.getElementById('tpl-gallery')!;

  projeto.images.forEach((url, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item skeleton';
    item.dataset.index = String(i);
    item.addEventListener('click', () => abrirZoom(i));

    const img = document.createElement('img');
    img.alt = `${projeto.title} — screenshot ${i + 1}`;
    img.className = 'gallery-img';

    const shimmer = document.createElement('div');
    shimmer.className = 'gallery-shimmer';

    item.appendChild(shimmer);
    item.appendChild(img);
    galleryEl.appendChild(item);
  });

  const carregador = new CacheImg();

  carregador.loadCascade(
    projeto.images,
    (_, i) => {
      const item = galleryEl.children[i] as HTMLElement;
      const img = item.querySelector<HTMLImageElement>('.gallery-img')!;
      img.src = projeto.images[i];
      item.style.setProperty('--reveal-delay', `${i * 40}ms`);
      item.classList.remove('skeleton');
      item.classList.add('loaded');
    },
    (_, i) => {
      const item = galleryEl.children[i] as HTMLElement;
      item.classList.remove('skeleton');
      item.classList.add('error');
    }
  );
}
