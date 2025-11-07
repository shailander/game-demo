import { AlertCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Main component
const FoxTriviaShowdown = () => {
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

  useEffect(()=>{
    document.title = 'Trivia Showdown'
  },[])
  
  // Define sports
  const sports = [
    {
      id: "football",
      name: "NFL",
      icon: "🏈", 
      color: "#005CB9",
      description: "America's Game"
    },
    {
      id: "baseball",
      name: "MLB",
      icon: "⚾",
      color: "#FF6600",
      description: "America's Pastime"
    },
    {
      id: "soccer",
      name: "Soccer",
      icon: "⚽",
      color: "#00A859",
      description: "FIFA World Cup & MLS"
    }
  ];

  // Define FOX Sports personalities by sport
  const personalitiesBySport = {
    football: [
      {
        id: 1,
        name: "Skip Bayless",
        shortName: "Skip",
        expertise: "NFL Analyst",
        avatar: "🎯",
        color: "#FF0000",
        reactions: {
          correct: [
            "Well, well, well! You actually got that right! I'm impressed!",
            "That's absolutely correct! You know your football!"
          ],
          incorrect: [
            "COME ON! That's not even close! Do you even watch football?!",
            "Are you KIDDING me?! That answer is completely wrong!"
          ],
          win: "Just like I predicted! Nobody knows football like Skip Bayless!",
          lose: "I can't believe it! You actually out-foxed me on that one!"
        }
      },
      {
        id: 2,
        name: "Shannon Sharpe",
        shortName: "Unc",
        expertise: "Hall of Fame TE",
        avatar: "🐐",
        color: "#000000",
        reactions: {
          correct: [
            "SKIUUUP! They got that one right! That's some good football knowledge!",
            "Hold up, hold up! You know your stuff! I respect that!"
          ],
          incorrect: [
            "Aww hell naw! That ain't it! You gotta do better than that!",
            "Come on now! Even my grandmama knows that answer!"
          ],
          win: "That's why they call me Hall of Fame Shannon Sharpe! UNDISPUTED!",
          lose: "You got me good! That was some championship-level knowledge right there!"
        }
      }
    ],
    baseball: [
      {
        id: 3,
        name: "Alex Rodriguez",
        shortName: "A-Rod",
        expertise: "Yankees Legend",
        avatar: "⚾",
        color: "#132448",
        reactions: {
          correct: [
            "That's a clutch hit! You know your baseball fundamentals!",
            "Perfect swing! You connected on that answer!"
          ],
          incorrect: [
            "Strike three looking! You can't take that pitch!",
            "That's an error in the field! Gotta make that play!"
          ],
          win: "Just like my playing career - when you study the game, you dominate!",
          lose: "You brought your A-game today! That was All-Star level knowledge!"
        }
      },
      {
        id: 4,
        name: "Derek Jeter",
        shortName: "Cap",
        expertise: "Yankees Captain",
        avatar: "👑",
        color: "#0C2340",
        reactions: {
          correct: [
            "That's championship-level knowledge right there!",
            "You came through in the clutch! Great answer!"
          ],
          incorrect: [
            "You swung at a bad pitch on that one.",
            "That's not quite right. Let me break it down for you."
          ],
          win: "Just like in October - when it matters most, I deliver!",
          lose: "You earned that win! That was some serious baseball IQ!"
        }
      }
    ],
    soccer: [
      {
        id: 5,
        name: "Alexi Lalas",
        shortName: "Lalas",
        expertise: "USMNT Legend",
        avatar: "🦁",
        color: "#FF4444",
        reactions: {
          correct: [
            "GOAL! That's exactly right! You know your soccer!",
            "Beautiful finish! You placed that answer perfectly!"
          ],
          incorrect: [
            "Wide of the goal! That answer missed the target completely!",
            "Offside! You're not even close on that one!"
          ],
          win: "Just like the beautiful game - when you know it, you know it!",
          lose: "You schooled me! That was world-class soccer knowledge!"
        }
      },
      {
        id: 6,
        name: "Landon Donovan",
        shortName: "LD",
        expertise: "MLS Legend",
        avatar: "⭐",
        color: "#004225",
        reactions: {
          correct: [
            "What a strike! That answer found the back of the net!",
            "Perfect placement! You know the game inside and out!"
          ],
          incorrect: [
            "That shot went over the crossbar! Not quite right!",
            "The keeper saved that one! Wrong answer!"
          ],
          win: "Just like my career - clutch when it counts most!",
          lose: "Incredible performance! You've got serious soccer skills!"
        }
      }
    ]
  };

  // Questions bank by sport
  const questionBanksBySport = {
    football: {
      1: [ // Skip Bayless - NFL Hot Takes
        {
          question: "Which quarterback has won the most Super Bowl championships?",
          options: ["Joe Montana", "Tom Brady", "Terry Bradshaw", "Troy Aikman"],
          correctAnswer: 1
        },
        {
          question: "Which team is known as 'America's Team'?",
          options: ["Green Bay Packers", "Dallas Cowboys", "New England Patriots", "Pittsburgh Steelers"],
          correctAnswer: 1
        },
        {
          question: "Who holds the NFL record for most career rushing yards?",
          options: ["Barry Sanders", "Walter Payton", "Adrian Peterson", "Emmitt Smith"],
          correctAnswer: 3
        },
        {
          question: "How many teams make the NFL playoffs?",
          options: ["12", "14", "16", "18"],
          correctAnswer: 1
        },
        {
          question: "Which NFL team has never appeared in a Super Bowl?",
          options: ["Cleveland Browns", "Detroit Lions", "Houston Texans", "All of the above"],
          correctAnswer: 3
        }
      ],
      2: [ // Shannon Sharpe - NFL History
        {
          question: "Which tight end holds the record for most career receiving yards?",
          options: ["Tony Gonzalez", "Shannon Sharpe", "Rob Gronkowski", "Travis Kelce"],
          correctAnswer: 0
        },
        {
          question: "How many points is a safety worth?",
          options: ["1", "2", "3", "6"],
          correctAnswer: 1
        },
        {
          question: "Which team won the first Super Bowl?",
          options: ["Green Bay Packers", "Kansas City Chiefs", "Oakland Raiders", "Dallas Cowboys"],
          correctAnswer: 0
        },
        {
          question: "What is the maximum number of players on an NFL roster?",
          options: ["50", "53", "55", "60"],
          correctAnswer: 1
        },
        {
          question: "Which team drafted Peyton Manning?",
          options: ["Indianapolis Colts", "Denver Broncos", "Tennessee Titans", "New Orleans Saints"],
          correctAnswer: 0
        }
      ]
    },
    baseball: {
      3: [ // Alex Rodriguez - MLB Stats
        {
          question: "Who holds the single-season home run record?",
          options: ["Babe Ruth", "Mark McGwire", "Sammy Sosa", "Barry Bonds"],
          correctAnswer: 3
        },
        {
          question: "Which team has won the most World Series championships?",
          options: ["Boston Red Sox", "St. Louis Cardinals", "New York Yankees", "Oakland Athletics"],
          correctAnswer: 2
        },
        {
          question: "What is the distance between bases in MLB?",
          options: ["80 feet", "85 feet", "90 feet", "95 feet"],
          correctAnswer: 2
        },
        {
          question: "How many strikes result in a strikeout?",
          options: ["2", "3", "4", "5"],
          correctAnswer: 1
        },
        {
          question: "Which player was known as 'The Sultan of Swat'?",
          options: ["Lou Gehrig", "Babe Ruth", "Ty Cobb", "Joe DiMaggio"],
          correctAnswer: 1
        }
      ],
      4: [ // Derek Jeter - Yankees History
        {
          question: "How many World Series championships did Derek Jeter win?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 2
        },
        {
          question: "What number did Derek Jeter wear?",
          options: ["2", "3", "4", "5"],
          correctAnswer: 0
        },
        {
          question: "In which year did the Yankees last win the World Series?",
          options: ["2007", "2008", "2009", "2010"],
          correctAnswer: 2
        },
        {
          question: "How many innings are in a regulation baseball game?",
          options: ["7", "8", "9", "10"],
          correctAnswer: 2
        },
        {
          question: "What does ERA stand for?",
          options: ["Earned Run Average", "Error Rate Average", "Elite Run Average", "Extra Run Average"],
          correctAnswer: 0
        }
      ]
    },
    soccer: {
      5: [ // Alexi Lalas - World Cup & USMNT
        {
          question: "How often is the FIFA World Cup held?",
          options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
          correctAnswer: 2
        },
        {
          question: "Which country has won the most FIFA World Cups?",
          options: ["Germany", "Italy", "Argentina", "Brazil"],
          correctAnswer: 3
        },
        {
          question: "How many players are on the field for each team during play?",
          options: ["10", "11", "12", "13"],
          correctAnswer: 1
        },
        {
          question: "What is it called when a player scores three goals in one game?",
          options: ["Triple", "Hat trick", "Three-peat", "Goal rush"],
          correctAnswer: 1
        },
        {
          question: "Which position is the only one allowed to use hands?",
          options: ["Defender", "Midfielder", "Forward", "Goalkeeper"],
          correctAnswer: 3
        }
      ],
      6: [ // Landon Donovan - MLS & US Soccer
        {
          question: "Which MLS team has won the most MLS Cups?",
          options: ["LA Galaxy", "Seattle Sounders", "D.C. United", "San Jose Earthquakes"],
          correctAnswer: 0
        },
        {
          question: "How long is a regulation soccer match?",
          options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"],
          correctAnswer: 1
        },
        {
          question: "What is the maximum number of substitutions allowed per team?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 2
        },
        {
          question: "Which card is shown for a serious foul?",
          options: ["Yellow card", "Red card", "Blue card", "Green card"],
          correctAnswer: 1
        },
        {
          question: "What is the penalty area also known as?",
          options: ["Goal box", "Penalty box", "18-yard box", "All of the above"],
          correctAnswer: 3
        }
      ]
    }
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
    } else if (gameState === "playing" && timeLeft === 0 && userAnswer === null) {
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
      const randomReaction = selectedPersonality.reactions.correct[Math.floor(Math.random() * selectedPersonality.reactions.correct.length)];
      setReactionText(randomReaction);
    } else {
      // Wrong answer - no points awarded to anyone
      const randomReaction = selectedPersonality.reactions.incorrect[Math.floor(Math.random() * selectedPersonality.reactions.incorrect.length)];
      setReactionText(randomReaction);
    }
    
    setShowingReaction(true);
    setGameState("reaction");
  };

  // Handle times up
  const handleTimesUp = () => {
    // Time's up - no points awarded to anyone
    const randomReaction = selectedPersonality.reactions.incorrect[Math.floor(Math.random() * selectedPersonality.reactions.incorrect.length)];
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
        setReactionText("Not bad! You know your stuff, but I've still got the edge.");
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
      <div className="bg-blue-600 w-full py-3 mb-6 rounded">
        <h1 className="text-white text-xl font-bold text-center">
          FOX SPORTS SHOWDOWN
        </h1>
      </div>
      
      <h2 className="text-lg font-bold mb-2">Choose Your Sport</h2>
      <p className="text-gray-600 text-sm mb-6 text-center">Challenge FOX Sports personalities</p>
      
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {sports.map(sport => (
          <div 
            key={sport.id}
            className="bg-white border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow flex items-center"
            onClick={() => handleSelectSport(sport)}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mr-4"
              style={{ backgroundColor: sport.color + '20' }}
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
          {personalities.map(personality => (
            <div 
              key={personality.id}
              className="bg-white border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow flex flex-col items-center"
              onClick={() => handleSelectPersonality(personality)}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2"
                style={{ backgroundColor: personality.color + '20' }}
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
        style={{ backgroundColor: selectedPersonality.color + '20' }}
      >
        {selectedPersonality.avatar}
      </div>
      
      <h2 className="text-2xl font-bold mb-2">{selectedPersonality.name}</h2>
      <p className="text-lg mb-6">{selectedPersonality.expertise}</p>
      
      <div className="bg-gray-100 rounded-lg p-4 mb-6 max-w-md">
        <p className="italic text-center">
          "Think you can out-fox me in sports trivia? Let's see what you've got! Time to separate the pros from the amateurs!"
        </p>
      </div>
      
      <h3 className="font-bold mb-2">Challenge Rules:</h3>
      <ul className="list-disc pl-6 mb-6 text-left">
        <li>5 questions about {selectedSport?.name.toLowerCase()}</li>
        <li>20 seconds to answer each question</li>
        <li>1 point for each correct answer</li>
        <li>Score 80% or higher to beat the expert</li>
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
            {`YOU VS. ${selectedPersonality.shortName.toUpperCase()}`}
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
            <div className="text-sm font-bold">QUESTION {currentQuestion + 1} OF {questions.length}</div>
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
                    ? 'bg-green-100 border-green-500' 
                    : 'bg-red-100 border-red-500'
                  : ''
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
            style={{ backgroundColor: selectedPersonality.color + '20' }}
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
        You scored: {userScore} out of {getQuestions(selectedPersonality.id).length}
      </div>
      
      <div className="text-lg mb-6">
        {Math.round((userScore / getQuestions(selectedPersonality.id).length) * 100)}% correct
      </div>
      
      <div className="flex w-full mb-6 items-start">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0 mr-3"
          style={{ backgroundColor: selectedPersonality.color + '20' }}
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
        {gameState === "personality_selection" && renderPersonalitySelectionScreen()}
        {gameState === "intro" && renderIntroScreen()}
        {gameState === "playing" && renderPlayingScreen()}
        {gameState === "reaction" && renderReactionScreen()}
        {gameState === "results" && renderResultsScreen()}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        <span>Demo version - FOX Sports Concept</span>
      </div>
    </div>
  );
};

export default FoxTriviaShowdown;

