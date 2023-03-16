const formatName = (text: string): string => {
  text = text.trim();
  text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  while (text.includes("  ") === true) {
    text = text.replaceAll("  ", " ");
  }
  return text;
};

export { formatName };
