"use client";

import React, { useState } from "react";
import { QuizQuestion } from "@/types/database";
import { HelpCircle, CheckCircle, XCircle, Lightbulb, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

interface CoupleQuizProps {
  questions: QuizQuestion[];
  onFinish?: () => void;
}

export default function CoupleQuiz({ questions, onFinish }: CoupleQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQ.answerIndex) {
      setScore((prev) => prev + 1);
      try {
        confetti({
          particleCount: 30,
          spread: 40,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setCompleted(true);
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      } catch {}
      onFinish?.();
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex flex-col items-center">
      <div className="w-full rounded-2xl glass-panel p-5 shadow-2xl border border-white/20">
        {!completed ? (
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-semibold text-rose-500 uppercase tracking-wider">
                Question {currentIdx + 1} of {questions.length}
              </span>
              {currentQ.hint && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1 text-[11px] text-amber-500 hover:text-amber-600 font-medium"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Hint</span>
                </button>
              )}
            </div>

            {showHint && currentQ.hint && (
              <div className="mb-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-300 text-xs italic">
                💡 အကြံပြုချက်: {currentQ.hint}
              </div>
            )}

            <h4 className="text-sm md:text-base font-bold text-gray-800 dark:text-rose-100 mb-4 leading-snug">
              {currentQ.question}
            </h4>

            {/* Options List */}
            <div className="space-y-2 mb-4">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === currentQ.answerIndex;

                let btnStyle = "bg-white/60 dark:bg-black/40 text-gray-700 dark:text-gray-200 border-white/40 hover:bg-rose-50";

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-semibold";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-300";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3 rounded-xl border text-xs md:text-sm text-left flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
              >
                {currentIdx + 1 < questions.length ? "နောက်တစ်ခု မေးမယ် ➡️" : "ရလဒ် ကြည့်မယ် 🏆"}
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-2 animate-bounce" />
            <h4 className="text-base font-bold text-gray-800 dark:text-rose-100 mb-1">
              Quiz ပြီးဆုံးပါပြီ! 🎉
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-300 mb-3">
              မေးခွန်း {questions.length} ခုမှာ {score} ခု မှန်အောင် ဖြေနိုင်ခဲ့ပါတယ်!
            </p>
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-xs font-medium">
              &ldquo;တို့နှစ်ယောက်ရဲ့ အမှတ်တရတွေကို သေချာမှတ်မိပေးတဲ့အတွက် ချစ်တယ်နော် 🤍&rdquo;
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
