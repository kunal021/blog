export const readTime = (content) => {
  const word = content.split(" ");
  if (word.length > 200) {
    return Math.round(word.length / 200);
  } else {
    return 1;
  }
};
