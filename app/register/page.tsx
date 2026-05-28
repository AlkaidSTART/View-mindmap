"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Brain,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";

const registerHighlights = [
  "创建个人工作空间，统一管理上传文档与脑图结果",
  "支持邮箱注册后进入任务看板与导出流程",
  "为后续接入真实鉴权接口预留了完整表单结构",
];

export default function RegisterPage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sheet = sheetRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-register-copy]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.88,
          stagger: 0.12,
          ease: "power3.out",
          immediateRender: false,
        },
      );

      gsap.fromTo(
        "[data-register-form]",
        { opacity: 0, y: 38 },
        {
          opacity: 1,
          y: 0,
          duration: 0.96,
          delay: 0.22,
          ease: "expo.out",
          immediateRender: false,
        },
      );
    }, stageRef);

    if (!sheet) {
      return () => ctx.revert();
    }

    const handleMove = (event: MouseEvent) => {
      const rect = sheet.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(sheet, {
        rotateY: x / 34,
        rotateX: -y / 38,
        transformPerspective: 1200,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(sheet, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    };

    sheet.addEventListener("mousemove", handleMove);
    sheet.addEventListener("mouseleave", handleLeave);

    return () => {
      sheet.removeEventListener("mousemove", handleMove);
      sheet.removeEventListener("mouseleave", handleLeave);
      ctx.revert();
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1500);
  };

  return (
    <main
      ref={stageRef}
      className="relative min-h-screen overflow-hidden bg-background px-5 py-5 text-foreground md:px-8"
    >
      <div className="page-noise" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,24,40,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,40,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30" />
        <div className="absolute right-[-5%] top-[8%] h-80 w-80 rounded-full bg-brand-secondary/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[6%] h-80 w-80 rounded-full bg-brand-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-7xl flex-col rounded-[2rem] border border-foreground/10 bg-white/55 shadow-[0_35px_100px_-45px_rgba(16,24,40,0.4)] backdrop-blur-xl lg:grid lg:grid-cols-[0.96fr_1.04fr]">
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
              <p data-register-copy className="editorial-label">
                Create account
              </p>
              <h1
                data-register-copy
                className="mt-4 max-w-xl font-display text-[clamp(3.1rem,8.5vw,6.4rem)] leading-[0.92] tracking-[-0.06em]"
              >
                BUILD
                <br />
                YOUR
                <br />
                MAP LAB
              </h1>
              <p
                data-register-copy
                className="mt-6 max-w-lg text-base leading-8 text-foreground/70"
              >
                注册后你会拥有自己的工作区，用来上传资料、生成脑图、
                保存导出结果。这个页面现在已经是完整注册入口，不再只是占位文案。
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {registerHighlights.map((item) => (
              <div
                key={item}
                data-register-copy
                className="rounded-[1.5rem] border border-foreground/10 bg-white/72 px-4 py-4 text-sm leading-7 text-foreground/72 shadow-[0_18px_40px_-34px_rgba(16,24,40,0.5)]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center p-5 md:p-8 lg:p-10">
          <motion.div
            ref={sheetRef}
            data-register-form
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-[2rem] border border-foreground/12 bg-[#fffdf8] p-7 shadow-[0_28px_100px_-50px_rgba(16,24,40,0.45)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-secondary text-white shadow-[0_16px_40px_-16px_rgba(27,77,140,0.58)]">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <div className="absolute left-0 right-0 top-24 border-t border-dashed border-foreground/12" />
            <div className="absolute bottom-0 left-7 right-7 h-px bg-[linear-gradient(to_right,transparent,rgba(16,24,40,0.2),transparent)]" />

            <div className="pr-16">
              <p className="editorial-label">Account setup</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                创建新账号
              </h2>
              <p className="mt-3 text-sm leading-7 text-foreground/64">
                填写基础信息后即可进入你的 AI 思维导图工作空间。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <FieldShell
                  label="你的名称"
                  icon={<UserRound className="h-5 w-5" />}
                >
                  <input
                    type="text"
                    placeholder="例如：Allure"
                    className="editorial-input"
                  />
                </FieldShell>

                <FieldShell label="电子邮箱" icon={<Mail className="h-5 w-5" />}>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="editorial-input"
                  />
                </FieldShell>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FieldShell label="密码" icon={<Lock className="h-5 w-5" />}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="至少 8 位"
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

                <FieldShell label="确认密码" icon={<Lock className="h-5 w-5" />}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="再次输入密码"
                    className="editorial-input pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/45 transition hover:text-foreground"
                    aria-label="toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </FieldShell>
              </div>

              <label className="flex items-start gap-3 rounded-[1.25rem] border border-foreground/10 bg-white/76 px-4 py-4 text-sm leading-7 text-foreground/62">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-foreground/20 bg-transparent text-brand-primary"
                />
                我已阅读并同意服务条款与隐私政策，允许创建账号并进入工作台。
              </label>

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
                        创建中...
                      </>
                    ) : (
                      <>
                        创建账号
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </form>

            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground/40">
              <span className="h-px flex-1 bg-foreground/10" />
              account entry
              <span className="h-px flex-1 bg-foreground/10" />
            </div>

            <p className="mt-6 text-sm text-foreground/58">
              已经有账号？{" "}
              <Link
                href="/login"
                className="font-semibold text-brand-primary hover:opacity-80"
              >
                直接登录
              </Link>
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/80 px-4 py-2 text-xs font-medium text-foreground/62">
              <Brain className="h-4 w-4 text-brand-secondary" />
              注册后即可进入文档上传与导图生成工作流
            </div>
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
