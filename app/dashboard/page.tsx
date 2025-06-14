 "use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, History, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

/**
 * EatSmart dashboard – neon-futuristic UI with refined micro-animations.
 * Card borders now have a gentle flowing gradient; the card background stays static.
 */

/* -------- NAV LINKS -------- */
const navLinks = [
  { href: "/dashboard/measure-height", label: "Measure Height" }, // replaced Roadmap
];

/* -------- QUICK-ACTION BUTTONS (absolute paths) -------- */
const actions = [
  { label: "Scan Food", href: "/dashboard/scan" },
  { label: "Chat", href: "dashboard/chat" },               // now goes to /chat
  { label: "Health Report", href: "/dashboard/health-report" },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#14005c] via-[#080024] to-[#030012] text-white">
      {/* noise overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.05]" />

      {/* NAVBAR */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-2 text-2xl font-extrabold">
          <span className="text-white">Eat</span>
          <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Smart
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="transition-colors hover:text-fuchsia-300"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <button className="relative overflow-hidden rounded-full border border-white/15 px-6 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-colors hover:text-white">
          Sign Out
        </button>
      </nav>

      {/* HERO */}
      <main className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center gap-14 px-6 py-16 lg:flex-row lg:justify-between lg:gap-20">
        <section className="w-full max-w-xl">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight lg:text-6xl">
            Welcome back,&nbsp;
            <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Alex
            </span>
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Track your nutrition and make healthier choices.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-6">
            {actions.map((action) => (
              <ShimmerButton
                key={action.label}
                onClick={() => router.push(action.href)}
              >
                {action.label}
              </ShimmerButton>
            ))}
          </div>

          {/* STAT CARDS */}
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <StatCard
              title="Today's Progress"
              icon={<Camera size={18} />}
              items={[
                { name: "Calories", current: 1430, target: 2006, unit: "cal" },
                { name: "Carbs", current: 68, target: 180, unit: "g" },
                { name: "Fats", current: 199, target: 250, unit: "g" },
                { name: "Protein", current: 45, target: 70, unit: "g" },
              ]}
            />
            <StatCard
              title="Weekly Goals"
              icon={<History size={18} />}
              items={[
                { name: "Weight Loss", current: 1, target: 3, unit: "kg" },
                { name: "Exercise", current: 4, target: 5, unit: "h" },
                { name: "Water", current: 6, target: 8, unit: "gl" },
              ]}
            />
          </div>

          {/* FEATURE BOXES */}
          <div className="mt-10 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            <FeatureBox
              icon={<Camera size={20} />}
              title="Barcode Scanner"
              description="Instantly identify a scanned food and get nutritional information."
            />
            <FeatureBox
              icon={<FileText size={20} />}
              title="Ingredient Analysis"
              description="Decode and interpret each ingredient for allergens."
            />
            <FeatureBox
              icon={<History size={20} />}
              title="Meal Recommendations"
              description="Personalised meal ideas keeping your macros balanced."
            />
          </div>
        </section>

        {/* PHONE MOCKUP */}
        <section className="w-full max-w-lg">
          <Image
            src="https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749914639/9871872b-dbaf-42b3-bdfe-e40651ae58d2_yl9mwg.png"
            alt="App preview"
            width={600}
            height={600}
            priority
            className="select-none"
          />
        </section>
      </main>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        @keyframes border-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------------- Components ---------------- */

function ShimmerButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileTap={{ y: 1 }}
      onClick={onClick}
      className="relative inline-flex min-w-[160px] items-center justify-center overflow-hidden rounded-full px-8 py-4 text-lg font-semibold text-white backdrop-blur-md"
      style={{ background: "rgba(10,5,50,1)" }}
    >
      {/* animated border */}
      <motion.span
        aria-hidden
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "200% 50%" }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        className="absolute inset-0 rounded-full p-[2px]"
        style={{
          backgroundImage: "linear-gradient(120deg,#00e4ff,#ff00ff,#00e4ff)",
          backgroundSize: "200% 200%",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <span className="relative z-10 select-none">{children}</span>
    </motion.button>
  );
}

function BorderCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0e082d]/80 p-6 backdrop-blur-md">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl p-px"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "200% 50%" }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        style={{
          backgroundImage: "linear-gradient(120deg,#ff00ff,#7800ff,#00e0ff)",
          backgroundSize: "200% 200%",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}

function StatCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: { name: string; current: number; target: number; unit: string }[];
}) {
  return (
    <BorderCard>
      <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white/90">
        {icon}
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((i) => (
          <ProgressBar key={i.name} {...i} />
        ))}
      </div>
    </BorderCard>
  );
}

function FeatureBox({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <BorderCard>
      <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-fuchsia-400">
        {icon}
        {title}
      </div>
      <p className="text-sm text-white/70">{description}</p>
    </BorderCard>
  );
}

function ProgressBar({
  name,
  current,
  target,
  unit,
}: {
  name: string;
  current: number;
  target: number;
  unit: string;
}) {
  const percent = Math.min(100, Math.round((current / target) * 100));
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs uppercase tracking-wide text-white/60">
        <span>{name}</span>
        <span>
          {current} / {target} {unit}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
