import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Flame, CalendarDays } from "lucide-react";
import GlassCard from "../components/GlassCard";
import axios from "axios";
import { toast } from "sonner";
import { getOrCreateUser } from "../utils/device";

function MetricCard({ title, value, sub, icon: Icon }) {
    return (
        <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-3">
                <div className="text-lg font-medium text-white/90">{title}</div>
                <Icon className="h-4 w-4 text-white/50" />
            </div>
            <div className="mt-7 text-6xl font-light">{value}</div>
            <div className="mt-2 text-sm text-white/45">{sub}</div>
        </GlassCard>
    );
}

export default function ProgressPage({ t, lang }) {
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [sessions, setSessions] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [last7Days, setLast7Days] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProgress() {
            try {
                const user = await getOrCreateUser();

                const response = await axios.get(`/api/progress/${user.user_id}`);

                setTotalMinutes(response.data.totalMinutes || 0);
                setSessions(response.data.sessions || 0);
                setStreak(response.data.streak || 0);
                setBestStreak(response.data.bestStreak || 0);
                setLast7Days(response.data.last7Days || [0, 0, 0, 0, 0, 0, 0]);
            } catch (error) {
                console.error("Error loading progress:", error.response?.data || error.message);
                toast.error(t.progress.errorLoad);
            } finally {
                setLoading(false);
            }
        }

        fetchProgress();
    }, [t]);

    const max = Math.max(...last7Days, 30);

    const dayLabels = last7Days.map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
            weekday: "short",
        });
    });

    const milestone =
        sessions === 0
            ? t.progress.milestoneReady
            : sessions < 5
                ? t.progress.milestoneMomentum
                : t.progress.milestoneConsistency;

    if (loading) {
        return (
            <div className="px-6 pb-20 pt-0 text-white">
                <div className="mx-auto max-w-5xl bg-[#505081] px-6 pb-12 pt-10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:px-8">
                    {t.progress.loading}
                </div>
            </div>
        );
    }

    return (
        <div className="px-6 pb-20 pt-0 text-white">
            <div className="mx-auto max-w-5xl bg-[#505081] px-6 pb-12 pt-10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:px-8">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                    <div>
                        <div className="text-4xl font-semibold tracking-tight md:text-5xl">
                            {t.progress.title}
                        </div>
                        <p className="mt-4 text-base text-white/50">
                            {t.progress.subtitle}
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-4">
                        <MetricCard
                            title={t.progress.totalSessions}
                            value={sessions}
                            sub={`${totalMinutes} ${t.progress.minutesStudied}`}
                            icon={CalendarDays}
                        />
                        <MetricCard
                            title={t.progress.currentStreak}
                            value={streak}
                            sub={t.progress.daysInRow}
                            icon={Flame}
                        />
                        <MetricCard
                            title={t.progress.bestStreak}
                            value={bestStreak}
                            sub={t.progress.personalRecord}
                            icon={Trophy}
                        />
                        <div className="rounded-xl bg-[#6b6b96] p-6 text-white shadow-[0_16px_40px_rgba(18,18,60,0.18)]">
                            <div className="text-lg font-medium text-white/90">
                                {t.progress.milestone}
                            </div>
                            <div className="mt-6 text-lg font-medium leading-tight text-white md:text-xl">
                                {milestone}
                            </div>
                        </div>
                    </div>

                    <GlassCard className="mt-6 p-6">
                        <div className="text-2xl font-medium">{t.progress.last7Days}</div>
                        <div className="mt-2 text-white/50">{t.progress.dailyMinutes}</div>

                        <div className="mt-8 h-[320px] rounded-xl border border-white/10 bg-[#272757] p-6">
                            {last7Days.every((v) => v === 0) ? (
                                <div className="flex h-full flex-col items-center justify-center text-center text-white/40">
                                    <CalendarDays className="h-12 w-12" />
                                    <div className="mt-4 text-2xl">{t.progress.noSessions}</div>
                                    <div className="mt-2 text-base">
                                        {t.progress.completeToSee}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex h-full items-end gap-4">
                                    {last7Days.map((value, i) => {
                                        const heightPercent =
                                            value === 0 ? 12 : Math.max((value / max) * 100, 22);

                                        return (
                                            <div key={i} className="flex flex-1 flex-col items-center gap-3">
                                                <div className="text-sm font-medium text-white/55">
                                                    {value}m
                                                </div>

                                                <div className="flex h-[220px] w-full items-end rounded-2xl bg-white/5 p-2">
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0.7 }}
                                                        animate={{
                                                            height: `${heightPercent}%`,
                                                            opacity: 1,
                                                        }}
                                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                                        title={`${value} ${t.progress.minutes}`}
                                                        className={`w-full rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.18)] ${
                                                            value === 0
                                                                ? "bg-white/20"
                                                                : "bg-gradient-to-t from-[#8f95d8] via-[#a8ace6] to-[#d6d8ff]"
                                                        }`}
                                                    />
                                                </div>

                                                <div className="text-sm font-medium text-white/55">
                                                    {dayLabels[i]}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </GlassCard>

                    <GlassCard className="mt-6 p-6">
                        <div className="text-2xl font-medium">{t.progress.keepGoing}</div>
                        <div className="mt-3 text-white/55">
                            {sessions === 0
                                ? t.progress.firstSessionMsg
                                : t.progress.keepGoingMsg}
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
}