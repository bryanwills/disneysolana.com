export type ContentItem = {
  title: string;
  image: string;
  studio: string;
};

export type ContentSection = {
  title: string;
  items: ContentItem[];
};

export const contentSections: ContentSection[] = [
  {
    title: 'Recommended for You',
    items: [
      { title: 'EPSTEIN ISLAND', image: '/images/Thumbnail131.webp', studio: 'Disney PIXAR' },
      { title: 'MEET THE GRAHAMS', image: '/images/Thumbnail24.webp', studio: 'Disney' },
      { title: 'TOLL', image: '/images/Thumbnail36.webp', studio: 'PIXAR' },
      { title: 'IF THE GLOVE FITS', image: '/images/Thumbnail89.webp', studio: 'Disney' },
      { title: 'OFFICER DOWN: MAEGAN HALL', image: '/images/Thumbnail104.webp', studio: 'Disney PIXAR' },
      { title: 'PAY DAY', image: '/images/Thumbnail144.webp', studio: 'Disney PIXAR' },
      { title: 'KAREN', image: '/images/Thumbnail139.webp', studio: 'Disney PIXAR' },
      { title: 'THE FIE', image: '/images/Thumbnail107.webp', studio: 'Disney' },
    ],
  },
  {
    title: 'Because You Watched Goy Story',
    items: [
      { title: 'SANDY HOOK', image: '/images/Thumbnail1.webp', studio: 'Disney PIXAR' },
      { title: 'the ceo', image: '/images/Thumbnail2.webp', studio: 'PIXAR' },
      { title: 'ADOLF', image: '/images/Thumbnail3.webp', studio: 'Disney PIXAR' },
      { title: 'LONDON', image: '/images/Thumbnail4.webp', studio: 'Disney PIXAR' },
      { title: 'THE INCREDIBLE SULK', image: '/images/Thumbnail5.webp', studio: 'MARVEL STUDIOS' },
      { title: '$I', image: '/images/Thumbnail6.webp', studio: 'Disney' },
    ],
  },
  {
    title: 'Continue Watching',
    items: [
      { title: 'LA', image: '/images/Thumbnail7.webp', studio: 'Disney PIXAR' },
      { title: 'BLACKED', image: '/images/Thumbnail8.webp', studio: 'Disney PIXAR' },
      { title: 'Harambe', image: '/images/Thumbnail9.webp', studio: 'Disney PIXAR' },
      { title: 'WHITE PEOPLE RENOVATE HOMES', image: '/images/Thumbnail10.webp', studio: 'Disney' },
      { title: 'THE ZUCC', image: '/images/Thumbnail11.webp', studio: 'Disney' },
      { title: 'Mr', image: '/images/Thumbnail12.webp', studio: 'Disney' },
    ],
  },
  {
    title: 'Trending on Disney++',
    items: [
      { title: 'DUOLINGOHH', image: '/images/Thumbnail13.webp', studio: 'Disney PIXAR' },
      { title: 'MOLESTOR INK', image: '/images/Thumbnail14.webp', studio: 'PIXAR' },
      { title: 'SHEIN', image: '/images/Thumbnail15.webp', studio: 'Disney' },
      { title: 'FLOYD', image: '/images/Thumbnail16.webp', studio: 'Disney' },
      { title: '9/11', image: '/images/Thumbnail17.webp', studio: 'Disney' },
      { title: 'KOBE', image: '/images/Thumbnail18.webp', studio: 'Disney PIXAR' },
    ],
  },
  {
    title: 'New to Disney++',
    items: [
      { title: 'tinder', image: '/images/Thumbnail19.webp', studio: 'PIXAR' },
      { title: 'PURCHASED', image: '/images/Thumbnail20.webp', studio: 'Disney PIXAR' },
      { title: 'THE HUB', image: '/images/Thumbnail21.webp', studio: 'Disney PIXAR' },
      { title: 'GOING WOKE', image: '/images/Thumbnail22.webp', studio: 'Disney' },
      { title: 'KAREN', image: '/images/Thumbnail23.webp', studio: 'Disney PIXAR' },
      { title: 'THE FIE', image: '/images/Thumbnail24.webp', studio: 'Disney' },
    ],
  },
];

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function findItemBySlug(slug: string): ContentItem | undefined {
  for (const section of contentSections) {
    for (const item of section.items) {
      if (slugify(item.title) === slug) {
        return item;
      }
    }
  }
  return undefined;
}
