'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Mail, Lock, ArrowRight, GitHub } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (orbRef1.current && orbRef2.current) {
      gsap.to(orbRef1.current, {
        x: '+=100',
        y: '+=150',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
      gsap.to(orbRef2.current, {
        x: '-=150',
        y: '-=100',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Animated Orbs */}
      <div 
        ref={orbRef1}
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-primary/20 blur-[120px] pointer-events-none" 
      />
      <div 
        ref={orbRef2}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-secondary/20 blur-[120px] pointer-events-none" 
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="glass p-8 md:p-10 rounded-3xl shadow-2xl border border-white/10">
          <div className="text-center mb-10">
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-3 tracking-tight"
            >
              欢迎回来
            </motion.h1>
            <p className="text-muted-foreground text-sm">
              登录 AI Job Pilot，开启智能思维导图之旅
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                电子邮箱
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-brand-primary transition-colors" />
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                密码
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-brand-secondary transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-white/10 bg-white/5 text-brand-primary focus:ring-0" />
                <span className="text-muted-foreground">记住我</span>
              </label>
              <a href="#" className="text-brand-primary hover:text-brand-secondary transition-colors">忘记密码？</a>
            </div>

            <button className="w-full group relative overflow-hidden bg-brand-primary hover:bg-brand-secondary text-white rounded-2xl py-4 font-bold transition-all duration-300 shadow-lg shadow-brand-primary/20">
              <span className="relative z-10 flex items-center justify-center gap-2">
                登录 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <span className="relative z-10 bg-transparent px-4 text-xs text-muted-foreground">或通过以下方式登录</span>
            </div>

            <button className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl py-3 text-sm font-medium transition-all">
              <GitHub className="w-5 h-5" /> GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            还没有账号？ <Link href="/" className="text-brand-primary font-semibold hover:underline">立即注册</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
