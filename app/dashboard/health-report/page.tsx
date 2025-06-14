 "use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  Calendar,
  Download,
  Mic,
  SendHorizontal,
  Loader2,
  ChevronDown,
  ChevronUp,
  Plus,
  UploadCloud
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// One‑UI primitives
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/** ---------------------------------------------------------------------
 *  MOCKED HEALTH DATA
 *  -------------------------------------------------------------------*/
const healthData = {
  overallScore: 78,
  trend: "improving"
} as const;

/** ---------------------------------------------------------------------
 *  CHAT TYPES
 *  -------------------------------------------------------------------*/
interface ChatMsg {
  id: number;
  role: "user" | "bot" | "typing" | "file";
  text?: string;
  time?: string;
  fileName?: string;
}
interface ChatSession {
  id: number;
  title: string;
  messages: ChatMsg[];
}

/** ---------------------------------------------------------------------
 *  MULTI‑LANG NAMASTE
 *  -------------------------------------------------------------------*/
const namasteWords = [
  "नमस्ते",
  "Namaste",
  "नमस्कार",
  "Hola",
  "Bonjour",
  "Ciao",
  "Olá",
  "こんにちは",
  "안녕하세요",
  "您好",
  "Привет",
  "سلام",
  "হ্যালো",
  "வணக்கம்",
  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
  "પ્રણામ",
  "ಹಲೋ",
  "ഹലോ",
  "สวัสดี",
  "שלום"
];
const fadeVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function HealthReportPage() {
  /** --------------------------- CHAT STATE ---------------------------*/
  const [sessions, setSessions] = useState<ChatSession[]>(() => [
    {
      id: 1,
      title: "New Chat",
      messages: [
        {
          id: 1,
          role: "bot",
          text: "Hello! How can I help you today?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]
    }
  ]);
  const [currentSessionId, setCurrentSessionId] = useState(1);
  const currentSession = sessions.find(s => s.id === currentSessionId)!;

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  let nextMsgId = useRef(2);
  let nextSessId = useRef(2);

  /* Auto‑scroll */
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [currentSession.messages]);

  /* Helpers */
  const patchMessages = (msgs: ChatMsg[]) =>
    setSessions(prev => prev.map(s => (s.id === currentSessionId ? { ...s, messages: msgs } : s)));

  const addMsg = (msg: ChatMsg) => patchMessages([...currentSession.messages, msg]);

  const botReply = (prompt: string) => {
    addMsg({ id: 999, role: "typing" });
    setTimeout(() => {
      patchMessages(
        currentSession.messages
          .filter(m => m.role !== "typing")
          .concat({
            id: nextMsgId.current++,
            role: "bot",
            text: `I’m still a demo, but here’s a canned response to: “${prompt}”`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          })
      );
      setIsSending(false);
    }, 1500);
  };

  const sendText = () => {
    if (!input.trim()) return;
    const txt = input.trim();
    setIsSending(true);
    addMsg({
      id: nextMsgId.current++,
      role: "user",
      text: txt,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    });
    if (currentSession.title === "New Chat") {
      setSessions(prev =>
        prev.map(s =>
          s.id === currentSessionId ? { ...s, title: txt.slice(0, 20) + "…" } : s
        )
      );
    }
    setInput("");
    botReply(txt);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendText();
    }
  };

  const newChat = () => {
    const id = nextSessId.current++;
    setSessions(prev => [
      ...prev,
      {
        id,
        title: "New Chat",
        messages: [
          {
            id: 1,
            role: "bot",
            text: "Hello! How can I help you today?",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]
      }
    ]);
    setCurrentSessionId(id);
    nextMsgId.current = 2;
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    addMsg({
      id: nextMsgId.current++,
      role: "file",
      fileName: file.name,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    });
    setTimeout(() => botReply(`Received **${file.name}** (${Math.round(file.size / 1024)} KB)`), 1000);
  };

  /* Splash name cycling */
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % namasteWords.length), 3000);
    return () => clearInterval(id);
  }, []);
  const showSplash = currentSession.messages.length === 1 && currentSession.messages[0].role === "bot";

  /** ------------------------------------------------------------------
   *  RENDER
   *  ----------------------------------------------------------------*/
  return (
    <div className="flex h-screen bg-gradient-to-br from-violet-950 via-indigo-900 to-black text-white">
      {/* ----------------‑ SIDEBAR ----------------*/}
      <aside className="w-64 hidden lg:flex flex-col border-r border-white/10 bg-white/2 backdrop-blur-lg">
        <header className="p-4 flex items-center justify-between border-b border-white/10">
          <h2 className="text-lg font-semibold">Chats</h2>
          <Button size="icon" variant="secondary" onClick={newChat} className="rounded-full">
            <Plus className="w-5 h-5" />
          </Button>
        </header>
        <nav className="flex-1 overflow-y-auto">
          {sessions.map(sess => (
            <button
              key={sess.id}
              onClick={() => setCurrentSessionId(sess.id)}
              className={`w-full text-left px-4 py-3 truncate hover:bg-white/10 transition ${
                sess.id === currentSessionId ? "bg-white/10" : ""
              }`}
            >
              {sess.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* ----------------‑ MAIN CONTENT ----------------*/}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 bg-white/2 backdrop-blur">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Health Report</h1>
            <p className="text-muted-foreground">Comprehensive analysis of your health metrics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Calendar className="w-4 h-4 mr-2" /> This Week
            </Button>
            <Button size="sm" className="one-ui-button rounded-full">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </header>

        {/* Collapsible score card */}
        <Card className="one-ui-card mx-6 mt-6 overflow-hidden">
          <ScoreCard />
        </Card>

        {/* Chat area */}
        <Card className="one-ui-card flex-1 mx-6 mt-6 mb-8 overflow-hidden grid grid-rows-[1fr_auto]">
          {/* Messages list */}
          <div ref={listRef} className="relative overflow-y-auto p-6 space-y-6">
            {showSplash && (
              <motion.div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.h2
                    key={wordIdx}
                    variants={fadeVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-rose-200 drop-shadow-lg"
                  >
                    {namasteWords[wordIdx]}
                  </motion.h2>
                </AnimatePresence>
                <span className="mt-4 text-xl font-semibold text-rose-200/80 tracking-wider">EatSmart</span>
              </motion.div>
            )}

            <AnimatePresence initial={false}>
              {currentSession.messages.map(m => {
                if (m.role === "typing") {
                  return (
                    <motion.div
                      key={m.id}
                      className="flex"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm w-max">
                        <Dots />
                      </div>
                    </motion.div>
                  );
                }
                if (m.role === "file") {
                  return (
                    <motion.div
                      key={m.id}
                      className="flex"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <div className="bg-white/2 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-none max-w-[70%] flex items-center gap-2">
                        <UploadCloud className="w-4 h-4" />
                        <span className="truncate max-w-[160px]">{m.fileName}</span>
                      </div>
                    </motion.div>
                  );
                }
                return (
                  <motion.div
                    key={m.id}
                    className={m.role === "user" ? "flex justify-end" : "flex"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <div
                      className={
                        m.role === "user"
                          ? "bg-teal-600 text-white px-4 py-3 rounded-2xl rounded-br-none max-w-[70%]"
                          : "bg-white/2 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-none max-w-[70%] text-white"
                      }
                    >
                      <p className="whitespace-pre-wrap leading-snug">{m.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Input row */}
          <form
            onSubmit={e => {
              e.preventDefault();
              sendText();
            }}
            className="flex items-center gap-3 border-t border-white/10 bg-white/2 backdrop-blur px-4 py-4"
          >
            <label className="cursor-pointer px-3 py-2 hover:bg-white/10 rounded-2xl transition">
              <input type="file" className="hidden" onChange={handleFile} />
              <UploadCloud className="w-5 h-5" />
            </label>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="Type your message…"
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
            <Button type="button" size="icon" variant="ghost" onClick={() => console.log("TODO: voice")}> <Mic className="w-5 h-5" /> </Button>
            <Button type="submit" size="icon" disabled={isSending || !input.trim()} className="one-ui-button aspect-square">
              {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <SendHorizontal className="w-5 h-5" />}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

/** ----------------‑ SCORE CARD ----------------*/
function ScoreCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-4 bg-white/2 backdrop-blur-sm border-b border-white/10"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-lg font-semibold">
          <Heart className="h-6 w-6 text-red-500" /> Overall Health Score
        </span>
        {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="score"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <CardContent className="py-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
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
    </div>
  );
}

function Dots() {
  return (
    <div className="flex gap-1">
      <motion.span className="block w-2 h-2 rounded-full bg-teal-300" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0 }} />
      <motion.span className="block w-2 h-2 rounded-full bg-teal-200" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.2 }} />
      <motion.span className="block w-2 h-2 rounded-full bg-teal-100" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.4 }} />
    </div>
  );
}
