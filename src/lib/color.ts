export function hexToRgb(h: string) {
  const m = h.replace("#", "").match(/.{2}/g)!.map((x) => parseInt(x, 16));
  return { r: m[0], g: m[1], b: m[2] };
}

export function rgbToHex(r: number, g: number, b: number) {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return "#" + c(r) + c(g) + c(b);
}

export function lighten(hex: string, amt: number) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r + (255 - r) * (amt / 100), g + (255 - g) * (amt / 100), b + (255 - b) * (amt / 100));
}

export function darken(hex: string, amt: number) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r * (1 - amt / 100), g * (1 - amt / 100), b * (1 - amt / 100));
}
