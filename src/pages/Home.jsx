import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Users,
  TrendingUp,
  Trophy,
  Play,
  ExternalLink,
  Zap,
} from "lucide-react";

const words = ["Practice.", "Collaborate.", "Level up."];

const features = [
  {
    to: "/problems",
    icon: Code2,
    title: "Problems",
    desc: "Solve curated problems in a VS Code-style editor and run your C++ instantly.",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    to: "/rooms",
    icon: Users,
    title: "Interactive Rooms",
    desc: "Discuss approaches and chat with other coders while you solve.",
    accent: "from-cyan-500 to-sky-500",
  },
  {
    to: "/profile",
    icon: TrendingUp,
    title: "Your Progress",
    desc: "Bookmark problems, mark them solved and watch your stats grow.",
    accent: "from-fuchsia-500 to-pink-500",
  },
];

const contestLinks = [
  {
    name: "LeetCode Contests",
    url: "https://leetcode.com/contest/",
    desc: "Weekly and biweekly contests.",
    dot: "bg-orange-400",
  },
  {
    name: "Codeforces Contests",
    url: "https://codeforces.com/contests",
    desc: "Upcoming and past rounds.",
    dot: "bg-sky-400",
  },
  {
    name: "AtCoder Contests",
    url: "https://atcoder.jp/contests/",
    desc: "Beginner to grand contests.",
    dot: "bg-emerald-400",
  },
];

// Lines of the demo snippet shown in the hero code window
const K = ({ children }) => <span className="text-violet-400">{children}</span>;
const T = ({ children }) => <span className="text-cyan-300">{children}</span>;
const S = ({ children }) => <span className="text-emerald-300">{children}</span>;
const C = ({ children }) => <span className="text-slate-500">{children}</span>;

const codeLines = [
  <>
    <K>#include</K> <S>&lt;bits/stdc++.h&gt;</S>
  </>,
  <>
    <K>using namespace</K> std;
  </>,
  <>&nbsp;</>,
  <>
    <T>int</T> main() {"{"}
  </>,
  <>
    {"  "}
    <T>int</T> a, b;
  </>,
  <>
    {"  "}cin &gt;&gt; a &gt;&gt; b; <C>{"// 2 3"}</C>
  </>,
  <>
    {"  "}cout &lt;&lt; a + b;
  </>,
  <>
    {"  "}
    <K>return</K> 0;
  </>,
  <>{"}"}</>,
];

const Home = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Typewriter effect for the hero headline
  useEffect(() => {
    const word = words[wordIndex];
    let delay = deleting ? 45 : 95;
    if (!deleting && typed === word) delay = 1400;
    const timer = setTimeout(() => {
      if (!deleting && typed === word) {
        setDeleting(true);
      } else if (deleting && typed === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setTyped(word.slice(0, typed.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [typed, deleting, wordIndex]);

  return (
    <div className="relative z-[1] max-w-6xl mx-auto px-4 md:px-6 pb-16">
      {/* Hero */}
      <section className="grid lg:grid-cols-2 gap-12 items-center pt-14 md:pt-20">
        <div className="fade-up">
          <span className="chip mb-5 gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Code, run and discuss in one place
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Welcome to <span className="gradient-text">ZCoder</span>
          </h1>
          <div className="mt-3 h-10 text-2xl md:text-3xl font-bold font-mono text-muted">
            <span className="cursor-blink">{typed}</span>
          </div>
          <p className="mt-4 text-base md:text-lg text-muted max-w-xl">
            Practice coding problems, collaborate in real-time rooms, and track
            your progress — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/problems" className="btn-primary">
              Start solving <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/rooms" className="btn-ghost">
              <Users className="w-4 h-4" /> Join a room
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-xs font-mono">
            <span className="chip">Monaco editor</span>
            <span className="chip">C++ runner</span>
            <span className="chip">Live chat</span>
            <span className="chip">Progress stats</span>
          </div>
        </div>

        {/* Code window */}
        <div className="fade-up delay-2">
          <div className="glass-card hover-lift overflow-hidden shadow-2xl">
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-mono text-muted">
                  solution.cpp
                </span>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <Play className="w-3.5 h-3.5" /> Run
              </span>
            </div>
            <pre className="bg-slate-950/90 text-slate-200 text-sm leading-6 p-5 overflow-x-auto">
              {codeLines.map((line, i) => (
                <div
                  key={i}
                  className="code-line"
                  style={{ animationDelay: `${0.5 + i * 0.18}s` }}
                >
                  <span className="inline-block w-6 text-slate-600 select-none">
                    {i + 1}
                  </span>
                  {line}
                </div>
              ))}
            </pre>
            <div
              className="code-line px-5 py-3 text-sm font-mono border-t bg-slate-950/90"
              style={{ borderColor: "var(--border)", animationDelay: "2.4s" }}
            >
              <span className="text-slate-500">Output &gt; </span>
              <span className="text-emerald-400 font-bold cursor-blink">5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mt-20 grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Link
            key={f.to}
            to={f.to}
            className={`glass-card hover-lift fade-up delay-${i + 1} p-6 group`}
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center text-white shadow-lg mb-4 transition-transform group-hover:scale-110 group-hover:-rotate-3`}
            >
              <f.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-1">{f.title}</h3>
            <p className="text-sm text-muted">{f.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 opacity-0 -translate-x-2 transition group-hover:opacity-100 group-hover:translate-x-0">
              Open <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </section>

      {/* Practice contests */}
      <section className="mt-12 glass-card p-6 md:p-8 fade-up delay-3">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
            <Trophy className="w-5 h-5" />
          </span>
          <h2 className="font-bold text-xl">Practice Contests</h2>
        </div>
        <p className="mb-5 text-sm text-muted">
          Sharpen your skills with real contest problems from popular
          platforms.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {contestLinks.map((contest) => (
            <a
              key={contest.name}
              href={contest.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card hover-lift px-4 py-4 flex items-start gap-3 group"
            >
              <span className={`mt-1.5 w-2.5 h-2.5 rounded-full ${contest.dot}`} />
              <span className="flex-1">
                <span className="font-semibold flex items-center gap-1">
                  {contest.name}
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 transition group-hover:opacity-70" />
                </span>
                <span className="block text-xs text-muted">{contest.desc}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer className="mt-14 text-center text-xs text-muted font-mono">
        {"// ZCoder — happy coding"}
      </footer>
    </div>
  );
};

export default Home;
