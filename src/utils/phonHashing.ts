export function hashPhone(n: string) {
  const y = n.split("");
  for (let i = 0; i < y.length; i++) {
    if (i >= 4 && i <= 10) {
      y[i] = "*";
    }
  }
  return y.join("");
}
