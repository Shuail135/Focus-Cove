import React, { useEffect, useState, useRef } from "react";
import { Play, RotateCcw, Settings } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { toast } from 'sonner';
import axios from "axios";
import { getOrCreateUser } from "../utils/device";

const tips = [
    "Find a quiet, comfortable space",
    "Silence notifications",
    "Stay hydrated",
    "Stretch during breaks",
];

export default function StudyPage({ onCompleteSession }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [focusMinutes, setFocusMinutes] = useState("25");
    const [breakMinutes, setBreakMinutes] = useState("5");
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("focus"); // the mode setting
    const modeRef = useRef("focus"); // to keep track of the mode in the interval callback
    const hasSavedRef = useRef(false); // for preventing double save
    const [userId, setUserId] = useState(null);
    const userIdRef = useRef(null);
    const [todaySessions, setTodaySessions] = useState(0);

    // keeps moderef in sync with the mode state
    useEffect(() => {
        modeRef.current = mode;
    }, [mode]);

    async function fetchTodaySessions(currentUserId) {
        try {
            const response = await axios.get(`/api/sessions/today/${currentUserId}`);
            setTodaySessions(response.data.total_sessions || 0);
        } catch (error) {
            console.error("Error fetching today's sessions:", error.response?.data || error.message);
            toast.error("Failed to load today's sessions");
        }
    }

    // fetch user on page reload
    useEffect(() => {
        async function initUser() {
            try {
                const user = await getOrCreateUser();
                console.log("Fetched user from backend:", user);

                setUserId(user.user_id);
                userIdRef.current = user.user_id;

                await fetchTodaySessions(user.user_id);
            } catch (error) {
                console.error("User init error:", error.response?.data || error.message);
                toast.error("Failed to load user");
            }
        }

        initUser();
    }, []);


    const focusValue = Math.max(1, Math.floor(Number(focusMinutes) || 25));
    const breakValue = Math.max(1, Math.floor(Number(breakMinutes) || 5));

    // timer logic
    useEffect(() => {
        if (!isRunning) return;

        const id = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    setIsRunning(false);

                    if (modeRef.current === "focus") {
                        if (!hasSavedRef.current) {
                            hasSavedRef.current = true;
                            toast.success("Focus session complete! Time for a break 🎉");

                            saveSession(focusValue).then((saved) => {
                                if (saved) {
                                    onCompleteSession?.(focusValue);
                                }
                            });
                        }

                        setMode("break");
                        setSecondsLeft(breakValue * 60);
                    } else {
                        toast.success("Break's over! Ready to focus again? 💪");
                        setMode("focus");
                        setSecondsLeft(focusValue * 60);
                    }

                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }, [isRunning, focusValue, breakValue, onCompleteSession, userId]);


    //SQL save Session
    async function saveSession(minutes) {
        try {
            const currentUserId = userIdRef.current || userId;

            if (!currentUserId) {
                toast.error("User not ready yet");
                return false;
            }

            await axios.post(`/api/sessions`, {
                user_id: currentUserId,
                duration_minutes: Number(minutes),
            });

            await fetchTodaySessions(currentUserId);

            console.log("Session saved to database");
            return true;
        } catch (error) {
            console.error("Error saving session:", error.response?.data || error.message);
            toast.error("Failed to save session");
            return false;
        }
    }

    //apply new settings from the modal
    function saveSettings() {
        const focus = Math.max(1, Math.floor(Number(focusMinutes) || 25));
        const brk = Math.max(1, Math.floor(Number(breakMinutes) || 5));

        setFocusMinutes(String(focus));
        setBreakMinutes(String(brk));
        setSecondsLeft(modeRef.current === "focus" ? focus * 60 : brk * 60);

        setIsRunning(false);
        hasSavedRef.current = false;
        setModalOpen(false);
    }

    //padding the numbers to always show 2 digits
    const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const secs = String(secondsLeft % 60).padStart(2, "0");

    const totalSeconds = mode === "focus" ? focusValue * 60 : breakValue * 60;
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
                                    disabled={!userId}
                                    onClick={() => {
                                        if (!userIdRef.current && !userId) {
                                            toast.error("Still loading user...");
                                            return;
                                        }

                                        if (!isRunning && mode === "focus") {
                                            hasSavedRef.current = false;
                                        }

                                        setIsRunning((v) => !v);
                                    }}
                                    className={`flex min-w-[100px] items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                                        !userId
                                            ? "bg-gray-400 cursor-not-allowed text-white/70"
                                            : "bg-[#a5a8d3] text-[#252760] hover:brightness-105"
                                    }`}
                                >
                                    <Play className="h-4 w-4" />
                                    {isRunning ? "Pause" : "Start"}
                                </button>

                                <button
                                    onClick={() => {
                                        setIsRunning(false);
                                        hasSavedRef.current = false;
                                        setSecondsLeft(modeRef.current === "focus" ? focusValue * 60 : breakValue * 60);
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
                                    {todaySessions}
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
                                step="1"
                                max="60"
                                value={focusMinutes}
                                onChange={(e) => setFocusMinutes(e.target.value)}
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
                                onChange={(e) => setBreakMinutes(e.target.value)}
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