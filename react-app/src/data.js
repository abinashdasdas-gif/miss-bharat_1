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

export const STORIES = [
  { title: 'The Thirsty Crow', blurb: 'A clever crow finds a smart way to drink water.', emoji: '🐦' },
  { title: 'The Lion and the Mouse', blurb: 'A tiny mouse proves even the smallest friend can help.', emoji: '🦁' },
  { title: 'The Peacock and the Rain', blurb: 'A proud peacock learns to dance with joy.', emoji: '🦚' }
];
