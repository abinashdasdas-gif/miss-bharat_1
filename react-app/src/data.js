// Built-in fallback content. At runtime App tries to fetch ../data/content.json (AJAX)
// so the same server-hosted data drives both the old site and this React app.
// CBSE-aligned Math & English for Classes 1–5. `subject` enables Duolingo-style grouping.
export const FALLBACK_CLASSES = {
  1: { name: 'Class 1', title: 'Numbers, Words & Shapes', games: [
    { emoji: '🔢', title: 'Count 1–20', desc: 'Number names', type: 'count1', subject: 'Maths' },
    { emoji: '➕', title: 'Easy Addition', desc: 'Add within 20', type: 'add1', subject: 'Maths' },
    { emoji: '🔷', title: 'Shapes', desc: 'Circle, square, triangle', type: 'shapes1', subject: 'Maths' },
    { emoji: '🔤', title: 'Say the Word', desc: 'Phonics & sounds', type: 'speaking1', subject: 'English' },
    { emoji: '🎵', title: 'Rhyming Words', desc: 'Words that sound alike', type: 'rhyme1', subject: 'English' },
    { emoji: '🅰️', title: 'Vowel Sounds', desc: 'a e i o u', type: 'vowels1', subject: 'English' },
    { emoji: '♟️', title: 'Chess', desc: 'Learn the pieces', type: 'chess', subject: 'Fun' },
    { emoji: '⭕', title: 'Tic-Tac-Toe', desc: 'Beat the computer', type: 'tictactoe', subject: 'Fun' }
  ]},
  2: { name: 'Class 2', title: 'Addition, Subtraction & Reading', games: [
    { emoji: '➕', title: 'Add to 100', desc: 'Two-digit addition', type: 'add2', subject: 'Maths' },
    { emoji: '➖', title: 'Subtraction', desc: 'Take away', type: 'sub2', subject: 'Maths' },
    { emoji: '⏭️', title: 'Skip Counting', desc: '2s, 5s and 10s', type: 'skip2', subject: 'Maths' },
    { emoji: '🐝', title: 'Spelling Bee', desc: '3–4 letter words', type: 'spell2', subject: 'English' },
    { emoji: '📖', title: 'Reading', desc: 'Read short sentences', type: 'read2', subject: 'English' },
    { emoji: '🔁', title: 'Opposites', desc: 'Big / small, hot / cold', type: 'opp2', subject: 'English' },
    { emoji: '♟️', title: 'Chess', desc: 'Play vs computer', type: 'chess', subject: 'Fun' },
    { emoji: '⭕', title: 'Tic-Tac-Toe', desc: 'Beat the computer', type: 'tictactoe', subject: 'Fun' }
  ]},
  3: { name: 'Class 3', title: 'Tables, Division & Grammar', games: [
    { emoji: '✖️', title: 'Times Tables', desc: 'Multiplication 2–10', type: 'tables3', subject: 'Maths' },
    { emoji: '➗', title: 'Division', desc: 'Share equally', type: 'division3', subject: 'Maths' },
    { emoji: '🧮', title: 'Add & Subtract', desc: '3-digit numbers', type: 'addsub3', subject: 'Maths' },
    { emoji: '⏳', title: 'Tenses', desc: 'Past & present', type: 'tense3', subject: 'English' },
    { emoji: '📚', title: 'Vocabulary', desc: 'New words', type: 'vocab3', subject: 'English' },
    { emoji: '📖', title: 'Reading', desc: 'Sentences & meaning', type: 'read3', subject: 'English' },
    { emoji: '♟️', title: 'Chess', desc: 'Play vs computer', type: 'chess', subject: 'Fun' },
    { emoji: '⭕', title: 'Tic-Tac-Toe', desc: 'Beat the computer', type: 'tictactoe', subject: 'Fun' }
  ]},
  4: { name: 'Class 4', title: 'Multiplication, Fractions & Writing', games: [
    { emoji: '✖️', title: 'Multiply', desc: '2-digit multiplication', type: 'mult4', subject: 'Maths' },
    { emoji: '🔢', title: 'Factors', desc: 'Divisibility', type: 'factor4', subject: 'Maths' },
    { emoji: '🍕', title: 'Fractions', desc: 'Parts of a whole', type: 'frac4', subject: 'Maths' },
    { emoji: '✍️', title: 'Grammar', desc: 'Make sentences', type: 'gram4', subject: 'English' },
    { emoji: '🔆', title: 'Synonyms', desc: 'Same-meaning words', type: 'syn4', subject: 'English' },
    { emoji: '📰', title: 'Comprehension', desc: 'Speak & describe', type: 'comp4', subject: 'English' },
    { emoji: '♟️', title: 'Chess', desc: 'Play vs computer', type: 'chess', subject: 'Fun' },
    { emoji: '⭕', title: 'Tic-Tac-Toe', desc: 'Beat the computer', type: 'tictactoe', subject: 'Fun' }
  ]},
  5: { name: 'Class 5', title: 'Algebra, Geometry & Composition', games: [
    { emoji: '🧬', title: 'Pre-Algebra', desc: 'Find the value of x', type: 'algebra5', subject: 'Maths' },
    { emoji: '🔺', title: 'Geometry', desc: 'Name the shapes', type: 'geo5', subject: 'Maths' },
    { emoji: '🧮', title: 'Big Numbers', desc: 'Add & multiply', type: 'big5', subject: 'Maths' },
    { emoji: '🎓', title: 'Grammar', desc: 'Advanced grammar', type: 'gram5', subject: 'English' },
    { emoji: '🔆', title: 'Antonyms', desc: 'Opposite words', type: 'anto5', subject: 'English' },
    { emoji: '🌍', title: 'General Knowledge', desc: 'Fun facts', type: 'gk5', subject: 'English' },
    { emoji: '♟️', title: 'Chess', desc: 'Play vs computer', type: 'chess', subject: 'Fun' },
    { emoji: '⭕', title: 'Tic-Tac-Toe', desc: 'Beat the computer', type: 'tictactoe', subject: 'Fun' }
  ]}
};

export const FALLBACK_QUESTIONS = {
  // Class 1
  count1: ['Count to 10', 'Count to 20', 'Count backwards from 10', 'Count in 2s to 10'],
  add1: ['What is 2 + 3?', 'What is 4 + 1?', 'What is 5 + 4?', 'What is 6 + 3?', 'What is 7 + 2?'],
  shapes1: ['Name a circle', 'Name a square', 'Name a triangle', 'Name a rectangle'],
  speaking1: ['Say: "Apple"', 'Say: "Ball"', 'Say: "Cat"', 'Say: "Dog"', 'Say: "Sun"'],
  rhyme1: ['Find a rhyme for "Cat"', 'Find a rhyme for "Sun"', 'Find a rhyme for "Ball"'],
  vowels1: ['Say a word with A', 'Say a word with E', 'Say a word with O'],
  // Class 2
  add2: ['What is 12 + 7?', 'What is 25 + 4?', 'What is 30 + 15?', 'What is 21 + 18?'],
  sub2: ['What is 18 - 6?', 'What is 25 - 10?', 'What is 40 - 15?', 'What is 30 - 12?'],
  skip2: ['Count in 2s to 10', 'Count in 5s to 25', 'Count in 10s to 50'],
  spell2: ['Spell: "Book"', 'Spell: "Tree"', 'Spell: "Milk"', 'Spell: "Fish"'],
  read2: ['Read: "The sun is hot"', 'Read: "I see a bird"', 'Read: "We like to play"'],
  opp2: ['Opposite of "Big"', 'Opposite of "Hot"', 'Opposite of "Up"', 'Opposite of "Day"'],
  // Class 3
  tables3: ['What is 2 × 3?', 'What is 4 × 5?', 'What is 6 × 7?', 'What is 8 × 4?', 'What is 9 × 3?'],
  division3: ['What is 10 ÷ 2?', 'What is 20 ÷ 4?', 'What is 18 ÷ 3?', 'What is 24 ÷ 6?'],
  addsub3: ['What is 120 + 45?', 'What is 250 - 30?', 'What is 134 + 22?'],
  tense3: ['Past tense of "go"', 'Past tense of "eat"', 'Past tense of "run"'],
  vocab3: ['Say: "Beautiful"', 'Say: "Elephant"', 'Say: "Mountain"', 'Say: "Garden"'],
  read3: ['Read: "Birds fly in the sky"', 'Read: "The river is deep"'],
  // Class 4
  mult4: ['What is 12 × 3?', 'What is 8 × 7?', 'What is 11 × 6?', 'What is 9 × 9?'],
  factor4: ['What is 24 ÷ 6?', 'What is 36 ÷ 4?', 'What is 45 ÷ 9?'],
  frac4: ['What is 6 ÷ 2?', 'What is 8 ÷ 4?', 'What is 12 ÷ 3?'],
  gram4: ['Make a sentence with "run"', 'Make a sentence with "happy"', 'Use "because" in a sentence'],
  syn4: ['Say a word like "Happy"', 'Say a word like "Big"', 'Say a word like "Fast"'],
  comp4: ['Tell me about your favourite animal', 'Describe your school', 'Say two things you like'],
  // Class 5
  algebra5: ['Solve: x + 5 = 12', 'Solve: 2x = 10', 'Solve: 3x + 2 = 11', 'Solve: x - 4 = 6'],
  geo5: ['Name a triangle', 'Name a rectangle', 'Name a circle', 'Name a square'],
  big5: ['What is 125 + 75?', 'What is 12 × 12?', 'What is 200 - 64?'],
  gram5: ['Make a sentence with "although"', 'Use a verb in a sentence', 'Make a question sentence'],
  anto5: ['Opposite of "Strong"', 'Opposite of "Ancient"', 'Opposite of "Brave"'],
  gk5: ['Capital of India?', 'Largest planet?', 'How many days in a week?']
};

export const STORIES = [
  {
    title: 'The Thirsty Crow', emoji: '🐦', seed: 21,
    art: 'the SAME characters in every image: one glossy black crow with a small orange beak, bright friendly eyes and neat feathers, and one round brown clay water pot. Setting: a warm sunny green garden in an Indian village',
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
    art: 'the SAME characters in every image: one big gentle golden-brown lion with a fluffy rounded orange mane and kind warm eyes, and one tiny round grey mouse with big ears and a long thin tail. Setting: a lush sunlit green jungle',
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
    art: 'the SAME character in every image: one elegant peacock with a deep blue body, a small crown of feathers, and a bright blue-and-green fan tail with eye spots. Setting: a green forest clearing',
    blurb: 'A proud peacock learns to dance with joy.',
    moral: 'True beauty shines when we share our joy.',
    pages: [
      'In a sunny forest lived a beautiful peacock with shimmering blue and green feathers. He was very, very proud of them.',
      'One day, dark clouds gathered in the sky. The other birds grew worried — but the peacock only wished everyone would look at him.',
      'Then the rain began to fall — pitter, patter, pitter, patter! The cool drops sparkled on the peacock’s lovely feathers.',
      'Filled with joy, the peacock opened his feathers wide and began to dance! Round and round he twirled in the gentle rain.',
      'When the rain stopped, a bright rainbow filled the sky. All the animals clapped — for the peacock’s happy, joyful dance!'
    ]
  },
  {
    title: 'The Tortoise and the Hare', emoji: '🐢', seed: 101,
    art: 'the SAME two characters in every image: one slow gentle green tortoise with a friendly smile, and one fast brown hare with long ears. Setting: a sunny countryside path with trees',
    blurb: 'Slow and steady wins the race.',
    moral: 'Slow and steady wins the race.',
    pages: [
      'A speedy hare loved to boast, "I am the fastest animal of all!" A slow little tortoise just smiled.',
      'One day the tortoise said, "Let us have a race!" All the animals gathered around to watch and cheer.',
      'The hare zoomed far ahead. "I have plenty of time," he thought, and lay down for a little nap.',
      'The tortoise kept walking — slow and steady, step by step — never stopping for even a moment.',
      'When the hare woke up, the tortoise had already crossed the finish line! Everyone cheered for the steady little tortoise.'
    ]
  },
  {
    title: 'The Ant and the Grasshopper', emoji: '🐜', seed: 102,
    art: 'the SAME two characters in every image: one hard-working brown ant carrying food, and one cheerful green grasshopper with a tiny fiddle. Setting: a green meadow with flowers',
    blurb: 'Work hard today to enjoy tomorrow.',
    moral: 'Work hard today to enjoy tomorrow.',
    pages: [
      'All through the warm summer, a busy ant carried grains of food to store away for the winter.',
      'A cheerful grasshopper played his fiddle all day. "Why work so hard? Come and play!" he laughed.',
      '"I am saving food for the cold winter," said the ant. But the grasshopper just hopped away singing.',
      'Soon icy winter came. Snow covered the ground, and there was no food to be found anywhere.',
      'The hungry grasshopper visited the ant, who kindly shared her food. "Next time," he smiled, "I will plan ahead too!"'
    ]
  },
  {
    title: 'The Cap Seller and the Monkeys', emoji: '🧢', seed: 103,
    art: 'the SAME characters in every image: one friendly cap seller man in simple Indian clothes with a basket of colorful caps, and several playful brown monkeys in a big tree. Setting: a sunny Indian village near a forest',
    blurb: 'A calm mind finds a clever way.',
    moral: 'A calm mind finds a clever way.',
    pages: [
      'A cap seller walked from village to village, carrying a basket full of colorful caps on his head.',
      'Feeling tired, he sat down under a big shady tree and soon fell fast asleep.',
      'While he slept, naughty monkeys took all the caps and climbed up the tree, giggling happily!',
      'The cap seller woke up and saw the monkeys wearing his caps. Then he thought of a clever idea.',
      'He threw his own cap on the ground. The copycat monkeys threw theirs down too — and he happily gathered them all!'
    ]
  },
  {
    title: 'The Honest Woodcutter', emoji: '🪓', seed: 104,
    art: 'the SAME characters in every image: one kind poor woodcutter in simple clothes, and a gentle glowing blue river fairy. Setting: a green forest beside a clear blue river',
    blurb: 'Honesty is always rewarded.',
    moral: 'Honesty is always rewarded.',
    pages: [
      'A poor but honest woodcutter was cutting wood near a river when his old axe slipped from his hands.',
      'Splash! The axe fell deep into the river. The sad woodcutter sat down by the water.',
      'A kind river fairy appeared, holding a shining golden axe. "Is this yours?" she gently asked.',
      '"No," said the woodcutter honestly. "Mine is only made of plain iron." The fairy smiled at his honesty.',
      'Pleased, the fairy gave him the golden axe, a silver axe, AND his own iron axe — a reward for telling the truth.'
    ]
  },
  {
    title: 'The Fox and the Grapes', emoji: '🦊', seed: 105,
    art: 'the SAME character in every image: one clever orange fox with a bushy tail. Setting: a sunny garden with a high vine full of purple grapes',
    blurb: 'It is easy to dislike what we cannot have.',
    moral: 'It is easy to dislike what we cannot have.',
    pages: [
      'One hot day, a hungry fox walked through a garden and saw juicy purple grapes high up on a vine.',
      '"Those grapes look so sweet!" said the fox, licking his lips. "I simply must have them."',
      'He jumped up high to reach them — but missed! He tried again and again, with all his might.',
      'No matter how high he jumped, the grapes stayed just out of reach. The tired fox sat down, panting.',
      '"Those grapes are probably sour anyway," he grumbled, and walked away — though really, he just could not reach them.'
    ]
  },
  {
    title: 'The Goose and the Golden Egg', emoji: '🥚', seed: 106,
    art: 'the SAME characters in every image: one kind farmer and one plump white goose that lays shiny golden eggs. Setting: a cozy little farm with a house and a barn',
    blurb: 'Greed often leads to loss.',
    moral: 'Patience is better than greed.',
    pages: [
      'A farmer had a very special goose. Every single morning, it laid one shiny golden egg!',
      'The farmer sold the golden eggs one by one, and slowly grew happy and well-off.',
      'But he became greedy and impatient. "Why wait for just one egg a day? I want a whole pile now!"',
      'Sure there must be gold hidden inside, he rushed and grabbed the goose roughly.',
      'Frightened, the goose flapped away and flew far off. With no more golden eggs, the farmer wished he had simply been patient.'
    ]
  },
  {
    title: 'The Monkey and the Crocodile', emoji: '🐊', seed: 107,
    art: 'the SAME two characters in every image: one cheerful brown monkey in a fruit tree, and one friendly green crocodile in the river. Setting: a sunny riverbank with a tall berry tree',
    blurb: 'Presence of mind keeps you safe.',
    moral: 'Quick thinking keeps you safe.',
    pages: [
      'A clever monkey lived in a berry tree by a river. Each day he happily shared sweet berries with his crocodile friend.',
      'The crocodile carried some berries home, and soon the two became the very best of friends.',
      'One day the crocodile offered the monkey a ride across the river on his strong back.',
      'Halfway across, the monkey felt unsure. Thinking quickly, he said, "Oh no! I left my best berries back in the tree!"',
      'The crocodile turned back, and the clever monkey hopped safely up his tree. "Always think first," he laughed, "and stay safe!"'
    ]
  }
];

// soft gradient backdrops cycled per page (kept simple & crisp)
export const SCENES = [
  ['#FDB813', '#FFE3A3'], ['#7EC8E3', '#D2F0FF'], ['#9BE3C2', '#E6FFF3'],
  ['#C9A0DC', '#F3E6FF'], ['#FFB6C1', '#FFE6EC']
];
