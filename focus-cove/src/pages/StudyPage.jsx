import React, { useEffect, useState, useRef } from "react";
import { Play, RotateCcw, Settings } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { toast } from 'sonner';


const tips = [
    "Find a quiet, comfortable space",
    "Silence notifications",
    "Stay hydrated",
    "Stretch during breaks",
];

export default function StudyPage({ sessions, onCompleteSession }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [focusMinutes, setFocusMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("focus"); // the mode setting
    const modeRef = useRef("focus"); // to keep track of the mode in the interval callback

    // keeps moderef in sync with the mode state
    useEffect(() => {
        modeRef.current = mode;
    }, [mode]);


    // timer logic 
    useEffect(() => {
        if (!isRunning) return;

        const id = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    setIsRunning(false);
                    if (modeRef.current === "focus") {
                        toast.success("Focus session complete! Time for a break 🎉");
                        saveSession(25);
                        onCompleteSession?.(focusMinutes);
                        setMode("break");
                        setSecondsLeft(breakMinutes * 60); // switch to break
                    } 
                    else {
                        toast.success("Break's over! Ready to focus again? 💪");
                        setMode("focus");
                        setSecondsLeft(focusMinutes * 60); // switch back to focus
                        }
                        return 0;
                    }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }, [isRunning, focusMinutes, breakMinutes]);

    //saving the session to the local storage for now
    //implement database next lab
    function saveSession(minutes) { 
        const saved = JSON.parse(localStorage.getItem("sessions") || "[]");
        saved.push({
            date : new Date().toISOString().split("T")[0],
            minutes,
            completed: true,
        });
        localStorage.setItem("sessions", JSON.stringify(saved));
    }

    //apply new settings from the modal
    function saveSettings() {
        setSecondsLeft(modeRef.current === "focus" ? focusMinutes * 60 : breakMinutes * 60);
        setIsRunning(false);
        setModalOpen(false);
    }
    
    //padding the numbers to always show 2 digits
    const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const secs = String(secondsLeft % 60).padStart(2, "0");

    const totalSeconds = mode === "focus" ? focusMinutes * 60 : breakMinutes * 60;
    const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

    return (
        <div className="min-h-screen bg-[#505081] px-6 pb-20 pt-10 text-white">
            <div className="mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                            Study Timer
                        </div>
                        <p className="mt-4 text-base text-white/50">
                            Stay focused with the Pomodoro technique
                        </p>
                    </div>

                    <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-[1.5fr_0.8fr]">
                        <GlassCard className="p-6 bg-[#2c2f73]">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    {/*display and description change based on what mode the user is in */}
                                     <div className="text-2xl font-medium">
                                        {mode === "focus" ? "Focus Time 📚" : "Break Time ☕"}
                                    </div>
                                    <div className="mt-2 text-sm text-white/55">
                                        {mode === "focus"
                                            ? "Stay focused and avoid distractions"
                                            : "Relax and recharge your mind"}
                                    </div>
                                </div>

                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white/80">
                                <button onClick={() => setModalOpen(true)}>
                                    <Settings className="h-4 w-4" />
                                </button>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <div
                                    className="relative grid h-64 w-64 place-items-center rounded-full"
                                    style={{
                                        background: `conic-gradient(#FFFFFF ${progress}%, rgba(255,255,255,0.12) ${progress}% 100%)`,
                                    }}
                                >
                                    <div className="grid h-[156px] w-[156px] place-items-center rounded-full bg-[#2c2f73] shadow-inner">
                                        <div className="text-center">
                                            <div className="font-mono text-5xl tracking-wider">
                                                {mins}:{secs}
                                            </div>
                                            <div className="mt-2 text-xs text-white/45">
                                                {mode === "focus" ? "Focus Mode" : "Break Mode"} 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-4">
                                <button
                                    onClick={() => setIsRunning((v) => !v)}
                                    className="flex min-w-[100px] items-center justify-center gap-2 rounded-xl bg-[#a5a8d3] px-4 py-2 text-sm font-medium text-[#252760] transition hover:brightness-105"
                                >
                                    <Play className="h-4 w-4" />
                                    {isRunning ? "Pause" : "Start"}
                                </button>

                                <button
                                    onClick={() => {
                                        setIsRunning(false);
                                        setSecondsLeft(modeRef.current === "focus" ? focusMinutes * 60 : breakMinutes * 60);
                                    }}
                                    className="flex min-w-[100px] items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                    Reset
                                </button>
                            </div>
                        </GlassCard>

                        <div className="space-y-5">
                            <GlassCard className="p-6 bg-[#2c2f73]">
                                <div className="text-xl font-medium">Today's Sessions</div>
                                <div className="mt-6 text-center text-5xl font-light">
                                    {sessions}
                                </div>
                                <div className="mt-2 text-center text-sm text-white/50">
                                    Completed focus sessions
                                </div>
                            </GlassCard>

                            <GlassCard className="p-6 bg-[#2c2f73]">
                                <div className="text-xl font-medium">Quick Tips</div>
                                <ul className="mt-4 space-y-2 text-sm text-white/60">
                                    {tips.map((tip) => (
                                        <li key={tip} className="flex gap-3 leading-6">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* Settings Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-[#2c2f73] rounded-2xl p-6 w-72 flex flex-col gap-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-white font-medium">Timer Settings</span>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-white/40 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
 
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-white/60">Focus (minutes)</label>
                            <input
                                type="number"
                                min="1"
                                max="60"
                                value={focusMinutes}
                                onChange={(e) => setFocusMinutes(parseInt(e.target.value) || 25)}
                                className="bg-white/10 text-white rounded-lg px-3 py-2 outline-none"
                            />
                        </div>
 
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-white/60">Break (minutes)</label>
                            <input
                                type="number"
                                min="1"
                                max="30"
                                value={breakMinutes}
                                onChange={(e) => setBreakMinutes(parseInt(e.target.value) || 5)}
                                className="bg-white/10 text-white rounded-lg px-3 py-2 outline-none"
                            />
                        </div>
 
                        <button
                            onClick={saveSettings}
                            className="bg-[#a5a8d3] text-[#252760] font-medium rounded-xl py-2 hover:brightness-105"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}