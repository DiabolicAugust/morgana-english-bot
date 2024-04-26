export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function centerText(text, totalWidth = 37) {
  let padding = Math.max(0, Math.floor((totalWidth - text.length) / 2));
  return `${'  '.repeat(padding)}${text}${'  '.repeat(padding)}`;
}

export const escapeMarkdownV2 = (text) => {
  return text.replace(/[_*[\]()~`>#+-=|{}.!]/g, '\\$&'); // Escaping MarkdownV2 special characters
};
