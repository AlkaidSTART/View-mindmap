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
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        top: `${(i * 37) % 100}%`,
        left: `${(i * 53) % 100}%`,
      })),
    [],
  );

  useEffect(() => {
    // Hero Section Animation
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.2,
      });

      // Floating particles
      const particles = document.querySelectorAll(".particle");
      particles.forEach((p) => {
        gsap.to(p, {
          y: "random(-100, 100)",
          x: "random(-100, 100)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Cards scroll trigger
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle absolute w-1 h-1 bg-brand-primary/30 rounded-full"
            style={{
              top: particle.top,
              left: particle.left,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden"
      >
        <div className="text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium tracking-wide">
              AI 驱动的生产力革命
            </span>
          </motion.div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1]"
          >
            DOCUMENT <br />
            <span className="text-gradient">INTO BRAIN</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
            AI Job Pilot
            利用最先进的大型语言模型，将文档内容自动化转化为层级化的思维导图。
            从上传到生成，仅需数秒。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
            >
              立刻开始{" "}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 glass border border-white/10 font-bold rounded-2xl hover:bg-white/5 transition-all text-white"
            >
              获取文档
            </Link>
          </div>
        </div>

        {/* Floating Mockup (Conceptual) */}
        <div className="mt-24 relative p-2 glass rounded-[2.5rem] border border-white/10 max-w-5xl mx-auto overflow-hidden shadow-2xl">
          <div className="bg-background/50 rounded-[2rem] aspect-video flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5" />
            <div className="flex flex-col items-center gap-4 text-center z-10">
              <div className="w-24 h-24 rounded-full bg-brand-primary/10 flex items-center justify-center animate-pulse">
                <FileUp className="w-10 h-10 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">拖拽上传文档</h3>
                <p className="text-muted-foreground text-sm">
                  支持 PDF, Word, Markdown, Text
                </p>
              </div>
            </div>

            {/* Abstract Node connectors */}
            <div className="absolute top-1/4 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent -rotate-45" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-brand-secondary to-transparent rotate-45" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-bold tracking-tight mb-4">核心优势</h2>
          <div className="h-1 w-20 bg-brand-primary rounded-full" />
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-yellow-400" />}
            title="极速提取"
            description="基于高效的内容管道，毫秒级解析大型文档内容。"
          />
          <FeatureCard
            icon={<Cpu className="w-6 h-6 text-brand-primary" />}
            title="生成式 AI"
            description="内置阿里百炼通义千问模型，理解能力更进一步。"
          />
          <FeatureCard
            icon={<Share2 className="w-6 h-6 text-brand-secondary" />}
            title="多端导出"
            description="支持 PNG, SVG, Freemind 等多种专业思维导图格式。"
          />
          <FeatureCard
            icon={<MousePointer2 className="w-6 h-6 text-brand-accent" />}
            title="实时预览"
            description="流畅的 MindElixir 渲染引擎，所见即所得的交互体验。"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tighter">
              AI Job Pilot
            </span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-white transition-colors">
              隐私协议
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              服务条款
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              关于我们
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2026 AI Job Pilot. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group glass p-8 rounded-3xl border border-white/10 hover:border-brand-primary/50 transition-all duration-500 hover:-translate-y-2">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
