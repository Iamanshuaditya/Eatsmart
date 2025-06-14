"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  Camera,
   Loader2,
  RotateCcw,
  UploadCloud,
  Sparkles,
  Check,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/* ------------------------------------------------------------------ */
/*  TYPES & CONSTANTS                                                 */
/* ------------------------------------------------------------------ */
type CaptureMode = "camera" | "upload"
type Step = "idle" | "capturing" | "estimating" | "done"

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                    */
/* ------------------------------------------------------------------ */
export default function MeasureHeightPage() {
  const [captureMode, setCaptureMode] = useState<CaptureMode>("camera")
  const [step, setStep] = useState<Step>("idle")
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [heightCm, setHeightCm] = useState<number | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  /* -------------------------- Camera API ------------------------- */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      })
      if (videoRef.current) videoRef.current.srcObject = stream
    } catch {
      setCaptureMode("upload")
    }
  }
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      ;(videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((t) => t.stop())
      videoRef.current.srcObject = null
    }
  }
  useEffect(() => {
    if (captureMode === "camera" && !imageSrc) startCamera()
    return stopCamera
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captureMode])

  /* ------------------------ Handlers ----------------------------- */
  const handleCapture = () => {
    if (!videoRef.current) return
    setStep("capturing")
    const canvas = document.createElement("canvas")
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext("2d")
    ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    const base64 = canvas.toDataURL("image/jpeg")
    setImageSrc(base64)
    stopCamera()
    estimateHeight(base64)
  }

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string
      setImageSrc(base64)
      estimateHeight(base64)
    }
    reader.readAsDataURL(file)
  }

  const reset = () => {
    setImageSrc(null)
    setHeightCm(null)
    setStep("idle")
    if (captureMode === "camera") startCamera()
  }

  /* --------------------- Mock height estimate -------------------- */
  const estimateHeight = async (base64: string) => {
    setStep("estimating")
    // TODO: replace with real API call:
    // const res = await fetch("/api/height", { method:"POST", body: JSON.stringify({ image: base64 }) })
    // const { height_cm } = await res.json()
    setTimeout(() => {
      setHeightCm(175) // ← mocked result
      setStep("done")
    }, 1500)
  }

  /* ------------------------------------------------------------------
   *  RENDER
   * ----------------------------------------------------------------*/
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f182f] via-[#021226] to-[#000d1e] px-4 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.05]" />

      <Card className="one-ui-card w-full max-w-5xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold">
            <span className="mr-2">🌿</span> Manage&nbsp;Your&nbsp;Height{" "}
            <span className="ml-2">🌿</span>
          </CardTitle>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Upload or capture a full-body image to estimate your height and
            enhance your health insights.
          </p>
        </CardHeader>

        <CardContent className="grid gap-8 md:grid-cols-2">
          {/* ------------------- Capture column ------------------- */}
          <div className="space-y-6">
            {/* Mode toggle */}
            <div className="flex justify-center gap-3">
              <Button
                size="sm"
                variant={captureMode === "camera" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => {
                  setCaptureMode("camera")
                  reset()
                }}
              >
                <Camera className="mr-1.5 h-4 w-4" /> Live Photo
              </Button>
              <Button
                size="sm"
                variant={captureMode === "upload" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => {
                  setCaptureMode("upload")
                  stopCamera()
                  reset()
                }}
              >
                <ImageIcon /> Upload
              </Button>
            </div>

            {/* Capture area */}
            {!imageSrc ? (
              captureMode === "camera" ? (
                <figure className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-white/5">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <Button
                    disabled={step !== "idle"}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-teal-600 px-6 py-3"
                    onClick={handleCapture}
                  >
                    {step === "capturing" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Camera className="mr-2 h-4 w-4" /> Capture
                      </>
                    )}
                  </Button>
                </figure>
              ) : (
                <label className="group flex aspect-[3/4] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-white/20 bg-white/5 text-center transition hover:bg-white/10">
                  <UploadCloud className="h-10 w-10 text-white/70 transition group-hover:scale-110" />
                  <p className="font-medium">Click to upload</p>
                  <p className="text-xs text-white/60">
                    JPG • PNG • HEIC up to 10 MB
                  </p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFile}
                  />
                </label>
              )
            ) : (
              <figure className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl">
                <img
                  src={imageSrc}
                  alt="Uploaded"
                  className="h-full w-full object-cover"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 rounded-full backdrop-blur bg-background/80"
                  onClick={reset}
                  aria-label="Retake"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </figure>
            )}

            <p className="text-xs text-muted-foreground">
              Tips: stand straight against a plain background, ensure good
              lighting, and include your full body in frame.
            </p>
          </div>

          {/* ------------------- Result column -------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center justify-center rounded-3xl bg-white/5 p-8 text-center backdrop-blur-sm"
          >
            {step === "idle" && (
              <div className="space-y-4">
                <Sparkles className="mx-auto h-10 w-10 text-cyan-300" />
                <p className="max-w-xs text-muted-foreground">
                  Upload or capture an image to get your height estimate.
                </p>
              </div>
            )}

            {step === "estimating" && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-cyan-300" />
                <p className="text-muted-foreground">Analyzing image…</p>
              </div>
            )}

            {step === "done" && heightCm && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-muted-foreground">
                    Your Estimated Height
                  </h3>
                  <p className="text-5xl font-extrabold tracking-tight text-cyan-300">
                    {heightCm} <span className="text-3xl">cm</span>
                  </p>
                  <p className="text-sm text-green-400">Analysis Complete</p>
                </div>

                <p className="mx-auto max-w-xs text-sm text-muted-foreground">
                  Height can help us tailor better dietary recommendations for
                  you. Want to save this to your profile?
                </p>

                <Button size="lg" className="one-ui-button">
                  <Check className="mr-2 h-4 w-4" /> Save to Profile
                </Button>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  INITIAL ICON PLACEHOLDER                                           */
/* ------------------------------------------------------------------ */
function ImageIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}
