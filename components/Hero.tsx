"use client";

import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Zap, 
  CreditCard, Smartphone, Activity, ArrowUpRight, 
  Terminal, RefreshCw, Send, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { HomepageContent } from "@/lib/cms-content";

interface Transaction {
  id: string;
  sender: string;
  amount: string;
  time: string;
  status: "Completed" | "Processing";
  ref: string;
}

export default function Hero({ content }: { content: HomepageContent }) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "stk-simulator">("dashboard");
  
  // Interactive STK Simulator States
  const [phone, setPhone] = useState("0712 345 678");
  const [amount, setAmount] = useState("2,500");
  const [stkStatus, setStkStatus] = useState<"idle" | "pushing" | "pin" | "success">("idle");
  const [latency, setLatency] = useState(42);

  // Live transaction feed simulation
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "tx-1", sender: "+254 722 *** 104", amount: "KES 14,200", time: "Just now", status: "Completed", ref: "SDA901KL2" },
    { id: "tx-2", sender: "+254 714 *** 892", amount: "KES 4,850", time: "12s ago", status: "Completed", ref: "SD8821LM4" },
    { id: "tx-3", sender: "+254 798 *** 431", amount: "KES 32,000", time: "44s ago", status: "Completed", ref: "SD7190XX9" },
  ]);

  // Periodic simulated live transactions
  useEffect(() => {
    const names = ["+254 701 *** 554", "+254 718 *** 302", "+254 790 *** 911", "+254 723 *** 618"];
    const amounts = ["KES 8,500", "KES 19,400", "KES 3,250", "KES 45,000"];
    
    const interval = setInterval(() => {
      const randomSender = names[Math.floor(Math.random() * names.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      const newTx: Transaction = {
        id: "tx-" + Date.now(),
        sender: randomSender,
        amount: randomAmount,
        time: "Just now",
        status: "Completed",
        ref: "SD" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      };

      setTransactions((prev) => [newTx, prev[0], prev[1]]);
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  const triggerStkTest = () => {
    setStkStatus("pushing");
    setTimeout(() => {
      setStkStatus("pin");
      setTimeout(() => {
        setStkStatus("success");
        setLatency(Math.floor(Math.random() * 15) + 38);
      }, 1600);
    }, 1200);
  };

  const resetStk = () => {
    setStkStatus("idle");
  };

  return (
    <section className="relative pt-[calc(var(--header)+40px)] pb-20 md:pb-28 bg-white border-b border-[#E2E5EA] overflow-hidden">
      {/* Background technical hairline grid */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#0A0B0D 1px, transparent 1px), linear-gradient(to right, #0A0B0D 1px, transparent 1px)",
          backgroundSize: "44px 44px"
        }}
      />

      <div className="shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left: Value Proposition */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[#D0DEFF] text-[#0052FF] text-xs font-semibold tracking-wide mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF]"></span>
              </span>
              <span>ENGINEERED FOR AFRICAN ENTERPRISE SCALE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-medium tracking-tight text-[#0A0B0D] leading-[1.08] mb-6">
              {content.heroTitle.split("\n").map((line, index, lines) => (
                <Fragment key={`${line}-${index}`}>
                  {index === lines.length - 1 ? (
                    <span className="text-[#0052FF]">{line}</span>
                  ) : (
                    line
                  )}
                  {index < lines.length - 1 ? <br /> : null}
                </Fragment>
              ))}
            </h1>

            <p className="text-lg text-[#5B616E] font-normal leading-relaxed max-w-xl mb-8">
              {content.heroBody}
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link 
                href="/contact" 
                className="button-primary text-base !py-3.5 !px-8 w-full sm:w-auto shadow-sm hover:shadow-md"
              >
                <span>Start a project</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link 
                href="/work" 
                className="button-secondary text-base !py-3.5 !px-8 w-full sm:w-auto"
              >
                Explore client work
              </Link>
            </div>

            {/* Technical Proof Pills */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#E2E5EA] text-xs text-[#5B616E] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0052FF]" />
                M-Pesa Daraja 2.0 Native
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
                Kenya Data Protection (ODPC)
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#0052FF]" />
                99.98% Cloud Uptime SLA
              </span>
            </div>
          </div>

          {/* Right: Real Interactive Software & Payment Mockup */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-[#0A0B0D] rounded-3xl p-2 sm:p-3 shadow-2xl border border-[#1E2025]">
              
              {/* Product Window Topbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-2 text-xs font-mono text-neutral-400 hidden sm:inline">
                    fentech.core.ke/production-gateway
                  </span>
                </div>

                {/* Interactive Mode Switcher */}
                <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setActiveTab("dashboard")}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      activeTab === "dashboard"
                        ? "bg-[#0052FF] text-white font-semibold shadow-xs"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Enterprise ERP
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("stk-simulator")}
                    className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                      activeTab === "stk-simulator"
                        ? "bg-[#0052FF] text-white font-semibold shadow-xs"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>M-Pesa STK Flow</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </button>
                </div>
              </div>

              {/* View 1: Real Enterprise Financial & Gateway Dashboard */}
              {activeTab === "dashboard" && (
                <div className="p-4 sm:p-5 bg-[#0D1117] rounded-2xl">
                  {/* Top Metric Bar */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10">
                      <div className="text-[11px] text-neutral-400 uppercase font-semibold">Today's Inflow</div>
                      <div className="text-lg sm:text-xl font-bold text-white mt-0.5">KES 482,900</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                        <ArrowUpRight className="w-3 h-3" /> +18.4% velocity
                      </div>
                    </div>

                    <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10">
                      <div className="text-[11px] text-neutral-400 uppercase font-semibold">Gateway Latency</div>
                      <div className="text-lg sm:text-xl font-bold text-white mt-0.5">41 ms</div>
                      <div className="text-[10px] text-emerald-400">● Optimal Safaricom Route</div>
                    </div>

                    <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10">
                      <div className="text-[11px] text-neutral-400 uppercase font-semibold">Reconciliation</div>
                      <div className="text-lg sm:text-xl font-bold text-white mt-0.5">100%</div>
                      <div className="text-[10px] text-blue-400">Postgres Ledger Sync</div>
                    </div>
                  </div>

                  {/* SVG Financial Performance Graph */}
                  <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/5 mb-4">
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                      <span className="font-semibold text-neutral-200">Payment Throughput (Nairobi Node)</span>
                      <span className="text-emerald-400 font-mono text-[11px]">Live: 240 req/min</span>
                    </div>
                    
                    <div className="h-20 w-full relative">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 400 80" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0052FF" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,60 Q40,30 80,45 T160,20 T240,35 T320,15 T400,25 L400,80 L0,80 Z"
                          fill="url(#chartGradient)"
                        />
                        <path
                          d="M0,60 Q40,30 80,45 T160,20 T240,35 T320,15 T400,25"
                          fill="none"
                          stroke="#0052FF"
                          strokeWidth="2.5"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Live Animated M-Pesa Inflow Stream */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-medium">
                      <span>Live Inflow Ledger</span>
                      <span className="text-[10px] text-neutral-500 font-mono">Daraja Callback Stream</span>
                    </div>

                    <div className="space-y-2">
                      <AnimatePresence initial={false}>
                        {transactions.map((tx) => (
                          <motion.div
                            key={tx.id}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-white/[0.05] hover:bg-white/[0.08] transition-colors p-2.5 rounded-xl border border-white/5 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                                KES
                              </div>
                              <div>
                                <div className="text-white font-mono text-[11px]">{tx.sender}</div>
                                <div className="text-neutral-500 text-[10px] font-mono">{tx.ref} · {tx.time}</div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-emerald-400 font-bold">{tx.amount}</div>
                              <div className="text-[10px] text-neutral-400">Verified</div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}

              {/* View 2: Interactive M-Pesa STK Push Simulator */}
              {activeTab === "stk-simulator" && (
                <div className="p-4 sm:p-6 bg-[#0D1117] rounded-2xl min-h-[350px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <div>
                        <div className="text-sm font-semibold text-white">Interactive Daraja 2.0 API Sandbox</div>
                        <div className="text-xs text-neutral-400">Trigger simulated M-Pesa STK push and verify response payload</div>
                      </div>
                      <button 
                        onClick={resetStk}
                        className="text-neutral-400 hover:text-white p-1 text-xs flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Reset
                      </button>
                    </div>

                    {/* Simulator Form & Phone Screen */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      {/* Left: Input parameters */}
                      <div className="space-y-3">
                        <div>
                          <label className="text-[11px] uppercase font-semibold text-neutral-400 block mb-1">
                            Customer Phone Number
                          </label>
                          <input 
                            type="text" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={stkStatus !== "idle"}
                            className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-white text-xs font-mono outline-none focus:border-[#0052FF]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] uppercase font-semibold text-neutral-400 block mb-1">
                            Amount (KES)
                          </label>
                          <input 
                            type="text" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={stkStatus !== "idle"}
                            className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-white text-xs font-mono outline-none focus:border-[#0052FF]"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={triggerStkTest}
                          disabled={stkStatus !== "idle"}
                          className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                            stkStatus === "idle"
                              ? "bg-[#0052FF] text-white hover:bg-[#003ECC] cursor-pointer"
                              : "bg-white/10 text-neutral-400 cursor-not-allowed"
                          }`}
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{stkStatus === "idle" ? "Dispatch STK Push" : "Processing Gateway..."}</span>
                        </button>
                      </div>

                      {/* Right: Simulated Mobile Prompt Device */}
                      <div className="bg-[#161B22] border border-white/10 rounded-2xl p-4 text-center flex flex-col items-center justify-center min-h-[160px]">
                        {stkStatus === "idle" && (
                          <div className="text-neutral-400 text-xs">
                            <Smartphone className="w-8 h-8 mx-auto mb-2 text-neutral-500" />
                            <span>Click &quot;Dispatch STK Push&quot; to test Kenya payment simulation</span>
                          </div>
                        )}

                        {stkStatus === "pushing" && (
                          <div className="space-y-2">
                            <RefreshCw className="w-6 h-6 text-[#0052FF] animate-spin mx-auto" />
                            <div className="text-xs text-white font-medium">Connecting to Safaricom Daraja...</div>
                            <div className="text-[10px] text-neutral-500 font-mono">POST /mpesa/stkpush/v1/processrequest</div>
                          </div>
                        )}

                        {stkStatus === "pin" && (
                          <div className="bg-white rounded-xl p-3 text-[#0A0B0D] shadow-lg w-full max-w-[200px]">
                            <div className="text-[11px] font-bold text-emerald-600 mb-1">M-PESA PROMPT</div>
                            <div className="text-[10px] font-medium leading-tight">Pay FenTech KES {amount}?</div>
                            <div className="mt-2 text-[10px] text-neutral-500 font-mono tracking-widest">● ● ● ●</div>
                          </div>
                        )}

                        {stkStatus === "success" && (
                          <div className="space-y-1">
                            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-1">
                              <Check className="w-4 h-4" />
                            </div>
                            <div className="text-xs text-white font-bold">Transaction Reconciled</div>
                            <div className="text-[10px] text-emerald-400 font-mono">Callback received in {latency}ms</div>
                            <div className="text-[10px] text-neutral-500 font-mono">HTTP 200 OK · Written to DB</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Micro Footer */}
                  <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Safaricom Daraja 2.0 Certified</span>
                    <span className="text-emerald-400">Ready for Production Deployments</span>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
