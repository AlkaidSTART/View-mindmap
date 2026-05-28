"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const proofPoints = [
  "邮箱密码登录，进入你的任务工作台",
  "上传文档后自动解析章节与重点关系",
  "生成思维导图并导出为多种标准格式",
];

export default function LoginPage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ticket = ticketRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-login-copy]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          immediateRender: false,
        },
      );

      gsap.fromTo(
        "[data-login-form]",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          delay: 0.22,
          ease: "expo.out",
          immediateRender: false,
        },
      );
    }, stageRef);

    if (!ticket) {
      return () => ctx.revert();
    }

    const handleMove = (event: MouseEvent) => {
      const rect = ticket.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(ticket, {
        rotateY: x / 30,
        rotateX: -y / 34,
        transformPerspective: 1200,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(ticket, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    };

    ticket.addEventListener("mousemove", handleMove);
    ticket.addEventListener("mouseleave", handleLeave);

    return () => {
      ticket.removeEventListener("mousemove", handleMove);
      ticket.removeEventListener("mouseleave", handleLeave);
      ctx.revert();
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1400);
  };

  return (
    <main
      ref={stageRef}
      className="relative min-h-screen overflow-hidden bg-background px-5 py-5 text-foreground md:px-8"
    >
      <div className="page-noise" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,24,40,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,40,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30" />
        <div className="absolute left-[-6%] top-[12%] h-72 w-72 rounded-full bg-brand-primary/12 blur-3xl" />
        <div className="absolute bottom-[-8%] right-[8%] h-80 w-80 rounded-full bg-brand-accent/12 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-7xl flex-col rounded-[2rem] border border-foreground/10 bg-white/55 shadow-[0_35px_100px_-45px_rgba(16,24,40,0.4)] backdrop-blur-xl lg:grid lg:grid-cols-[1.04fr_0.96fr]">
        <section className="flex flex-col justify-between border-b border-foreground/10 p-7 md:p-10 lg:border-b-0 lg:border-r">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/75 px-4 py-2 text-sm font-medium text-foreground/72 transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              返回主页
            </Link>

            <div className="mt-10">
              <p
                data-login-copy
                className="editorial-label"
              >
                Member Access
              </p>
              <h1
                data-login-copy
                className="mt-4 max-w-xl font-display text-[clamp(3.2rem,9vw,6.8rem)] leading-[0.92] tracking-[-0.06em]"
              >
                YOUR
                <br />
                THINKING
                <br />
                ROOM
              </h1>
              <p
                data-login-copy
                className="mt-6 max-w-lg text-base leading-8 text-foreground/70"
              >
                这里不是一个普通登录框，而是你进入文档分析工作流的入口。
                从邮箱登录开始，后面接的是提取、生成、预览和导出的一整条路径。
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {proofPoints.map((point) => (
              <div
                key={point}
                data-login-copy
                className="rounded-[1.5rem] border border-foreground/10 bg-white/72 px-4 py-4 text-sm leading-7 text-foreground/72 shadow-[0_18px_40px_-34px_rgba(16,24,40,0.5)]"
              >
                {point}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center p-5 md:p-8 lg:p-10">
          <motion.div
            ref={ticketRef}
            data-login-form
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-[2rem] border border-foreground/12 bg-[#fffdf8] p-7 shadow-[0_28px_100px_-50px_rgba(16,24,40,0.45)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-[0_16px_40px_-16px_rgba(211,58,44,0.6)]">
              <Brain className="h-6 w-6" />
            </div>
            <div className="absolute left-0 right-0 top-24 border-t border-dashed border-foreground/12" />
            <div className="absolute bottom-0 left-7 right-7 h-px bg-[linear-gradient(to_right,transparent,rgba(16,24,40,0.2),transparent)]" />

            <div className="pr-16">
              <p className="editorial-label">Email sign in</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                欢迎回来
              </h2>
              <p className="mt-3 text-sm leading-7 text-foreground/64">
                输入邮箱和密码，继续你的 AI 导图工作台。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <FieldShell label="电子邮箱" icon={<Mail className="h-5 w-5" />}>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="editorial-input"
                />
              </FieldShell>

              <FieldShell label="密码" icon={<Lock className="h-5 w-5" />}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
                  className="editorial-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/45 transition hover:text-foreground"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </FieldShell>

              <div className="flex items-center justify-between text-xs text-foreground/58">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-foreground/20 bg-transparent text-brand-primary"
                  />
                  保持登录状态
                </label>
                <a href="#" className="font-medium text-brand-primary hover:opacity-80">
                  忘记密码
                </a>
              </div>

              <motion.button
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                disabled={loading}
                className="editorial-button editorial-button--primary w-full justify-center"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={loading ? "loading" : "idle"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Sparkles className="h-4 w-4 animate-spin" />
                        登录中...
                      </>
                    ) : (
                      <>
                        进入工作台
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </form>

            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground/40">
              <span className="h-px flex-1 bg-foreground/10" />
              secure access
              <span className="h-px flex-1 bg-foreground/10" />
            </div>

            <p className="mt-6 text-sm text-foreground/58">
              还没有账号？{" "}
              <Link href="/" className="font-semibold text-brand-primary hover:opacity-80">
                先看看产品首页
              </Link>
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

function FieldShell({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-foreground/50">
        {label}
      </span>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/42">
          {icon}
        </span>
        {children}
      </div>
    </label>
  );
}
