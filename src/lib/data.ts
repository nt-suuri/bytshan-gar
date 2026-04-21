export type LetterObj = { l: string; word: string; en: string; color: string };
export type AnimalObj = { emoji: string; name: string; sound: string };
export type Theme = { name: string; en: string; bg1: string; bg2: string; bg3: string; glow: string; accent: string };

export const MONGOLIAN_LETTERS: LetterObj[] = [
  { l: "А", word: "Алим", en: "Apple", color: "#D32F2F" },
  { l: "Б", word: "Баавгай", en: "Bear", color: "#6B4423" },
  { l: "В", word: "Ваар", en: "Vase", color: "#0066B3" },
  { l: "Г", word: "Гал", en: "Fire", color: "#F2A900" },
  { l: "Д", word: "Далай", en: "Sea", color: "#0066B3" },
  { l: "Е", word: "Емпү", en: "Cone", color: "#2D8C3C" },
  { l: "Ё", word: "Ёотон", en: "Candy", color: "#E91E63" },
  { l: "Ж", word: "Жигнэмэг", en: "Biscuit", color: "#F2A900" },
  { l: "З", word: "Заан", en: "Elephant", color: "#607D8B" },
  { l: "И", word: "Ингэ", en: "Camel calf", color: "#8D6E63" },
  { l: "Й", word: "Йогурт", en: "Yogurt", color: "#FAFAFA" },
  { l: "К", word: "Ком", en: "Lump", color: "#795548" },
  { l: "Л", word: "Луу", en: "Dragon", color: "#2D8C3C" },
  { l: "М", word: "Морь", en: "Horse", color: "#5D4037" },
  { l: "Н", word: "Нохой", en: "Dog", color: "#A1887F" },
  { l: "О", word: "Ойр", en: "Near", color: "#F2A900" },
  { l: "Ө", word: "Өвс", en: "Grass", color: "#2D8C3C" },
  { l: "П", word: "Пийшин", en: "Stove", color: "#D32F2F" },
  { l: "Р", word: "Рашаан", en: "Spring water", color: "#0066B3" },
  { l: "С", word: "Сарлаг", en: "Yak", color: "#424242" },
  { l: "Т", word: "Тэмээ", en: "Camel", color: "#B8860B" },
  { l: "У", word: "Уул", en: "Mountain", color: "#455A64" },
  { l: "Ү", word: "Үнэг", en: "Fox", color: "#E65100" },
  { l: "Ф", word: "Фааль", en: "Foal", color: "#8D6E63" },
  { l: "Х", word: "Хонь", en: "Sheep", color: "#ECEFF1" },
  { l: "Ц", word: "Цэцэг", en: "Flower", color: "#E91E63" },
  { l: "Ч", word: "Чоно", en: "Wolf", color: "#37474F" },
  { l: "Ш", word: "Шувуу", en: "Bird", color: "#0066B3" },
  { l: "Щ", word: "Щётка", en: "Brush", color: "#9C27B0" },
  { l: "Ъ", word: "Хатуу", en: "Hard sign", color: "#616161" },
  { l: "Ы", word: "Шары", en: "Yellow", color: "#F2A900" },
  { l: "Ь", word: "Зөөлөн", en: "Soft sign", color: "#9E9E9E" },
  { l: "Э", word: "Эрвээхэй", en: "Butterfly", color: "#E91E63" },
  { l: "Ю", word: "Юрөөл", en: "Blessing", color: "#F2A900" },
  { l: "Я", word: "Яст", en: "Bone", color: "#ECEFF1" },
];

export const ANIMALS: AnimalObj[] = [
  { emoji: "🐴", name: "Морь", sound: "neigh" },
  { emoji: "🦅", name: "Бүргэд", sound: "screech" },
  { emoji: "🐪", name: "Тэмээ", sound: "grunt" },
  { emoji: "🐂", name: "Сарлаг", sound: "moo" },
  { emoji: "🦌", name: "Буга", sound: "bellow" },
  { emoji: "🐺", name: "Чоно", sound: "howl" },
  { emoji: "🐑", name: "Хонь", sound: "baa" },
  { emoji: "🐕", name: "Нохой", sound: "bark" },
];

export const PENTATONIC: number[] = [
  261.63, 293.66, 329.63, 392.00, 440.00,
  523.25, 587.33, 659.25, 783.99, 880.00,
  1046.50, 1174.66, 1318.51,
];

export const THEMES: Record<string, Theme> = {
  tenger: {
    name: "Тэнгэр", en: "Sky",
    bg1: "#6BB6E8", bg2: "#0066B3", bg3: "#E8F4FB",
    glow: "#FFE58A", accent: "#F2A900",
  },
  tal: {
    name: "Тал", en: "Steppe",
    bg1: "#7EC27A", bg2: "#2D8C3C", bg3: "#F6EFD6",
    glow: "#F2A900", accent: "#D32F2F",
  },
  shone: {
    name: "Шөнө", en: "Night",
    bg1: "#1A237E", bg2: "#0D1445", bg3: "#3949AB",
    glow: "#FFE58A", accent: "#F2A900",
  },
};

export const SHAGAI_SIDES = ["🐴", "🐪", "🐑", "🐐"];

export type EmojiObj = { emoji: string; name: string; color: string };
export const EMOJIS: EmojiObj[] = [
  { emoji: "🐴", name: "Морь", color: "#8D6E63" },
  { emoji: "🦅", name: "Бүргэд", color: "#5D4037" },
  { emoji: "🐪", name: "Тэмээ", color: "#B8860B" },
  { emoji: "🐂", name: "Сарлаг", color: "#424242" },
  { emoji: "🦌", name: "Буга", color: "#A1887F" },
  { emoji: "🐺", name: "Чоно", color: "#37474F" },
  { emoji: "🐑", name: "Хонь", color: "#78909C" },
  { emoji: "🐕", name: "Нохой", color: "#8D6E63" },
  { emoji: "🐈", name: "Муур", color: "#F2A900" },
  { emoji: "🐟", name: "Загас", color: "#0066B3" },
  { emoji: "🦋", name: "Эрвээхэй", color: "#E91E63" },
  { emoji: "🐢", name: "Яст мэлхий", color: "#2D8C3C" },
  { emoji: "🌸", name: "Цэцэг", color: "#E91E63" },
  { emoji: "🌈", name: "Солонго", color: "#D32F2F" },
  { emoji: "🌞", name: "Нар", color: "#F2A900" },
  { emoji: "⭐", name: "Од", color: "#F2A900" },
  { emoji: "🎈", name: "Бөмбөлөг", color: "#D32F2F" },
  { emoji: "🎵", name: "Хөгжим", color: "#9C27B0" },
  { emoji: "🍎", name: "Алим", color: "#D32F2F" },
  { emoji: "🥕", name: "Лууван", color: "#E65100" },
  { emoji: "🌙", name: "Сар", color: "#F2A900" },
  { emoji: "🐻", name: "Баавгай", color: "#6B4423" },
  { emoji: "🎉", name: "Баяр", color: "#E91E63" },
  { emoji: "❤️", name: "Зүрх", color: "#D32F2F" },
];

export const rand = (min: number, max: number) => Math.random() * (max - min) + min;
export const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
