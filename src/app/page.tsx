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
  const [holdTime, setHoldTime] = useState(0);

  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

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
      setIsMoving(true);
      setRestTime(MOVE_SECONDS);
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
  };

  const skipWorkout = () => {
    setShowSkipConfirm(false);

    if (workoutIndex < WORKOUTS.length - 1) {
      setWorkoutIndex(workoutIndex + 1);
      resetSets();
    }
  };

  const nextWorkout = () => {
    if (workoutIndex < WORKOUTS.length - 1) {
      setWorkoutIndex(workoutIndex + 1);
      resetSets();
    } else {
      setIsMoving(false);
      setRestTime(0);
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
      setHoldTime(0);
      return;
    }

    const timer = setInterval(() => {
      setHoldTime((prev) => {
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

  const totalSets = WORKOUTS.length * TOTAL_SETS;
  const completedCount =
    workoutIndex * TOTAL_SETS + completedSets.filter(Boolean).length;
  const workoutPercent = Math.floor((completedCount / totalSets) * 100);

  const workoutComplete =
    workoutIndex === WORKOUTS.length - 1 && currentSet > TOTAL_SETS;

  const holdProgress = Math.min((holdTime / 2) * 100, 100);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      {showTimerPopup && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center w-72">
            <p className="text-xl font-bold text-[#15803D] mb-2">
              {isResting ? "Rest" : "Next Workout"}
            </p>
            <p className="text-5xl font-extrabold text-gray-800 mb-2">
              {restTime}s
            </p>
            <p className="text-gray-500 text-sm">
              {isResting ? "Recover and breathe" : "Get ready"}
            </p>
          </div>
        </div>
      )}

      {showSkipConfirm && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-72 text-center">
            <p className="text-lg font-semibold mb-2">Skip workout?</p>
            <p className="text-gray-500 text-sm mb-4">
              Are you sure you want to skip this workout?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSkipConfirm(false)}
                className="flex-1 py-2 rounded-xl border border-gray-300 text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={skipWorkout}
                className="flex-1 py-2 rounded-xl bg-red-500 text-white"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold mb-1 text-[#15803D]">
          {WORKOUTS[workoutIndex]}
        </h1>
        <p className="text-gray-500 mb-4">
          Workout {workoutIndex + 1} of {WORKOUTS.length}
        </p>

        <p className="text-gray-600 mb-4">
          Set {Math.min(currentSet, TOTAL_SETS)} of {TOTAL_SETS}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
          <div
            className="h-4 transition-all"
            style={{
              width: `${workoutPercent}%`,
              backgroundColor: "#15803D",
            }}
          />
        </div>
        <p className="text-gray-500 mb-6">{workoutPercent}% Complete</p>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {completedSets.map((done, index) => (
            <div
              key={index}
              className={`h-14 rounded-xl flex items-center justify-center font-bold text-lg ${
                done
                  ? "bg-[#15803D] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {!showTimerPopup && currentSet <= TOTAL_SETS && (
          <button
            onClick={completeSet}
            className="w-full py-3 rounded-2xl bg-[#15803D] text-white font-semibold text-lg active:scale-95 transition"
          >
            Complete Set
          </button>
        )}

        {workoutComplete && (
          <p className="text-[#15803D] font-semibold mt-2">
            All workouts complete 💪
          </p>
        )}

        <div className="flex gap-3 mt-8">
          <button
            disabled={showTimerPopup}
            onClick={() => setShowSkipConfirm(true)}
            className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-500 disabled:opacity-40"
          >
            Skip
          </button>

          <button
            onMouseDown={() => setHoldingReset(true)}
            onMouseUp={() => setHoldingReset(false)}
            onMouseLeave={() => setHoldingReset(false)}
            onTouchStart={() => setHoldingReset(true)}
            onTouchEnd={() => setHoldingReset(false)}
            className="relative flex-1 py-3 rounded-xl text-sm border border-gray-200 text-gray-400 overflow-hidden"
          >
            {holdingReset && (
              <div
                className="absolute inset-0 bg-red-500/20"
                style={{ width: `${holdProgress}%` }}
              />
            )}
            <span className="relative z-10">
              {holdingReset ? "Hold to Reset…" : "Reset All"}
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
