"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  Zap,
  FileUp,
  Cpu,
  Share2,
  ChevronRight,
  Sparkles,
  MousePointer2,
  Brain,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        top: `${(i * 41) % 100}%`,
        left: `${(i * 59) % 100}%`,
        size: 4 + ((i * 7) % 8),
      })),
    [],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
      });

      const ps = document.querySelectorAll(".particle");
      ps.forEach((p) => {
        gsap.to(p, {
          y: "random(-80, 80)",
          x: "random(-80, 80)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen text-foreground">
      {/* Floating blurred orbs (background) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-15%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-primary/30 blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-brand-secondary/30 blur-[120px] animate-blob [animation-delay:-6s]" />
        <div className="absolute bottom-[-15%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-brand-accent/20 blur-[140px] animate-blob [animation-delay:-12s]" />
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle absolute rounded-full bg-white/60 border border-white/80 shadow"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Nav */}
      <nav className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
        <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/30">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tight text-lg">
              AI Job Pilot
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">
              功能
            </a>
            <a href="#how" className="hover:text-foreground transition">
              使用流程
            </a>
            <a href="#" className="hover:text-foreground transition">
              文档
            </a>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl bg-foreground text-white text-sm font-semibold hover:opacity-90 transition"
          >
            登录
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-20 pb-24 px-6 max-w-6xl mx-auto"
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-medium tracking-wide text-foreground/80">
              AI · 文档 · 思维导图 · 三秒生成
            </span>
          </motion.div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.05]"
          >
            把文档<span className="text-gradient">变成大脑</span>
            <br />
            一目了然
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
            上传 PDF、Word、Markdown，AI 自动解析结构，
            <br className="hidden md:block" />
            生成可编辑的层级思维导图，知识从此清晰。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="px-7 py-3.5 bg-foreground text-white font-semibold rounded-2xl hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-2 group shadow-xl shadow-foreground/10"
            >
              立即开始
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="px-7 py-3.5 glass font-semibold rounded-2xl hover:bg-white/80 transition-all text-foreground"
            >
              查看演示
            </a>
          </div>
        </div>

        {/* Hero showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-20 relative p-3 glass-strong rounded-[2.5rem] max-w-5xl mx-auto"
        >
          <div className="rounded-4xl aspect-video bg-linear-to-br from-white/80 to-white/40 flex items-center justify-center relative overflow-hidden border border-white/60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,140,255,0.18),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,154,162,0.18),transparent_50%)]" />
            <div className="flex flex-col items-center gap-4 text-center z-10">
              <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center animate-float">
                <FileUp className="w-10 h-10 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  拖拽上传，秒级理解
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  PDF · Word · Markdown · Text
                </p>
              </div>
            </div>
            <div className="absolute top-1/4 left-1/4 w-40 h-px bg-linear-to-r from-transparent via-brand-primary/60 to-transparent -rotate-12" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-px bg-linear-to-r from-transparent via-brand-secondary/60 to-transparent rotate-12" />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight mb-3">核心能力</h2>
          <p className="text-muted-foreground">
            为知识工作者设计的极简高效流程
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            color="from-amber-300 to-orange-400"
            title="极速提取"
            description="毫秒级解析大型文档，结构智能拆分。"
          />
          <FeatureCard
            icon={<Cpu className="w-6 h-6" />}
            color="from-indigo-400 to-purple-500"
            title="生成式 AI"
            description="接入通义千问，深度理解上下文语义。"
          />
          <FeatureCard
            icon={<Share2 className="w-6 h-6" />}
            color="from-pink-400 to-rose-500"
            title="多端导出"
            description="支持 PNG、SVG、Freemind 标准格式。"
          />
          <FeatureCard
            icon={<MousePointer2 className="w-6 h-6" />}
            color="from-sky-400 to-cyan-500"
            title="实时预览"
            description="MindElixir 引擎，所见即所得交互体验。"
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="glass-strong rounded-4xl p-10 md:p-14">
          <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">
            三步生成你的思维大脑
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "上传文档", d: "拖拽或选择本地文件" },
              { n: "02", t: "AI 解析", d: "结构化抽取知识节点" },
              { n: "03", t: "导出分享", d: "下载导图，沉淀知识" },
            ].map((s) => (
              <div
                key={s.n}
                className="glass rounded-2xl p-6 hover:-translate-y-1 transition-transform"
              >
                <div className="text-3xl font-black text-gradient mb-3">
                  {s.n}
                </div>
                <h3 className="font-bold text-lg mb-1">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6">
        <div className="max-w-6xl mx-auto glass rounded-2xl px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold tracking-tight">AI Job Pilot</span>
          </div>
          <div className="flex gap-6 text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition">
              隐私
            </Link>
            <Link href="#" className="hover:text-foreground transition">
              条款
            </Link>
            <Link href="#" className="hover:text-foreground transition">
              关于
            </Link>
          </div>
          <div className="text-muted-foreground">© 2026 AI Job Pilot</div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="group glass p-6 rounded-3xl hover:-translate-y-1.5 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-primary/10">
      <div
        className={`w-12 h-12 rounded-2xl bg-linear-to-br ${color} text-white flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
