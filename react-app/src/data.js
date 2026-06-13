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
  { title: 'The Thirsty Crow', blurb: 'A clever crow finds a smart way to drink water.', emoji: '🐦' },
  { title: 'The Lion and the Mouse', blurb: 'A tiny mouse proves even the smallest friend can help.', emoji: '🦁' },
  { title: 'The Peacock and the Rain', blurb: 'A proud peacock learns to dance with joy.', emoji: '🦚' }
];
