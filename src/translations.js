const translations = {
    en: {
        nav: {
            home: "Home",
            study: "Study",
            progress: "Progress",
            wellness: "Wellness",
        },
        landing: {
            heroTitle: "✧ Welcome to Focus Cove ✧",
            heroDesc:
                "Your cozy corner for productive studying and mindful breaks. Manage your workload, track your progress, and take care of your wellbeing—all in one peaceful place.",
            cards: {
                study: {
                    title: "Study Timer",
                    desc: "Use the Pomodoro technique to stay focused with customizable work and break intervals.",
                    action: "Start Studying",
                },
                progress: {
                    title: "Track Progress",
                    desc: "Visualize your study sessions and celebrate your achievements along the way.",
                    action: "View Progress",
                },
                wellness: {
                    title: "Wellness Hub",
                    desc: "Find tips and resources to manage stress and beat procrastination effectively.",
                    action: "Explore Wellness",
                },
            },
            reminderTitle: "Daily Reminder",
            reminderText:
                "Progress, not perfection. Every study session counts, no matter how small. Take breaks, stay hydrated, and remember to be kind to yourself. 🌿",
        },
        progress: {
            loading: "Loading progress...",
            errorLoad: "Failed to load progress",

            title: "Your Progress",
            subtitle: "Track your study journey and celebrate your wins",

            totalSessions: "Total Sessions",
            minutesStudied: "minutes studied",

            currentStreak: "Current Streak",
            daysInRow: "days in a row",

            bestStreak: "Best Streak",
            personalRecord: "personal record",

            milestone: "Milestone",
            milestoneReady: "Ready to Begin! 👋",
            milestoneMomentum: "Building Momentum ✨",
            milestoneConsistency: "Consistency in Motion 🌟",

            last7Days: "Last 7 Days",
            dailyMinutes: "Your daily study time in minutes",
            minutes: "minutes",

            noSessions: "No study sessions yet",
            completeToSee: "Complete a focus session to see your progress!",

            keepGoing: "Keep Going! 🌟",
            firstSessionMsg:
                "Start your first study session to begin tracking your progress. Remember, every expert was once a beginner!",
            keepGoingMsg:
                "You are building a rhythm. Keep showing up, even on low-energy days. Small sessions still count.",
        },
        study: {
            title: "Study Timer",
            subtitle: "Stay focused with the Pomodoro technique",

            focusTime: "Focus Time 📚",
            breakTime: "Break Time ☕",
            focusDesc: "Stay focused and avoid distractions",
            breakDesc: "Relax and recharge your mind",
            focusMode: "Focus Mode",
            breakMode: "Break Mode",

            start: "Start",
            pause: "Pause",
            reset: "Reset",

            todaySessions: "Today's Sessions",
            completedSessions: "Completed focus sessions",
            quickTips: "Quick Tips",

            settings: "Timer Settings",
            focusLabel: "Focus (minutes)",
            breakLabel: "Break (minutes)",
            save: "Save",

            focusComplete: "Focus session complete! Time for a break 🎉",
            breakComplete: "Break's over! Ready to focus again? 💪",

            errorLoadTodaySessions: "Failed to load today's sessions",
            errorLoadUser: "Failed to load user",
            errorUserNotReady: "User not ready yet",
            errorStillLoadingUser: "Still loading user...",
            errorSaveSession: "Failed to save session",

            tips: [
                "Find a quiet, comfortable space",
                "Silence notifications",
                "Stay hydrated",
                "Stretch during breaks",
            ],
        },
        wellness: {
            title: "Wellness Hub",
            subtitle: "Take care of your mind and body while you study",

            stressTab: "Stress Management",
            procrastinationTab: "Beat Procrastination",

            stressTitle: "Managing Academic Stress",
            procrastinationTitle: "Beating Procrastination",

            stressDesc: "Practical strategies to stay calm and focused during demanding times",
            procrastinationDesc: "Gentle ways to start tasks, reduce overwhelm, and build momentum",

            featureCards: {
                meditation: {
                    title: "5-Minute Meditation",
                    body: "Sit comfortably, close your eyes, and focus on your breath. When your mind wanders, gently bring it back. Even 5 minutes can help clear mental fog.",
                },
                gratitude: {
                    title: "Gratitude Journaling",
                    body: "Write down 3 things you're grateful for each day. This simple practice can shift your mindset and reduce anxiety.",
                },
                mindfulBreaks: {
                    title: "Mindful Breaks",
                    body: "During breaks, fully disconnect from studying. Go for a walk, make tea, or do gentle stretches. Be present in the moment.",
                },
            },

            stressItems: {
                breathing: {
                    title: "Practice Deep Breathing",
                    body: "Inhale for four seconds, hold briefly, and exhale slowly. A few calm cycles can help reset your focus before returning to work.",
                },
                breaks: {
                    title: "Take Regular Breaks",
                    body: "Short pauses protect your concentration. Step away from the screen, loosen your shoulders, and let your mind reset.",
                },
                hydration: {
                    title: "Stay Hydrated",
                    body: "Keep water nearby during study sessions. Dehydration can quietly worsen fatigue, headaches, and reduced concentration.",
                },
                sleep: {
                    title: "Get Quality Sleep",
                    body: "Sleep is part of studying, not a reward after it. Better rest supports memory, emotional balance, and steadier performance.",
                },
                exercise: {
                    title: "Exercise Regularly",
                    body: "Even a short walk or stretch can improve energy and mood. Movement helps break the cycle of tension and procrastination.",
                },
            },

            procrastinationItems: {
                smallSteps: {
                    title: "Break Large Tasks into Small Steps",
                    body: "Large tasks feel overwhelming. Break them down into 5-10 minute chunks. Starting is often the hardest part!",
                },
                twoMinuteRule: {
                    title: "Use the 2-Minute Rule",
                    body: "If a task takes less than 2 minutes, do it immediately. This builds momentum and reduces your mental load.",
                },
                distractions: {
                    title: "Eliminate Distractions",
                    body: "Put your phone in another room, use website blockers, or study in a quiet space. Make it easy to focus.",
                },
                intentions: {
                    title: "Set Clear Intentions",
                    body: "Before each study session, write down exactly what you want to accomplish. Specific goals are more motivating.",
                },
                reward: {
                    title: "Reward Yourself",
                    body: "After completing a task, give yourself a small reward. This creates positive associations with productivity.",
                },
            },

            rememberTitle: "Remember",
            rememberText:
                "Your worth isn't defined by your grades or productivity. Taking care of yourself isn't selfish—it's essential for sustainable success.",

            notAloneTitle: "You're Not Alone",
            notAloneText:
                "Every student faces challenges. If you're struggling, reach out to friends or support services.",
        },
    },

    fr: {
        nav: {
            home: "Accueil",
            study: "Étude",
            progress: "Progrès",
            wellness: "Bien-être",
        },
        landing: {
            heroTitle: "✧ Bienvenue à Focus Cove ✧",
            heroDesc:
                "Votre coin chaleureux pour étudier efficacement et faire des pauses en pleine conscience. Gérez votre charge de travail, suivez vos progrès et prenez soin de votre bien-être, le tout dans un espace paisible.",
            cards: {
                study: {
                    title: "Minuteur d’étude",
                    desc: "Utilisez la technique Pomodoro pour rester concentré avec des périodes de travail et de pause personnalisables.",
                    action: "Commencer à étudier",
                },
                progress: {
                    title: "Suivre les progrès",
                    desc: "Visualisez vos sessions d’étude et célébrez vos réussites au fil du temps.",
                    action: "Voir les progrès",
                },
                wellness: {
                    title: "Espace bien-être",
                    desc: "Trouvez des conseils et des ressources pour gérer le stress et vaincre la procrastination efficacement.",
                    action: "Explorer le bien-être",
                },
            },
            reminderTitle: "Rappel du jour",
            reminderText:
                "Le progrès, pas la perfection. Chaque session d’étude compte, même la plus petite. Faites des pauses, hydratez-vous et souvenez-vous d’être bienveillant envers vous-même. 🌿",
        },
        progress: {
            loading: "Chargement des progrès...",
            errorLoad: "Échec du chargement des progrès",

            title: "Vos progrès",
            subtitle: "Suivez votre parcours d’étude et célébrez vos réussites",

            totalSessions: "Sessions totales",
            minutesStudied: "minutes étudiées",

            currentStreak: "Série actuelle",
            daysInRow: "jours consécutifs",

            bestStreak: "Meilleure série",
            personalRecord: "record personnel",

            milestone: "Étape",
            milestoneReady: "Prêt à commencer ! 👋",
            milestoneMomentum: "Vous prenez de l’élan ✨",
            milestoneConsistency: "La régularité est en marche 🌟",

            last7Days: "7 derniers jours",
            dailyMinutes: "Votre temps d’étude quotidien en minutes",
            minutes: "minutes",

            noSessions: "Aucune session d’étude pour le moment",
            completeToSee: "Terminez une session pour voir vos progrès !",

            keepGoing: "Continuez ! 🌟",
            firstSessionMsg:
                "Commencez votre première session pour suivre vos progrès. Chaque expert a commencé quelque part !",
            keepGoingMsg:
                "Vous construisez un rythme. Continuez, même avec peu d’énergie. Chaque session compte.",
        },
        study: {
            title: "Minuteur d’étude",
            subtitle: "Restez concentré avec la technique Pomodoro",

            focusTime: "Temps de concentration 📚",
            breakTime: "Temps de pause ☕",
            focusDesc: "Restez concentré et évitez les distractions",
            breakDesc: "Détendez-vous et rechargez votre esprit",
            focusMode: "Mode concentration",
            breakMode: "Mode pause",

            start: "Démarrer",
            pause: "Pause",
            reset: "Réinitialiser",

            todaySessions: "Sessions du jour",
            completedSessions: "Sessions de concentration terminées",
            quickTips: "Conseils rapides",

            settings: "Paramètres du minuteur",
            focusLabel: "Concentration (minutes)",
            breakLabel: "Pause (minutes)",
            save: "Enregistrer",

            focusComplete: "Session de concentration terminée ! Place à la pause 🎉",
            breakComplete: "La pause est terminée ! Prêt à vous reconcentrer ? 💪",

            errorLoadTodaySessions: "Échec du chargement des sessions du jour",
            errorLoadUser: "Échec du chargement de l’utilisateur",
            errorUserNotReady: "Utilisateur pas encore prêt",
            errorStillLoadingUser: "Chargement de l’utilisateur...",
            errorSaveSession: "Échec de l’enregistrement de la session",

            tips: [
                "Trouvez un endroit calme et confortable",
                "Coupez les notifications",
                "Restez bien hydraté",
                "Étirez-vous pendant les pauses",
            ],
        },
        wellness: {
            title: "Espace bien-être",
            subtitle: "Prenez soin de votre esprit et de votre corps pendant vos études",

            stressTab: "Gestion du stress",
            procrastinationTab: "Battre la procrastination",

            stressTitle: "Gérer le stress académique",
            procrastinationTitle: "Surmonter la procrastination",

            stressDesc: "Des stratégies pratiques pour rester calme et concentré pendant les périodes exigeantes",
            procrastinationDesc: "Des moyens simples pour commencer, réduire le sentiment d’être dépassé et garder l’élan",

            featureCards: {
                meditation: {
                    title: "Méditation de 5 minutes",
                    body: "Asseyez-vous confortablement, fermez les yeux et concentrez-vous sur votre respiration. Quand votre esprit s’égare, ramenez-le doucement. Même 5 minutes peuvent aider à dissiper le brouillard mental.",
                },
                gratitude: {
                    title: "Journal de gratitude",
                    body: "Notez 3 choses pour lesquelles vous êtes reconnaissant chaque jour. Cette pratique simple peut changer votre état d’esprit et réduire l’anxiété.",
                },
                mindfulBreaks: {
                    title: "Pauses en pleine conscience",
                    body: "Pendant les pauses, déconnectez-vous complètement des études. Allez marcher, préparez un thé ou faites quelques étirements doux. Soyez présent dans l’instant.",
                },
            },

            stressItems: {
                breathing: {
                    title: "Pratiquer la respiration profonde",
                    body: "Inspirez pendant quatre secondes, retenez brièvement, puis expirez lentement. Quelques cycles calmes peuvent vous aider à retrouver votre concentration avant de reprendre.",
                },
                breaks: {
                    title: "Faire des pauses régulières",
                    body: "De courtes pauses protègent votre concentration. Éloignez-vous de l’écran, détendez vos épaules et laissez votre esprit se réinitialiser.",
                },
                hydration: {
                    title: "Rester hydraté",
                    body: "Gardez de l’eau près de vous pendant les sessions d’étude. La déshydratation peut aggraver discrètement la fatigue, les maux de tête et la baisse de concentration.",
                },
                sleep: {
                    title: "Avoir un sommeil de qualité",
                    body: "Le sommeil fait partie des études, ce n’est pas une récompense après. Un meilleur repos soutient la mémoire, l’équilibre émotionnel et une performance plus stable.",
                },
                exercise: {
                    title: "Faire de l’exercice régulièrement",
                    body: "Même une courte marche ou quelques étirements peuvent améliorer l’énergie et l’humeur. Le mouvement aide à briser le cycle de tension et de procrastination.",
                },
            },

            procrastinationItems: {
                smallSteps: {
                    title: "Diviser les grandes tâches en petites étapes",
                    body: "Les grandes tâches paraissent accablantes. Découpez-les en blocs de 5 à 10 minutes. Commencer est souvent la partie la plus difficile.",
                },
                twoMinuteRule: {
                    title: "Utiliser la règle des 2 minutes",
                    body: "Si une tâche prend moins de 2 minutes, faites-la immédiatement. Cela crée de l’élan et réduit votre charge mentale.",
                },
                distractions: {
                    title: "Éliminer les distractions",
                    body: "Laissez votre téléphone dans une autre pièce, utilisez des bloqueurs de sites ou étudiez dans un endroit calme. Facilitez votre concentration.",
                },
                intentions: {
                    title: "Définir des intentions claires",
                    body: "Avant chaque session d’étude, écrivez exactement ce que vous voulez accomplir. Des objectifs précis sont plus motivants.",
                },
                reward: {
                    title: "Se récompenser",
                    body: "Après avoir terminé une tâche, accordez-vous une petite récompense. Cela crée des associations positives avec la productivité.",
                },
            },

            rememberTitle: "Rappel",
            rememberText:
                "Votre valeur ne dépend pas de vos notes ni de votre productivité. Prendre soin de vous n’est pas égoïste, c’est essentiel pour une réussite durable.",

            notAloneTitle: "Vous n’êtes pas seul",
            notAloneText:
                "Chaque étudiant rencontre des difficultés. Si vous traversez une période difficile, demandez de l’aide à vos amis ou aux services de soutien.",
        },
    },
};

export default translations;