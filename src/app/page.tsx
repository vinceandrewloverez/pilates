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
const MOVE_SECONDS = 45; // Moving to next workout

export default function WorkoutPage() {
  const [workoutIndex, setWorkoutIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState<boolean[]>(
    Array(TOTAL_SETS).fill(false)
  );
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

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

  const nextWorkout = () => {
    if (workoutIndex < WORKOUTS.length - 1) {
      setWorkoutIndex(workoutIndex + 1);
      resetSets();
    } else {
      setIsMoving(false);
      setRestTime(0);
    }
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

  // Timer for Rest or Moving
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

  // Overall workout progress
  const totalSets = WORKOUTS.length * TOTAL_SETS;
  const completedCount =
    workoutIndex * TOTAL_SETS + completedSets.filter(Boolean).length;
  const workoutPercent = Math.floor((completedCount / totalSets) * 100);

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

        {/* Overall Workout Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
          <div
            className="h-4 transition-all"
            style={{
              width: `${workoutPercent}%`,
              backgroundColor: "#15803D",
            }}
          ></div>
        </div>
        <p className="text-gray-500 mb-6">{workoutPercent}% Complete</p>

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

        {/* Rest / Moving / Complete Set Button */}
        {isResting ? (
          <p className="text-[#15803D] font-semibold mb-4">
            Rest: {restTime}s
          </p>
        ) : isMoving ? (
          <p className="text-[#15803D] font-semibold mb-4">
            Moving to next workout: {restTime}s
          </p>
        ) : currentSet <= TOTAL_SETS ? (
          <button
            onClick={completeSet}
            className="w-full py-3 rounded-2xl bg-[#15803D] text-white font-semibold text-lg active:scale-95 transition"
          >
            Complete Set
          </button>
        ) : workoutComplete ? (
          <p className="text-[#15803D] font-semibold">All workouts complete 💪</p>
        ) : null}

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
