export type Theme = { id: string; name: string; description: string; background: string };

const themes: Theme[] = [
  {
    id: "tenger",
    name: "Тэнгэр",
    description: "Цэнхэр тэнгэр",
    background: "linear-gradient(180deg, #0066B3 0%, #87CEEB 50%, #F2A900 100%)",
  },
  {
    id: "tal",
    name: "Тал",
    description: "Ногоон тал",
    background: "linear-gradient(180deg, #87CEEB 0%, #2D8C3C 60%, #8B6914 100%)",
  },
  {
    id: "shone",
    name: "Шөнө",
    description: "Одот шөнө",
    background: "linear-gradient(180deg, #0a0a2e 0%, #1a1a4e 50%, #2d1b69 100%)",
  },
];

export default themes;
