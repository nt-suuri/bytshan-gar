export type AnimalData = { name: string; nameEn: string; emoji: string; color: string };

const animals: AnimalData[] = [
  { name: "морь",   nameEn: "horse",  emoji: "🐴", color: "#0066B3" },
  { name: "бүргэд", nameEn: "eagle",  emoji: "🦅", color: "#F2A900" },
  { name: "тэмээ",  nameEn: "camel",  emoji: "🐪", color: "#2D8C3C" },
  { name: "сарлаг", nameEn: "yak",    emoji: "🐂", color: "#D32F2F" },
  { name: "буга",   nameEn: "deer",   emoji: "🦌", color: "#0066B3" },
  { name: "чоно",   nameEn: "wolf",   emoji: "🐺", color: "#F2A900" },
  { name: "хонь",   nameEn: "sheep",  emoji: "🐑", color: "#2D8C3C" },
  { name: "нохой",  nameEn: "dog",    emoji: "🐕", color: "#D32F2F" },
];

export default animals;
