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
];

const TOTAL_SETS = 4;
const REST_SECONDS = 45; // Rest between sets

export default function WorkoutPage() {
  const [workoutIndex, setWorkoutIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState<boolean[]>(
    Array(TOTAL_SETS).fill(false)
  );
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);

  const completeSet = () => {
    if (currentSet > TOTAL_SETS) return;

    const updated = [...completedSets];
    updated[currentSet - 1] = true;
    setCompletedSets(updated);

    if (currentSet < TOTAL_SETS) {
      setIsResting(true);
      setRestTime(REST_SECONDS);
    } else {
      // last set completed, move to next workout automatically after short delay
      setTimeout(() => nextWorkout(), 1000);
    }

    setCurrentSet(currentSet + 1);
  };

  const nextWorkout = () => {
    if (workoutIndex < WORKOUTS.length - 1) {
      setWorkoutIndex(workoutIndex + 1);
      resetSets();
    }
  };

  const resetSets = () => {
    setCurrentSet(1);
    setCompletedSets(Array(TOTAL_SETS).fill(false));
    setIsResting(false);
    setRestTime(0);
  };

  const resetAll = () => {
    setWorkoutIndex(0);
    resetSets();
  };

  // Rest timer
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

  const workoutComplete =
    workoutIndex === WORKOUTS.length - 1 && currentSet > TOTAL_SETS;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg p-6 text-center">
        {/* Workout Title */}
        <h1 className="text-2xl font-bold mb-1 text-[#15803D]">
          {WORKOUTS[workoutIndex]}
        </h1>
        <p className="text-gray-500 mb-4">
          Workout {workoutIndex + 1} of {WORKOUTS.length}
        </p>

        {/* Set Info */}
        <p className="text-gray-600 mb-4">
          Set {Math.min(currentSet, TOTAL_SETS)} of {TOTAL_SETS}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
          <div
            className="h-4 transition-all"
            style={{
              width: `${(completedSets.filter(Boolean).length / TOTAL_SETS) *
                100}%`,
              backgroundColor: "#15803D",
            }}
          ></div>
        </div>

        {/* Set Boxes */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {completedSets.map((done, index) => (
            <div
              key={index}
              className={`h-14 rounded-xl flex items-center justify-center font-bold text-lg
                ${done ? "bg-[#15803D] text-white" : "bg-gray-200 text-gray-500"}`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {/* Rest / Complete Set Button */}
        {isResting ? (
          <p className="text-[#15803D] font-semibold mb-4">
            Rest: {restTime}s
          </p>
        ) : currentSet <= TOTAL_SETS ? (
          <button
            onClick={completeSet}
            className="w-full py-3 rounded-2xl bg-[#15803D] text-white font-semibold text-lg active:scale-95 transition"
          >
            Complete Set
          </button>
        ) : workoutIndex < WORKOUTS.length - 1 ? (
          <p className="text-[#15803D] font-semibold">
            Moving to next workout...
          </p>
        ) : (
          <p className="text-[#15803D] font-semibold">All workouts complete 💪</p>
        )}

        {/* Reset Button */}
        <button
          onClick={resetAll}
          className="w-full mt-4 py-2 rounded-2xl border border-[#15803D] text-[#15803D] font-medium"
        >
          Reset All
        </button>
      </div>
    </main>
  );
}
