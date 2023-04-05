export const CART_KEY = 'pixer-cart';
export const PRODUCTS_PER_PAGE = 30;
export const RTL_LANGUAGES: ReadonlyArray<string> = ['ar', 'he'];

export function getDirection(language: string | undefined) {
  if (!language) return 'ltr';
  return RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
}

export const LIST_ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
