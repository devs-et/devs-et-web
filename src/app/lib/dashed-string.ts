export function toDashedString(str: string) {
  return str
    .toLowerCase()
    .trim()
    .split(/[\'\"]/)
    .join('')
    .split(/[\s\W_]+/)
    .join('-')
    .replace(/^-/, '')
    .replace(/-$/, '');
}