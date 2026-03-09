export interface Projeto {
  title: string;
  subtitle: string;
  description: string;
  features?: string[];
  stats?: { label: string; value: string; color: string }[];
  team?: Record<string, string>;
  tools?: string[];
  cover: string;
  images: string[];
  tags: string[];
  tech: string[];
  templateLink: string;
}

export const projetosData: Record<string, Projeto> = {
  lifesaver: {
    title: 'LifeSaver',
    subtitle: 'Saúde, Gamificação e Competição Amigável',
    description:
      'O LifeSaver é um aplicativo criado para ajudar pessoas a desenvolverem hábitos mais saudáveis por meio da gamificação e competição amigável. O objetivo é transformar saúde em algo simples, coletivo e motivador.\n\nEste repositório contém o backend do projeto, incluindo a estrutura do banco de dados, API e instruções de configuração.',
    features: [
      'Criar e gerenciar hábitos pessoais',
      'Atribuir pontos conforme hábitos concluídos',
      'Registrar histórico de mudanças nos hábitos',
      'Acompanhar progresso diário',
      'Competir com amigos',
      'Sistema completo de status dos hábitos (A Fazer, Em Progresso, Concluída, Cancelada)'
    ],
    stats: [
      { label: 'HTML', value: '35.5%', color: '#e34c26' },
      { label: 'CSS', value: '32.4%', color: '#563d7c' },
      { label: 'Python', value: '23.4%', color: '#3572A5' },
      { label: 'JavaScript', value: '8.7%', color: '#f1e05a' }
    ],
    team: {
      frontend: 'Joaquim',
      backend: 'Gabriel',
      ux: 'Joaquim',
      requirements: 'Gabriel',
      database: 'Gabriel',
      scope: 'Gabriel'
    },
    tools: ['Figma', 'CSS', 'HTML', 'Flask', 'Python', 'JS', 'MySQL', 'API: ipwho'],
    cover: 'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050965/Screenshot_1_jjwrwm.png',
    images: [
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050965/Screenshot_1_jjwrwm.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050965/Screenshot_2_lfuvlu.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050966/Screenshot_3_bl9qrz.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050966/Screenshot_4_gtjhbj.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050966/Screenshot_5_mlnevf.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050968/Screenshot_6_eq7ned.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050969/Screenshot_7_uupgrl.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050970/Screenshot_8_dhngy8.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050971/Screenshot_9_tnmlyh.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050974/Screenshot_10_anp2cb.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050974/Screenshot_11_khlwb6.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050976/Screenshot_12_zrqoln.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050979/Screenshot_13_qzc3g2.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050979/Screenshot_14_g1s087.png',
      'https://res.cloudinary.com/djqmayaj1/image/upload/v1773050979/Screenshot_15_zkrnjh.png'
    ],
    tags: ['Saúde', 'Gamificação', 'Backend', 'MySQL'],
    tech: ['Python', 'Flask', 'MySQL', 'JavaScript'],
    templateLink: '/pages/template.html?project=lifesaver'
  },
  mugen: {
    title: '...',
    subtitle: 'Em progresso',
    description: '',
    cover: '',
    images: [],
    tags: [''],
    tech: [''],
    templateLink: '/pages/template.html?project=mugen'
  },
  ccna: {
    title: '...',
    subtitle: 'Em progresso',
    description: '',
    cover: '',
    images: [],
    tags: [''],
    tech: [''],
    templateLink: '/pages/template.html?project=ccna'
  },
  portfolio: {
    title: '...',
    subtitle: 'Em progresso',
    description: '',
    cover: '',
    images: [],
    tags: [''],
    tech: [''],
    templateLink: '/pages/template.html?project=portfolio'
  }
};
