import React, { useEffect, useState, useRef } from "react";
import { Play, RotateCcw, Settings } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { toast } from "sonner";
import axios from "axios";
import { getOrCreateUser } from "../utils/device";

export default function StudyPage({ onCompleteSession, t }) {
    const tips = t.study.tips;

    const [modalOpen, setModalOpen] = useState(false);
    const [focusMinutes, setFocusMinutes] = useState("25");
    const [breakMinutes, setBreakMinutes] = useState("5");
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("focus");
    const modeRef = useRef("focus");
    const hasSavedRef = useRef(false);
    const [userId, setUserId] = useState(null);
    const userIdRef = useRef(null);
    const [todaySessions, setTodaySessions] = useState(0);

    useEffect(() => {
        modeRef.current = mode;
    }, [mode]);

    async function fetchTodaySessions(currentUserId) {
        try {
            const response = await axios.get(`/api/sessions/today/${currentUserId}`);
            setTodaySessions(response.data.total_sessions || 0);
        } catch (error) {
            console.error("Error fetching today's sessions:", error.response?.data || error.message);
            toast.error(t.study.errorLoadTodaySessions);
        }
    }

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
                toast.error(t.study.errorLoadUser);
            }
        }

        initUser();
    }, [t]);

    const focusValue = Math.max(1, Math.floor(Number(focusMinutes) || 25));
    const breakValue = Math.max(1, Math.floor(Number(breakMinutes) || 5));

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
                            toast.success(t.study.focusComplete);

                            saveSession(focusValue).then((saved) => {
                                if (saved) {
                                    onCompleteSession?.(focusValue);
                                }
                            });
                        }

                        setMode("break");
                        setSecondsLeft(breakValue * 60);
                    } else {
                        toast.success(t.study.breakComplete);
                        setMode("focus");
                        setSecondsLeft(focusValue * 60);
                    }

                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }, [isRunning, focusValue, breakValue, onCompleteSession, t]);

    async function saveSession(minutes) {
        try {
            const currentUserId = userIdRef.current || userId;

            if (!currentUserId) {
                toast.error(t.study.errorUserNotReady);
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
            toast.error(t.study.errorSaveSession);
            return false;
        }
    }

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

    const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const secs = String(secondsLeft % 60).padStart(2, "0");

    const totalSeconds = mode === "focus" ? focusValue * 60 : breakValue * 60;
    const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

    return (
        <div className="min-h-screen bg-[#505081] px-6 pb-20 pt-10 text-white">
            <div className="mx-auto max-w-5xl">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="text-center">
                        <div className="text-4xl font-semibold tracking-tight md:text-5xl">
                            {t.study.title}
                        </div>
                        <p className="mt-4 text-base text-white/50">
                            {t.study.subtitle}
                        </p>
                    </div>

                    <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-[1.5fr_0.8fr]">
                        <GlassCard className="bg-[#2c2f73] p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="text-2xl font-medium">
                                        {mode === "focus" ? t.study.focusTime : t.study.breakTime}
                                    </div>
                                    <div className="mt-2 text-sm text-white/55">
                                        {mode === "focus" ? t.study.focusDesc : t.study.breakDesc}
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
                                                {mode === "focus" ? t.study.focusMode : t.study.breakMode}
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
                                            toast.error(t.study.errorStillLoadingUser);
                                            return;
                                        }

                                        if (!isRunning && mode === "focus") {
                                            hasSavedRef.current = false;
                                        }

                                        setIsRunning((v) => !v);
                                    }}
                                    className={`flex min-w-[100px] items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                                        !userId
                                            ? "cursor-not-allowed bg-gray-400 text-white/70"
                                            : "bg-[#a5a8d3] text-[#252760] hover:brightness-105"
                                    }`}
                                >
                                    <Play className="h-4 w-4" />
                                    {isRunning ? t.study.pause : t.study.start}
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
                                    {t.study.reset}
                                </button>
                            </div>
                        </GlassCard>

                        <div className="space-y-5">
                            <GlassCard className="bg-[#2c2f73] p-6">
                                <div className="text-xl font-medium">{t.study.todaySessions}</div>
                                <div className="mt-6 text-center text-5xl font-light">
                                    {todaySessions}
                                </div>
                                <div className="mt-2 text-center text-sm text-white/50">
                                    {t.study.completedSessions}
                                </div>
                            </GlassCard>

                            <GlassCard className="bg-[#2c2f73] p-6">
                                <div className="text-xl font-medium">{t.study.quickTips}</div>
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

            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="flex w-72 flex-col gap-5 rounded-2xl bg-[#2c2f73] p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-white">{t.study.settings}</span>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-white/40 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-white/60">{t.study.focusLabel}</label>
                            <input
                                type="number"
                                min="1"
                                step="1"
                                max="60"
                                value={focusMinutes}
                                onChange={(e) => setFocusMinutes(e.target.value)}
                                className="rounded-lg bg-white/10 px-3 py-2 text-white outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-white/60">{t.study.breakLabel}</label>
                            <input
                                type="number"
                                min="1"
                                max="30"
                                value={breakMinutes}
                                onChange={(e) => setBreakMinutes(e.target.value)}
                                className="rounded-lg bg-white/10 px-3 py-2 text-white outline-none"
                            />
                        </div>

                        <button
                            onClick={saveSettings}
                            className="rounded-xl bg-[#a5a8d3] py-2 font-medium text-[#252760] hover:brightness-105"
                        >
                            {t.study.save}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}