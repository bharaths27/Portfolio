/* Shared, mutable scroll values read inside the render loop (no React re renders).
   hero: 0..1 progress through the first viewport. page: 0..1 progress through the page. */
export const scrollState = { hero: 0, page: 0, velocity: 0 }
