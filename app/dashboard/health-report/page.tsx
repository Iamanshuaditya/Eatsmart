 "use client"

import React, { useState, useRef, useEffect } from "react"
import {
  Heart,
  Calendar,
  Download,
  Mic,
  SendHorizontal,
  Loader2,
  Plus,
  UploadCloud,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/* ------------------------------------------------------------------ */
/*  MOCKED HEALTH DATA + ANIMATION HELPERS                            */
/* ------------------------------------------------------------------ */
const mockScore = 78
const namasteWords = [
  "नमस्ते",
  "Bonjour",
  "Hola",
  "Olá",
  "नमस्कार",
  "こんにちは",
  "안녕하세요",
  "您好",
  "Привет",
  "سلام",
  "হ্যালো",
  "வணக்கம்",
  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
  "Ciao",
]
const fadeVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

/* ------------------------------------------------------------------ */
/*  TYPES                                                             */
/* ------------------------------------------------------------------ */
type ChatRole = "user" | "bot" | "typing" | "file" | "score"
interface ChatMsg {
  id: number
  role: ChatRole
  text?: string
  time?: string
  fileName?: string
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                         */
/* ------------------------------------------------------------------ */
export default function HealthReportPage() {
  /* ------------------------- Chat state ------------------------- */
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 1,
      role: "bot",
      text: "Hi! Please upload a medical document and I’ll generate insights.",
    },
  ])
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [analysisDone, setAnalysisDone] = useState(false) // gate for chat
  const [wordIdx, setWordIdx] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  let nextId = useRef(2)

  /* -------------------- Auto-scroll & greeting ------------------- */
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages])
  useEffect(() => {
    const id = setInterval(
      () => setWordIdx((i) => (i + 1) % namasteWords.length),
      3000,
    )
    return () => clearInterval(id)
  }, [])

  /* ---------------------------- Send ----------------------------- */
  const addMsg = (msg: ChatMsg) =>
    setMessages((prev) => [...prev, msg])

  const botReply = (txt: string) => {
    addMsg({ id: 999, role: "typing" })
    setTimeout(() => {
      setMessages((prev) =>
        prev
          .filter((m) => m.role !== "typing")
          .concat({
            id: nextId.current++,
            role: "bot",
            text: `I’m a demo bot – here’s a canned reply to: “${txt}”`,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }),
      )
      setIsSending(false)
    }, 1200)
  }

  const sendText = () => {
    if (!input.trim()) return
    const txt = input.trim()
    setIsSending(true)
    addMsg({
      id: nextId.current++,
      role: "user",
      text: txt,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    })
    setInput("")
    botReply(txt)
  }
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendText()
    }
  }

  /* ------------------------ File upload -------------------------- */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const msgId = nextId.current++
    addMsg({
      id: msgId,
      role: "file",
      fileName: file.name,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    })
    // Fake analysis
    addMsg({ id: 999, role: "typing" })
    setTimeout(() => {
      setMessages((prev) =>
        prev
          .filter((m) => m.role !== "typing")
          .concat(
            /* Score card */
            {
              id: nextId.current++,
              role: "score",
            },
            /* Insight text */
            {
              id: nextId.current++,
              role: "bot",
              text: `Your overall health score is **${mockScore}/100**. Blood pressure and cholesterol look good, but your recent HbA1c suggests you should monitor glucose levels more closely.`,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ),
      )
      setAnalysisDone(true)
    }, 1800)
  }

  /* --------------------------- Render ---------------------------- */
  const showSplash =
    messages.length === 1 && messages[0].role === "bot" && !analysisDone

  return (
    <section className="relative flex h-screen flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#14005c] via-[#080024] to-[#030012] text-white">
      {/* noise overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.05]" />

      {/* --- Header --- */}
      <header className="relative z-10 flex flex-col gap-4 border-b border-white/10 bg-white/2 backdrop-blur px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Health Report
          </h1>
          <p className="text-muted-foreground">
            Comprehensive analysis of your health metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <Calendar className="mr-2 h-4 w-4" /> This Week
          </Button>
          <Button size="sm" className="one-ui-button rounded-full">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </header>

      {/* --- Chat card --- */}
      <Card className="one-ui-card relative z-10 m-6 flex flex-1 flex-col overflow-hidden">
        {/* Message list */}
        <div
          ref={listRef}
          className="relative flex-1 overflow-y-auto p-6 space-y-6"
        >
          {showSplash && (
            <motion.div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center select-none">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.h2
                  key={wordIdx}
                  variants={fadeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-fuchsia-400 to-rose-200 bg-clip-text text-6xl font-extrabold text-transparent drop-shadow-lg"
                >
                  {namasteWords[wordIdx]}
                </motion.h2>
              </AnimatePresence>
              <span className="mt-4 text-xl font-semibold tracking-wider text-rose-200/80">
                EatSmart
              </span>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m) => {
              /* typing indicator */
              if (m.role === "typing")
                return (
                  <motion.div
                    key={m.id}
                    className="flex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-max rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                      <Dots />
                    </div>
                  </motion.div>
                )

              /* file bubble */
              if (m.role === "file")
                return (
                  <motion.div
                    key={m.id}
                    className="flex"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <div className="flex max-w-[70%] items-center gap-2 rounded-2xl rounded-bl-none bg-white/2 px-4 py-3 backdrop-blur-sm">
                      <UploadCloud className="h-4 w-4" />
                      <span className="truncate max-w-[160px]">
                        {m.fileName}
                      </span>
                    </div>
                  </motion.div>
                )

              /* score card bubble */
              if (m.role === "score")
                return (
                  <motion.div
                    key={m.id}
                    className="flex"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <ScoreBubble score={mockScore} />
                  </motion.div>
                )

              /* regular text */
              return (
                <motion.div
                  key={m.id}
                  className={
                    m.role === "user" ? "flex justify-end" : "flex"
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[70%] rounded-2xl rounded-br-none bg-teal-600 px-4 py-3 text-white"
                        : "max-w-[70%] rounded-2xl rounded-bl-none bg-white/2 px-4 py-3 text-white backdrop-blur-sm"
                    }
                  >
                    <p className="whitespace-pre-wrap leading-snug">
                      {m.text}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* initial drop-zone overlay */}
          {!analysisDone && (
            <label
              htmlFor="fileInput"
              className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-white/20 bg-black/20 text-center backdrop-blur-sm transition hover:bg-black/30"
            >
              <UploadCloud className="h-10 w-10 text-white/70 transition group-hover:scale-110" />
              <p className="font-medium">Click or drag a medical file here</p>
              <p className="text-sm text-white/60">
                PDF, JPG, PNG up to 10&nbsp;MB
              </p>
            </label>
          )}
          <input
            id="fileInput"
            type="file"
            accept=".pdf,image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>

        {/* Input row */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendText()
          }}
          className="flex items-center gap-3 border-t border-white/10 bg-white/2 px-4 py-4 backdrop-blur"
        >
          <label className="cursor-pointer rounded-2xl px-3 py-2 hover:bg-white/10 transition">
            <input
              type="file"
              className="hidden"
              onChange={handleFile}
              disabled={isSending}
            />
            <UploadCloud className="h-5 w-5" />
          </label>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            placeholder={
              analysisDone
                ? "Ask a follow-up question…"
                : "Upload a document to start"
            }
            disabled={!analysisDone}
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          />

          <Button
            type="button"
            size="icon"
            variant="ghost"
            disabled
            className="cursor-not-allowed opacity-50"
            title="Voice input coming soon"
          >
            <Mic className="h-5 w-5" />
          </Button>

          <Button
            type="submit"
            size="icon"
            disabled={
              isSending || !analysisDone || input.trim().length === 0
            }
            className="one-ui-button aspect-square disabled:opacity-40"
          >
            {isSending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SendHorizontal className="h-5 w-5" />
            )}
          </Button>
        </form>
      </Card>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  SCORE BUBBLE                                                      */
/* ------------------------------------------------------------------ */
function ScoreBubble({ score }: { score: number }) {
  return (
    <div className="flex max-w-[70%] flex-col items-start gap-4 rounded-2xl rounded-bl-none bg-white/2 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Heart className="h-6 w-6 text-red-500" />
        Overall Health Score
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <svg width="110" height="110" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsla(0,0%,100%,0.08)"
              strokeWidth="10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#eab308"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: score / 100 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{score}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <Badge className="w-max rounded-full px-3 py-1.5">
            {score >= 75 ? "📈 improving" : "📉 needs attention"}
          </Badge>
          <p className="max-w-xs text-sm text-muted-foreground">
            {score >= 75
              ? "Great job! Your metrics have improved this period."
              : "Your metrics dipped recently. Let’s plan improvements."}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  DOTS (typing)                                                     */
/* ------------------------------------------------------------------ */
function Dots() {
  return (
    <div className="flex gap-1">
      <motion.span
        className="block h-2 w-2 rounded-full bg-teal-300"
        animate={{ y: [0, -4, 0] }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "easeInOut",
          delay: 0,
        }}
      />
      <motion.span
        className="block h-2 w-2 rounded-full bg-teal-200"
        animate={{ y: [0, -4, 0] }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.span
        className="block h-2 w-2 rounded-full bg-teal-100"
        animate={{ y: [0, -4, 0] }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </div>
  )
}
