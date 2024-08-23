export const limitWord = (data, limit) => {
  const word = data.split(" ");
  if (word.length > limit) {
    return word.slice(0, limit).join(" ") + "...";
  } else {
    return data;
  }
};
