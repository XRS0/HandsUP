export const maskEmail = (email: string) => {
  const [name, domain] = email.split('@');
  const visibleStart = name.slice(0, 2);
  const visibleEnd = name.slice(-2);
  return `${visibleStart}****${visibleEnd}@${domain}`;
}