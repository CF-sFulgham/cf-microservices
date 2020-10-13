export const MaskSSN = (ssn: string): string => (ssn != null && ssn.length === 9) ? `${ssn.substring(5)}` : '';
