"use client";

import { useState, useEffect } from "react";

const WORKOUTS = [
  "DB Shoulder Press",
  "DB Front Raise",
  "DB Lateral Raise",
  "DB Serve the Platter",
  "DB Around the World",
  "DB Tricep Extension",
  "DB Bicep Curls",
  "DB Hammer Curls",
];

const TOTAL_SETS = 4;
const REST_SECONDS = 45;
const MOVE_SECONDS = 45;

export default function WorkoutPage() {
  const [workoutIndex, setWorkoutIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState<boolean[]>(
    Array(TOTAL_SETS).fill(false)
  );

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

  const completeSet = () => {
    if (currentSet > TOTAL_SETS) return;

    const updated = [...completedSets];
    updated[currentSet - 1] = true;
    setCompletedSets(updated);

    if (currentSet < TOTAL_SETS) {
      setIsResting(true);
      setRestTime(REST_SECONDS);
    } else {
      if (isLastWorkout) {
        setShowDoneCard(true);
      } else {
        setIsMoving(true);
        setRestTime(MOVE_SECONDS);
      }
    }

    setCurrentSet(currentSet + 1);
  };

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
      setWorkoutIndex(workoutIndex + 1);
      resetSets();
    }
  };

  useEffect(() => {
    if (!isResting && !isMoving) return;

    const timer = setInterval(() => {
      setRestTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (isResting) setIsResting(false);
          if (isMoving) {
            setIsMoving(false);
            nextWorkout();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isResting, isMoving]);

  useEffect(() => {
    if (!holdingReset) {
      setHoldResetTime(0);
      return;
    }

    const timer = setInterval(() => {
      setHoldResetTime((prev) => {
        if (prev >= 2) {
          clearInterval(timer);
          resetAll();
          setHoldingReset(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [holdingReset]);

  useEffect(() => {
    if (!holdingSkip || isLastWorkout) {
      setHoldSkipTime(0);
      return;
    }

    const timer = setInterval(() => {
      setHoldSkipTime((prev) => {
        if (prev >= 1.5) {
          clearInterval(timer);
          nextWorkout();
          setHoldingSkip(false);
          return 0;
        }
        return prev + 0.5;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [holdingSkip]);

  const totalSets = WORKOUTS.length * TOTAL_SETS;
  const completedCount =
    workoutIndex * TOTAL_SETS + completedSets.filter(Boolean).length;
  const workoutPercent = Math.floor((completedCount / totalSets) * 100);

  const resetProgress = Math.min((holdResetTime / 2) * 100, 100);
  const skipProgress = Math.min((holdSkipTime / 1.5) * 100, 100);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      {showTimerPopup && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-72 text-center">
            <p className="text-xl font-bold text-[#15803D] mb-2">
              {isResting ? "Rest" : "Next Workout"}
            </p>
            <p className="text-5xl font-extrabold">{restTime}s</p>
          </div>
        </div>
      )}

      {showDoneCard && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-72 text-center">
            <p className="text-2xl font-bold text-[#15803D] mb-2">
              Workout Complete
            </p>
            <p className="text-gray-500 mb-4">Great job today</p>
            <button
              onClick={() => {
                setShowDoneCard(false);
                setShowStats(true);
              }}
              className="w-full py-3 rounded-2xl bg-[#15803D] text-white font-semibold"
            >
              View Stats
            </button>
          </div>
        </div>
      )}

      {showStats && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-72 text-center">
            <p className="text-2xl font-bold mb-4">Session Stats</p>
            <div className="space-y-2 text-gray-700">
              <p>Total Workouts: {WORKOUTS.length}</p>
              <p>Total Sets: {totalSets}</p>
              <p>Completed Sets: {completedCount}</p>
              <p className="font-semibold text-[#15803D]">
                Completion: {workoutPercent}%
              </p>
            </div>

            <button
              onClick={resetAll}
              className="w-full mt-6 py-3 rounded-2xl border border-gray-300"
            >
              Start Again
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-[#15803D] mb-1">
          {WORKOUTS[workoutIndex]}
        </h1>
        <p className="text-gray-500 mb-4">
          Workout {workoutIndex + 1} of {WORKOUTS.length}
        </p>

        <p className="mb-4">
          Set {Math.min(currentSet, TOTAL_SETS)} of {TOTAL_SETS}
        </p>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {completedSets.map((done, i) => (
            <div
              key={i}
              className={`h-14 rounded-xl flex items-center justify-center font-bold ${
                done ? "bg-[#15803D] text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {!showTimerPopup && currentSet <= TOTAL_SETS && (
          <button
            onClick={completeSet}
            className="w-full py-3 rounded-2xl bg-[#15803D] text-white font-semibold"
          >
            Complete Set
          </button>
        )}

        <div className="flex gap-3 mt-8">
          <button
            disabled={isLastWorkout}
            onMouseDown={() => setHoldingSkip(true)}
            onMouseUp={() => setHoldingSkip(false)}
            onMouseLeave={() => setHoldingSkip(false)}
            className="relative flex-1 py-3 rounded-xl border border-gray-300 text-gray-500 disabled:opacity-40 overflow-hidden"
          >
            {holdingSkip && (
              <div
                className="absolute inset-0 bg-yellow-400/30"
                style={{ width: `${skipProgress}%` }}
              />
            )}
            <span className="relative z-10">Hold to Skip</span>
          </button>

          <button
            onMouseDown={() => setHoldingReset(true)}
            onMouseUp={() => setHoldingReset(false)}
            onMouseLeave={() => setHoldingReset(false)}
            className="relative flex-1 py-3 rounded-xl border border-gray-300 text-gray-400 overflow-hidden"
          >
            {holdingReset && (
              <div
                className="absolute inset-0 bg-red-500/20"
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
