import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import FocusModeToggle from '../components/FocusModeToggle';
import { useAuth } from '../contexts/AuthContext';
import { useLayout } from '../contexts/LayoutContext';

export default function Quiz() {
  const navigate = useNavigate();
  const { topicId, quizId } = useParams();
  const { focusMode, disableFocusMode } = useLayout();

  // Auto-disable focus mode when leaving quiz page
  useEffect(() => {
    return () => disableFocusMode();
  }, []);

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Current question index state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // User answers map { question_id: option_id }
  const [answers, setAnswers] = useState({});
  // Selected option state for current question
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  // Answer feedback state
  const [hasChecked, setHasChecked] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  
  // Quiz completion state
  const [isFinished, setIsFinished] = useState(false);
  // Quiz result state from API
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(`/topics/${topicId}/quizzes/${quizId}`);
        const data = response.data.data;
        setQuiz(data);
        
        // Shuffle questions
        if (data.questions) {
          setQuestions([...data.questions].sort(() => Math.random() - 0.5));
        }
      } catch (error) {
        console.error('Failed to fetch quiz', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [topicId, quizId]);

  // Reset quiz state
  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setHasChecked(false);
    setIsCurrentCorrect(false);
    setAnswers({});
    setIsFinished(false);
    setQuizResult(null);
    if (questions.length > 0) {
      setQuestions([...questions].sort(() => Math.random() - 0.5));
    }
  };

  if (loading) {
    return <div className="pt-24 text-center font-body text-on-surface">Loading quiz...</div>;
  }

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
  const correctOption = currentQuestion.options.find(o => o.is_correct);

  // Step 1: Check the answer
  const handleCheck = () => {
    if (!selectedOptionId) return;
    const isCorrect = selectedOptionId === correctOption?.id;
    setIsCurrentCorrect(isCorrect);
    setHasChecked(true);
  };

  const { fetchUser } = useAuth();

  // Step 2: Proceed to next question or finish
  const handleNext = async () => {
    const newAnswers = { ...answers, [currentQuestion.id]: selectedOptionId };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionId(null);
      setHasChecked(false);
      setIsCurrentCorrect(false);
    } else {
      // Submit quiz
      try {
        const response = await api.post('/progress/quiz', {
          quiz_id: quizId,
          answers: newAnswers
        });
        setQuizResult(response.data.data);
        setIsFinished(true);
        await fetchUser(); // Sync XP
      } catch (error) {
        console.error('Failed to submit quiz', error);
        alert('Failed to submit quiz. Please try again.');
      }
    }
  };

  if (isFinished && quizResult) {
    return (
      <div className="bg-background font-body text-on-surface min-h-screen flex items-center justify-center p-6">
        <div className="bg-surface-container rounded-2xl p-10 max-w-lg w-full text-center shadow-2xl border-b-8 border-primary-dim">
          <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          </div>
          <h1 className="font-headline font-black text-4xl mb-4">Quiz Complete!</h1>
          <p className="text-xl text-on-surface-variant font-bold mb-2">
            You scored <strong className="text-primary">{quizResult.correct} / {quizResult.total}</strong> correct! ({quizResult.score}%)
          </p>
          <p className="text-lg text-on-surface-variant mb-8">
            {quizResult.xp_earned > 0
              ? <>You earned <strong className="text-secondary">+{quizResult.xp_earned} XP</strong></>
              : <>You earned <strong className="text-secondary">+0 XP</strong> <br /><span className="text-sm opacity-70">(Score is too low or not a new best)</span></>}
          </p>
          <p className="text-sm text-on-surface-variant mb-4 font-bold">
            Best Score: {quizResult.best_score}%
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
      <FocusModeToggle />

      {/* Main Canvas */}
      <main className={`min-h-screen p-8 pt-12 flex flex-col items-center transition-[margin] duration-300 ease-out ${focusMode ? 'md:ml-0' : 'md:ml-64'}`}>
        {/* Progress Header */}
        <div className="w-full max-w-3xl mb-12">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => navigate(`/topic/${topicId}`)} className="p-2 hover:bg-surface-container rounded-full transition-colors inline-flex">
              <span className="material-symbols-outlined text-on-surface-variant">close</span>
            </button>
          </div>
          {/* Progress Bar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-full bg-surface-variant/30 h-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}></div>
            </div>
            <span className="font-headline font-bold text-on-surface-variant">{currentQuestionIndex + 1}/{questions.length}</span>
          </div>
        </div>

        {/* Question Section */}
        <section className="w-full max-w-3xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-surface-container rounded-lg p-8 mb-8 border-b-4 border-surface-container-highest">
            <h1 className="font-headline text-3xl font-extrabold text-on-surface leading-tight text-center">
              {currentQuestion.question_text}
            </h1>
          </div>

          {/* Answer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentQuestion.options.map((option, index) => {
              let btnClass = "bg-surface-container-lowest border-outline-variant/20 text-on-surface";
              let idxClass = "bg-surface-container text-on-surface-variant";

              if (hasChecked) {
                // After checking: show correct/incorrect feedback
                if (option.is_correct) {
                  // Correct answer always highlighted green
                  btnClass = "bg-[#e8f5e9] border-[#4caf50] border-4 text-[#1b5e20]";
                  idxClass = "bg-[#4caf50] text-white";
                } else if (option.id === selectedOptionId && !option.is_correct) {
                  // Selected wrong answer highlighted red
                  btnClass = "bg-[#ffebee] border-[#ef5350] border-4 text-[#b71c1c]";
                  idxClass = "bg-[#ef5350] text-white";
                }
              } else if (option.id === selectedOptionId) {
                // Before checking: selected option highlighted
                btnClass = "bg-surface-container-low border-primary border-4";
                idxClass = "bg-primary text-on-primary";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => { if (!hasChecked) setSelectedOptionId(option.id); }}
                  disabled={hasChecked}
                  className={`group relative flex items-center gap-6 p-6 border-2 rounded-lg text-left transition-all ${!hasChecked ? 'hover:border-primary hover:bg-surface-container hover:scale-[1.02] active:scale-[0.98]' : ''} chunky-shadow ${btnClass}`}
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-headline font-black transition-colors ${idxClass}`}>
                    {index + 1}
                  </div>
                  <span className="font-headline font-bold text-xl">{option.option_text}</span>
                  {hasChecked && option.is_correct && (
                    <span className="material-symbols-outlined text-[#4caf50] ml-auto text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  )}
                  {hasChecked && option.id === selectedOptionId && !option.is_correct && (
                    <span className="material-symbols-outlined text-[#ef5350] ml-auto text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback Message */}
          {hasChecked && (
            <div className={`mt-6 p-5 rounded-xl text-center font-headline font-bold text-lg ${isCurrentCorrect ? 'bg-[#e8f5e9] text-[#1b5e20] border-2 border-[#4caf50]/30' : 'bg-[#ffebee] text-[#b71c1c] border-2 border-[#ef5350]/30'}`}>
              {isCurrentCorrect ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                  Correct! Great job!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>close</span>
                  Incorrect. The correct answer is: {correctOption?.option_text}
                </span>
              )}
            </div>
          )}
        </section>

        {/* Bottom Actions */}
        <footer className="w-full max-w-3xl mt-12 flex justify-end items-center mb-10 pb-8">
          {!hasChecked ? (
            <button
              onClick={handleCheck}
              disabled={!selectedOptionId}
              className={`px-12 py-5 font-headline font-black text-xl rounded-lg border-b-4 transition-all shadow-xl active:scale-95
                ${(!selectedOptionId) ? 'bg-surface-variant text-on-surface-variant border-surface-container-highest cursor-not-allowed shadow-none' : 'bg-primary text-on-primary border-primary-dim hover:translate-y-1 hover:border-b-0 shadow-primary/20'}`}
            >
              CHECK
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-12 py-5 font-headline font-black text-xl rounded-lg border-b-4 transition-all shadow-xl active:scale-95 bg-primary text-on-primary border-primary-dim hover:translate-y-1 hover:border-b-0 shadow-primary/20"
            >
              {currentQuestionIndex < questions.length - 1 ? 'NEXT' : 'FINISH'}
            </button>
          )}
        </footer>
      </main>

      {/* Side Decoration */}
      <div className="fixed -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed top-40 -right-10 w-40 h-40 bg-tertiary/5 rounded-full blur-2xl -z-10"></div>
    </div>
  );
}