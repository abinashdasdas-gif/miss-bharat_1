// Built-in fallback content. At runtime App tries to fetch ../data/content.json (AJAX)
// so the same server-hosted data drives both the old site and this React app.
export const FALLBACK_CLASSES = {
  1: { name: 'Class 1', title: 'Building Foundations', games: [
    { emoji: '🗣️', title: 'Speaking Quest', desc: 'Pronounce simple words', type: 'speaking1' },
    { emoji: '🔢', title: 'Count Numbers', desc: 'Count 1-20', type: 'count1' },
    { emoji: '🎨', title: 'Color Naming', desc: 'Learn color names', type: 'colors1' },
    { emoji: '♟️', title: 'Chess (Easy)', desc: 'Learn chess pieces', type: 'chess' },
    { emoji: '⭕', title: 'Tic-Tac-Toe', desc: 'Beat the computer', type: 'tictactoe' }
  ]},
  2: { name: 'Class 2', title: 'Reading & Writing', games: [
    { emoji: '📖', title: 'Reading Practice', desc: 'Read simple sentences', type: 'reading2' },
    { emoji: '➕', title: 'Easy Addition', desc: 'Add up to 20', type: 'addition2' },
    { emoji: '♟️', title: 'Chess', desc: 'Play vs computer', type: 'chess' }
  ]},
  3: { name: 'Class 3', title: 'Intermediate Mastery', games: [
    { emoji: '✖️', title: 'Times Tables', desc: '2-5 multiplication', type: 'tables3' },
    { emoji: '➗', title: 'Division Games', desc: 'Basic division', type: 'division3' },
    { emoji: '♟️', title: 'Chess', desc: 'Play vs computer', type: 'chess' }
  ]},
  4: { name: 'Class 4', title: 'Advanced Learning', games: [
    { emoji: '🧮', title: 'Math Challenge', desc: 'Multi-step problems', type: 'math4' },
    { emoji: '🎓', title: 'Grammar Master', desc: 'Advanced grammar', type: 'grammar4' },
    { emoji: '♟️', title: 'Chess', desc: 'Play vs computer', type: 'chess' }
  ]},
  5: { name: 'Class 5', title: 'Expert Excellence', games: [
    { emoji: '🧬', title: 'Advanced Math', desc: 'Algebra basics', type: 'algebra5' },
    { emoji: '🌍', title: 'General Knowledge', desc: 'GK questions', type: 'gk5' },
    { emoji: '♟️', title: 'Chess (Pro)', desc: 'Play vs computer', type: 'chess' }
  ]}
};

export const FALLBACK_QUESTIONS = {
  speaking1: ['Say: "Apple"', 'Say: "Ball"', 'Say: "Cat"', 'Say: "Dog"', 'Say: "Elephant"'],
  count1: ['Count to 5', 'Count to 10', 'Count to 15'],
  colors1: ['Say a red color', 'Say a blue color', 'Say a yellow color', 'Say a green color'],
  reading2: ['Read: "The cat sat on mat"', 'Read: "I like to play"', 'Read: "She has a book"'],
  addition2: ['What is 5 + 3?', 'What is 7 + 2?', 'What is 6 + 4?', 'What is 8 + 3?'],
  tables3: ['What is 2 × 3?', 'What is 3 × 4?', 'What is 4 × 5?', 'What is 5 × 6?'],
  division3: ['What is 10 ÷ 2?', 'What is 15 ÷ 3?', 'What is 20 ÷ 4?'],
  math4: ['Solve: 25 + 37', 'Solve: 50 - 23', 'Solve: 6 × 8', 'Solve: 56 ÷ 7'],
  grammar4: ['Correct sentence', 'Use tense properly', 'Fix punctuation'],
  algebra5: ['Solve: x + 5 = 12', 'Solve: 2x = 10', 'Solve: 3x + 2 = 11'],
  gk5: ['Capital of France?', 'Largest planet?', 'When was internet invented?']
};

export const STORIES = [
  {
    title: 'The Thirsty Crow', emoji: '🐦', seed: 21,
    art: 'a cute friendly black crow and a brown clay water pot in a sunny green garden of an Indian village',
    blurb: 'A clever crow finds a smart way to drink water.',
    moral: 'Where there is a will, there is a way.',
    pages: [
      'On a hot summer day, a thirsty crow flew across the fields, searching everywhere for a drop of water to drink.',
      'At last, he spotted a pot near a garden. He flew down quickly — but oh no! The water was very low, far at the bottom.',
      'The clever crow looked around and saw small pebbles lying on the ground. Suddenly, he had a wonderful idea!',
      'One by one, he dropped the pebbles into the pot. Plop! Plop! Slowly, the water began to rise higher and higher.',
      'At last the water reached the top. The happy crow drank to his heart’s content and flew away — proud of his clever idea!'
    ]
  },
  {
    title: 'The Lion and the Mouse', emoji: '🦁', seed: 44,
    art: 'a friendly big cartoon lion with a fluffy mane and a tiny cute grey mouse, in a lush green sunlit jungle',
    blurb: 'A tiny mouse proves even the smallest friend can help.',
    moral: 'No act of kindness is ever wasted.',
    pages: [
      'Deep in the jungle, a mighty lion lay fast asleep under the warm afternoon sun.',
      'A little mouse ran by and scampered over the lion’s nose. The lion woke up with a mighty ROAR and caught him!',
      '“Please let me go,” squeaked the mouse. “One day I may help you!” The lion laughed, but kindly set the little mouse free.',
      'Some days later, hunters trapped the lion in a strong net. He roared and roared, but could not break free.',
      'The little mouse heard him and gnawed the ropes until the lion was free! From that day, the lion and the tiny mouse were the best of friends.'
    ]
  },
  {
    title: 'The Peacock and the Rain', emoji: '🦚', seed: 77,
    art: 'a beautiful colorful peacock with bright blue and green feathers in a green forest',
    blurb: 'A proud peacock learns to dance with joy.',
    moral: 'True beauty shines when we share our joy.',
    pages: [
      'In a sunny forest lived a beautiful peacock with shimmering blue and green feathers. He was very, very proud of them.',
      'One day, dark clouds gathered in the sky. The other birds grew worried — but the peacock only wished everyone would look at him.',
      'Then the rain began to fall — pitter, patter, pitter, patter! The cool drops sparkled on the peacock’s lovely feathers.',
      'Filled with joy, the peacock opened his feathers wide and began to dance! Round and round he twirled in the gentle rain.',
      'When the rain stopped, a bright rainbow filled the sky. All the animals clapped — for the peacock’s happy, joyful dance!'
    ]
  }
];

// soft gradient backdrops cycled per page (kept simple & crisp)
export const SCENES = [
  ['#FDB813', '#FFE3A3'], ['#7EC8E3', '#D2F0FF'], ['#9BE3C2', '#E6FFF3'],
  ['#C9A0DC', '#F3E6FF'], ['#FFB6C1', '#FFE6EC']
];
