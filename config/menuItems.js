import { MaterialCommunityIcons } from '@expo/vector-icons';

export const menuItems = [
  {
    id: 'social',
    title: 'Social Media',
    route: '/grueneratoren/social',
    webUrl: 'https://beta.gruenerator.de/social',
    icon: {
      name: 'message-text-outline',
      component: MaterialCommunityIcons
    }
  },
  {
    id: 'press',
    title: 'Pressemitteilungen',
    shortTitle: 'Presse',
    route: '/grueneratoren/pressemitteilung',
    webUrl: 'https://beta.gruenerator.de/pressemitteilung',
    icon: {
      name: 'newspaper-variant-outline',
      component: MaterialCommunityIcons
    }
  },
  {
    id: 'motions',
    title: 'Anträge',
    route: '/grueneratoren/antrag',
    webUrl: 'https://beta.gruenerator.de/antrag',
    icon: {
      name: 'file-document-outline',
      component: MaterialCommunityIcons
    }
  },
  {
    id: 'universal',
    title: 'Universal',
    route: '/grueneratoren/universal',
    webUrl: 'https://beta.gruenerator.de/universal',
    icon: {
      name: 'auto-fix',
      component: MaterialCommunityIcons
    }
  },
  {
    id: 'speech',
    title: 'Politische Rede',
    route: '/grueneratoren/rede',
    webUrl: 'https://beta.gruenerator.de/rede',
    icon: {
      name: 'microphone-outline',
      component: MaterialCommunityIcons
    }
  },
  {
    id: 'program',
    title: 'Wahlprogramm',
    route: '/grueneratoren/programm',
    webUrl: 'https://beta.gruenerator.de/programm',
    icon: {
      name: 'book-outline',
      component: MaterialCommunityIcons
    }
  },
  {
    id: 'sharepic',
    title: 'Sharepic Generator',
    shortTitle: 'Sharepic',
    route: '/grueneratoren/sharepic',
    webUrl: 'https://beta.gruenerator.de/sharepic',
    icon: {
      name: 'image-outline',
      component: MaterialCommunityIcons
    }
  },
  {
    id: 'compass',
    title: 'Wahlprüfstein BTW',
    shortTitle: 'Kompass BTW',
    route: '/grueneratoren/btw-kompass',
    webUrl: 'https://beta.gruenerator.de/btw-kompass',
    icon: {
      name: 'vote',
      component: MaterialCommunityIcons
    }
  }
]; 