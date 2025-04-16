import React, { useState } from "react";
import {
  AlertCircle,
  Award,
  TrendingUp,
  Headphones,
  ShoppingCart,
} from "lucide-react";

const MillionaireTrivia = () => {
  // Game states
  const [gameState, setGameState] = useState("welcome"); // welcome, playing, using-lifeline, results, shop
  const [currentLevel, setCurrentLevel] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [activeLifeline, setActiveLifeline] = useState(null);
  const [usedLifelines, setUsedLifelines] = useState([]);
  const [walkAwayConfirm, setWalkAwayConfirm] = useState(false);
  const [ownedLifelineRefills, setOwnedLifelineRefills] = useState({
    stephen: 0,
    mcafee: 0,
    svp: 0,
  });
  const [showingShopModal, setShowingShopModal] = useState(false);

  // Define ESPN personalities as lifelines
  const lifelines = [
    {
      id: "stephen",
      name: "Stephen A. Smith",
      specialty: "NBA Expert",
      avatar: "😤",
      color: "#CF0A2C",
      description:
        "Will eliminate one wrong answer and argue passionately about why it's wrong",
      helpText: [
        "Now listen to me! This is BLASPHEMOUS! Option {option} is absolutely preposterous! Remove it immediately!",
        "CLEARLY option {option} is incorrect! Do I need to remind you that I've been covering sports for DECADES?!",
      ],
    },
    {
      id: "mcafee",
      name: "Pat McAfee",
      specialty: "NFL Expert",
      avatar: "🏈",
      color: "#003594",
      description:
        "Narrows down to the two most likely answers with entertaining analysis",
      helpText: [
        "Alright brother, I'm looking at these options and I'm thinking it's GOTTA be either {option1} or {option2}. The other ones just don't make any sense!",
        "BOOM! Let me tell you what - you can eliminate {option1} and {option2} right now. Trust me on this one!",
      ],
    },
    {
      id: "svp",
      name: "Scott Van Pelt",
      specialty: "All Sports",
      avatar: "🎙️",
      color: "#27251F",
      description:
        "Gives balanced analysis with a 70% chance of suggesting the correct answer",
      helpText: [
        "Looking at this analytically, I'm leaning toward {option}. The statistics and history point that way, but verify it yourself.",
        "Here's my take - while I can't be 100% sure, I believe {option} is your best choice here. Let me explain why...",
      ],
    },
  ];

  // Define prize levels
  const prizeLevels = [
    { level: 1, amount: "$500", safe: false },
    { level: 2, amount: "$1,000", safe: false },
    { level: 3, amount: "$2,000", safe: false },
    { level: 4, amount: "$3,000", safe: false },
    { level: 5, amount: "$5,000", safe: true },
    { level: 6, amount: "$10,000", safe: false },
    { level: 7, amount: "$20,000", safe: false },
    { level: 8, amount: "$30,000", safe: false },
    { level: 9, amount: "$50,000", safe: false },
    { level: 10, amount: "$100,000", safe: true },
    { level: 11, amount: "$250,000", safe: false },
    { level: 12, amount: "$500,000", safe: false },
    { level: 13, amount: "$750,000", safe: false },
    { level: 14, amount: "$1,000,000", safe: false },
  ];

  // Questions bank
  const questions = [
    {
      question: "Which NBA team has won the most championships?",
      options: [
        "Los Angeles Lakers",
        "Boston Celtics",
        "Chicago Bulls",
        "Golden State Warriors",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Which quarterback has won the most Super Bowl titles as a starter?",
      options: ["Peyton Manning", "Tom Brady", "Joe Montana", "Terry Bradshaw"],
      correctAnswer: 1,
    },
    {
      question: "Which MLB player holds the record for most career home runs?",
      options: ["Babe Ruth", "Hank Aaron", "Barry Bonds", "Alex Rodriguez"],
      correctAnswer: 2,
    },
    {
      question: "Who won the NBA MVP award for the 2022-23 season?",
      options: [
        "Nikola Jokić",
        "Joel Embiid",
        "Giannis Antetokounmpo",
        "Luka Dončić",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Which university has won the most NCAA Division I men's basketball championships?",
      options: ["Kentucky", "North Carolina", "Duke", "UCLA"],
      correctAnswer: 3,
    },
    {
      question: "Who is the all-time leading scorer in NHL history?",
      options: [
        "Wayne Gretzky",
        "Gordie Howe",
        "Jaromír Jágr",
        "Alex Ovechkin",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which country has won the most FIFA World Cup tournaments?",
      options: ["Germany", "Italy", "Argentina", "Brazil"],
      correctAnswer: 3,
    },
    {
      question: "Who holds the world record for the men's 100-meter dash?",
      options: ["Tyson Gay", "Yohan Blake", "Usain Bolt", "Justin Gatlin"],
      correctAnswer: 2,
    },
    {
      question:
        "Which tennis player has won the most Grand Slam singles titles?",
      options: [
        "Roger Federer",
        "Rafael Nadal",
        "Novak Djokovic",
        "Serena Williams",
      ],
      correctAnswer: 2,
    },
    {
      question: "Which golfer has won the most major championships?",
      options: [
        "Tiger Woods",
        "Jack Nicklaus",
        "Arnold Palmer",
        "Phil Mickelson",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Which NFL team appeared in four consecutive Super Bowls from 1991-1994, losing all of them?",
      options: [
        "Minnesota Vikings",
        "Denver Broncos",
        "Buffalo Bills",
        "Atlanta Falcons",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "In which year did Michael Jordan win his first NBA championship with the Chicago Bulls?",
      options: ["1989", "1990", "1991", "1992"],
      correctAnswer: 2,
    },
    {
      question: "Who is the youngest player to score 30,000 points in the NBA?",
      options: [
        "Michael Jordan",
        "Kobe Bryant",
        "LeBron James",
        "Wilt Chamberlain",
      ],
      correctAnswer: 2,
    },
    {
      question: "Which of these players has never won the NFL MVP award?",
      options: ["Tom Brady", "Drew Brees", "Aaron Rodgers", "Patrick Mahomes"],
      correctAnswer: 1,
    },
  ];

  // Start the game
  const startGame = () => {
    setGameState("playing");
    setCurrentLevel(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setUsedLifelines([]);
    setWalkAwayConfirm(false);
    setShowingShopModal(false);
  };

  // Handle answer selection
  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);

    if (answerIndex === questions[currentLevel].correctAnswer) {
      // Correct answer
      setIsCorrect(true);

      setTimeout(() => {
        if (currentLevel === questions.length - 1) {
          // Won the game
          setGameState("results");
        } else {
          // Go to next level
          setCurrentLevel(currentLevel + 1);
          setSelectedAnswer(null);
          setTimeLeft(30);
        }
      }, 2000);
    } else {
      // Wrong answer or time's up
      setIsCorrect(false);

      setTimeout(() => {
        setGameState("results");
      }, 2000);
    }
  };

  // Handle times up
  const handleTimesUp = () => {
    setIsCorrect(false);
    setGameState("results");
  };

  // Use a lifeline
  const useLifeline = (lifeline) => {
    setActiveLifeline(lifeline);
    setGameState("using-lifeline");

    // Check if using a refill or the original lifeline
    if (ownedLifelineRefills[lifeline.id] > 0) {
      // Use a refill
      setOwnedLifelineRefills({
        ...ownedLifelineRefills,
        [lifeline.id]: ownedLifelineRefills[lifeline.id] - 1,
      });
    } else {
      // Use the original lifeline
      setUsedLifelines([...usedLifelines, lifeline.id]);
    }
  };

  // Purchase lifeline refills
  const purchaseLifelineRefill = (lifelineId, quantity = 1) => {
    // In a real app, this would trigger the platform's IAP API
    // For our demo, we'll just add the lifelines directly
    setOwnedLifelineRefills({
      ...ownedLifelineRefills,
      [lifelineId]: ownedLifelineRefills[lifelineId] + quantity,
    });

    setShowingShopModal(false);
  };

  // Get lifeline help text
  const getLifelineHelp = (lifeline) => {
    const helpTemplates = lifeline.helpText;
    const randomTemplate =
      helpTemplates[Math.floor(Math.random() * helpTemplates.length)];

    // This is a simplified implementation - in a real game, you'd have
    // more complex logic for each personality's help style
    const options = questions[currentLevel].options;
    const correctIndex = questions[currentLevel].correctAnswer;

    // Generate random wrong answers
    const wrongAnswers = [0, 1, 2, 3].filter((i) => i !== correctIndex);
    const randomWrong =
      wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
    const secondRandomWrong = wrongAnswers.filter((a) => a !== randomWrong)[
      Math.floor(Math.random() * (wrongAnswers.length - 1))
    ];

    // Different logic per lifeline
    if (lifeline.id === "stephen") {
      return randomTemplate.replace("{option}", `"${options[randomWrong]}"`);
    } else if (lifeline.id === "mcafee") {
      if (Math.random() > 0.5) {
        // Suggest correct option + one wrong option
        return randomTemplate
          .replace("{option1}", `"${options[correctIndex]}"`)
          .replace("{option2}", `"${options[randomWrong]}"`);
      } else {
        // Suggest eliminating two wrong options
        return randomTemplate
          .replace("{option1}", `"${options[randomWrong]}"`)
          .replace("{option2}", `"${options[secondRandomWrong]}"`);
      }
    } else if (lifeline.id === "svp") {
      // 70% chance to suggest correct answer
      if (Math.random() < 0.7) {
        return randomTemplate.replace("{option}", `"${options[correctIndex]}"`);
      } else {
        return randomTemplate.replace("{option}", `"${options[randomWrong]}"`);
      }
    }

    return "Let me help you with this question...";
  };

  // Return to game after using lifeline
  const returnToGame = () => {
    setActiveLifeline(null);
    setGameState("playing");
  };

  // Walk away with current winnings
  const walkAway = () => {
    setIsCorrect(null);
    setGameState("results");
  };

  // Calculate final winnings
  const calculateWinnings = () => {
    if (isCorrect === true && currentLevel === questions.length - 1) {
      // Player won the million
      return prizeLevels[prizeLevels.length - 1].amount;
    } else if (isCorrect === false) {
      // Player got a question wrong
      // Find the last safe level they reached
      for (let i = currentLevel - 1; i >= 0; i--) {
        if (prizeLevels[i].safe) {
          return prizeLevels[i].amount;
        }
      }
      return "$0"; // If they got the first question wrong
    } else {
      // Player walked away
      return prizeLevels[currentLevel].amount;
    }
  };

  // Reset game
  const resetGame = () => {
    setGameState("welcome");
    setCurrentLevel(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setUsedLifelines([]);
    setWalkAwayConfirm(false);
    // Retain owned lifeline refills
  };

  // Render welcome screen
  const renderWelcomeScreen = () => (
    <div className="flex flex-col items-center p-4 w-full">
      <div className="bg-red-600 w-full py-3 mb-6 rounded">
        <h1 className="text-white text-2xl font-bold text-center">
          ESPN SPORTS MILLIONAIRE
        </h1>
      </div>

      <div className="w-20 h-20 mb-4">
        <Award className="w-full h-full text-yellow-500" />
      </div>

      <h2 className="text-xl font-bold mb-4 text-center">
        Test your sports knowledge and win up to $1,000,000!
      </h2>

      <div className="bg-gray-100 rounded-lg p-4 mb-6 w-full">
        <h3 className="font-bold mb-2">Game Rules:</h3>
        <ul className="list-disc pl-6 mb-4 text-sm">
          <li>Answer 14 increasingly difficult sports questions</li>
          <li>Use ESPN personalities as lifelines when you need help</li>
          <li>Each personality can only be used once per game</li>
          <li>Reach safe checkpoints at $5,000 and $100,000</li>
          <li>Walk away with your winnings anytime</li>
        </ul>
      </div>

      <h3 className="font-bold mb-2">Your ESPN Lifelines:</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
        {lifelines.map((lifeline) => (
          <div
            key={lifeline.id}
            className="bg-white border rounded-lg p-3 flex flex-col items-center"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2"
              style={{ backgroundColor: lifeline.color + "20" }}
            >
              {lifeline.avatar}
            </div>
            <h4 className="font-bold text-sm">{lifeline.name}</h4>
            <p className="text-xs text-gray-600 text-center mt-1">
              {lifeline.description}
            </p>
          </div>
        ))}
      </div>

      <button
        className="px-6 py-3 rounded-full text-white text-lg font-bold bg-red-600 hover:bg-red-700 transition-colors"
        onClick={startGame}
      >
        START GAME
      </button>
    </div>
  );

  // Render playing screen
  const renderPlayingScreen = () => {
    const currentQuestion = questions[currentLevel];

    return (
      <div className="flex flex-col items-center p-4 w-full">
        <div className="bg-blue-700 w-full py-2 mb-3 rounded">
          <h1 className="text-white text-xl font-bold text-center">
            Question {currentLevel + 1} - {prizeLevels[currentLevel].amount}
          </h1>
        </div>

        {/* Progress and timer */}
        <div className="flex justify-between items-center w-full mb-4">
          <div className="text-center bg-gray-100 px-3 py-1 rounded">
            <TrendingUp className="w-4 h-4 inline mr-1" />
            <span className="text-sm">{prizeLevels[currentLevel].amount}</span>
          </div>

          <div className="text-center px-3 py-1 rounded font-bold bg-gray-100">
            {timeLeft} seconds
          </div>

          <div className="flex items-center space-x-2">
            <button
              className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
              onClick={() => setWalkAwayConfirm(true)}
            >
              Walk Away
            </button>
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-100 p-4 rounded mb-4 w-full">
          <p className="text-center font-bold text-lg">
            {currentQuestion.question}
          </p>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-1 gap-3 w-full mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`p-4 border rounded text-left hover:bg-gray-100 transition-colors
                ${
                  selectedAnswer === index
                    ? index === currentQuestion.correctAnswer
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-500"
                    : ""
                }
              `}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              {["A", "B", "C", "D"][index]}. {option}
            </button>
          ))}
        </div>

        {/* Lifelines */}
        <div className="flex justify-center space-x-4 mb-2">
          {lifelines.map((lifeline) => {
            const isUsed = usedLifelines.includes(lifeline.id);
            const hasRefills = ownedLifelineRefills[lifeline.id] > 0;

            return (
              <div key={lifeline.id} className="relative">
                <button
                  className="p-2 rounded-full text-white"
                  style={{
                    backgroundColor:
                      isUsed && !hasRefills ? "#e5e5e5" : lifeline.color,
                    opacity: isUsed && !hasRefills ? 0.5 : 1,
                  }}
                  onClick={() =>
                    (!isUsed || hasRefills) && useLifeline(lifeline)
                  }
                  disabled={isUsed && !hasRefills}
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    {lifeline.avatar}
                  </div>
                </button>

                {hasRefills && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-white">
                    {ownedLifelineRefills[lifeline.id]}
                  </div>
                )}

                {isUsed && !hasRefills && (
                  <button
                    className="absolute -bottom-2 -right-2 bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-white hover:bg-yellow-600"
                    onClick={() => setShowingShopModal(true)}
                  >
                    +
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center mb-2">
          <div className="text-xs text-gray-500 mr-3">
            <Headphones className="w-3 h-3 inline mr-1" />
            Tap for help
          </div>
          <button
            className="text-xs bg-yellow-500 text-white px-2 py-1 rounded flex items-center"
            onClick={() => setShowingShopModal(true)}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Get More Lifelines
          </button>
        </div>

        {/* Walk away confirmation */}
        {walkAwayConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-lg max-w-md mx-4">
              <h3 className="text-lg font-bold mb-3">Are you sure?</h3>
              <p className="mb-4">
                You'll walk away with {prizeLevels[currentLevel].amount}. Are
                you sure you want to quit now?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border rounded"
                  onClick={() => setWalkAwayConfirm(false)}
                >
                  Keep Playing
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={walkAway}
                >
                  Take the Money
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shop Modal */}
        {showingShopModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">ESPN+ Lifeline Shop</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowingShopModal(false)}
                >
                  ×
                </button>
              </div>

              <p className="text-sm mb-4">
                Purchase additional lifelines to help you reach the million
                dollars!
              </p>

              <div className="space-y-4 mb-6">
                {lifelines.map((lifeline) => (
                  <div
                    key={lifeline.id}
                    className="border rounded-lg p-3 flex items-center"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 mr-3"
                      style={{ backgroundColor: lifeline.color + "20" }}
                    >
                      {lifeline.avatar}
                    </div>

                    <div className="flex-grow">
                      <h4 className="font-bold text-sm">{lifeline.name}</h4>
                      <p className="text-xs text-gray-600">
                        {lifeline.description}
                      </p>
                    </div>

                    <div className="ml-2">
                      <button
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded"
                        onClick={() => purchaseLifelineRefill(lifeline.id)}
                      >
                        $0.99
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border rounded-lg p-3 flex items-center bg-blue-50">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl flex-shrink-0 mr-3">
                    🌟
                  </div>

                  <div className="flex-grow">
                    <h4 className="font-bold text-sm">Premium Bundle</h4>
                    <p className="text-xs text-gray-600">
                      Get 3 of each lifeline and save 30%!
                    </p>
                  </div>

                  <div className="ml-2">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                      onClick={() => {
                        lifelines.forEach((l) =>
                          purchaseLifelineRefill(l.id, 3)
                        );
                      }}
                    >
                      $5.99
                    </button>
                  </div>
                </div>

                <div className="border rounded-lg p-3 flex items-center bg-purple-50">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl flex-shrink-0 mr-3">
                    👑
                  </div>

                  <div className="flex-grow">
                    <h4 className="font-bold text-sm">ESPN+ Subscription</h4>
                    <p className="text-xs text-gray-600">
                      Unlimited lifelines, exclusive questions & more!
                    </p>
                  </div>

                  <div className="ml-2">
                    <button
                      className="px-3 py-1 bg-purple-600 text-white text-sm rounded"
                      onClick={() => {
                        // In a real app, this would trigger subscription flow
                        setShowingShopModal(false);
                      }}
                    >
                      $9.99/mo
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center text-xs text-gray-500">
                Purchases will be charged to your App Store account
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render lifeline help screen
  const renderLifelineScreen = () => (
    <div className="flex flex-col items-center p-4 w-full">
      <div
        className="w-full py-2 mb-4 rounded"
        style={{ backgroundColor: activeLifeline.color }}
      >
        <h1 className="text-white text-xl font-bold text-center">
          {activeLifeline.name} Analysis
        </h1>
      </div>

      <div className="flex items-start w-full mb-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl flex-shrink-0 mr-4"
          style={{ backgroundColor: activeLifeline.color + "20" }}
        >
          {activeLifeline.avatar}
        </div>

        <div className="bg-white border rounded-lg p-4 flex-grow relative">
          <div className="absolute left-0 top-4 w-3 h-3 bg-white border-l border-t transform rotate-45 -ml-1.5"></div>
          <div className="font-bold mb-1">{activeLifeline.name}</div>
          <p className="italic">{getLifelineHelp(activeLifeline)}</p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded mb-4 w-full">
        <p className="text-center text-sm">
          <AlertCircle className="w-4 h-4 inline mr-1" />
          Remember that lifelines may not always be 100% accurate!
        </p>
      </div>

      <button
        className="px-6 py-3 rounded-full text-white font-bold"
        style={{ backgroundColor: activeLifeline.color }}
        onClick={returnToGame}
      >
        RETURN TO GAME
      </button>
    </div>
  );

  // Render results screen
  const renderResultsScreen = () => {
    const winnings = calculateWinnings();
    const winCaption =
      isCorrect === true && currentLevel === questions.length - 1
        ? "CONGRATULATIONS! YOU'VE WON A MILLION DOLLARS!"
        : isCorrect === false
        ? "GAME OVER"
        : "YOU WALKED AWAY";

    return (
      <div className="flex flex-col items-center p-4 w-full">
        <div className="bg-blue-700 w-full py-3 mb-6 rounded">
          <h1 className="text-white text-xl font-bold text-center">
            {winCaption}
          </h1>
        </div>

        <div className="w-24 h-24 mb-4">
          {isCorrect === true && currentLevel === questions.length - 1 ? (
            <Award className="w-full h-full text-yellow-500" />
          ) : isCorrect === false ? (
            <AlertCircle className="w-full h-full text-red-500" />
          ) : (
            <Award className="w-full h-full text-blue-500" />
          )}
        </div>

        <h2 className="text-2xl font-bold mb-2 text-center">
          You won: {winnings}
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg mb-6 w-full">
          <p className="text-center">
            {isCorrect === true && currentLevel === questions.length - 1
              ? "You've reached the pinnacle of sports knowledge! A perfect game!"
              : isCorrect === false
              ? `The correct answer was "${
                  questions[currentLevel].options[
                    questions[currentLevel].correctAnswer
                  ]
                }". Better luck next time!`
              : "You played it safe and walked away with your winnings. Well done!"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 w-full">
          <button
            className="px-4 py-2 rounded bg-red-600 text-white font-bold"
            onClick={startGame}
          >
            PLAY AGAIN
          </button>

          <button
            className="px-4 py-2 rounded bg-blue-600 text-white font-bold"
            onClick={resetGame}
          >
            MAIN MENU
          </button>
        </div>

        {/* Optional IAP suggestion */}
        {isCorrect === false && (
          <div className="border border-yellow-400 bg-yellow-50 p-3 rounded-lg w-full flex items-center">
            <ShoppingCart className="w-8 h-8 mr-3 text-yellow-600 flex-shrink-0" />
            <div className="flex-grow">
              <h3 className="font-bold text-sm">Want another chance?</h3>
              <p className="text-xs">
                Purchase extra lifelines and continue your game where you left
                off!
              </p>
            </div>
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded text-sm font-bold ml-2"
              onClick={() => {
                setShowingShopModal(true);
                setGameState("playing");
                // Reset the wrong answer
                setIsCorrect(null);
                setSelectedAnswer(null);
              }}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    );
  };

  // Main render
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center pt-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden mb-4">
        {gameState === "welcome" && renderWelcomeScreen()}
        {gameState === "playing" && renderPlayingScreen()}
        {gameState === "using-lifeline" && renderLifelineScreen()}
        {gameState === "results" && renderResultsScreen()}
      </div>

      <div className="text-sm text-gray-500 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        <span>Demo version - ESPN Sports Millionaire Concept</span>
      </div>
    </div>
  );
};

export default MillionaireTrivia;
