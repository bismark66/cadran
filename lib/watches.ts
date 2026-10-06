import type { WatchVariant } from '@/components/Watch'

export type WatchSource = {
  photo?: string
  alt: string
  fallback: WatchVariant
}

/* Candidate Unsplash shots — dark-studio product photography that
   composites onto our background. VERIFY each URL in a browser tab
   before committing; any that 404 fall back to the SVG automatically. */
export const HERO_WATCH: WatchSource = {
  photo: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&h=1500&fit=crop&auto=format',
  alt: 'Affordable Watches Réserve — Ghana edition brass case, dark dial, studio light',
  fallback: 'onyx',
}

export const MODELS: (WatchSource & { name: string; blurb: string; price: string; idx: string })[] = [
  {
    photo: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=1000&h=1500&fit=crop&auto=format',
    alt: 'Affordable Watches Réserve on dark background', fallback: 'onyx',
    name: 'Réserve', blurb: 'Daily-wear flagship with deep onyx dial and warm brass accents.', price: 'GHS 118,000', idx: '01',
  },
  {
    photo: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&h=1500&fit=crop&auto=format',
    alt: 'Affordable Watches Blanche — light dial, leather strap', fallback: 'ivoire',
    name: 'Blanche', blurb: 'Grand feu enamel dial built for formal evenings and ceremony wear.', price: 'GHS 176,000', idx: '02',
  },
  {
    photo: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000&h=1500&fit=crop&auto=format',
    alt: 'Affordable Watches Sylve — on dark wood', fallback: 'foret',
    name: 'Sylve', blurb: 'Tropical green lacquer over sunray brass, tuned for day-to-night wear.', price: 'GHS 129,000', idx: '03',
  },
  {
    photo: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&h=1500&fit=crop&auto=format',
    alt: 'Affordable Watches Brume — anthracite dial', fallback: 'fumee',
    name: 'Brume', blurb: 'Anthracite gradient for understated collectors who prefer quiet luxury.', price: 'GHS 124,000', idx: '04',
  },
]
