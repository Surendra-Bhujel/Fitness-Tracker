import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaDumbbell, FaArrowRight,
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn
} from 'react-icons/fa';

/* ─── Dark Elegant Design Tokens ───────────────────────────── */
const BG          = '#0a0a0a';
const BG_RAISED   = '#121212';
const PAPER       = '#1e1e1e';
const INK         = '#ffffff';
const ACCENT      = '#f5c400';
const TEXT        = '#e8e8e8';
const TEXT_DIM    = '#a3a3a3';
const TEXT_DIMMER = '#666666';
const LINE        = 'rgba(255,255,255,0.08)';
const LINE_STRONG = 'rgba(255,255,255,0.18)';

const DISPLAY = "'Anton', sans-serif";
const MONO    = "'JetBrains Mono', monospace";
const BODY    = "'Inter', system-ui, sans-serif";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerParent = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.08 } }
};

const footerColumns = [
  { title: 'Product', links: ['The log', 'Progress', 'Pricing', 'Changelog'] },
  { title: 'Company', links: ['About', 'Careers', 'Contact'] },
  { title: 'Resources', links: ['Help center', 'Community', 'Guides'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Admin Portal'] }
];

const scoreboard = [
  { num: '1.2M+', label: 'Sets logged' },
  { num: '98K', label: 'Active lifters' },
  { num: '14', label: 'Day median streak' },
  { num: '+9%', label: 'Avg. quarterly PR gain' }
];

const features = [
  {
    tag: 'SET / REP / LOAD',
    title: 'Log a set in two taps',
    desc: 'Type the exercise once and it’s remembered — next time it autofills your last weight, reps, and rest.',
    readout: 'avg. entry time: 4.2s'
  },
  {
    tag: 'STRENGTH CURVE',
    title: 'See the plateau before you hit it',
    desc: '1RM estimates and volume plotted lift-by-lift.',
    readout: 'tracks: 1RM est. · weekly volume'
  },
  {
    tag: 'RECOVERY SCORE',
    title: 'Know when to load, when to deload',
    desc: 'Recovery scored from training load and soreness.',
    readout: "today's readout: 87 / high readiness"
  },
  {
    tag: 'CYCLE GOALS',
    title: 'Goals that flex with your program',
    desc: 'Targets tied to real training cycles.',
    readout: 'this cycle: 4 / 10 sessions'
  }
];

const entries = [
  {
    initials: 'J.KIM',
    meta: 'Powerlifter · 3 yrs',
    quote: 'I stopped guessing my working weight every session. Six weeks of a flat volume trend, then a new deadlift PR.',
    cite: 'posted after a 605lb pull'
  },
  {
    initials: 'M.RODRIGUEZ',
    meta: 'CrossFit · 5 yrs',
    quote: 'The recovery score is the only reason I stopped training through soreness.',
    cite: 'logged from the box'
  },
  {
    initials: 'A.LEE',
    meta: 'Marathon · 2 yrs',
    quote: 'No badges, no confetti — just my splits and mileage.',
    cite: 'week 14 of a 16-week block'
  }
];

const btn = {
  display: 'inline-flex', alignItems: 'center', gap: 10,
  padding: '14px 28px', fontSize: 14.5, fontWeight: 600,
  border: `1.5px solid ${LINE_STRONG}`, borderRadius: '8px',
  textDecoration: 'none', color: TEXT, background: 'transparent',
  cursor: 'pointer', transition: 'all 0.25s ease'
};

const btnSolid = { 
  ...btn, 
  background: ACCENT, 
  color: '#111', 
  borderColor: ACCENT, 
  fontWeight: 700,
  boxShadow: '0 4px 15px rgba(245, 196, 0, 0.25)'
};

const LandingPage = () => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();

  return (
    <div style={{ background: BG, color: TEXT, fontFamily: BODY, overflowX: 'hidden' }}>

      {/* GLASSMORPHISM NAVBAR */}
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ 
          background: 'rgba(10, 10, 10, 0.75)', 
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${LINE_STRONG}`,
          height: 88,
          zIndex: 1000,
        }}
      >
        <div className="container d-flex align-items-center justify-content-between" style={{ height: '100%' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 27, fontWeight: 700, color: INK, textDecoration: 'none' }}>
            <FaDumbbell size={32} color={ACCENT} />
            FITFORGE
          </Link>

          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse d-lg-flex" id="navbarNav">
            <div className="d-none d-lg-flex align-items-center me-auto" style={{ gap: "32px", marginLeft: "60px" }}>
              <a href="#features" style={{ fontSize: 15.5, color: TEXT_DIM, textDecoration: 'none', fontWeight: 500 }}>Features</a>
              <a href="#stats" style={{ fontSize: 15.5, color: TEXT_DIM, textDecoration: 'none', fontWeight: 500 }}>Stats</a>
              <a href="#reviews" style={{ fontSize: 15.5, color: TEXT_DIM, textDecoration: 'none', fontWeight: 500 }}>Reviews</a>
            </div>

            <div className="d-flex gap-3">
              <Link to="/login" style={btn}>Sign in</Link>
              <Link to="/register" style={btnSolid}>Start logging</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 220, paddingBottom: 140, borderBottom: `1px solid ${LINE}` }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.div variants={staggerParent} initial="hidden" animate="visible">
                <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <span style={{ width: 28, height: 3, background: ACCENT }} />
                  <span style={{ fontSize: 13.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: TEXT_DIM }}>
                    A training log for lifters
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  style={{ 
                    fontFamily: DISPLAY, 
                    textTransform: 'uppercase', 
                    fontSize: 'clamp(54px, 7.5vw, 88px)', 
                    lineHeight: 0.9, 
                    marginBottom: 32,
                    letterSpacing: '-0.03em'
                  }}
                >
                  Write it down.<br />
                  Load it up.<br />
                  <span style={{ color: ACCENT }}>Beat it next week.</span>
                </motion.h1>

                <motion.p variants={fadeUp} style={{ fontSize: 18.5, color: TEXT_DIM, lineHeight: 1.7, maxWidth: 520, marginBottom: 48 }}>
                  No streaks. No AI coach. Just a clean, powerful log built for real strength training.
                </motion.p>

                <motion.div variants={fadeUp} className="d-flex flex-wrap gap-4">
                  <Link to="/register" style={{ ...btnSolid, padding: '18px 38px', fontSize: 16.5 }}>
                    Start your log — free <FaArrowRight size={18} />
                  </Link>
                  <Link to="/login" style={{ ...btn, padding: '18px 38px', fontSize: 16.5 }}>
                    View demo log
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* White Log Mockup */}
            <div className="col-lg-6 d-none d-lg-block">
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: -1 }}
                transition={{ duration: 0.9 }}
                style={{
                  background: '#f8f8f8',
                  color: '#111',
                  padding: '40px 44px 36px',
                  borderRadius: '16px',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                  border: `1px solid rgba(0,0,0,0.1)`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28, borderBottom: '2px solid #222', paddingBottom: 14 }}>
                  <span style={{ fontWeight: 700, letterSpacing: '0.5px' }}>PUSH DAY</span>
                  <span style={{ fontFamily: MONO, color: '#444' }}>{dateStr} • SESSION 47</span>
                </div>

                {[
                  { ex: 'Bench Press', sets: '4×5 @ 185' },
                  { ex: 'Incline DB Press', sets: '3×8 @ 60' },
                  { ex: 'Cable Fly', sets: '3×12 @ 35' },
                  { ex: 'Overhead Press', sets: '3×6 @ 135' },
                ].map((row, i) => (
                  <div key={i} style={{ 
                    display: 'flex', justifyContent: 'space-between', padding: '13px 0',
                    borderBottom: i < 3 ? '1px solid #ddd' : 'none', fontSize: 16.5 
                  }}>
                    <span style={{ fontWeight: 600 }}>{row.ex}</span>
                    <span style={{ fontFamily: MONO }}>{row.sets}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SCOREBOARD */}
      <div id="stats" style={{ background: BG_RAISED, padding: '110px 0', borderBottom: `1px solid ${LINE}` }}>
        <div className="container">
          <div className="row g-0 text-center">
            {scoreboard.map((s, i) => (
              <motion.div
                key={i}
                className="col-6 col-md-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: '40px 20px', borderLeft: i > 0 ? `1px solid ${LINE}` : 'none' }}
              >
                <div style={{ fontFamily: MONO, fontSize: 44, fontWeight: 700, color: ACCENT }}>{s.num}</div>
                <div style={{ fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: TEXT_DIM, marginTop: 10 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="features" className="container" style={{ padding: '140px 0', borderBottom: `1px solid ${LINE}` }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 620, marginBottom: 80 }}>
          <div style={{ color: ACCENT, fontSize: 13.5, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>WHAT'S IN THE LOG</div>
          <h2 style={{ fontFamily: DISPLAY, textTransform: 'uppercase', fontSize: 'clamp(38px, 5.5vw, 58px)', lineHeight: 1.05 }}>
            Built around the barbell,<br />not the badge
          </h2>
        </motion.div>

        <div className="row g-0" style={{ border: `1px solid ${LINE}`, borderRadius: '16px', overflow: 'hidden' }}>
          {features.map((f, i) => (
            <motion.div key={i} className="col-md-6" style={{
              padding: '54px 48px',
              borderRight: i % 2 === 0 ? `1px solid ${LINE}` : 'none',
              borderBottom: i < 2 ? `1px solid ${LINE}` : 'none',
              background: PAPER
            }}>
              <span style={{ fontFamily: MONO, color: TEXT_DIMMER, fontSize: 13 }}>{f.tag}</span>
              <h3 style={{ margin: '18px 0 16px', fontSize: 23 }}>{f.title}</h3>
              <p style={{ color: TEXT_DIM, lineHeight: 1.75 }}>{f.desc}</p>
              <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${LINE}`, fontFamily: MONO, color: ACCENT }}>
                {f.readout}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ padding: '160px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <h2 style={{ fontFamily: DISPLAY, textTransform: 'uppercase', fontSize: 'clamp(44px, 7vw, 72px)', lineHeight: 1.05, marginBottom: 28 }}>
            Your next PR is<br />already in the log.
          </h2>
          <p style={{ color: TEXT_DIM, fontSize: 18.5, maxWidth: 520, margin: '0 auto 48px' }}>
            Free forever for a single training log. No card required.
          </p>
          <Link to="/register" style={{ ...btnSolid, padding: '20px 44px', fontSize: 17 }}>
            Start logging now <FaArrowRight size={18} />
          </Link>
        </div>
      </motion.div>

      {/* MODERN FOOTER */}
      <footer style={{ background: '#050505', padding: '110px 0 60px', borderTop: `1px solid ${LINE}` }}>
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-5">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
                <FaDumbbell size={34} color={ACCENT} /> FITFORGE
              </div>
              <p style={{ color: TEXT_DIM, maxWidth: 340, fontSize: 16, lineHeight: 1.8 }}>
                A clean training log for lifters who care about real progress.
              </p>
            </div>

            {footerColumns.map((col, idx) => (
              <div key={idx} className="col-lg-2 col-md-3 col-6">
                <h6 style={{ color: ACCENT, fontSize: 13, letterSpacing: '0.15em', marginBottom: 20 }}>{col.title}</h6>
                <ul className="list-unstyled">
                  {col.links.map((link, i) => (
                    <li key={i} className="mb-3">
                      <a href="#" style={{ color: TEXT_DIM, textDecoration: 'none' }}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <hr style={{ borderColor: LINE, margin: '60px 0 30px' }} />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
            <div style={{ color: TEXT_DIMMER, fontSize: 14 }}>© 2026 FitForge. Made for lifters.</div>
            
            <div className="d-flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" style={{ color: TEXT_DIMMER, fontSize: 20 }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;