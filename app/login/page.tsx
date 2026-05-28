"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Mail,
  Lock,
  ArrowRight,
  Brain,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}
import Link from "next/link";

export default function LoginPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);
  const orbRef3 = useRef<HTMLDivElement>(null);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  // 3D 鼠标视差跟随
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(card, {
        rotateY: x / 40,
        rotateX: -y / 40,
        duration: 0.6,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };
    const onLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
    };
    window.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // 漂浮的光球
  useEffect(() => {
    [orbRef1, orbRef2, orbRef3].forEach((r, i) => {
      if (!r.current) return;
      gsap.to(r.current, {
        x: i === 0 ? 120 : i === 1 ? -140 : 80,
        y: i === 0 ? 160 : i === 1 ? -100 : -130,
        duration: 8 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1600);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 动态背景球 */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={orbRef1}
          className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-brand-primary/35 blur-[130px]"
        />
        <div
          ref={orbRef2}
          className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-secondary/30 blur-[130px]"
        />
        <div
          ref={orbRef3}
          className="absolute top-[30%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-brand-accent/25 blur-[120px]"
        />
      </div>

      {/* 网格底纹 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.8), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md px-6"
        style={{ perspective: 1000 }}
      >
        <div
          ref={cardRef}
          className="glass-strong p-8 md:p-10 rounded-4xl relative overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* 顶部装饰光线 */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white to-transparent" />
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-brand-primary/20 blur-3xl" />

          <div className="text-center mb-8 relative">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="inline-flex w-16 h-16 rounded-2xl bg-linear-to-br from-brand-primary to-brand-secondary items-center justify-center mb-5 shadow-xl shadow-brand-primary/40"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black mb-2 tracking-tight"
            >
              欢迎回来
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-sm"
            >
              登录 AI Job Pilot · 开启思维之旅
            </motion.p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <FormField
              icon={<Mail className="w-5 h-5" />}
              label="电子邮箱"
              type="email"
              placeholder="your@email.com"
              delay={0.5}
            />

            <FormField
              icon={<Lock className="w-5 h-5" />}
              label="密码"
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              delay={0.6}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  aria-label="toggle password"
                >
                  {showPwd ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              }
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between text-xs"
            >
              <label className="flex items-center gap-2 cursor-pointer text-muted-foreground">
                <input
                  type="checkbox"
                  className="rounded border-white/40 bg-white/60 text-brand-primary focus:ring-brand-primary/40 w-4 h-4"
                />
                <span>记住我</span>
              </label>
              <a
                href="#"
                className="font-medium text-brand-primary hover:text-brand-secondary transition"
              >
                忘记密码？
              </a>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full group relative overflow-hidden bg-linear-to-r from-brand-primary via-brand-secondary to-brand-accent text-white rounded-2xl py-3.5 font-bold shadow-xl shadow-brand-primary/30 disabled:opacity-70"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 animate-spin" /> 登录中...
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 flex items-center justify-center gap-2"
                  >
                    登录
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                )}
              </AnimatePresence>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-7"
          >
            <div className="relative flex items-center justify-center mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-foreground/10" />
              </div>
              <span className="relative z-10 px-3 text-xs text-muted-foreground bg-white/40 backdrop-blur rounded-full">
                或
              </span>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 glass hover:bg-white/80 rounded-2xl py-3 text-sm font-medium transition-all"
            >
              <GithubIcon className="w-5 h-5" /> 使用 GitHub 登录
            </button>
          </motion.div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            还没有账号？{" "}
            <Link
              href="/"
              className="text-brand-primary font-semibold hover:underline"
            >
              立即注册
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          登录即表示同意{" "}
          <a href="#" className="underline hover:text-foreground">
            服务条款
          </a>{" "}
          与{" "}
          <a href="#" className="underline hover:text-foreground">
            隐私政策
          </a>
        </p>
      </motion.div>
    </div>
  );
}

function FormField({
  icon,
  label,
  type,
  placeholder,
  delay,
  trailing,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  placeholder: string;
  delay: number;
  trailing?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="space-y-1.5"
    >
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand-primary transition-colors">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-white/60 border border-white/70 rounded-2xl py-3.5 pl-12 pr-12 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 focus:bg-white/90 transition-all text-sm placeholder:text-muted-foreground/70"
        />
        {trailing}
      </div>
    </motion.div>
  );
}
