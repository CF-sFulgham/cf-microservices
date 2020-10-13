export const maskString = (str: string, charsToReveal: number) => {
  return str.length > charsToReveal ? `${'*'.repeat(str.length - charsToReveal)}${str.slice(-charsToReveal)}` : str;
};