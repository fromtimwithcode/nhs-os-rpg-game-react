// ============================================================================
// DEMON SLAYER: BATTLE GAME - A React Tutorial
// ============================================================================
//
// Welcome, future developer! This file contains a COMPLETE battle game.
// Everything you need is right here in this one file.
//
// HOW TO READ THIS FILE:
// - Comments (like this text) explain what the code does
// - The actual code is what the computer runs
// - Read the comments first, then look at the code below them
//
// WHAT IS REACT?
// React is a tool that helps us build interactive websites. Instead of
// writing plain HTML, we write JavaScript that creates the HTML for us.
// When something changes (like your health), React automatically updates
// the screen - no page refresh needed!
//
// WHAT IS TAILWIND CSS?
// Tailwind is a way to style our website using class names. Instead of
// writing CSS in a separate file, we add classes directly to our HTML
// elements. For example, "bg-red-500" makes a background red.
//
// ============================================================================

// ----------------------------------------------------------------------------
// IMPORTS - Getting tools we need
// ----------------------------------------------------------------------------
// "import" is how we bring in code from other files or libraries.
//
// useState: A React tool that lets us create variables that update the screen
//           when they change. We call these "state variables".
//
// Think of it like a scoreboard at a game - when the score changes,
// the scoreboard updates automatically. useState does that for our website!
import { useState } from "react";

// ============================================================================
// THE APP COMPONENT - Our entire game lives here!
// ============================================================================
//
// In React, we organize our code into "components". A component is like a
// custom HTML tag that we create. This component is called "App" and it
// contains our whole game.
//
// Components are written as functions that return JSX (HTML-like code).
// Whatever we return is what shows up on the screen!
function App() {
  // ==========================================================================
  // GAME CONFIGURATION - Easy to change values!
  // ==========================================================================
  // These are regular JavaScript variables (not state).
  // Change these numbers to make the game easier or harder!

  const PLAYER_MAX_HEALTH = 100; // How much health the player starts with
  const DEMON_MAX_HEALTH = 60; // How much health the demon has
  const PLAYER_MIN_DAMAGE = 10; // Minimum damage player deals
  const PLAYER_MAX_DAMAGE = 18; // Maximum damage player deals
  const DEMON_MIN_DAMAGE = 5; // Minimum damage demon deals
  const DEMON_MAX_DAMAGE = 12; // Maximum damage demon deals
  const HEAL_AMOUNT = 25; // How much health you restore when healing
  const HEAL_USES = 3; // How many times you can heal per battle

  // ==========================================================================
  // STATE VARIABLES - The game's memory
  // ==========================================================================
  //
  // useState() creates a special variable that React watches. When we change
  // it using the "set" function, React automatically updates the screen!
  //
  // The pattern is: const [value, setValue] = useState(startingValue);
  //
  // - "value" is the current data (what we read)
  // - "setValue" is a function to change that data (what we call to update)
  // - "startingValue" is what it starts as when the page loads
  //
  // EXAMPLE:
  //   const [score, setScore] = useState(0);
  //   // score starts at 0
  //   // To change it: setScore(10);  // Now score is 10!

  // Player's current health points (HP)
  // When this reaches 0, you lose!
  const [playerHealth, setPlayerHealth] = useState(PLAYER_MAX_HEALTH);

  // Demon's current health points
  // When this reaches 0, you win!
  const [demonHealth, setDemonHealth] = useState(DEMON_MAX_HEALTH);

  // Array of battle messages - shows the story of the fight
  // Arrays are lists that can hold multiple items: ["item1", "item2", "item3"]
  const [messages, setMessages] = useState([
    "A demon appears! Prepare for battle!",
  ]);

  // Is the game over? (true = yes, false = no)
  // Booleans can only be true or false - like a light switch!
  const [gameOver, setGameOver] = useState(false);

  // Who won? Can be: 'player', 'demon', 'escaped', or null (no one yet)
  // null means "nothing" - the battle hasn't ended yet
  const [winner, setWinner] = useState(null);

  // How many healing uses are left?
  const [healsLeft, setHealsLeft] = useState(HEAL_USES);

  // ==========================================================================
  // HELPER FUNCTION - Calculate random damage
  // ==========================================================================
  //
  // Functions are reusable blocks of code. We write them once and can use
  // them many times! This function calculates random damage.
  //
  // Parameters (the stuff in parentheses) are inputs to the function:
  // - min: the minimum damage
  // - max: the maximum damage
  //
  // Math.random() gives a random decimal between 0 and 0.999...
  // Math.floor() rounds down to a whole number
  //
  // EXAMPLE: getRandomDamage(5, 10) could return 5, 6, 7, 8, 9, or 10
  const getRandomDamage = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // ==========================================================================
  // GAME ACTIONS - What happens when buttons are clicked
  // ==========================================================================

  // --------------------------------------------------------------------------
  // ATTACK - Player strikes the demon!
  // --------------------------------------------------------------------------
  const handleAttack = () => {
    // If the game is already over, don't do anything
    // "return" exits the function immediately
    if (gameOver) return;

    // Calculate player's damage (random between min and max)
    const playerDamage = getRandomDamage(PLAYER_MIN_DAMAGE, PLAYER_MAX_DAMAGE);

    // Calculate demon's new health
    // Math.max(0, ...) makes sure health never goes below 0
    const newDemonHealth = Math.max(0, demonHealth - playerDamage);
    setDemonHealth(newDemonHealth);

    // Create message about player's attack
    // Template literals (backticks `) let us insert variables with ${variable}
    let newMessages = [
      ...messages,
      `You slash with your Nichirin Blade for ${playerDamage} damage!`,
    ];

    // Check if demon is defeated
    if (newDemonHealth <= 0) {
      setGameOver(true);
      setWinner("player");
      setMessages([...newMessages, "Victory! The demon is slain!"]);
      return; // Exit function - demon can't attack if it's dead!
    }

    // Demon attacks back!
    const demonDamage = getRandomDamage(DEMON_MIN_DAMAGE, DEMON_MAX_DAMAGE);
    const newPlayerHealth = Math.max(0, playerHealth - demonDamage);
    setPlayerHealth(newPlayerHealth);

    // Add demon's attack message
    newMessages = [
      ...newMessages,
      `The demon strikes back for ${demonDamage} damage!`,
    ];

    // Check if player is defeated
    if (newPlayerHealth <= 0) {
      setGameOver(true);
      setWinner("demon");
      setMessages([...newMessages, "Defeat... The demon has won."]);
    } else {
      setMessages(newMessages);
    }
  };

  // --------------------------------------------------------------------------
  // HEAL - Restore some health (limited uses!)
  // --------------------------------------------------------------------------
  const handleHeal = () => {
    // Can't heal if game is over OR no heals left
    // The || means "or" - if EITHER condition is true, we exit
    if (gameOver || healsLeft <= 0) return;

    // Calculate new health (can't go above max!)
    // Math.min() returns the smaller number, so we don't exceed max health
    const newHealth = Math.min(PLAYER_MAX_HEALTH, playerHealth + HEAL_AMOUNT);
    setPlayerHealth(newHealth);

    // Use up one heal
    setHealsLeft(healsLeft - 1);

    // Calculate how much we actually healed (might be less if near max)
    const actualHeal = newHealth - playerHealth;

    let newMessages = [
      ...messages,
      `Total Concentration Breathing! Restored ${actualHeal} HP. (${healsLeft - 1} heals left)`,
    ];

    // Demon still attacks while you're healing!
    const demonDamage = getRandomDamage(DEMON_MIN_DAMAGE, DEMON_MAX_DAMAGE);
    const healthAfterAttack = Math.max(0, newHealth - demonDamage);
    setPlayerHealth(healthAfterAttack);

    newMessages = [
      ...newMessages,
      `The demon strikes for ${demonDamage} damage!`,
    ];

    // Check if player died from demon's attack
    if (healthAfterAttack <= 0) {
      setGameOver(true);
      setWinner("demon");
      setMessages([...newMessages, "Defeat... The demon has won."]);
    } else {
      setMessages(newMessages);
    }
  };

  // --------------------------------------------------------------------------
  // RUN AWAY - Try to escape (50% chance!)
  // --------------------------------------------------------------------------
  const handleRun = () => {
    if (gameOver) return;

    // Math.random() > 0.5 gives us about 50% chance of being true
    // It's like flipping a coin!
    const escaped = Math.random() > 0.5;

    if (escaped) {
      setGameOver(true);
      setWinner("escaped");
      setMessages([...messages, "You escaped! Live to fight another day..."]);
    } else {
      // Failed to escape - demon gets a free hit!
      let newMessages = [
        ...messages,
        "You tried to run but the demon blocked you!",
      ];

      const demonDamage = getRandomDamage(DEMON_MIN_DAMAGE, DEMON_MAX_DAMAGE);
      const newPlayerHealth = Math.max(0, playerHealth - demonDamage);
      setPlayerHealth(newPlayerHealth);

      newMessages = [
        ...newMessages,
        `The demon strikes for ${demonDamage} damage!`,
      ];

      if (newPlayerHealth <= 0) {
        setGameOver(true);
        setWinner("demon");
        setMessages([...newMessages, "Defeat... The demon has won."]);
      } else {
        setMessages(newMessages);
      }
    }
  };

  // --------------------------------------------------------------------------
  // RESTART - Start a new game
  // --------------------------------------------------------------------------
  const handleRestart = () => {
    // Reset all state variables to their starting values
    setPlayerHealth(PLAYER_MAX_HEALTH);
    setDemonHealth(DEMON_MAX_HEALTH);
    setMessages(["A demon appears! Prepare for battle!"]);
    setGameOver(false);
    setWinner(null);
    setHealsLeft(HEAL_USES);
  };

  // ==========================================================================
  // THE RENDER - What shows up on the screen!
  // ==========================================================================
  //
  // Everything inside the return statement is JSX. JSX looks like HTML, but
  // it's actually JavaScript that creates HTML elements.
  //
  // JSX RULES:
  // 1. Use "className" instead of "class" (class is a reserved word in JS)
  // 2. Use curly braces {} to insert JavaScript: {playerHealth}
  // 3. Every tag must be closed: <img /> not <img>
  //
  // TAILWIND CLASSES EXPLAINED:
  // - "min-h-screen" = minimum height is the full screen
  // - "bg-gray-900" = background color is dark gray
  // - "text-white" = text color is white
  // - "p-4" = padding of 4 units on all sides
  // - "flex flex-col" = arrange children in a vertical column
  // - "items-center" = center children horizontally
  // - "rounded" = rounded corners
  // - "mb-4" = margin bottom of 4 units (space below)

  return (
    // Main container - dark background, full screen height, centered content
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      {/* =====================================================================
          GAME TITLE
          ===================================================================== */}
      <h1 className="text-3xl font-bold mb-6 text-red-500">
        Demon Slayer Battle
      </h1>

      {/* =====================================================================
          GAME AREA - Contains everything else
          =====================================================================
          max-w-md = maximum width (makes it not too wide on big screens)
          w-full = take full width (up to the max)
      */}
      <div className="max-w-md w-full">
        {/* -------------------------------------------------------------------
            DEMON SECTION
            ------------------------------------------------------------------- */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4 text-center">
          {/* Demon emoji as our "sprite" */}
          <div className="text-6xl mb-2">&#128121;</div>
          <h2 className="text-xl font-bold text-red-400">Demon</h2>

          {/* Demon Health Bar */}
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Health</span>
              <span>
                {demonHealth}/{DEMON_MAX_HEALTH}
              </span>
            </div>
            {/*
              Health bar container (gray background)
              The inner div's width changes based on health percentage
            */}
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-red-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${(demonHealth / DEMON_MAX_HEALTH) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            PLAYER SECTION
            ------------------------------------------------------------------- */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold text-green-400 text-center">
            Demon Slayer (You)
          </h2>

          {/* Player Health Bar */}
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Health</span>
              <span>
                {playerHealth}/{PLAYER_MAX_HEALTH}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-300"
                style={{
                  width: `${(playerHealth / PLAYER_MAX_HEALTH) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            BATTLE LOG - Shows what's happening in the fight
            -------------------------------------------------------------------
            overflow-y-auto = add scrollbar if content is too tall
            h-40 = fixed height of 40 units
        */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4 h-40 overflow-y-auto">
          <h3 className="text-sm font-bold text-yellow-400 mb-2">
            Battle Log:
          </h3>
          {/*
            .map() loops through each message and creates a <p> for each one

            "key" is required by React to track list items
            We use the index (position in array) as the key
          */}
          {messages.map((message, index) => (
            <p key={index} className="text-sm text-gray-300 mb-1">
              {message}
            </p>
          ))}
        </div>

        {/* -------------------------------------------------------------------
            ACTION BUTTONS OR GAME OVER MESSAGE
            -------------------------------------------------------------------
            Conditional rendering: {condition ? (show if true) : (show if false)}
            This is called a "ternary operator" - it's a compact if/else!
        */}
        {!gameOver ? (
          // GAME IS STILL GOING - Show action buttons
          <div className="flex gap-2">
            {/* Attack Button */}
            <button
              onClick={handleAttack}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors"
            >
              Attack
            </button>

            {/* Heal Button - disabled when no heals left */}
            <button
              onClick={handleHeal}
              disabled={healsLeft <= 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded transition-colors"
            >
              Heal ({healsLeft})
            </button>

            {/* Run Button */}
            <button
              onClick={handleRun}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded transition-colors"
            >
              Run
            </button>
          </div>
        ) : (
          // GAME IS OVER - Show result and restart button
          <div className="text-center">
            {/* Show different message based on who won */}
            <p
              className={`text-2xl font-bold mb-4 ${
                winner === "player"
                  ? "text-green-400"
                  : winner === "escaped"
                    ? "text-yellow-400"
                    : "text-red-400"
              }`}
            >
              {winner === "player" && "VICTORY!"}
              {winner === "escaped" && "ESCAPED!"}
              {winner === "demon" && "GAME OVER"}
            </p>

            <button
              onClick={handleRestart}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* =====================================================================
          FOOTER - Game tips
          ===================================================================== */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>
          Attack: {PLAYER_MIN_DAMAGE}-{PLAYER_MAX_DAMAGE} damage | Demon:{" "}
          {DEMON_MIN_DAMAGE}-{DEMON_MAX_DAMAGE} damage
        </p>
        <p>Heal: +{HEAL_AMOUNT} HP | Run: 50% chance to escape</p>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// EXPORT - Make this component available to other files
// ----------------------------------------------------------------------------
// This line lets main.jsx import and use our App component.
// Without this, other files couldn't access our game!
export default App;
