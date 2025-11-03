
import React, { useState, useEffect } from 'react';
import { Question, UserAnswer, PerformanceData, Subject } from '../types';
import { getQuestionExplanation } from '../services/geminiService';
import PerformanceAnalytics from './PerformanceAnalytics';
import Button from './common/Button';
import Modal from './common/Modal';

interface PracticeModeProps {
  questions: Question[];
  agencyColor: string;
}

const PracticeMode: React.FC<PracticeModeProps> = ({ questions, agencyColor }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  
  const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [isFetchingExplanation, setIsFetchingExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (quizFinished) {
      calculatePerformance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizFinished]);

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    setUserAnswers([...userAnswers, {
      questionId: currentQuestion.id,
      selectedOptionIndex: selectedOption,
      isCorrect: isCorrect,
    }]);
    setIsAnswered(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleFetchExplanation = async () => {
    setIsExplanationModalOpen(true);
    setIsFetchingExplanation(true);
    const userAnswer = selectedOption !== null ? currentQuestion.options[selectedOption] : "No answer";
    const result = await getQuestionExplanation(currentQuestion, userAnswer);
    setExplanation(result);
    setIsFetchingExplanation(false);
  };
  
  const calculatePerformance = () => {
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const totalQuestions = questions.length;
    const bySubject: PerformanceData['bySubject'] = {};

    questions.forEach(q => {
        if (!bySubject[q.subject]) {
            bySubject[q.subject] = { total: 0, correct: 0 };
        }
        bySubject[q.subject]!.total++;
    });

    userAnswers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        if (question && answer.isCorrect) {
            bySubject[question.subject]!.correct++;
        }
    });

    setPerformanceData({
      totalQuestions: totalQuestions,
      correctAnswers: correctAnswers,
      incorrectAnswers: totalQuestions - correctAnswers,
      score: (correctAnswers / totalQuestions) * 100,
      answers: userAnswers,
      bySubject: bySubject,
    });
  };

  const handleRestart = () => {
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setSelectedOption(null);
      setIsAnswered(false);
      setQuizFinished(false);
      setPerformanceData(null);
  };
  
  if (quizFinished && performanceData) {
    return <PerformanceAnalytics performance={performanceData} onRestart={handleRestart} agencyColor={agencyColor} />;
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="font-semibold" style={{color: agencyColor}}>{currentQuestion.subject}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 my-2">
            <div className="h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`, backgroundColor: agencyColor }}></div>
          </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-6">{currentQuestion.text}</h2>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            let optionClass = 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600';
            if (isAnswered) {
              if (index === currentQuestion.correctAnswerIndex) {
                optionClass = 'bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200';
              } else if (index === selectedOption) {
                optionClass = 'bg-red-100 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200';
              }
            } else if (selectedOption === index) {
              optionClass = `bg-${agencyColor}-100 dark:bg-${agencyColor}-900 border-${agencyColor}-500`;
            }
            return (
              <button 
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${optionClass} ${isAnswered ? '' : 'cursor-pointer'}`}
              >
                <span className={`font-bold mr-3 text-${agencyColor}-600`}>{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {isAnswered && (
                 <Button onClick={handleFetchExplanation} color="gray" variant="outline">
                    Get AI Explanation
                </Button>
            )}
            {!isAnswered ? (
                <Button onClick={handleSubmitAnswer} disabled={selectedOption === null} color={agencyColor}>
                    Submit Answer
                </Button>
            ) : (
                <Button onClick={handleNextQuestion} color={agencyColor}>
                    {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </Button>
            )}
        </div>
      </div>
      <Modal isOpen={isExplanationModalOpen} onClose={() => setIsExplanationModalOpen(false)} title="AI Explanation">
        {isFetchingExplanation ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        ) : (
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br />') }}></div>
        )}
      </Modal>
    </div>
  );
};

export default PracticeMode;
