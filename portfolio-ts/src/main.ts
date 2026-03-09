import './styles/home-bundle.css';
import { projetosData } from './projects-data';

const elCargo = document.querySelector<HTMLHeadingElement>('#role');

if (elCargo) {
  const txt2type = "Estudante de ADS | Infraestrutura de Redes";
  let indiceAtual = 0;
  let concluido = false;

  const piscador = document.createElement('span');
  piscador.className = 'typed-cursor';
  elCargo.appendChild(piscador);

  const digitar = () => {
    if (indiceAtual < txt2type.length) {
      const nodoTexto = elCargo.childNodes[0];
      if (nodoTexto && nodoTexto.nodeType === Node.TEXT_NODE) {
        nodoTexto.textContent += txt2type.charAt(indiceAtual);
      } else {
        elCargo.insertBefore(
          document.createTextNode(txt2type.charAt(indiceAtual)),
          piscador
        );
      }
      indiceAtual++;
      setTimeout(digitar, 42);
    } else {
      concluido = true;
    }
  };

  setTimeout(digitar, 800);

  document.addEventListener('click', () => {
    if (concluido) piscador.style.display = 'none';
  }, { once: true });
}

const parallaxHero = document.getElementById('heroParallax');

if (parallaxHero) {
  const scrollListener = () => {
    const scrollY = window.scrollY;
    const offset = scrollY * 0.28;
    parallaxHero.style.transform = `translateY(${-offset}px)`;
    const viewportH = window.innerHeight;
    const opacidade = Math.max(0, 1 - (scrollY / (viewportH * 0.65)));
    parallaxHero.style.opacity = String(opacidade);
  };
  window.addEventListener('scroll', scrollListener, { passive: true });
}

const btnGlow = document.getElementById('heroCta') as HTMLAnchorElement | null;
if (btnGlow) {
  let travaGlow = false;
  btnGlow.addEventListener('mouseenter', () => {
    if (!travaGlow) {
      btnGlow.classList.add('btn-glow-locked');
      travaGlow = true;
    }
  });
}

const alvosObserver = document.querySelectorAll<HTMLElement>('.card, .showreel-strip, #projetos h2');

const cartaListener = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        (entrada.target as HTMLElement).classList.add('is-visible');
        cartaListener.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

alvosObserver.forEach((el) => {
  el.classList.add('will-animate');
  cartaListener.observe(el);
});

const fundoCard = document.getElementById('phcBackdrop')!;
const cardFlutuante = document.getElementById('projectHoverCard')!;
const capaCard = document.getElementById('phcCoverImg') as HTMLImageElement;
const tagsCard = document.getElementById('phcTags')!;
const tituloCard = document.getElementById('phcTitle')!;
const subCard = document.getElementById('phcSubtitle')!;
const descCard = document.getElementById('phcDesc')!;
const linkCard = document.getElementById('phcLink') as HTMLAnchorElement;
const fecharCard = document.getElementById('phcClose')!;

let tempoAbertura: ReturnType<typeof setTimeout> | null = null;

function abrirCard(chaveProjeto: string) {
  const projeto = projetosData[chaveProjeto];

  tagsCard.innerHTML = '';
  const tags = projeto ? projeto.tags : ['Em progresso'];

  tags.forEach((t) => {
    const s = document.createElement('span');
    s.className = 'tag';
    s.textContent = t;
    tagsCard.appendChild(s);
  });

  tituloCard.textContent = projeto?.title ?? 'Em progresso';
  subCard.textContent = projeto?.subtitle ?? 'Em progresso';
  descCard.textContent = projeto?.description ?? 'Em progresso';
  linkCard.href = projeto?.templateLink ?? '#';
  linkCard.style.pointerEvents = projeto ? 'auto' : 'none';
  linkCard.style.opacity = projeto ? '1' : '0.4';

  if (projeto?.cover) {
    capaCard.src = projeto.cover;
    capaCard.style.display = 'block';
  } else {
    capaCard.style.display = 'none';
  }

  fundoCard.classList.add('is-open');
  cardFlutuante.classList.add('is-open');
}

function fecharCardFn() {
  if (tempoAbertura) clearTimeout(tempoAbertura);
  cardFlutuante.classList.remove('is-open');
  fundoCard.classList.remove('is-open');
}

document.querySelectorAll<HTMLAnchorElement>('.project-card[data-project]').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    const chave = card.dataset.project ?? '';
    tempoAbertura = setTimeout(() => abrirCard(chave), 3000);
  });

  card.addEventListener('mouseleave', () => {
    if (tempoAbertura) clearTimeout(tempoAbertura);
  });
});

fundoCard.addEventListener('click', fecharCardFn);
fecharCard.addEventListener('click', fecharCardFn);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharCardFn();
});

cardFlutuante.addEventListener('mouseleave', fecharCardFn);