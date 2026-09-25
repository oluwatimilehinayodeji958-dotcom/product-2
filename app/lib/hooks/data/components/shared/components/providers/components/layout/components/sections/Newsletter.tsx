"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle2,
  Brain,
  Sparkles,
  Zap,
  BookOpen,
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlassCard } from "@/components/shared/GradientCard";
import { cn, isValidEmail } from "@/lib/utils";

const benefits = [
  {
    icon: Sparkles,
    title: "Research Updates",
    description: "Monthly summaries of our latest discoveries and publications.",
  },
  {
    icon: Zap,
    title: "Event Invitations",
    description: "Early access to workshops, seminars, and conferences.",
  },
  {
    icon: BookOpen,
    title: "Educational Content",
    description: "Curated resources and insights from our researchers.",
  },
];

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="section-padding bg-gradient-to-br from-eagle-green-dark via-eagle-green to-eagle-slate relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,162,39,0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(11,107,58,0.2)_0%,_transparent_50%)]" />
      
      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 text-white/5"
      >
        <Brain className="w-32 h-32" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 right-20 text-white/5"
      >
        <Mail className="w-24 h-24" />
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 text-eagle-gold" />
                Stay Connected
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                Join Our Research Community
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Subscribe to receive the latest updates on our research breakthroughs, 
                upcoming events, and opportunities to engage with Eagle's Lab.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Benefits */}
            <div className="lg:col-span-2 space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-eagle-gold/20 flex items-center justify-center text-eagle-gold flex-shrink-0">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
                    <p className="text-sm text-white/60">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <ScrollReveal direction="right" className="lg:col-span-3">
              <GlassCard intensity="strong" className="p-8">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-eagle-slate dark:text-white mb-2">
                      Welcome to the Community!
                    </h3>
                    <p className="text-eagle-gray-600 dark:text-eagle-gray-400">
                      You've successfully subscribed to Eagle's Lab updates. Check your inbox for a confirmation email.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="newsletter-email" className="block text-sm font-medium text-eagle-slate dark:text-white mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-eagle-gray-400" />
                        <input
                          id="newsletter-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") setStatus("idle");
                          }}
                          placeholder="you@example.com"
                          className={cn(
                            "w-full pl-12 pr-4 py-4 rounded-xl border bg-white dark:bg-eagle-gray-800 text-eagle-slate dark:text-white placeholder:text-eagle-gray-400",
                            "focus:outline-none focus:ring-2 focus:ring-eagle-green/50 transition-all",
                            status === "error" ? "border-red-300 focus:border-red-500" : "border-eagle-gray-200 dark:border-eagle-gray-700"
                          )}
                        />
                      </div>
                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 mt-2"
                        >
                          {errorMessage}
                        </motion.p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300",
                        status === "loading"
                          ? "bg-eagle-gray-300 text-eagle-gray-500 cursor-not-allowed"
                          : "bg-eagle-green hover:bg-eagle-green-dark text-white hover:shadow-glow-green"
                      )}
                    >
                      {status === "loading" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Subscribe to Updates
                        </>
                      )}
                    </button>

                    <p className="text-xs text-eagle-gray-500 dark:text-eagle-gray-400 text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}