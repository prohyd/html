export type tTask =
  | { question: string; answer: string }   // M — сопоставление
  | { question: string; answer: boolean }  // S — одиночный выбор
  | { question: string; answer: number }   // O — правильный порядок

export type tQuiz = {
  id: number;
  type: "M" | "S" | "O";
  title: string;
  tasks: tTask[];
};

export type tQuizzes = tQuiz[];

export const quiz: tQuizzes = [
  {
    id: 1,
    type: "M",
    title: "Сопоставьте животное и среду его обитания.",
    tasks: [
      { question: "Коала", answer: "Австралия" },
      { question: "Панда", answer: "Китай" },
      { question: "Капибара", answer: "Южная Америка" },
      { question: "Белый медведь", answer: "Арктика" },
      { question: "Комодский варан", answer: "Индонезия" },
      { question: "Краб-паук японский", answer: "Япония" },
    ]
  },
  {
    id: 2,
    type: "M",
    title: "Сопоставьте животное и его тип.",
    tasks: [
      { question: "Тигр", answer: "Млекопитающее" },
      { question: "Страус", answer: "Птица" },
      { question: "Белуга", answer: "Рыба" },
      { question: "Анаконда", answer: "Рептилия" },
      { question: "Саламандра гигантская", answer: "Амфибия" },
      { question: "Омар американский", answer: "Ракообразное" },
    ]
  },
  {
    id: 3,
    type: "S",
    title: "Какое животное имеет самую большую продолжительность жизни?",
    tasks: [
      { question: "Гренландский кит", answer: true },
      { question: "Синий кит", answer: false },
      { question: "Африканский слон", answer: false },
      { question: "Белуга", answer: false },
      { question: "Галапагосская черепаха", answer: false },
    ]
  },
  {
    id: 4,
    type: "S",
    title: "Какое из этих животных относится к птицам?",
    tasks: [
      { question: "Альбатрос", answer: true },
      { question: "Коала", answer: false },
      { question: "Капибара", answer: false },
      { question: "Белуга", answer: false },
      { question: "Анаконда", answer: false },
    ]
  },
  {
    id: 5,
    type: "O",
    title: "Расположите животных по массе тела от большей к меньшей.",
    tasks: [
      { question: "Синий кит", answer: 1 },      // 180 т
      { question: "Гренландский кит", answer: 2 }, // 100 т
      { question: "Кашалот", answer: 3 },         // 57 т
      { question: "Акула китовая", answer: 4 },   // 20 т
      { question: "Африканский слон", answer: 5 },// 6 т
      { question: "Гиппопотам", answer: 6 },      // 3.2 т
    ]
  },
  {
    id: 6,
    type: "O",
    title: "Расположите животных по продолжительности жизни от большей к меньшей.",
    tasks: [
      { question: "Гренландский кит", answer: 1 },      // 200 лет
      { question: "Галапагосская черепаха", answer: 2 }, // 150 лет
      { question: "Белуга", answer: 3 },                 // 100 лет
      { question: "Черепаха кожистая", answer: 4 },      // 100 лет
      { question: "Синий кит", answer: 5 },              // 80 лет
      { question: "Африканский слон", answer: 6 },       // 70 лет
    ]
  },
];