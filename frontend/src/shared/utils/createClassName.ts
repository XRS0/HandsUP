export const createClassName = (...tokens: (string|boolean)[]) => {
  return tokens.filter(Boolean).join(" ");
}