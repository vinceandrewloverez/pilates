"use client";

import { useState, useEffect } from "react";

// Configuration for 100 reps (10 sets of 10)
const WORKOUT_NAME = "Pushup Challenge";
const TOTAL_SETS = 10;
const REPS_PER_SET = 10;
const REST_SECONDS = 45;

export default function PushupPage() {
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState<boolean[]>(
    Array(TOTAL_SETS).fill(false)
  );

  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);

  const [holdingReset, setHoldingReset] = useState(false);
  const [holdResetTime, setHoldResetTime] = useState(0);

  const [showDoneCard, setShowDoneCard] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Stats calculation
  const completedCount = completedSets.filter(Boolean).length;
  const currentTotalReps = completedCount * REPS_PER_SET;
  const progressPercent = Math.floor((completedCount / TOTAL_SETS) * 100);

  const completeSet = () => {
    if (currentSet > TOTAL_SETS) return;

    const updated = [...completedSets];
    updated[currentSet - 1] = true;
    setCompletedSets(updated);

    if (currentSet < TOTAL_SETS) {
      setIsResting(true);
      setRestTime(REST_SECONDS);
      setCurrentSet(currentSet + 1);
    } else {
      setShowDoneCard(true);
    }
  };

  const resetAll = () => {
    setCurrentSet(1);
    setCompletedSets(Array(TOTAL_SETS).fill(false));
    setIsResting(false);
    setRestTime(0);
    setShowDoneCard(false);
    setShowStats(false);
  };

  // Timer logic
  useEffect(() => {
    if (!isResting) return;

    const timer = setInterval(() => {
      setRestTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsResting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isResting]);

  // Hold to reset logic
  useEffect(() => {
    if (!holdingReset) {
      setHoldResetTime(0);
      return;
    }
    const timer = setInterval(() => {
      setHoldResetTime((prev) => {
        if (prev >= 1) {
          clearInterval(timer);
          resetAll();
          setHoldingReset(false);
          return 0;
        }
        return prev + 0.1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [holdingReset]);

  const resetProgress = Math.min((holdResetTime / 1) * 100, 100);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      {/* Timer Popup */}
      {isResting && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-72 text-center">
            <p className="text-xl font-bold text-green-700 mb-2">Rest</p>
            <p className="text-5xl font-extrabold text-gray-900">{restTime}s</p>
            <button 
              onClick={() => setIsResting(false)}
              className="mt-4 text-sm font-bold text-green-700/60 uppercase tracking-widest"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Done Card */}
      {showDoneCard && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-72 text-center">
            <p className="text-2xl font-bold text-green-700 mb-2">Workout Done</p>
            <p className="text-gray-500 mb-4 font-medium">100 Reps Smashed!</p>
            <button
              onClick={() => {
                setShowDoneCard(false);
                setShowStats(true);
              }}
              className="w-full py-3 rounded-2xl bg-green-700 text-white font-semibold"
            >
              View Stats
            </button>
          </div>
        </div>
      )}

      {/* Stats Card */}
      {showStats && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-72 text-center">
            <p className="text-2xl font-bold mb-4 text-gray-800">Session Stats</p>
            <div className="space-y-2 text-gray-600 font-medium">
              <p>Total Sets: {TOTAL_SETS}</p>
              <p>Total Reps: {currentTotalReps}</p>
              <p className="font-bold text-green-700">Completion: {progressPercent}%</p>
            </div>

            <button
              onClick={resetAll}
              className="w-full mt-6 py-3 rounded-2xl border border-gray-300 font-bold text-gray-500"
            >
              Start Again
            </button>
          </div>
        </div>
      )}

      {/* Main UI Card */}
      <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-xl p-6 text-center">
        <header className="mb-6">
          <h1 className="text-3xl font-black text-green-700 uppercase tracking-tight">
            {WORKOUT_NAME}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
             <div className="h-1 w-8 bg-green-700 rounded-full opacity-20"></div>
             <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Volume: 100 Reps</p>
             <div className="h-1 w-8 bg-green-700 rounded-full opacity-20"></div>
          </div>
        </header>

        {/* Large Rep Counter */}
        <div className="mb-8 py-4 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-6xl font-black text-gray-800">{currentTotalReps}</p>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Total Reps Completed</p>
        </div>

        {/* 10 Sets Grid */}
        <div className="grid grid-cols-5 gap-2.5 mb-8">
          {completedSets.map((done, i) => (
            <div
              key={i}
              className={`h-12 rounded-xl flex items-center justify-center font-bold text-sm border-2 transition-all duration-200 ${
                done
                  ? "bg-green-700 border-green-700 text-white shadow-lg shadow-green-100"
                  : i === currentSet - 1 && !isResting
                  ? "bg-white border-green-700 text-green-700"
                  : "bg-white border-gray-200 text-gray-300"
              }`}
            >
              {done ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : i + 1}
            </div>
          ))}
        </div>

        {!isResting && currentSet <= TOTAL_SETS && (
          <button
            onClick={completeSet}
            className="w-full py-4 rounded-2xl bg-green-700 text-white font-bold text-lg shadow-xl shadow-green-100 active:scale-[0.98] transition-all"
          >
            Complete Set {currentSet}
          </button>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100">
          {/* Reset Button */}
          <button
            onMouseDown={() => setHoldingReset(true)}
            onMouseUp={() => setHoldingReset(false)}
            onMouseLeave={() => setHoldingReset(false)}
            className="relative w-full py-3 rounded-xl border border-gray-200 text-gray-400 overflow-hidden text-xs font-bold uppercase tracking-widest"
          >
            {holdingReset && (
              <div
                className="absolute inset-0 bg-red-500/10"
                style={{ width: `${resetProgress}%` }}
              />
            )}
            <span className="relative z-10">Hold to Reset</span>
          </button>
        </div>
      </div>
    </main>
  );
}