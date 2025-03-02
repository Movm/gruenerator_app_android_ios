import { MaterialCommunityIcons } from '@expo/vector-icons';

export const menuItems = [
  {
    id: 'social',
    title: 'Presse & Social-Media',
    shortTitle: 'Presse & Social',
    description: 'Pressemitteilungen und Social-Media-Posts',
    route: '/grueneratoren/social',
    webUrl: 'https://beta.gruenerator.de/presse-social',
    icon: {
      name: 'message-text-outline',
      component: MaterialCommunityIcons
    }
  },
  {
    id: 'motions',
    title: 'Anträge',
    description: 'Anträge für Kommunalparlamente & Co.',
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
    description: 'Wahlprogramme, Reden oder freie Textformen',
    route: '/grueneratoren/universal',
    webUrl: 'https://beta.gruenerator.de/universal',
    icon: {
      name: 'auto-fix',
      component: MaterialCommunityIcons
    }
  },
  /* {
    id: 'sharepic',
    title: 'Sharepic Generator',
    shortTitle: 'Sharepic',
    description: 'Erstelle ansprechende Bilder für Social Media im grünen Corporate Design.',
    route: '/grueneratoren/sharepic',
    webUrl: 'https://beta.gruenerator.de/sharepic',
    icon: {
      name: 'image-outline',
      component: MaterialCommunityIcons
    }
  },
  {
    id: 'vorlagen',
    title: 'Canva Vorlagen',
    shortTitle: 'Vorlagen',
    description: 'Zugriff auf professionelle Canva-Vorlagen im grünen Design.',
    route: '/grueneratoren/vorlagen',
    webUrl: 'https://beta.gruenerator.de/vorlagen',
    icon: {
      name: 'palette-outline',
      component: MaterialCommunityIcons
    }
  }, */
  {
    id: 'gjugend',
    title: 'Grüne Jugend',
    shortTitle: 'Grüne Jugend',
    description: 'Der Grünerator in jung',
    route: '/grueneratoren/gj',
    webUrl: 'https://beta.gruenerator.de/gruene-jugend-no-header-footer',
    icon: {
      name: 'sprout',
      component: MaterialCommunityIcons
    }
  }
]; 