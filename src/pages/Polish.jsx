// ============================================================================
// DEMON SLAYER: CORPS BATTLE (Polished Version)
// ============================================================================
//
// This is the fully polished version of the game with all visual effects,
// responsive design, and advanced styling. Visit the root "/" path for the
// simplified learning version.
// ============================================================================

import { useState, useEffect, useRef } from "react";

// ----------------------------------------------------------------------------
// DEMON DATA - Our fearsome opponent
// ----------------------------------------------------------------------------
const demon = {
  name: "Kyogai",
  title: "The Drum Demon",
  health: 60,
  image: "demon.png",
  attackDialogue: [
    "The demon beats its drums furiously!",
    "Kyogai roars and slashes with demonic claws!",
    "The room spins as drums thunder!",
    "A barrage of drum beats assaults you!",
  ],
};

// Helper: Get random item from array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ============================================================================
// MAIN POLISH COMPONENT
// ============================================================================
function Polish() {
  // ==========================================================================
  // STATE - All the variables React tracks for us
  // ==========================================================================
  const [slayerHealth, setSlayerHealth] = useState(100);
  const [maxSlayerHealth] = useState(100);
  const [demonHealth, setDemonHealth] = useState(0);
  const [demonMaxHealth] = useState(demon.health);
  const [battleLog, setBattleLog] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [battleStarted, setBattleStarted] = useState(false);
  const [healingBreathsLeft, setHealingBreathsLeft] = useState(3);

  // Visual effect states
  const [isShaking, setIsShaking] = useState(false);
  const [isDamaged, setIsDamaged] = useState(false);
  const [demonHit, setDemonHit] = useState(false);

  // Ref for auto-scrolling battle log
  const battleLogRef = useRef(null);

  // ==========================================================================
  // EFFECTS - Auto-scroll battle log when new messages appear
  // ==========================================================================
  useEffect(() => {
    if (battleLogRef.current) {
      battleLogRef.current.scrollTop = battleLogRef.current.scrollHeight;
    }
  }, [battleLog]);

  // ==========================================================================
  // HELPER FUNCTIONS - Visual effects
  // ==========================================================================
  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const triggerDamageFlash = () => {
    setIsDamaged(true);
    setTimeout(() => setIsDamaged(false), 300);
  };

  const triggerDemonHit = () => {
    setDemonHit(true);
    setTimeout(() => setDemonHit(false), 200);
  };

  const addMessage = (msg, log = battleLog) => [...log, msg];

  // ==========================================================================
  // GAME ACTIONS
  // ==========================================================================

  // Start a new battle
  const startBattle = () => {
    setDemonHealth(demon.health);
    setSlayerHealth(maxSlayerHealth);
    setHealingBreathsLeft(3);
    setGameOver(false);
    setWinner(null);
    setBattleStarted(true);
    setBattleLog([
      "--- A NEW BATTLE BEGINS ---",
      `A fearsome ${demon.name}, ${demon.title}, emerges from the shadows!`,
      "Ready your Nichirin Blade, Demon Slayer!",
    ]);
  };

  // Attack the demon
  const attack = () => {
    if (gameOver) return;

    const slayerDamage = Math.floor(Math.random() * 9) + 10;
    const newDemonHealth = Math.max(0, demonHealth - slayerDamage);
    setDemonHealth(newDemonHealth);
    triggerDemonHit();

    let newLog = addMessage(
      `You unleash a Water Breathing technique for ${slayerDamage} damage!`,
    );

    if (newDemonHealth <= 0) {
      setGameOver(true);
      setWinner("slayer");
      setBattleLog([
        ...newLog,
        `${demon.name}'s head falls to your blade!`,
        "--- VICTORY! THE DEMON IS SLAIN! ---",
      ]);
      return;
    }

    const demonDamage = Math.floor(Math.random() * 10) + 5;
    const newSlayerHealth = Math.max(0, slayerHealth - demonDamage);
    setSlayerHealth(newSlayerHealth);
    triggerShake();
    triggerDamageFlash();

    newLog = addMessage(
      `${getRandomItem(demon.attackDialogue)} You take ${demonDamage} damage!`,
      newLog,
    );

    if (newSlayerHealth <= 0) {
      setGameOver(true);
      setWinner("demon");
      setBattleLog([
        ...newLog,
        "Your vision fades to darkness...",
        "--- DEFEAT... YOUR JOURNEY ENDS HERE ---",
      ]);
    } else {
      setBattleLog(newLog);
    }
  };

  // Attempt to retreat
  const retreat = () => {
    if (gameOver) return;

    if (Math.random() > 0.5) {
      setGameOver(true);
      setWinner("retreat");
      setBattleLog(
        addMessage(
          "You use your agility to vanish into the shadows... Live to fight another day!",
        ),
      );
    } else {
      let newLog = addMessage("The demon blocks your escape route!");
      const demonDamage = Math.floor(Math.random() * 10) + 5;
      const newSlayerHealth = Math.max(0, slayerHealth - demonDamage);
      setSlayerHealth(newSlayerHealth);
      triggerShake();
      triggerDamageFlash();

      newLog = addMessage(
        `${getRandomItem(demon.attackDialogue)} You take ${demonDamage} damage!`,
        newLog,
      );

      if (newSlayerHealth <= 0) {
        setGameOver(true);
        setWinner("demon");
        setBattleLog([...newLog, "--- DEFEAT... YOUR JOURNEY ENDS HERE ---"]);
      } else {
        setBattleLog(newLog);
      }
    }
  };

  // Use recovery breath to heal
  const recoveryBreath = () => {
    if (gameOver || healingBreathsLeft <= 0) return;

    const healAmount = 25;
    const newSlayerHealth = Math.min(
      maxSlayerHealth,
      slayerHealth + healAmount,
    );
    const actualHeal = newSlayerHealth - slayerHealth;
    setSlayerHealth(newSlayerHealth);
    setHealingBreathsLeft(healingBreathsLeft - 1);

    let newLog = addMessage(
      `Total Concentration: Recovery Breath! +${actualHeal} HP restored! (${healingBreathsLeft - 1} uses left)`,
    );

    const demonDamage = Math.floor(Math.random() * 10) + 5;
    const healthAfterAttack = Math.max(0, newSlayerHealth - demonDamage);
    setSlayerHealth(healthAfterAttack);
    triggerShake();
    triggerDamageFlash();

    newLog = addMessage(
      `${getRandomItem(demon.attackDialogue)} You take ${demonDamage} damage!`,
      newLog,
    );

    if (healthAfterAttack <= 0) {
      setGameOver(true);
      setWinner("demon");
      setBattleLog([...newLog, "--- DEFEAT... YOUR JOURNEY ENDS HERE ---"]);
    } else {
      setBattleLog(newLog);
    }
  };

  // ==========================================================================
  // RENDER - The UI (using pure Tailwind classes!)
  // ==========================================================================
  return (
    <div
      className={`
        min-h-screen w-full
        bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950
        flex flex-col items-center justify-center
        p-4 md:p-6 lg:p-8
        relative overflow-hidden
        ${isShaking ? "animate-shake" : ""}
      `}
    >
      {/* Vignette overlay - darkens edges for atmosphere */}
      <div
        className="
          absolute inset-0
          pointer-events-none
          bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]
        "
      />

      {/* Scanline effect - subtle horizontal lines for retro CRT feel */}
      <div
        className="
          absolute inset-0
          pointer-events-none
          opacity-20
          bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.3)_1px,rgba(0,0,0,0.3)_2px)]
        "
      />

      {/* Damage flash overlay */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 ${isDamaged ? "animate-damage" : ""}`}
      />

      {/* Floating particles for atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blood-glow rounded-full opacity-60 animate-rise"
            style={{
              left: `${10 + i * 12}%`,
              bottom: "10%",
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* GAME TITLE - Always visible */}
      <div className="text-center mb-4 md:mb-6 lg:mb-8 relative z-10">
        <h1
          className="
            font-medieval
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            text-blood-glow
            animate-glow
            tracking-wider
          "
        >
          Demon Slayer
        </h1>
        <p className="text-gold text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] tracking-[0.3em] mt-2">
          CORPS BATTLE
        </p>
      </div>

      {/* CONDITIONAL RENDERING: Start Screen vs Battle Screen */}
      {!battleStarted ? (
        // START SCREEN
        <div
          className="
            relative z-10
            bg-gradient-to-b from-panel to-gray-950
            border-2 border-gold-dark rounded-lg
            p-5 sm:p-6 md:p-7 lg:p-8
            w-[90vw] sm:w-auto sm:min-w-[380px] md:min-w-[420px] max-w-md
            shadow-[0_0_30px_rgba(139,0,0,0.3),inset_0_1px_0_rgba(255,215,0,0.1)]
            animate-fade-in
          "
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-l-2 border-t-2 border-gold" />
          <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 border-r-2 border-t-2 border-gold" />
          <div className="absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 border-l-2 border-b-2 border-gold" />
          <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-r-2 border-b-2 border-gold" />

          <div className="text-center mb-5 md:mb-6">
            <div className="text-3xl md:text-4xl mb-3 md:mb-4 text-blood-glow">
              &#9876;
            </div>
            <p className="text-xs sm:text-sm mb-3 md:mb-4 leading-relaxed text-gray-300">
              A demon has been sighted in the area.
            </p>
            <p className="text-[9px] md:text-[10px] text-gray-500 leading-relaxed">
              As a member of the Demon Slayer Corps, you must eliminate this
              threat.
            </p>
          </div>

          {/* Mission briefing box */}
          <div className="bg-black/40 p-3 md:p-4 rounded mb-5 md:mb-6 text-left text-[9px] md:text-[10px] border border-gray-800">
            <p className="text-gold mb-2 tracking-wider">MISSION BRIEFING:</p>
            <p className="text-gray-400 mb-1">
              Target: <span className="text-gray-200">{demon.name}</span>
            </p>
            <p className="text-gray-400 mb-1">
              Title: <span className="text-gray-200">{demon.title}</span>
            </p>
            <p className="text-gray-400">
              Threat Level: <span className="text-blood-glow">Lower Moon</span>
            </p>
          </div>

          <button
            onClick={startBattle}
            className="
              w-full py-3 md:py-4 px-6
              bg-gradient-to-b from-purple-600 to-purple-900
              border-b-4 border-purple-950
              rounded
              text-white text-[10px] md:text-xs
              uppercase tracking-wider
              shadow-[0_4px_0_rgba(0,0,0,0.5),0_6px_10px_rgba(0,0,0,0.3)]
              hover:from-purple-500 hover:to-purple-800
              hover:-translate-y-0.5
              active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.5)]
              transition-all duration-100
            "
          >
            Begin Mission
          </button>
        </div>
      ) : (
        // BATTLE SCREEN - Responsive grid layout
        <div
          className="
            relative z-10
            w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[90vw] max-w-6xl
            grid grid-cols-1 lg:grid-cols-2
            gap-4 md:gap-5 lg:gap-6
            items-stretch
          "
        >
          {/* LEFT COLUMN: Demon Display */}
          <div
            className="
              bg-gradient-to-b from-panel to-gray-950
              border-2 border-gold-dark rounded-lg
              p-4 md:p-5 lg:p-6
              shadow-[0_0_30px_rgba(139,0,0,0.3)]
              relative
              flex flex-col justify-center
            "
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-l-2 border-t-2 border-gold" />
            <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 border-r-2 border-t-2 border-gold" />
            <div className="absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 border-l-2 border-b-2 border-gold" />
            <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-r-2 border-b-2 border-gold" />

            {/* Demon stage with atmospheric glow */}
            <div
              className="
                relative p-4 md:p-5 lg:p-6 rounded-lg
                bg-[radial-gradient(ellipse_at_center_bottom,rgba(139,0,0,0.3)_0%,transparent_70%)]
              "
            >
              {/* Demon info */}
              <div className="text-center">
                <h2 className="font-medieval text-xl sm:text-2xl md:text-2xl lg:text-3xl text-blood-glow mb-1">
                  {demon.name}
                </h2>
                <p className="text-[8px] md:text-[9px] lg:text-[10px] text-gray-500 mb-4 md:mb-5 lg:mb-6">
                  {demon.title}
                </p>

                {/* Demon sprite */}
                <div className="relative inline-block">
                  <div
                    className={`
                      text-6xl sm:text-7xl md:text-7xl lg:text-8xl
                      animate-float
                      transition-all duration-100
                      ${demonHit ? "brightness-200 saturate-0" : ""}
                    `}
                    style={{
                      filter: demonHit
                        ? "brightness(2) saturate(0)"
                        : "drop-shadow(0 0 20px rgba(139,0,0,0.5))",
                    }}
                  >
                    &#128121;
                  </div>
                  {/* Ground shadow */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 md:w-20 h-3 md:h-4 bg-black/40 rounded-full blur-sm" />
                </div>
              </div>

              {/* Demon health bar */}
              <div className="mt-6 md:mt-7 lg:mt-8">
                <div className="flex justify-between mb-1">
                  <span className="text-[7px] md:text-[8px] text-demon uppercase tracking-wider">
                    {demon.name}
                  </span>
                  <span className="text-[7px] md:text-[8px] text-demon">
                    {demonHealth}/{demonMaxHealth}
                  </span>
                </div>
                <div className="h-3 md:h-4 bg-gray-900 rounded overflow-hidden border border-gray-700 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]">
                  <div
                    className="h-full bg-gradient-to-b from-demon via-red-600 to-demon-dark shadow-[0_0_10px_#FF3333] transition-all duration-500"
                    style={{
                      width: `${(demonHealth / demonMaxHealth) * 100}%`,
                    }}
                  >
                    {/* Shine effect */}
                    <div className="h-1/3 bg-gradient-to-b from-white/30 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Player Stats, Battle Log, Actions */}
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Player Health Panel */}
            <div
              className="
                bg-gradient-to-b from-panel to-gray-950
                border-2 border-gold-dark rounded-lg
                p-3 md:p-4
                shadow-[0_0_20px_rgba(0,100,0,0.2)]
                relative
              "
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-gold" />
              <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-gold" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-gold" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-gold" />

              <div className="flex justify-between mb-1">
                <span className="text-[7px] md:text-[8px] text-health uppercase tracking-wider">
                  Demon Slayer
                </span>
                <span className="text-[7px] md:text-[8px] text-health">
                  {slayerHealth}/{maxSlayerHealth}
                </span>
              </div>
              <div className="h-4 md:h-5 bg-gray-900 rounded overflow-hidden border border-gray-700 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]">
                <div
                  className="h-full bg-gradient-to-b from-health via-emerald-500 to-health-dark shadow-[0_0_10px_#00FF88] transition-all duration-500"
                  style={{
                    width: `${(slayerHealth / maxSlayerHealth) * 100}%`,
                  }}
                >
                  <div className="h-1/3 bg-gradient-to-b from-white/30 to-transparent" />
                </div>
              </div>
            </div>

            {/* Battle Log */}
            <div
              className="
                h-[180px] sm:h-[200px] md:h-[240px] lg:h-[260px]
                bg-gradient-to-b from-black/80 to-purple-950/30
                border-2 border-gold-dark rounded-lg
                shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]
                relative
              "
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-gold" />
              <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-gold" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-gold" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-gold" />

              {/* Inner scrollable content */}
              <div
                ref={battleLogRef}
                className="h-full overflow-y-auto p-3 md:p-4"
              >
                {battleLog.map((message, index) => (
                  <p
                    key={index}
                    className={`
                      text-[8px] sm:text-[9px] md:text-[9px] lg:text-[10px] leading-relaxed mb-2
                      animate-fade-in
                      ${
                        message.includes("---")
                          ? "text-gold text-center my-2 md:my-3 tracking-wider"
                          : index === battleLog.length - 1
                            ? "text-gold"
                            : "text-gray-400"
                      }
                    `}
                  >
                    {message}
                  </p>
                ))}
              </div>
            </div>

            {/* Action Buttons or Game Over */}
            <div className="h-[52px] sm:h-[56px] md:h-[64px] lg:h-[72px]">
              {!gameOver ? (
                <div className="grid grid-cols-3 gap-2 md:gap-3 h-full">
                  {/* Attack Button */}
                  <button
                    onClick={attack}
                    className="
                      bg-gradient-to-b from-red-600 to-red-900
                      border-b-4 border-red-950
                      rounded
                      text-white text-[8px] sm:text-[9px] md:text-[9px] lg:text-[10px]
                      uppercase tracking-wider
                      shadow-[0_4px_0_rgba(0,0,0,0.5),0_6px_10px_rgba(0,0,0,0.3)]
                      hover:from-red-500 hover:to-red-800
                      hover:-translate-y-0.5
                      active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.5)]
                      transition-all duration-100
                    "
                  >
                    Attack
                  </button>

                  {/* Retreat Button */}
                  <button
                    onClick={retreat}
                    className="
                      bg-gradient-to-b from-amber-600 to-amber-900
                      border-b-4 border-amber-950
                      rounded
                      text-white text-[8px] sm:text-[9px] md:text-[9px] lg:text-[10px]
                      uppercase tracking-wider
                      shadow-[0_4px_0_rgba(0,0,0,0.5),0_6px_10px_rgba(0,0,0,0.3)]
                      hover:from-amber-500 hover:to-amber-800
                      hover:-translate-y-0.5
                      active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.5)]
                      transition-all duration-100
                    "
                  >
                    Retreat
                  </button>

                  {/* Heal Button */}
                  <button
                    onClick={recoveryBreath}
                    disabled={healingBreathsLeft <= 0}
                    className="
                      bg-gradient-to-b from-blue-600 to-blue-900
                      border-b-4 border-blue-950
                      rounded
                      text-white text-[8px] sm:text-[9px] md:text-[9px] lg:text-[10px]
                      uppercase tracking-wider
                      shadow-[0_4px_0_rgba(0,0,0,0.5),0_6px_10px_rgba(0,0,0,0.3)]
                      hover:from-blue-500 hover:to-blue-800
                      hover:-translate-y-0.5
                      active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.5)]
                      transition-all duration-100
                      disabled:opacity-40 disabled:cursor-not-allowed
                      disabled:hover:translate-y-0 disabled:hover:from-blue-600
                    "
                  >
                    Heal ({healingBreathsLeft})
                  </button>
                </div>
              ) : (
                // Game Over
                <div className="grid grid-cols-3 gap-2 md:gap-3 h-full">
                  {/* Result display */}
                  <div
                    className="
                      col-span-2
                      bg-gradient-to-b from-panel to-gray-950
                      border-2 border-gold-dark rounded-lg
                      flex items-center justify-center
                      relative
                    "
                  >
                    <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-gold" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-gold" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-gold" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-gold" />

                    <p
                      className={`
                        font-medieval text-base sm:text-lg md:text-xl lg:text-2xl
                        ${
                          winner === "slayer"
                            ? "text-gold animate-breathe"
                            : winner === "retreat"
                              ? "text-amber-400"
                              : "text-blood-glow"
                        }
                      `}
                      style={{
                        textShadow:
                          winner === "slayer"
                            ? "0 0 10px #FFD700, 0 0 20px #B8860B"
                            : winner === "demon"
                              ? "0 0 10px #FF4444, 0 0 20px #8B0000"
                              : "none",
                      }}
                    >
                      {winner === "slayer"
                        ? "VICTORY!"
                        : winner === "retreat"
                          ? "ESCAPED!"
                          : "DEFEATED..."}
                    </p>
                  </div>

                  {/* Fight Again Button */}
                  <button
                    onClick={startBattle}
                    className="
                      bg-gradient-to-b from-purple-600 to-purple-900
                      border-b-4 border-purple-950
                      rounded
                      text-white text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px]
                      uppercase tracking-wider
                      shadow-[0_4px_0_rgba(0,0,0,0.5),0_6px_10px_rgba(0,0,0,0.3)]
                      hover:from-purple-500 hover:to-purple-800
                      hover:-translate-y-0.5
                      active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.5)]
                      transition-all duration-100
                    "
                  >
                    Fight Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer with game stats */}
      <div className="mt-4 md:mt-6 lg:mt-8 text-center text-[7px] sm:text-[8px] text-gray-600 relative z-10">
        <p className="mb-1">
          Attack: 10-18 DMG | Demon: 5-14 DMG | Heal: +25 HP
        </p>
        <p>Retreat has 50% success rate</p>
      </div>
    </div>
  );
}

export default Polish;
