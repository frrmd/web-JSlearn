import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockUser, addRecentTopic } from '../data/mockUser';
import { mockQuizData } from '../data/mockQuiz';
import { markQuizCompleted, userProgress } from '../data/userProgress';
import Sidebar from '../components/Sidebar';

export default function Quiz() {
  const navigate = useNavigate();
  const { topicId, quizId } = useParams();

  // Fetch quiz data
  const topicQuestions = mockQuizData[topicId]?.[quizId] || [];

  // Shuffle questions
  const [questions] = useState(() => [...topicQuestions].sort(() => Math.random() - 0.5));

  useEffect(() => {
    addRecentTopic(topicId);
  }, [topicId]);

  // Current question index state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Selected option state
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  // Answer check state
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  // Hint visibility state
  const [showHint, setShowHint] = useState(false);
  // Quiz completion state
  const [isFinished, setIsFinished] = useState(false);
  // Earned XP state
  const [earnedXp, setEarnedXp] = useState(0);
  // Correct answers count state
  const [correctCount, setCorrectCount] = useState(0);
  // Quiz result state
  const [quizResult, setQuizResult] = useState({ newXpEarned: 0, isNewBest: false });

  // Reset quiz state
  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setShowHint(false);
    setIsFinished(false);
    setEarnedXp(0);
    setCorrectCount(0);
    setQuizResult({ newXpEarned: 0, isNewBest: false });
  };

  if (questions.length === 0) {
    return (
      <div className="bg-background font-body text-on-surface min-h-screen flex items-center justify-center p-6">
        <div className="bg-surface-container rounded-2xl p-10 max-w-lg w-full text-center shadow-2xl">
          <h1 className="font-headline font-black text-3xl mb-4">No Quiz Found</h1>
          <p className="text-on-surface-variant mb-8">This topic does not have a quiz yet.</p>
          <button onClick={() => navigate(`/topic/${topicId}`)} className="bg-primary text-white font-headline font-extrabold py-3 px-8 rounded-xl hover:bg-primary-dim transition-colors">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleCheckOrNext = () => {
    if (!isAnswerChecked) {
      if (!selectedOptionId) return; // User must select an option

      setIsAnswerChecked(true);
      const selectedOption = currentQuestion.options.find(o => o.id === selectedOptionId);
      if (selectedOption && selectedOption.isCorrect) {
        setEarnedXp(prev => prev + (currentQuestion.xpReward || 10));
        setCorrectCount(prev => prev + 1);
      }
    } else {
      // Move to next or finish
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptionId(null);
        setIsAnswerChecked(false);
        setShowHint(false);
      } else {
        const result = markQuizCompleted(topicId, quizId, correctCount, earnedXp, mockUser.id);
        setQuizResult(result);
        setIsFinished(true);
      }
    }
  };

  if (isFinished) {
    return (
      <div className="bg-background font-body text-on-surface min-h-screen flex items-center justify-center p-6">
        <div className="bg-surface-container rounded-2xl p-10 max-w-lg w-full text-center shadow-2xl border-b-8 border-primary-dim">
          <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          </div>
          <h1 className="font-headline font-black text-4xl mb-4">Quiz Complete!</h1>
          <p className="text-xl text-on-surface-variant font-bold mb-2">
            You scored <strong className="text-primary">{correctCount} / {questions.length}</strong> correct!
          </p>
          <p className="text-lg text-on-surface-variant mb-8">
            {quizResult.newXpEarned > 0
              ? <>You earned <strong className="text-secondary">+{quizResult.newXpEarned} XP</strong></>
              : <>You earned <strong className="text-secondary">+0 XP</strong> <br /><span className="text-sm opacity-70">(You didn't beat your best score)</span></>}
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate(`/topic/${topicId}`)} className="w-full bg-primary text-white font-headline font-extrabold py-4 rounded-xl shadow-lg hover:bg-primary-dim transition-colors text-xl active:scale-95">
              Return to Topic
            </button>
            <button onClick={handleRetake} className="w-full bg-surface-container-highest text-on-surface font-headline font-extrabold py-4 rounded-xl hover:brightness-95 transition-colors text-xl active:scale-95">
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-background font-body text-on-surface">
      <Sidebar />

      {/* Main Canvas */}
      <main className="md:ml-64 min-h-screen p-8 pt-12 flex flex-col items-center">
        {/* Progress Header */}
        <div className="w-full max-w-3xl mb-12">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => navigate(`/topic/${topicId}`)} className="p-2 hover:bg-surface-container rounded-full transition-colors inline-flex">
              <span className="material-symbols-outlined text-on-surface-variant">close</span>
            </button>
            {userProgress[topicId]?.quizzes[quizId]?.completed && (
              <div className="bg-[#e8f5e9] text-[#1b5e20] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1 border border-[#4caf50]/30 shadow-sm">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Completed (Best: {userProgress[topicId].quizzes[quizId].bestScore}/{questions.length})
              </div>
            )}
          </div>
          {/* Progress Bar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-full bg-surface-variant/30 h-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
            </div>
            <span className="font-headline font-bold text-on-surface-variant">{currentQuestionIndex + 1}/{questions.length}</span>
          </div>
        </div>

        {/* Question Section */}
        <section className="w-full max-w-3xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-surface-container rounded-lg p-8 mb-8 border-b-4 border-surface-container-highest">
            <h1 className="font-headline text-3xl font-extrabold text-on-surface leading-tight text-center">
              {currentQuestion.questionText} <br />
              {currentQuestion.codeSnippet && (
                <span className="bg-inverse-surface text-inverse-primary px-3 py-1 rounded-md font-mono text-2xl mt-4 inline-block">{currentQuestion.codeSnippet}</span>
              )}
            </h1>
          </div>

          {/* Answer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentQuestion.options.map((option, index) => {
              let btnClass = "bg-surface-container-lowest border-outline-variant/20 text-on-surface";
              let idxClass = "bg-surface-container text-on-surface-variant";

              if (isAnswerChecked) {
                if (option.isCorrect) {
                  btnClass = "bg-[#e8f5e9] border-[#4caf50] text-[#1b5e20]";
                  idxClass = "bg-[#4caf50] text-white";
                } else if (option.id === selectedOptionId) {
                  btnClass = "bg-[#ffebee] border-[#f44336] text-[#b71c1c]";
                  idxClass = "bg-[#f44336] text-white";
                }
              } else if (option.id === selectedOptionId) {
                btnClass = "bg-surface-container-low border-primary border-4";
                idxClass = "bg-primary text-on-primary";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => !isAnswerChecked && setSelectedOptionId(option.id)}
                  className={`group relative flex items-center gap-6 p-6 border-2 rounded-lg text-left transition-all ${!isAnswerChecked ? 'hover:border-primary hover:bg-surface-container hover:scale-[1.02] active:scale-[0.98]' : 'cursor-default'} chunky-shadow ${btnClass}`}
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-headline font-black transition-colors ${idxClass}`}>
                    {index + 1}
                  </div>
                  <span className="font-headline font-bold text-xl">{option.text}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Tip Card */}
        {currentQuestion.tip && (
          <section className="w-full max-w-3xl mt-4">
            {!showHint ? (
              <button onClick={() => setShowHint(true)} className="w-full p-4 border-2 border-dashed border-secondary/50 rounded-lg text-secondary font-bold hover:bg-secondary/5 transition-colors">
                <span className="material-symbols-outlined align-middle mr-2">lightbulb</span> Need a hint?
              </button>
            ) : (
              <div className="bg-secondary-container rounded-lg p-1 overflow-hidden secondary-chunky-shadow animate-in fade-in zoom-in duration-300">
                <div className="bg-surface-container-lowest p-8 flex flex-col md:flex-row gap-8 items-center rounded-[calc(1rem-4px)]">
                  <div className="flex-shrink-0 w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-headline font-extrabold text-secondary text-2xl mb-2">{currentQuestion.tip.title}</h3>
                    <p className="text-on-surface-variant font-medium leading-relaxed">
                      {currentQuestion.tip.content}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Bottom Actions */}
        <footer className="w-full max-w-3xl mt-12 flex justify-end items-center mb-10 pb-8">
          <button
            onClick={handleCheckOrNext}
            disabled={!isAnswerChecked && !selectedOptionId}
            className={`px-12 py-5 font-headline font-black text-xl rounded-lg border-b-4 transition-all shadow-xl active:scale-95
              ${(!isAnswerChecked && !selectedOptionId) ? 'bg-surface-variant text-on-surface-variant border-surface-container-highest cursor-not-allowed shadow-none' : 'bg-primary text-on-primary border-primary-dim hover:translate-y-1 hover:border-b-0 shadow-primary/20'}`}
          >
            {!isAnswerChecked ? 'CHECK ANSWER' : (currentQuestionIndex < questions.length - 1 ? 'NEXT' : 'FINISH')}
          </button>
        </footer>
      </main>

      {/* Side Decoration */}
      <div className="fixed -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed top-40 -right-10 w-40 h-40 bg-tertiary/5 rounded-full blur-2xl -z-10"></div>
    </div>
  );
}