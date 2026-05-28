"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  FileStack,
  Orbit,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const orbitDots = [
  { top: "12%", left: "14%", size: 10 },
  { top: "20%", left: "78%", size: 6 },
  { top: "36%", left: "8%", size: 8 },
  { top: "44%", left: "88%", size: 12 },
  { top: "68%", left: "18%", size: 7 },
  { top: "74%", left: "82%", size: 9 },
  { top: "82%", left: "48%", size: 11 },
];

const featureCards = [
  {
    icon: ScanSearch,
    eyebrow: "Parse",
    title: "读懂长文档的真正结构",
    description: "不是只抽关键词，而是把章节、逻辑和重点关系一起拆出来。",
  },
  {
    icon: Orbit,
    eyebrow: "Map",
    title: "把信息重组成可导航脑图",
    description: "从线性阅读切换到空间化理解，知识路径一下子变清晰。",
  },
  {
    icon: FileStack,
    eyebrow: "Export",
    title: "随时导出到你的工作流",
    description: "PNG、SVG、Freemind、JSON，适配分享、存档和再编辑。",
  },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const editorialRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-kicker]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
        },
      );

      gsap.fromTo(
        "[data-hero-title] .hero-line",
        { opacity: 0, y: 64 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
          immediateRender: false,
        },
      );

      gsap.fromTo(
        "[data-hero-copy]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          immediateRender: false,
        },
      );

      gsap.fromTo(
        "[data-hero-actions]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.45,
          ease: "power3.out",
          immediateRender: false,
        },
      );

      gsap.to(".orbit-dot", {
        y: "random(-20, 20)",
        x: "random(-30, 30)",
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.08,
      });

      if (editorialRef.current) {
        gsap.fromTo(
          editorialRef.current.children,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            delay: 0.25,
            ease: "power3.out",
            immediateRender: false,
          },
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 44 },
          {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 82%",
            },
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
            immediateRender: false,
          },
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="page-noise" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,24,40,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,40,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 pointer-events-none" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[10%] h-72 w-72 rounded-full bg-brand-primary/16 blur-3xl" />
        <div className="absolute top-[22%] left-[-4%] h-80 w-80 rounded-full bg-brand-secondary/12 blur-3xl" />
        <div className="absolute bottom-[-8%] right-[14%] h-96 w-96 rounded-full bg-brand-accent/12 blur-3xl" />
        {orbitDots.map((dot) => (
          <span
            key={`${dot.top}-${dot.left}`}
            className="orbit-dot absolute rounded-full bg-brand-secondary shadow-[0_0_0_4px_rgba(255,255,255,0.65)]"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
            }}
          />
        ))}
      </div>

      <nav className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 pt-5 md:px-8">
        <Link href="/" className="editorial-chip">
          <Brain className="h-4 w-4" />
          AI Job Pilot
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-foreground/70 md:flex">
          <a href="#why" className="hover:text-foreground transition-colors">
            为什么更快
          </a>
          <a href="#flow" className="hover:text-foreground transition-colors">
            工作流
          </a>
          <a href="#launch" className="hover:text-foreground transition-colors">
            开始使用
          </a>
        </div>
        <Link href="/login" className="editorial-button editorial-button--ghost">
          登录
        </Link>
      </nav>

      <section
        ref={heroRef}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-14 px-5 pb-20 pt-10 md:px-8 md:pb-28 md:pt-16"
      >
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-4xl">
            <motion.div
              data-hero-kicker
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/72 shadow-[0_12px_35px_-22px_rgba(16,24,40,0.55)]"
            >
              <Sparkles className="h-4 w-4 text-brand-primary" />
              Editorial Mind Mapping System
            </motion.div>

            <div
              data-hero-title
              className="font-display text-[clamp(3.8rem,11vw,8.7rem)] leading-[0.9] tracking-[-0.06em] text-balance"
            >
              <div className="hero-line">TURN</div>
              <div className="hero-line text-brand-primary">DOCUMENTS</div>
              <div className="hero-line">INTO</div>
              <div className="hero-line">DECISIONS</div>
            </div>

            <p
              data-hero-copy
              className="mt-8 max-w-2xl text-base leading-8 text-foreground/72 md:text-lg"
            >
              上传一份复杂材料，系统会帮你抽出骨架、重建层级，再把它
              变成一张真正能拿来思考和表达的思维导图。不是更炫，而是更清楚。
            </p>

            <div
              data-hero-actions
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/register"
                className="editorial-button editorial-button--primary"
              >
                创建账号
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#why" className="editorial-button editorial-button--ghost">
                查看设计亮点
              </a>
            </div>
          </div>

          <div ref={editorialRef} className="grid gap-4">
            <div className="editorial-panel rotate-[-2deg]">
              <div className="mb-6 flex items-center justify-between">
                <span className="editorial-label">Live layout</span>
                <span className="rounded-full border border-foreground/10 bg-brand-accent/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-accent">
                  Active
                </span>
              </div>
              <div className="space-y-4">
                <div className="rounded-[1.6rem] border border-foreground/10 bg-white/80 p-4 shadow-[0_18px_45px_-30px_rgba(16,24,40,0.45)]">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-brand-primary/12" />
                    <div>
                      <p className="text-sm font-semibold">研究报告 / 产品说明</p>
                      <p className="text-xs text-foreground/55">上传后 3 秒开始结构化</p>
                    </div>
                  </div>
                  <div className="grid gap-2 text-xs text-foreground/65">
                    <div className="rounded-full bg-foreground px-3 py-2 text-white">
                      核心论点
                    </div>
                    <div className="ml-6 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-2">
                      支撑证据
                    </div>
                    <div className="ml-12 rounded-full border border-brand-secondary/22 bg-brand-secondary/10 px-3 py-2">
                      执行动作
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-[1.4rem] border border-dashed border-foreground/16 bg-white/55 px-4 py-3 text-sm text-foreground/70">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary" />
                  文档理解、导图生成、导出下载合成一个单流体验
                </div>
              </div>
            </div>

            <div className="editorial-note rotate-[2deg]">
              <span className="editorial-label">Design memo</span>
              <p className="mt-3 max-w-sm text-sm leading-7 text-foreground/70">
                用编辑封面感去承托“把复杂材料变得可理解”这个产品价值，
                所以版面上保留大量留白、粗标题和像纸张一样的层次。
              </p>
            </div>
          </div>
        </div>

        <div
          id="flow"
          className="grid gap-4 border-t border-foreground/10 pt-7 text-sm text-foreground/66 md:grid-cols-3"
        >
          <div>
            <p className="editorial-stat">01</p>
            <p className="mt-2 max-w-xs leading-7">拖入 PDF、Word、Markdown 或文本文件。</p>
          </div>
          <div>
            <p className="editorial-stat">02</p>
            <p className="mt-2 max-w-xs leading-7">AI 拆出章节、主题、论点、关系与重点。</p>
          </div>
          <div>
            <p className="editorial-stat">03</p>
            <p className="mt-2 max-w-xs leading-7">生成导图后继续编辑，并导出到你的下游协作工具。</p>
          </div>
        </div>
      </section>

      <section
        id="why"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-24 md:px-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="editorial-label">Why it works</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight tracking-[-0.04em] md:text-6xl">
              不是做一个更花的首页，
              <br />
              而是让信息结构先被你看见。
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-foreground/64">
            这套视觉语言刻意减少“模板感”，用纸张、编号、红色强调和模块错位，
            去服务产品的核心叙事。
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-5 lg:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="editorial-card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="editorial-label">{feature.eyebrow}</p>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em]">
                      {feature.title}
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-white/78">
                    <Icon className="h-6 w-6 text-brand-primary" />
                  </div>
                </div>
                <p className="mt-8 text-sm leading-7 text-foreground/68">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="launch"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-20 md:px-8"
      >
        <div className="editorial-banner">
          <div>
            <p className="editorial-label">Launch</p>
            <h3 className="mt-3 font-display text-4xl leading-tight tracking-[-0.04em] md:text-5xl">
              准备把下一份材料，
              <br />
              直接变成一张能讨论的图了吗？
            </h3>
          </div>
          <Link
            href="/register"
            className="editorial-button editorial-button--primary"
          >
            注册并开始
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
