function truncate(text: string, size: number) {
  return text.split(" ").length > size
    ? text.split(" ").slice(0, size).join(" ")
    : text;
}

export default truncate;
