
import { EducationalApp } from './types';

export const DEFAULT_APPS: EducationalApp[] = [
  {
    id: 'math-1',
    title: 'Rekenen Avontuur',
    url: 'https://static.tinytap.com/media/webplayer/webplayer.html?id=C8DBBC88-A5D6-45F0-9C4E-FD980B386AC2&embed=true',
    icon: '🔢',
    color: 'bg-orange-400',
    description: 'Leuke rekenoefeningen voor kleuters.'
  },
  {
    id: 'colors-1',
    title: 'Kleuren & Vormen',
    url: 'https://static.tinytap.com/media/webplayer/webplayer.html?id=89FCF3B8-5AD7-425D-9EC4-667AA3150647&embed=true',
    icon: '🎨',
    color: 'bg-pink-400',
    description: 'Ontdek alle kleuren van de regenboog.'
  },
  {
    id: 'letters-1',
    title: 'Letterpret',
    url: 'https://www.tinytap.com/activities/g3g1r/player/embed/',
    icon: '🔤',
    color: 'bg-blue-400',
    description: 'Leer de eerste letters van het alfabet.'
  },
  {
    id: 'number-play',
    title: 'Getallen Spelen',
    url: 'https://phet.colorado.edu/sims/html/number-play/latest/number-play_all.html',
    icon: '🎾',
    color: 'bg-green-400',
    description: 'Speel met getallen en ballen!'
  }
];
