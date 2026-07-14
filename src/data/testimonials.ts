export interface Testimonial {
  id: number;
  quote: string;
  authorImage: string;
  authorName: string;
  authorPosition: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
    authorImage: '/images/person_man_1.jpg',
    authorName: 'Eric Ingram',
    authorPosition: 'Product Designer @facebook',
  },
  {
    id: 2,
    quote:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
    authorImage: '/images/person_man_2.jpg',
    authorName: 'Ryan Mullins',
    authorPosition: 'Product Designer @Shopify',
  },
  {
    id: 3,
    quote:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
    authorImage: '/images/person_woman_1.jpg',
    authorName: 'Erica Miller',
    authorPosition: 'Product Designer @Twitter',
  },
];
