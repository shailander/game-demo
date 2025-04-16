import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

// Main component
const TriviaShowdown = () => {
  // Game states
  const [gameState, setGameState] = useState("selection"); // selection, intro, playing, reaction, results
  const [selectedPersonality, setSelectedPersonality] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [userAnswer, setUserAnswer] = useState(null);
  const [reactionText, setReactionText] = useState("");
  const [showingReaction, setShowingReaction] = useState(false);

  // Define ESPN personalities
  const personalities = [
    {
      id: 1,
      name: "Stephen A. Smith",
      shortName: "SAS",
      expertise: "NBA Expert",
      avatar: "😤",
      color: "#CF0A2C",
      reactions: {
        correct: [
          "ABSOLUTELY CORRECT! You clearly know your basketball. But don't get comfortable!",
          "That's RIGHT! I've gotta give you credit where credit is due!",
        ],
        incorrect: [
          "That is BLASPHEMOUS! How could you possibly think that was the answer?!",
          "Are you KIDDING ME? That answer is PREPOSTEROUS! Utterly ridiculous!",
        ],
        win: "I TOLD YOU! Nobody beats Stephen A. when it comes to basketball knowledge!",
        lose: "I CAN'T BELIEVE THIS! This is one of the most embarrassing moments of my career!",
      },
    },
    {
      id: 2,
      name: "Pat McAfee",
      shortName: "PM",
      expertise: "NFL Expert",
      avatar: "🏈",
      color: "#003594",
      reactions: {
        correct: [
          "BANG! That's what I'm talkin' about! Good answer!",
          "Oh HELLLL YEAH! You nailed that one!",
        ],
        incorrect: [
          "Ohhhhh nooooo! What are you DOING?! That ain't it!",
          "Whoa whoa whoa... that's not even CLOSE brother!",
        ],
        win: "BOOOOOOM! The boys are buzzin'! Pat McAfee remains UNDEFEATED!",
        lose: "I can't believe it! I just got HAMMERED! Props to you!",
      },
    },
    {
      id: 3,
      name: "Scott Van Pelt",
      shortName: "SVP",
      expertise: "All Sports",
      avatar: "🎙️",
      color: "#27251F",
      reactions: {
        correct: [
          "Well played. That's exactly right. Nice work.",
          "You got it. Impressive knowledge there.",
        ],
        incorrect: [
          "Oh, not quite. Let me give you the correct answer...",
          "Close, but not what we were looking for there.",
        ],
        win: "And that's why they pay me the big bucks. Better luck next time.",
        lose: "Well done! You clearly know your stuff. I'll get you next time.",
      },
    },
  ];

  // Questions bank - simplified for demo
  const questionBanks = {
    1: [
      // Stephen A. Smith - NBA questions
      {
        question:
          "Who holds the record for most 3-pointers in a single NBA season?",
        options: [
          "Stephen Curry",
          "James Harden",
          "Ray Allen",
          "Klay Thompson",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which team won the most NBA championships in the 1990s?",
        options: [
          "Los Angeles Lakers",
          "Boston Celtics",
          "Chicago Bulls",
          "Detroit Pistons",
        ],
        correctAnswer: 2,
      },
      {
        question: "Who was the NBA Finals MVP in 2016?",
        options: [
          "Stephen Curry",
          "Kevin Durant",
          "Kyrie Irving",
          "LeBron James",
        ],
        correctAnswer: 3,
      },
      {
        question: "Which player has the most career points in NBA history?",
        options: [
          "Michael Jordan",
          "Kareem Abdul-Jabbar",
          "LeBron James",
          "Kobe Bryant",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which NBA player is known as 'The Greek Freak'?",
        options: [
          "Luka Doncic",
          "Nikola Jokic",
          "Giannis Antetokounmpo",
          "Joel Embiid",
        ],
        correctAnswer: 2,
      },
    ],
    2: [
      // Pat McAfee - NFL questions
      {
        question: "Which NFL team has won the most Super Bowl championships?",
        options: [
          "Dallas Cowboys",
          "New England Patriots",
          "Pittsburgh Steelers",
          "San Francisco 49ers",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Who holds the NFL record for most career passing touchdowns?",
        options: ["Peyton Manning", "Tom Brady", "Drew Brees", "Aaron Rodgers"],
        correctAnswer: 1,
      },
      {
        question: "Which position did Pat McAfee play in the NFL?",
        options: ["Quarterback", "Wide Receiver", "Punter", "Linebacker"],
        correctAnswer: 2,
      },
      {
        question: "Which team won the Super Bowl in the 2023-2024 season?",
        options: [
          "Kansas City Chiefs",
          "San Francisco 49ers",
          "Baltimore Ravens",
          "Detroit Lions",
        ],
        correctAnswer: 0,
      },
      {
        question: "Who is the all-time NFL rushing yards leader?",
        options: [
          "Barry Sanders",
          "Walter Payton",
          "Adrian Peterson",
          "Emmitt Smith",
        ],
        correctAnswer: 3,
      },
    ],
    3: [
      // Scott Van Pelt - General sports
      {
        question: "Which sport is played in the Tour de France?",
        options: ["Auto Racing", "Cycling", "Marathon Running", "Triathlon"],
        correctAnswer: 1,
      },
      {
        question: "In which Olympic sport would you perform a 'Tsukahara'?",
        options: ["Diving", "Gymnastics", "Figure Skating", "Ski Jumping"],
        correctAnswer: 1,
      },
      {
        question: "Which golf tournament is known as 'The Masters'?",
        options: [
          "U.S. Open",
          "PGA Championship",
          "Augusta National",
          "The Open Championship",
        ],
        correctAnswer: 2,
      },
      {
        question: "What is the national sport of Canada?",
        options: ["Ice Hockey", "Lacrosse", "Curling", "Baseball"],
        correctAnswer: 1,
      },
      {
        question: "Which country has won the most FIFA World Cup tournaments?",
        options: ["Germany", "Italy", "Argentina", "Brazil"],
        correctAnswer: 3,
      },
    ],
  };

  // Get questions for selected personality
  const getQuestions = (personalityId) => {
    return questionBanks[personalityId] || [];
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (
      gameState === "playing" &&
      timeLeft === 0 &&
      userAnswer === null
    ) {
      // Time's up, AI gets the point
      handleTimesUp();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, gameState, userAnswer]);

  // Effect for reaction timing
  useEffect(() => {
    let reactionTimer;
    if (showingReaction) {
      reactionTimer = setTimeout(() => {
        setShowingReaction(false);
        moveToNextQuestion();
      }, 3000);
    }

    return () => clearTimeout(reactionTimer);
  }, [showingReaction]);

  // Handle personality selection
  const handleSelectPersonality = (personality) => {
    setSelectedPersonality(personality);
    setGameState("intro");
  };

  // Start the game
  const startGame = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setUserScore(0);
    setAiScore(0);
    setTimeLeft(10);
  };

  // Handle user answer
  const handleAnswer = (answerIndex) => {
    setUserAnswer(answerIndex);
    const questions = getQuestions(selectedPersonality.id);
    const currentQ = questions[currentQuestion];

    if (answerIndex === currentQ.correctAnswer) {
      // Correct answer
      setUserScore(userScore + 1);
      const randomReaction =
        selectedPersonality.reactions.correct[
          Math.floor(
            Math.random() * selectedPersonality.reactions.correct.length
          )
        ];
      setReactionText(randomReaction);
    } else {
      // Wrong answer
      setAiScore(aiScore + 1);
      const randomReaction =
        selectedPersonality.reactions.incorrect[
          Math.floor(
            Math.random() * selectedPersonality.reactions.incorrect.length
          )
        ];
      setReactionText(randomReaction);
    }

    setShowingReaction(true);
    setGameState("reaction");
  };

  // Handle times up
  const handleTimesUp = () => {
    setAiScore(aiScore + 1);
    const randomReaction =
      selectedPersonality.reactions.incorrect[
        Math.floor(
          Math.random() * selectedPersonality.reactions.incorrect.length
        )
      ];
    setReactionText(`Time's up! ${randomReaction}`);
    setShowingReaction(true);
    setGameState("reaction");
  };

  // Move to next question
  const moveToNextQuestion = () => {
    const questions = getQuestions(selectedPersonality.id);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
      setUserAnswer(null);
      setGameState("playing");
    } else {
      // Game is over
      setGameState("results");

      // Set final reaction
      if (userScore > aiScore) {
        setReactionText(selectedPersonality.reactions.lose);
      } else {
        setReactionText(selectedPersonality.reactions.win);
      }
    }
  };

  // Reset the game
  const resetGame = () => {
    setGameState("selection");
    setSelectedPersonality(null);
    setCurrentQuestion(0);
    setUserScore(0);
    setAiScore(0);
    setTimeLeft(10);
    setUserAnswer(null);
    setShowingReaction(false);
  };

  // Rematch with the same personality
  const rematch = () => {
    startGame();
  };

  // Render functions for each game state
  const renderSelectionScreen = () => (
    <div className="flex flex-col items-center p-4 w-full">
      <div className="bg-red-600 w-full py-3 mb-6 rounded">
        <h1 className="text-white text-xl font-bold text-center">
          ESPN PERSONALITY SHOWDOWNS
        </h1>
      </div>

      <h2 className="text-lg font-bold mb-4">Select Your Opponent</h2>

      <div className="flex flex-col gap-4 w-full max-w-3xl">
        {personalities.map((personality) => (
          <div
            key={personality.id}
            className="bg-white border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow flex flex-col items-center"
            onClick={() => handleSelectPersonality(personality)}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2"
              style={{ backgroundColor: personality.color + "20" }}
            >
              {personality.avatar}
            </div>
            <h3 className="font-bold text-lg">{personality.name}</h3>
            <p className="text-sm text-gray-600">{personality.expertise}</p>
            <button
              className="mt-4 px-4 py-2 rounded-full text-white text-sm font-bold"
              style={{ backgroundColor: personality.color }}
            >
              CHALLENGE
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIntroScreen = () => (
    <div className="flex flex-col items-center p-4 w-full">
      <div className="bg-red-600 w-full py-3 mb-6 rounded">
        <h1 className="text-white text-xl font-bold text-center">
          {`CHALLENGE: ${selectedPersonality.name.toUpperCase()}`}
        </h1>
      </div>

      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-6xl mb-4"
        style={{ backgroundColor: selectedPersonality.color + "20" }}
      >
        {selectedPersonality.avatar}
      </div>

      <h2 className="text-2xl font-bold mb-2">{selectedPersonality.name}</h2>
      <p className="text-lg mb-6">{selectedPersonality.expertise}</p>

      <div className="bg-gray-100 rounded-lg p-4 mb-6 max-w-md">
        <p className="italic text-center">
          "Think you can beat me in sports trivia? Let's see what you've got!
          Get ready for the ultimate challenge!"
        </p>
      </div>

      <h3 className="font-bold mb-2">Challenge Rules:</h3>
      <ul className="list-disc pl-6 mb-6 text-left">
        <li>5 questions about sports</li>
        <li>10 seconds to answer each question</li>
        <li>1 point for each correct answer</li>
        <li>The winner is crowned after all questions</li>
      </ul>

      <button
        className="px-6 py-3 rounded-full text-white text-lg font-bold"
        style={{ backgroundColor: selectedPersonality.color }}
        onClick={startGame}
      >
        START CHALLENGE
      </button>
    </div>
  );

  const renderPlayingScreen = () => {
    const questions = getQuestions(selectedPersonality.id);
    const currentQ = questions[currentQuestion];

    return (
      <div className="flex flex-col items-center p-4 w-full">
        <div
          className="w-full py-3 mb-4 rounded"
          style={{ backgroundColor: selectedPersonality.color }}
        >
          <h1 className="text-white text-xl font-bold text-center">
            {`YOU VS. ${selectedPersonality.shortName}`}
          </h1>
        </div>

        {/* Score and progress */}
        <div className="flex justify-between items-center w-full bg-gray-100 p-2 rounded mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              YOU
            </div>
            <span className="font-bold text-xl">{userScore}</span>
          </div>

          <div className="text-center">
            <div className="text-sm font-bold">
              QUESTION {currentQuestion + 1} OF {questions.length}
            </div>
            <div className="text-sm">Time: {timeLeft}s</div>
          </div>

          <div className="flex items-center">
            <span className="font-bold text-xl">{aiScore}</span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center ml-2 text-sm"
              style={{ backgroundColor: selectedPersonality.color + "40" }}
            >
              {selectedPersonality.shortName}
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-100 p-4 rounded mb-4 w-full">
          <p className="text-center font-bold text-lg">{currentQ.question}</p>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-1 gap-3 w-full">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`p-4 border rounded text-left hover:bg-gray-100 ${
                userAnswer === index
                  ? index === currentQ.correctAnswer
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"
                  : ""
              }`}
              onClick={() => handleAnswer(index)}
              disabled={userAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderReactionScreen = () => {
    const questions = getQuestions(selectedPersonality.id);
    const currentQ = questions[currentQuestion];

    return (
      <div className="flex flex-col items-center p-4 w-full">
        <div
          className="w-full py-3 mb-4 rounded"
          style={{ backgroundColor: selectedPersonality.color }}
        >
          <h1 className="text-white text-xl font-bold text-center">
            {`${selectedPersonality.name.toUpperCase()} REACTS`}
          </h1>
        </div>

        <div className="flex w-full mb-4 items-start">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0 mr-3"
            style={{ backgroundColor: selectedPersonality.color + "20" }}
          >
            {selectedPersonality.avatar}
          </div>

          <div className="bg-white border rounded-lg p-4 w-full relative">
            <div className="absolute left-0 top-4 w-3 h-3 bg-white border-l border-t transform rotate-45 -ml-1.5"></div>
            <p className="italic">{reactionText}</p>

            <div className="mt-2 text-sm">
              <span className="font-bold">Correct answer: </span>
              {currentQ.options[currentQ.correctAnswer]}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResultsScreen = () => (
    <div className="flex flex-col items-center p-4 w-full">
      <div className="bg-red-600 w-full py-3 mb-6 rounded">
        <h1 className="text-white text-xl font-bold text-center">
          CHALLENGE COMPLETE
        </h1>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        {userScore > aiScore
          ? "YOU WIN!"
          : userScore === aiScore
          ? "IT'S A TIE!"
          : `${selectedPersonality.name.toUpperCase()} WINS!`}
      </h2>

      <div className="text-3xl font-bold mb-6">
        {userScore} - {aiScore}
      </div>

      <div className="flex w-full mb-6 items-start">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0 mr-3"
          style={{ backgroundColor: selectedPersonality.color + "20" }}
        >
          {selectedPersonality.avatar}
        </div>

        <div className="bg-white border rounded-lg p-4 w-full relative">
          <div className="absolute left-0 top-4 w-3 h-3 bg-white border-l border-t transform rotate-45 -ml-1.5"></div>
          <p className="italic">{reactionText}</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          className="px-6 py-2 rounded-full text-white font-bold"
          style={{ backgroundColor: selectedPersonality.color }}
          onClick={rematch}
        >
          REMATCH
        </button>

        <button
          className="px-6 py-2 rounded-full bg-gray-800 text-white font-bold"
          onClick={resetGame}
        >
          NEW CHALLENGE
        </button>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {gameState === "selection" && renderSelectionScreen()}
        {gameState === "intro" && renderIntroScreen()}
        {gameState === "playing" && renderPlayingScreen()}
        {gameState === "reaction" && renderReactionScreen()}
        {gameState === "results" && renderResultsScreen()}
      </div>

      <div className="mt-4 text-sm text-gray-500 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        <span>Demo version - ESPN GameDay Concept</span>
      </div>
    </div>
  );
};

export default TriviaShowdown;
