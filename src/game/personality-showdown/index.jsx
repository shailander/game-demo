import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

// Main component
const ESPNPersonalityShowdown = () => {
  // Game states
  const [gameState, setGameState] = useState("sport_selection"); // sport_selection, personality_selection, intro, playing, reaction, results
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedPersonality, setSelectedPersonality] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [userAnswer, setUserAnswer] = useState(null);
  const [reactionText, setReactionText] = useState("");
  const [showingReaction, setShowingReaction] = useState(false);

  // Define sports
  const sports = [
    {
      id: "basketball",
      name: "Basketball",
      icon: "🏀",
      color: "#FF6B35",
      description: "NBA & College Hoops",
    },
    {
      id: "football",
      name: "Football",
      icon: "🏈",
      color: "#8B4513",
      description: "NFL & College Football",
    },
    {
      id: "baseball",
      name: "Baseball",
      icon: "⚾",
      color: "#228B22",
      description: "MLB & America's Pastime",
    },
  ];

  // Define ESPN personalities by sport
  const personalitiesBySport = {
    basketball: [
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
        name: "Jay Williams",
        shortName: "JW",
        expertise: "Former Duke Star",
        avatar: "🎓",
        color: "#001A57",
        reactions: {
          correct: [
            "That's what I'm talking about! You know your hoops!",
            "Solid answer! You've been watching the game closely.",
          ],
          incorrect: [
            "Nah man, you gotta study the game more than that!",
            "Come on! I thought you were better than that!",
          ],
          win: "Just like my Duke days - when you know the game, you win!",
          lose: "I respect that! You really know your basketball history.",
        },
      },
    ],
    football: [
      {
        id: 3,
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
        id: 4,
        name: "Ryan Clark",
        shortName: "RC",
        expertise: "Former Safety",
        avatar: "🛡️",
        color: "#FFB612",
        reactions: {
          correct: [
            "That's a touchdown answer right there!",
            "You came to play! That's exactly right!",
          ],
          incorrect: [
            "You got picked off on that one! Wrong answer!",
            "That's a fumble! You gotta hold onto the ball better!",
          ],
          win: "Defense wins championships, and I just won this one!",
          lose: "You schooled me! That was some championship-level knowledge!",
        },
      },
    ],
    baseball: [
      {
        id: 5,
        name: "Alex Rodriguez",
        shortName: "A-Rod",
        expertise: "Yankees Legend",
        avatar: "⚾",
        color: "#132448",
        reactions: {
          correct: [
            "That's a home run answer! You know your baseball!",
            "Clutch hit! You came through when it mattered!",
          ],
          incorrect: [
            "Strike three! You went down swinging on that one!",
            "That's an error! You gotta make that play!",
          ],
          win: "Just like my playing days - when you study the game, you succeed!",
          lose: "You earned that win! That was some All-Star level knowledge!",
        },
      },
      {
        id: 6,
        name: "Jessica Mendoza",
        shortName: "JM",
        expertise: "Olympic Softball Star",
        avatar: "🥇",
        color: "#BD9B60",
        reactions: {
          correct: [
            "Perfect swing! You connected on that one!",
            "That's how you do it! Great knowledge of the game!",
          ],
          incorrect: [
            "You swung and missed on that one!",
            "That ball's in the dirt - you can't chase those!",
          ],
          win: "Just like in the Olympics - preparation meets opportunity!",
          lose: "Wow! You really brought your A-game today!",
        },
      },
    ],
  };

  // Questions bank by sport
  const questionBanksBySport = {
    basketball: {
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
        // Jay Williams - College/NBA questions
        {
          question:
            "Which college has won the most NCAA basketball championships?",
          options: ["Duke", "UCLA", "North Carolina", "Kentucky"],
          correctAnswer: 1,
        },
        {
          question:
            "Who was the first player to be drafted straight from high school?",
          options: [
            "Kobe Bryant",
            "Kevin Garnett",
            "Moses Malone",
            "LeBron James",
          ],
          correctAnswer: 2,
        },
        {
          question: "What is the shot clock duration in the NBA?",
          options: ["20 seconds", "24 seconds", "30 seconds", "35 seconds"],
          correctAnswer: 1,
        },
        {
          question: "Which team drafted Tim Duncan?",
          options: [
            "San Antonio Spurs",
            "Orlando Magic",
            "Boston Celtics",
            "Miami Heat",
          ],
          correctAnswer: 0,
        },
        {
          question:
            "Who holds the record for most assists in a single NBA game?",
          options: [
            "Magic Johnson",
            "John Stockton",
            "Scott Skiles",
            "Chris Paul",
          ],
          correctAnswer: 2,
        },
      ],
    },
    football: {
      3: [
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
          options: [
            "Peyton Manning",
            "Tom Brady",
            "Drew Brees",
            "Aaron Rodgers",
          ],
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
      4: [
        // Ryan Clark - NFL Defense questions
        {
          question: "Which team is known as 'America's Team'?",
          options: [
            "Green Bay Packers",
            "Dallas Cowboys",
            "New England Patriots",
            "Pittsburgh Steelers",
          ],
          correctAnswer: 1,
        },
        {
          question:
            "How many players are on the field for each team during a play?",
          options: ["10", "11", "12", "13"],
          correctAnswer: 1,
        },
        {
          question: "What is the maximum number of points for a safety?",
          options: ["1 point", "2 points", "3 points", "6 points"],
          correctAnswer: 1,
        },
        {
          question:
            "Which defensive position is typically the 'quarterback of the defense'?",
          options: [
            "Free Safety",
            "Middle Linebacker",
            "Cornerback",
            "Defensive End",
          ],
          correctAnswer: 1,
        },
        {
          question: "How long is an NFL football field including end zones?",
          options: ["100 yards", "110 yards", "120 yards", "130 yards"],
          correctAnswer: 2,
        },
      ],
    },
    baseball: {
      5: [
        // Alex Rodriguez - MLB questions
        {
          question: "Which team has won the most World Series championships?",
          options: [
            "Boston Red Sox",
            "St. Louis Cardinals",
            "New York Yankees",
            "Oakland Athletics",
          ],
          correctAnswer: 2,
        },
        {
          question: "How many strikes result in a strikeout?",
          options: ["2", "3", "4", "5"],
          correctAnswer: 1,
        },
        {
          question: "Who holds the single-season home run record?",
          options: ["Babe Ruth", "Mark McGwire", "Sammy Sosa", "Barry Bonds"],
          correctAnswer: 3,
        },
        {
          question: "What is the distance between bases in MLB?",
          options: ["80 feet", "85 feet", "90 feet", "95 feet"],
          correctAnswer: 2,
        },
        {
          question: "Which player was known as 'The Bambino'?",
          options: ["Lou Gehrig", "Babe Ruth", "Ty Cobb", "Joe DiMaggio"],
          correctAnswer: 1,
        },
      ],
      6: [
        // Jessica Mendoza - General Baseball questions
        {
          question: "How many innings are in a regulation baseball game?",
          options: ["7", "8", "9", "10"],
          correctAnswer: 2,
        },
        {
          question:
            "What is it called when a batter hits the ball out of the park?",
          options: ["Triple", "Double", "Home Run", "Grand Slam"],
          correctAnswer: 2,
        },
        {
          question: "Which position is between second and third base?",
          options: ["Pitcher", "Catcher", "Shortstop", "First Baseman"],
          correctAnswer: 2,
        },
        {
          question: "What does RBI stand for?",
          options: [
            "Runs Batted In",
            "Really Big Inning",
            "Runs Between Innings",
            "Right Base Indicator",
          ],
          correctAnswer: 0,
        },
        {
          question: "How many players are on a baseball team's active roster?",
          options: ["23", "25", "26", "28"],
          correctAnswer: 2,
        },
      ],
    },
  };

  // Get questions for selected personality and sport
  const getQuestions = (personalityId) => {
    return questionBanksBySport[selectedSport?.id]?.[personalityId] || [];
  };

  // Handle sport selection
  const handleSelectSport = (sport) => {
    setSelectedSport(sport);
    setGameState("personality_selection");
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
    setTimeLeft(20);
  };

  // Handle user answer
  const handleAnswer = (answerIndex) => {
    setUserAnswer(answerIndex);
    const questions = getQuestions(selectedPersonality.id);
    const currentQ = questions[currentQuestion];

    if (answerIndex === currentQ.correctAnswer) {
      // Correct answer - user gets a point
      setUserScore(userScore + 1);
      const randomReaction =
        selectedPersonality.reactions.correct[
          Math.floor(
            Math.random() * selectedPersonality.reactions.correct.length
          )
        ];
      setReactionText(randomReaction);
    } else {
      // Wrong answer - no points awarded to anyone
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
    // Time's up - no points awarded to anyone
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
      setTimeLeft(20);
      setUserAnswer(null);
      setGameState("playing");
    } else {
      // Game is over
      setGameState("results");

      // Set final reaction based on performance
      const totalQuestions = getQuestions(selectedPersonality.id).length;
      const percentage = (userScore / totalQuestions) * 100;

      if (percentage >= 80) {
        setReactionText(selectedPersonality.reactions.lose);
      } else if (percentage >= 60) {
        setReactionText(
          "Not bad! You know your stuff, but I've still got the edge."
        );
      } else {
        setReactionText(selectedPersonality.reactions.win);
      }
    }
  };

  // Reset the game
  const resetGame = () => {
    setGameState("sport_selection");
    setSelectedSport(null);
    setSelectedPersonality(null);
    setCurrentQuestion(0);
    setUserScore(0);
    setAiScore(0);
    setTimeLeft(20);
    setUserAnswer(null);
    setShowingReaction(false);
  };

  // Rematch with the same personality
  const rematch = () => {
    startGame();
  };

  // Render functions for each game state
  const renderSportSelectionScreen = () => (
    <div className="flex flex-col items-center p-4 w-full">
      <div className="bg-red-600 w-full py-3 mb-6 rounded">
        <h1 className="text-white text-xl font-bold text-center">
          ESPN PERSONALITY SHOWDOWNS
        </h1>
      </div>

      <h2 className="text-lg font-bold mb-2">Choose Your Sport</h2>
      <p className="text-gray-600 text-sm mb-6 text-center">
        Select a sport to challenge ESPN personalities
      </p>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {sports.map((sport) => (
          <div
            key={sport.id}
            className="bg-white border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow flex items-center"
            onClick={() => handleSelectSport(sport)}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mr-4"
              style={{ backgroundColor: sport.color + "20" }}
            >
              {sport.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{sport.name}</h3>
              <p className="text-sm text-gray-600">{sport.description}</p>
            </div>
            <div className="text-gray-400">▶</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPersonalitySelectionScreen = () => {
    const personalities = personalitiesBySport[selectedSport?.id] || [];

    return (
      <div className="flex flex-col items-center p-4 w-full">
        <div
          className="w-full py-3 mb-6 rounded flex items-center justify-between px-4"
          style={{ backgroundColor: selectedSport?.color }}
        >
          <button
            onClick={() => setGameState("sport_selection")}
            className="text-white text-sm"
          >
            ← Back
          </button>
          <h1 className="text-white text-xl font-bold">
            {selectedSport?.name.toUpperCase()} EXPERTS
          </h1>
          <div className="w-12"></div>
        </div>

        <h2 className="text-lg font-bold mb-4">Select Your Opponent</h2>

        <div className="grid grid-cols-1 gap-4 w-full max-w-md">
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
  };

  const renderIntroScreen = () => (
    <div className="flex flex-col items-center p-4 w-full">
      <div
        className="w-full py-3 mb-6 rounded flex items-center justify-between px-4"
        style={{ backgroundColor: selectedSport?.color }}
      >
        <button
          onClick={() => setGameState("personality_selection")}
          className="text-white text-sm"
        >
          ← Back
        </button>
        <h1 className="text-white text-xl font-bold">
          {`${selectedSport?.name.toUpperCase()} CHALLENGE`}
        </h1>
        <div className="w-12"></div>
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
        <li>5 questions about {selectedSport?.name.toLowerCase()}</li>
        <li>20 seconds to answer each question</li>
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
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-xs">
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

          <div className="text-gray-500 text-sm">
            Score to beat: {Math.ceil(questions.length * 0.8)}
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
      <div
        className="w-full py-3 mb-6 rounded"
        style={{ backgroundColor: selectedSport?.color }}
      >
        <h1 className="text-white text-xl font-bold text-center">
          CHALLENGE COMPLETE
        </h1>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        {userScore > aiScore
          ? "YOU WIN!"
          : userScore === aiScore
          ? "GREAT EFFORT!"
          : `BETTER LUCK NEXT TIME!`}
      </h2>

      <div className="text-3xl font-bold mb-2">
        You scored: {userScore} out of{" "}
        {getQuestions(selectedPersonality.id).length}
      </div>

      <div className="text-lg mb-6">
        {Math.round(
          (userScore / getQuestions(selectedPersonality.id).length) * 100
        )}
        % correct
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
          CHOOSE NEW SPORT
        </button>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {gameState === "sport_selection" && renderSportSelectionScreen()}
        {gameState === "personality_selection" &&
          renderPersonalitySelectionScreen()}
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

export default ESPNPersonalityShowdown;
