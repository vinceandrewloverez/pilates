"use client";

import { useState, useEffect } from "react";

const WORKOUTS = [
  "DB Shoulder Press", "DB Front Raise", "DB Lateral Raise",
  "DB Serve the Platter", "DB Around the World", "DB Tricep Extension",
  "DB Bicep Curls", "DB Hammer Curls",
];

const WORKOUT_SHORT = [
  "Shoulder", "Front", "Lateral", "Platter", "Around", "Tricep", "Bicep", "Hammer",
];

const TOTAL_SETS = 4;
const REST_SECONDS = 45;
const MOVE_SECONDS = 45;

const Check = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export default function WorkoutPage() {
  const [workoutIndex, setWorkoutIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState<boolean[]>(Array(TOTAL_SETS).fill(false));
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [holdingReset, setHoldingReset] = useState(false);
  const [holdResetTime, setHoldResetTime] = useState(0);
  const [holdingSkip, setHoldingSkip] = useState(false);
  const [holdSkipTime, setHoldSkipTime] = useState(0);
  const [showDoneCard, setShowDoneCard] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const isLastWorkout = workoutIndex === WORKOUTS.length - 1;
  const showTimerPopup = isResting || isMoving;

  const totalSets = WORKOUTS.length * TOTAL_SETS;
  const completedCount = workoutIndex * TOTAL_SETS + completedSets.filter(Boolean).length;
  const workoutPercent = Math.round((completedCount / totalSets) * 100);
  const resetProgress = Math.min((holdResetTime / 1) * 100, 100);
  const skipProgress = Math.min((holdSkipTime / 1) * 100, 100);

  const resetSets = () => {
    setCurrentSet(1);
    setCompletedSets(Array(TOTAL_SETS).fill(false));
    setIsResting(false);
    setIsMoving(false);
    setRestTime(0);
  };

  const resetAll = () => {
    setWorkoutIndex(0);
    resetSets();
    setShowDoneCard(false);
    setShowStats(false);
  };

  const nextWorkout = () => {
    if (!isLastWorkout) {
      setWorkoutIndex((i) => i + 1);
      resetSets();
    }
  };

  const dismissTimer = (andAdvance: boolean) => {
    setIsResting(false);
    setIsMoving(false);
    setRestTime(0);
    if (andAdvance) nextWorkout();
  };

  const completeSet = () => {
    if (currentSet > TOTAL_SETS) return;
    const updated = [...completedSets];
    updated[currentSet - 1] = true;
    setCompletedSets(updated);
    if (currentSet < TOTAL_SETS) {
      setIsResting(true);
      setRestTime(REST_SECONDS);
    } else if (isLastWorkout) {
      setShowDoneCard(true);
    } else {
      setIsMoving(true);
      setRestTime(MOVE_SECONDS);
    }
    setCurrentSet((s) => s + 1);
  };

  useEffect(() => {
    if (!isResting && !isMoving) return;
    const timer = setInterval(() => {
      setRestTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (isResting) setIsResting(false);
          if (isMoving) { setIsMoving(false); nextWorkout(); }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isResting, isMoving]);

  useEffect(() => {
    if (!holdingReset) { setHoldResetTime(0); return; }
    const t = setInterval(() => setHoldResetTime((p) => {
      if (p >= 1) { clearInterval(t); resetAll(); setHoldingReset(false); return 0; }
      return p + 0.1;
    }), 100);
    return () => clearInterval(t);
  }, [holdingReset]);

  useEffect(() => {
    if (!holdingSkip || isLastWorkout) { setHoldSkipTime(0); return; }
    const t = setInterval(() => setHoldSkipTime((p) => {
      if (p >= 1) { clearInterval(t); nextWorkout(); setHoldingSkip(false); return 0; }
      return p + 0.1;
    }), 100);
    return () => clearInterval(t);
  }, [holdingSkip]);

  const modal = "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6";
  const overlayCard = "w-full max-w-xs bg-white rounded-2xl border border-gray-100 p-7 text-center";

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

      {/* Timer overlay */}
      {showTimerPopup && (
        <div className={modal}>
          <div className={overlayCard}>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
              {isResting ? "Rest" : "Next up"}
            </p>
            <p className="text-7xl font-semibold text-gray-900 leading-none mb-1">{restTime}</p>
            <p className="text-sm text-gray-400 mb-6">seconds</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => dismissTimer(false)}
                className="py-3 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={() => dismissTimer(isMoving)}
                className="py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Done overlay */}
      {showDoneCard && (
        <div className={modal}>
          <div className={overlayCard}>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">Complete</p>
            <p className="text-3xl font-semibold text-gray-900 mb-1">All done</p>
            <p className="text-sm text-gray-400 mb-6">Great session today.</p>
            <button
              onClick={() => { setShowDoneCard(false); setShowStats(true); }}
              className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              View stats
            </button>
          </div>
        </div>
      )}

      {/* Stats overlay */}
      {showStats && (
        <div className={modal}>
          <div className={overlayCard}>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">Session stats</p>
            <p className="text-5xl font-semibold text-gray-900 mb-6">{workoutPercent}%</p>
            <div className="space-y-3 mb-6 text-left">
              {([["Workouts", WORKOUTS.length], ["Total sets", totalSets], ["Completed", completedCount]] as [string, number][]).map(([label, val]) => (
                <div key={label} className="flex justify-between text-sm border-b border-gray-100 pb-3">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-gray-900 font-medium">{val}</span>
                </div>
              ))}
            </div>
            <button
              onClick={resetAll}
              className="w-full py-3 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Start again
            </button>
          </div>
        </div>
      )}

      {/* Main card */}
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 overflow-hidden">

        <div className="px-5 pt-5 pb-4">

          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <span className="text-sm text-gray-400">Workout {workoutIndex + 1} of {WORKOUTS.length}</span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {workoutPercent}% done
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">{WORKOUTS[workoutIndex]}</h1>
          <p className="text-sm text-gray-400 mb-4">
            Set {Math.min(currentSet, TOTAL_SETS)} of {TOTAL_SETS} · {REST_SECONDS}s rest
          </p>

          {/* Progress bar */}
          <div className="h-0.5 bg-gray-100 rounded-full mb-5">
            <div
              className="h-0.5 bg-gray-900 rounded-full transition-all duration-300"
              style={{ width: `${workoutPercent}%` }}
            />
          </div>

          {/* Set boxes */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {completedSets.map((done, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all"
                style={{
                  background: done ? "#111" : i === currentSet - 1 ? "#f9f9f9" : "#f4f4f4",
                  border: done ? "none" : i === currentSet - 1 ? "1px solid #e0e0e0" : "none",
                  color: done ? "#fff" : i === currentSet - 1 ? "#111" : "#aaa",
                }}
              >
                {done ? <Check size={15} color="#fff" /> : i + 1}
              </div>
            ))}
          </div>

          {/* Complete button */}
          {!showTimerPopup && currentSet <= TOTAL_SETS && (
            <button
              onClick={completeSet}
              className="w-full py-3.5 rounded-xl bg-gray-900 text-white text-sm font-medium mb-2.5 hover:bg-gray-800 transition-colors active:scale-[0.98]"
            >
              Complete set
            </button>
          )}

          {/* Hold buttons */}
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                label: "Hold to skip",
                holding: holdingSkip,
                progress: skipProgress,
                fillColor: "rgba(0,0,0,0.04)",
                disabled: isLastWorkout,
                onDown: () => setHoldingSkip(true),
                onUp: () => setHoldingSkip(false),
              },
              {
                label: "Hold to reset",
                holding: holdingReset,
                progress: resetProgress,
                fillColor: "rgba(220,38,38,0.07)",
                disabled: false,
                onDown: () => setHoldingReset(true),
                onUp: () => setHoldingReset(false),
              },
            ].map(({ label, holding, progress, fillColor, disabled, onDown, onUp }) => (
              <button
                key={label}
                disabled={disabled}
                onMouseDown={onDown}
                onMouseUp={onUp}
                onMouseLeave={onUp}
                onTouchStart={onDown}
                onTouchEnd={onUp}
                className="relative py-3 rounded-xl border border-gray-100 text-xs text-gray-400 overflow-hidden disabled:opacity-30"
              >
                {holding && (
                  <div
                    className="absolute inset-0 transition-all duration-100"
                    style={{ width: `${progress}%`, background: fillColor }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stepper strip */}
        <div className="border-t border-gray-100 px-5 py-4 overflow-x-auto">
          <div className="flex items-end gap-0" style={{ minWidth: "max-content" }}>
            {WORKOUTS.map((_, i) => (
              <div key={i} className="flex items-center">
                <button onClick={() => setWorkoutIndex(i)} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all"
                    style={{
                      background: i <= workoutIndex ? "#111" : "#f4f4f4",
                      color: i <= workoutIndex ? "#fff" : "#aaa",
                    }}
                  >
                    {i < workoutIndex ? <Check size={11} color="#fff" /> : i + 1}
                  </div>
                  <span
                    className="text-[10px] w-9 text-center leading-tight"
                    style={{
                      color: i === workoutIndex ? "#111" : "#bbb",
                      fontWeight: i === workoutIndex ? 500 : 400,
                    }}
                  >
                    {WORKOUT_SHORT[i]}
                  </span>
                </button>
                {i < WORKOUTS.length - 1 && (
                  <div
                    className="w-6 h-px mb-4 mx-0.5"
                    style={{ background: i < workoutIndex ? "#111" : "#e5e5e5" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
