import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Background from "./components/Background.jsx";
import LandingPage from "./pages/LandingPage";
import StudyPage from "./pages/StudyPage";
import ProgressPage from "./pages/ProgressPage";
import WellnessPage from "./pages/WellnessPage";

export default function App() {
    const [page, setPage] = useState("home");
    const [sessions, setSessions] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [last7Days, setLast7Days] = useState([0, 0, 0, 0, 0, 0, 0]);

    const completeSession = (minutes) => {
        setSessions((s) => s + 1);
        setTotalMinutes((m) => m + minutes);
        setStreak((prev) => {
            const next = prev + 1;
            setBestStreak((b) => Math.max(b, next));
            return next;
        });
        setLast7Days((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] += minutes;
            return copy;
        });
    };

    return (
        <div className="min-h-screen bg-[#111] text-white">
            <div className="relative min-h-screen overflow-hidden">
                <Background />
                <div className="absolute inset-0 bg-[#3f4588]/25" />

                <div className="relative z-10 min-h-screen">
                    <Navbar current={page} setCurrent={setPage} />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={page}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.24 }}
                        >
                            {page === "home" && <LandingPage goTo={setPage} />}
                            {page === "study" && (
                                <StudyPage sessions={sessions} onCompleteSession={completeSession} />
                            )}
                            {page === "progress" && (
                                <ProgressPage
                                    totalMinutes={totalMinutes}
                                    sessions={sessions}
                                    streak={streak}
                                    bestStreak={bestStreak}
                                    last7Days={last7Days}
                                />
                            )}
                            {page === "wellness" && <WellnessPage />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}