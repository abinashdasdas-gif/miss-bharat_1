import { STORIES } from '../src/data.js';
import fs from 'fs';
const data = STORIES.map(s => ({ moral: s.moral, pages: s.pages }));
fs.writeFileSync(new URL('stories.json', import.meta.url), JSON.stringify(data, null, 0));
console.log('wrote stories.json:', data.length, 'stories');
