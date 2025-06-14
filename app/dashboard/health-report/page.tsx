 "use client";

// Health Report page with collapsible Overall Health Score card
// + Chatbot splash that cycles “Namaste” through many languages in the centre of the pane
//   (inspired by Apple’s multilingual “hello” intro screen)
// -----------------------------------------------------------------------------
// UX touches
// ✦ Score card collapses/expands via chevron; closed by default.
// ✦ Chat messages retain updated colour palette.
// ✦ When the conversation pane is empty (only the greeting), a centred,
//   softly‑animating heading shows “Namaste” in ~20 scripts/languages.
//   The words cross‑fade every 3 s via Framer‑motion.
// ✦ EatSmart logo/wordmark subtly appears under the greeting for branding.
// -----------------------------------------------------------------------------

import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  Calendar,
  Download,
  Mic,
  SendHorizontal,
  Loader2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// One‑UI primitives (reuse from your design‑system)
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/** ---------------------------------------------------------------------------
 *  MOCKED HEALTH DATA (unchanged)
 *  -------------------------------------------------------------------------*/
const healthData = {
  overallScore: 78,
  trend: "improving"
} as const;

/** ---------------------------------------------------------------------------
 *  CHATBOT TYPES / HELPERS
 *  -------------------------------------------------------------------------*/
interface Msg {
  id: number;
  role: "user" | "bot" | "typing";
  text?: string;
  time?: string;
}

const initMsgs: Msg[] = [
  {
    id: 1,
    role: "bot",
    text: "Hello! How can I help you today?",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
];

const typingIndicator: Msg = { id: 999, role: "typing" };

/** ---------------------------------------------------------------------------
 *  MULTI‑LANG NAMASTE SETUP
 *  -------------------------------------------------------------------------*/
const namasteWords = [
  "नमस्ते",      // Hindi / Sanskrit
  "Namaste",     // English romanisation
  "नमस्कार",     // Marathi / Nepali formal
  "Hola",        // Spanish (hello)
  "Bonjour",     // French
  "Ciao",        // Italian
  "Olá",         // Portuguese
  "こんにちは",    // Japanese (Konnichiwa)
  "안녕하세요",     // Korean (Annyeonghaseyo)
  "您好",          // Chinese (Nín hǎo)
  "Привет",       // Russian
  "سلام",         // Arabic / Persian (Salaam)
  "হ্যালো",        // Bengali (Hello)
  "வணக்கம்",       // Tamil (Vanakkam)
  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",   // Punjabi (Sat Sri Akaal)
  "પ્રણામ",        // Gujarati (Pranam)
  "ಹಲೋ",           // Kannada (Halo)
  "ഹലോ",           // Malayalam (Halo)
  "สวัสดี",         // Thai (Sawasdee)
  "שלום"           // Hebrew (Shalom)
];

const fadeVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

/** ---------------------------------------------------------------------------
 *  PAGE COMPONENT
 *  -------------------------------------------------------------------------*/
export default function HealthReportPage() {
  /** Collapsible overall score card */
  const [scoreOpen, setScoreOpen] = useState(false);

  /** Chatbot state */
  const [messages, setMessages] = useState<Msg[]>(initMsgs);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  let msgId = useRef(2);

  // Scroll to bottom when messages update
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Simulate bot response with typing effect
  const simulateBot = (question: string) => {
    setMessages(prev => [...prev, typingIndicator]);
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.role !== "typing").concat({
        id: msgId.current++,
        role: "bot",
        text: `I’m still a demo, but here’s a canned response to: “${question}”`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }));
      setIsSending(false);
    }, 1600);
  };

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setIsSending(true);
    setMessages(prev => [
      ...prev,
      {
        id: msgId.current++,
        role: "user",
        text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
    setInput("");
    simulateBot(text);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  /** -----------------------------------------------------------------------
   *  Animated multilingual Namaste headline
   *  ---------------------------------------------------------------------*/
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % namasteWords.length), 3000);
    return () => clearInterval(id);
  }, []);

  const showSplash = messages.length === 1 && messages[0].role === "bot"; // only greeting present

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-6 pb-12 min-h-screen w-full overflow-x-hidden bg-[radial-gradient(ellipse_at_top,theme(colors.violet.950)_0%,theme(colors.violet.950/_80)_20%,theme(colors.black)_100%)] text-white">
      {/* Heading & actions */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Health Report</h1>
          <p className="text-muted-foreground">Comprehensive analysis of your health metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <Calendar className="mr-2 h-4 w-4" /> This Week
          </Button>
          <Button size="sm" className="one-ui-button rounded-full">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </header>

      {/* Collapsible overall health score card */}
      <Card className="one-ui-card overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-sm border-b border-white/10"
          onClick={() => setScoreOpen(o => !o)}
          aria-expanded={scoreOpen}
        >
          <span className="flex items-center gap-2 text-lg font-semibold">
            <Heart className="h-6 w-6 text-red-500" /> Overall Health Score
          </span>
          {scoreOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        <AnimatePresence initial={false}>
          {scoreOpen && (
            <motion.div
              key="score"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <CardContent className="py-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Circular score */}
                  <div className="relative">
                    <svg width="140" height="140" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="hsla(0,0%,100%,0.05)" strokeWidth="10" />
                      <motion.circle
                        cx="50" cy="50" r="45" fill="none" stroke="#eab308" strokeWidth="10" strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: healthData.overallScore / 100 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{healthData.overallScore}</span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                  </div>

                  {/* Score trend */}
                  <div className="flex-1 space-y-2">
                    <Badge className="rounded-full px-3 py-1.5 w-max">
                      {healthData.trend === "improving" ? (
                        <span className="flex items-center gap-1">📈 improving</span>
                      ) : (
                        <span className="flex items-center gap-1">📉 declining</span>
                      )}
                    </Badge>
                    <p className="text-sm text-muted-foreground max-w-xl">
                      Your health score has improved by 8 points this week. Keep it up!
                    </p>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* ------------------------------------------------------------------
           CHATBOT SECTION
         ------------------------------------------------------------------*/}
      <Card className="one-ui-card flex overflow-hidden min-h-[540px]">
        {/* Sidebar */}
        <aside className="hidden md:flex w-52 flex-col items-center gap-4 border-r border-white/10 bg-white/5 backdrop-blur-sm p-6">
          <h3 className="text-lg font-bold mb-4">HISTORY</h3>
          <div className="flex-1 w-full" />
        </aside>

        {/* Conversation Pane */}
        <div className="relative flex-1 flex flex-col">
          {/* Animated Multilingual Splash */}
          {showSplash && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.h2
                  key={wordIdx}
                  variants={fadeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-rose-200 drop-shadow-lg"
                >
                  {namasteWords[wordIdx]}
                </motion.h2>
              </AnimatePresence>
              {/* EatSmart brand tagline */}
              <span className="mt-4 text-xl font-semibold text-rose-200/80 tracking-wider">EatSmart</span>
            </motion.div>
          )}

          {/* Header with user avatar */}
          <header className="flex items-center justify-end gap-3 px-4 py-3 border-b border-white/10 bg-white/5 backdrop-blur-sm z-10">
            <span className="font-medium">Amit S.</span>
            <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=Amit" alt="avatar" className="w-8 h-8 rounded-full" />
          </header>

          {/* Messages */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map(m => (
                m.role === "typing" ? (
                  <motion.div
                    key={m.id}
                    className="flex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm w-max">
                      <div className="flex gap-1">
                        <motion.span className="block w-2 h-2 rounded-full bg-teal-300" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0 }} />
                        <motion.span className="block w-2 h-2 rounded-full bg-teal-200" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.2 }} />
                        <motion.span className="block w-2 h-2 rounded-full bg-teal-100" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.4 }} />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={m.id}
                    className={m.role === "user" ? "flex justify-end" : "flex"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <div
                      className={
                        m.role === "user"
                          ? "bg-teal-600 text-white px-4 py-3 rounded-2xl rounded-br-none max-w-[70%]"
                          : "bg-white/5 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-none max-w-[70%] text-white"
                      }
                    >
                      <p className="whitespace-pre-wrap leading-snug">{m.text}</p>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Input */}
          <form
            className="flex items-center gap-3 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm"
            onSubmit={e => {
              e.preventDefault();
              send();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
            <Button type="button" size="icon" variant="ghost" onClick={() => console.log("TODO: voice")}> <Mic className="w-5 h-5" /> </Button>
            <Button type="submit" size="icon" disabled={isSending || !input.trim()} className="one-ui-button aspect-square">
              {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <SendHorizontal className="w-5 h-5" />}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
