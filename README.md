# Demon Slayer: Battle Game

A React-based battle game where you fight demons! This project is designed to help you learn how React works by building something fun.

## Two Versions to Explore

### Your Version (Home Page - `/`)

The main game at the home page is **YOUR version** to learn from and modify. Open `src/App.jsx` and you'll find tons of comments explaining:

- What React is and how it works
- How `useState` tracks game data (health, messages, etc.)
- How Tailwind CSS classes style everything
- How functions handle attacks, healing, and running away

**This is the file you'll be editing!**

### Polished Version (`/polish`)

Visit `/polish` in your browser to see a fancy version with:

- Cool animations and visual effects
- Screen shake when you get hit
- Glowing text and floating particles
- A more dramatic battle experience

This shows what's possible once you master the basics. Don't worry about understanding this code yet - it's just here to inspire you!

## How to Run

1. Open your terminal in this folder
2. Install dependencies: `npm install`
3. Start the game: `npm run dev`
4. Open the URL shown (usually http://localhost:5173)

## Files You Should Know About

| File | What It Does |
|------|--------------|
| `src/App.jsx` | **YOUR GAME CODE** - Edit this file! |
| `src/pages/Polish.jsx` | The fancy version (just for reference) |
| `src/main.jsx` | Loads the app (don't need to touch this) |
| `index.html` | The HTML page (don't need to touch this) |

## Things to Try Changing

Open `src/App.jsx` and look for the "GAME CONFIGURATION" section near the top. Try changing these values and see what happens:

```javascript
const PLAYER_MAX_HEALTH = 100;  // Try 200 for an easier game
const DEMON_MAX_HEALTH = 60;    // Try 30 for a weaker demon
const PLAYER_MIN_DAMAGE = 10;   // Try 20 for stronger attacks
const PLAYER_MAX_DAMAGE = 18;   // Try 50 for SUPER strong attacks
const HEAL_AMOUNT = 25;         // Try 50 to heal more
const HEAL_USES = 3;            // Try 10 for more heals
```

### More Challenges

Once you're comfortable, try these:

1. **Change the text** - Find where it says "Demon Slayer Battle" and rename your game
2. **Change the demon emoji** - Search for `&#128121;` and try a different emoji
3. **Change the colors** - Look for `bg-red-500` or `text-green-400` and swap the colors
4. **Add a new message** - Find the battle messages and write your own

## Game Controls

- **Attack** - Deal 10-18 damage to the demon (demon attacks back!)
- **Heal** - Restore 25 HP, but you only get 3 heals per battle
- **Run** - 50% chance to escape (if you fail, the demon hits you!)

## Stuck?

- Read the comments in `App.jsx` - they explain everything!
- Ask your teacher for help
- Compare your code to the original if something breaks

Good luck, Demon Slayer!
