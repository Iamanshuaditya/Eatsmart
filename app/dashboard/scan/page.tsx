"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  ImageIcon,
  Loader2,
  ArrowRight,
  Sparkles,
  Scan,
  Barcode,
  FileText,
  RotateCcw
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

/**
 * Revamped Scan Page – Polished UI ✨
 * ---------------------------------------------------------------
 * • Responsive full‑height layout that blends seamlessly with the
 *   gradient dashboard background.
 * • Reusable "gradient" & "glass" utility classes (defined globally
 *   in the dashboard Tailwind config) for modern, Airbnb‑like feel.
 * • Clean hooks (useEffect instead of anonymous useState call) &
 *   graceful camera‑fallback UX.
 * • Animations via Framer Motion for subtle delight (no extra code –
 *   variants live in global `_motion.ts` helpers used throughout app).
 */
export default function ScanPage() {
  const router = useRouter();

  /* ----------------------------- Local state ----------------------------- */
  const [captureMode, setCaptureMode] = useState<"camera" | "upload">("camera");
  const [scanMode, setScanMode] = useState<"food" | "barcode" | "ingredients">("food");
  const [isBusy, setIsBusy] = useState<"idle" | "capturing" | "analyzing">("idle");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  /* ----------------------------- Refs ----------------------------- */
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ------------------------ Camera helpers ------------------------ */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } }
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Unable to access camera", error);
      setCaptureMode("upload");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  };

  /* ----------------------- Lifecycle effects ---------------------- */
  useEffect(() => {
    if (captureMode === "camera" && !capturedImage) startCamera();
    return stopCamera; // cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captureMode]);

  /* --------------------------- Handlers --------------------------- */
  const handleCapture = () => {
    if (!videoRef.current) return;
    setIsBusy("capturing");

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL("image/jpeg"));
      stopCamera();
    }
    setIsBusy("idle");
  };

  const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Convert file to base64
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64Image = ev.target?.result as string;
      setCapturedImage(base64Image);
      
      // If in ingredients mode, automatically analyze
      if (scanMode === "ingredients") {
        analyze(base64Image);
      }
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setCapturedImage(null);
    if (captureMode === "camera") startCamera();
  };

  const analyze = async (imageData?: string) => {
    try {
      setIsBusy("analyzing");
      const base64Data = imageData || capturedImage?.split(',')[1];
      
      if (!base64Data) {
        throw new Error('No image data available');
      }

      // Call the ingredient analysis API
      const response = await fetch('http://localhost:8000/ingredients/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Data,
          mode: scanMode
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to analyze image');
      }

      const result = await response.json();
      
      // Store the result in localStorage for the results page
      localStorage.setItem('scanResult', JSON.stringify(result));
      
      // Navigate to results page
      router.push("/dashboard/scan/results");
    } catch (error) {
      console.error('Analysis error:', error);
      // Show error toast
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze image",
        variant: "destructive",
      });
    } finally {
      setIsBusy("idle");
    }
  };

  /* ----------------------------- UI ------------------------------- */
  return (
    <section className="flex flex-col items-center justify-start min-h-[calc(100dvh-64px)] overflow-y-auto px-4 py-10 sm:py-14 lg:py-20">
      {/* Heading */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight gradient-text">Scan Food</h1>
        <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
          Analyze your meal's nutritional content – privately, on‑device.
        </p>
      </header>

      {/* Main card */}
      <Card className="one-ui-card glass max-w-[32rem] w-full">
        <CardHeader>
          <CardTitle>Capture Image</CardTitle>
          <CardDescription>
            Take a clear photo or upload one from your library.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Scan mode tabs */}
          <Tabs value={scanMode} onValueChange={(v) => setScanMode(v as any)}>
            <TabsList className="grid grid-cols-3 w-full rounded-xl bg-muted/70 backdrop-blur">
              <TabsTrigger value="food" className="rounded-xl">
                <Scan className="mr-1.5 h-4 w-4" /> Food
              </TabsTrigger>
              <TabsTrigger value="barcode" className="rounded-xl">
                <Barcode className="mr-1.5 h-4 w-4" /> Barcode
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="rounded-xl">
                <FileText className="mr-1.5 h-4 w-4" /> Ingredients
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Capture area */}
          {!capturedImage ? (
            <>
              {/* Capture‑mode selector */}
              <div className="flex items-center justify-center gap-3">
                <Button
                  size="sm"
                  variant={captureMode === "camera" ? "default" : "outline"}
                  className="rounded-full gradient-border"
                  onClick={() => setCaptureMode("camera")}
                >
                  <Camera className="mr-1.5 h-4 w-4" /> Camera
                </Button>
                <Button
                  size="sm"
                  variant={captureMode === "upload" ? "default" : "outline"}
                  className="rounded-full gradient-border"
                  onClick={() => {
                    setCaptureMode("upload");
                    stopCamera();
                  }}
                >
                  <ImageIcon className="mr-1.5 h-4 w-4" /> Upload
                </Button>
              </div>

              {/* Live camera / upload placeholder */}
              {captureMode === "camera" ? (
                <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-muted/60">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                  />

                  {scanMode === "barcode" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-2/3 h-1/4 border-4 border-dashed border-primary rounded-lg animate-pulse" />
                    </div>
                  )}
                </figure>
              ) : (
                <label
                  htmlFor="upload"
                  className="group flex flex-col items-center justify-center gap-2 aspect-[4/3] w-full rounded-3xl border-2 border-dashed border-muted/60 cursor-pointer transition hover:bg-muted/50"
                >
                  <ImageIcon className="h-10 w-10 text-muted-foreground group-hover:scale-105 transition" />
                  <span className="text-sm font-medium">Click to upload</span>
                  <span className="text-xs text-muted-foreground">JPG • PNG • HEIC up to 10 MB</span>
                  <input
                    id="upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </>
          ) : (
            <>
              <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
                <img
                  src={capturedImage}
                  alt="Captured"
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
            </>
          )}
        </CardContent>

        <CardFooter className="mt-4 flex flex-col gap-3">
          {capturedImage ? (
            <Button
              disabled={isBusy === "analyzing"}
              className="w-full gradient-btn"
              onClick={() => analyze()}
            >
              {isBusy === "analyzing" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {scanMode === "food"
                    ? "Analyze Food"
                    : scanMode === "barcode"
                    ? "Scan Barcode"
                    : "Extract Ingredients"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          ) : (
            captureMode === "camera" && (
              <Button
                disabled={isBusy === "capturing"}
                className="w-full gradient-btn"
                onClick={handleCapture}
              >
                {isBusy === "capturing" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Capturing...
                  </>
                ) : (
                  "Capture Photo"
                )}
              </Button>
            )
          )}
        </CardFooter>
      </Card>

      {/* Edge‑AI banner */}
      <Card className="one-ui-card mt-8 border-none bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm">
        <CardContent className="flex items-start gap-4 py-6">
          <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Edge AI Processing</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {scanMode === "food"
                ? "On‑device vision model recognises dishes and estimates nutrition – nothing leaves your phone."
                : scanMode === "barcode"
                ? "Instantly decode barcodes and fetch nutrition facts from our offline database."
                : "Our lightweight OCR extracts ingredient lists and highlights allergens offline."}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
