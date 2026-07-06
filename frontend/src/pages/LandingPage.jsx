import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaDumbbell, FaArrowRight,
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn
} from 'react-icons/fa';

/* ─── Design tokens ────────────────────────────────────────────── */
const BG        = '#17181a';
const BG_RAISED = '#1e1f21';
const PAPER     = '#ece7da';
const INK       = '#17181a';
const LINE      = 'rgba(236,231,218,0.14)';
const LINE_STRONG = 'rgba(236,231,218,0.28)';
const YELLOW    = '#f5c400';
const RED       = '#c1272d';
const TEXT      = '#ece7da';
const TEXT_DIM  = 'rgba(236,231,218,0.55)';
const TEXT_DIMMER = 'rgba(236,231,218,0.32)';

const DISPLAY = "'Anton', sans-serif";
const MONO    = "'JetBrains Mono', monospace";
const BODY    = "'Inter', system-ui, sans-serif";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerParent = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
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

/* Button Styles */
const btn = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '12px 24px', fontSize: 13.5, fontWeight: 600,
  border: `1px solid ${LINE_STRONG}`, textDecoration: 'none',
  letterSpacing: '0.02em', color: TEXT, background: 'none', cursor: 'pointer'
};

const btnSolid = { ...btn, background: YELLOW, color: INK, borderColor: YELLOW, fontWeight: 700 };

const LandingPage = () => {
  return (
    <div style={{ background: BG, color: TEXT, fontFamily: BODY, overflowX: 'hidden' }}>

      {/* NAVBAR */}
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ 
          background: 'rgba(23,24,26,0.96)', 
          backdropFilter: 'blur(12px)', 
          borderBottom: `1px solid ${LINE}`,
          height: 82,
          zIndex: 1000
        }}
      >
        <div className="container d-flex align-items-center justify-content-between" style={{ height: '100%' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 23, fontWeight: 700, color: TEXT, textDecoration: 'none' }}>
            <svg width="30" height="30" viewBox="0 0 26 26" fill="none">
              <rect x="1" y="11" width="4" height="4" fill={YELLOW} />
              <rect x="6" y="8" width="3" height="10" fill={TEXT} />
              <rect x="10" y="12" width="6" height="2" fill={TEXT} />
              <rect x="17" y="8" width="3" height="10" fill={TEXT} />
              <rect x="21" y="11" width="4" height="4" fill={YELLOW} />
            </svg>
            FITFORGE
          </Link>

          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" style={{ borderColor: LINE_STRONG }}>
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse d-lg-flex" id="navbarNav">
           <div className="d-none d-lg-flex align-items-center me-auto" style={{ gap: "24px", marginLeft: "48px" }}>
           <a href="#features" style={{ fontSize: 15, color: TEXT_DIM, textDecoration: 'none' }}>Features</a>
           <span style={{ color: TEXT_DIMMER }}>|</span>
           <a href="#stats" style={{ fontSize: 15, color: TEXT_DIM, textDecoration: 'none' }}>Stats</a>
           <span style={{ color: TEXT_DIMMER }}>|</span>
           <a href="#reviews" style={{ fontSize: 15, color: TEXT_DIM, textDecoration: 'none' }}>Reviews</a>
           </div>

            <div className="d-flex gap-3">
              <Link to="/login" style={btn}>Sign in</Link>
              <Link to="/register" style={btnSolid}>Start logging</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 200, paddingBottom: 110, borderBottom: `1px solid ${LINE}` }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.div variants={staggerParent} initial="hidden" animate="visible">
                <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                  <span style={{ width: 22, height: 3, background: YELLOW }} />
                  <span style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: TEXT_DIM }}>
                    A training log, not a wellness app
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  style={{ 
                    fontFamily: DISPLAY, 
                    textTransform: 'uppercase', 
                    fontSize: 'clamp(46px, 6.2vw, 78px)', 
                    lineHeight: 0.94, 
                    marginBottom: 28 
                  }}
                >
                  Write it down.<br />
                  Load it up.<br />
                  <span style={{ color: YELLOW }}>Beat it next week.</span>
                </motion.h1>

                <motion.p variants={fadeUp} style={{ fontSize: 17.5, color: TEXT_DIM, lineHeight: 1.65, maxWidth: 480, marginBottom: 40 }}>
                  FitForge is where your sets, your plates, and your numbers actually live — 
                  no streak badges, no AI coach. Just a real log for serious lifters.
                </motion.p>

                <motion.div variants={fadeUp} className="d-flex flex-wrap gap-4">
                  <Link to="/register" style={{ ...btnSolid, padding: '16px 32px', fontSize: 15.5 }}>
                    Start your log — free <FaArrowRight size={15} />
                  </Link>
                  <Link to="/login" style={{ ...btn, padding: '16px 32px', fontSize: 15.5 }}>
                    See a real log book
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <div className="col-lg-6 d-none d-lg-block">
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -1.2 }}
                animate={{ opacity: 1, y: 0, rotate: -1.8 }}
                transition={{ duration: 0.8 }}
                style={{
                  background: PAPER, color: INK, padding: '32px 32px 26px',
                  boxShadow: '14px 16px 0 rgba(0,0,0,0.45)', position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `2px solid ${INK}`, paddingBottom: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>Session — Push Day</span>
                  <span style={{ fontFamily: MONO, fontSize: 13 }}>Jul 06</span>
                </div>

                {[
                  { ex: 'Bench Press', sets: '4×5 @ 185' },
                  { ex: 'Incline DB Press', sets: '3×8 @ 60' },
                  { ex: 'Cable Fly', sets: '3×12 @ 35' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed rgba(23,24,26,0.3)', fontSize: 15 }}>
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
      <div id="stats" style={{ background: BG_RAISED, padding: '90px 0', borderBottom: `1px solid ${LINE}` }}>
        <div className="container">
          <div className="row g-0 text-center">
            {scoreboard.map((s, i) => (
              <motion.div
                key={i}
                className="col-6 col-md-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ padding: '32px 20px', borderLeft: i > 0 ? `1px solid ${LINE}` : 'none' }}
              >
                <div style={{ fontFamily: MONO, fontSize: 34, fontWeight: 700, color: YELLOW }}>{s.num}</div>
                <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginTop: 8 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="features" className="container" style={{ padding: '120px 0', borderBottom: `1px solid ${LINE}` }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: 560, marginBottom: 60 }}
        >
          <div style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: YELLOW, marginBottom: 12 }}>
            WHAT'S IN THE LOG
          </div>
          <h2 style={{ fontFamily: DISPLAY, textTransform: 'uppercase', fontSize: 'clamp(32px,4.8vw,48px)', lineHeight: 1.05, marginBottom: 16 }}>
            Built around the barbell,<br />not the badge
          </h2>
          <p style={{ color: TEXT_DIM, fontSize: 16, lineHeight: 1.7 }}>
            No gamified rings. No AI pep talks. Every feature exists because it's what a serious lifter actually uses.
          </p>
        </motion.div>

        <div className="row g-0" style={{ border: `1px solid ${LINE}` }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="col-md-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                padding: '42px 36px',
                borderRight: i % 2 === 0 ? `1px solid ${LINE}` : 'none',
                borderBottom: i < 2 ? `1px solid ${LINE}` : 'none'
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: 12.5, color: TEXT_DIMMER, display: 'block', marginBottom: 16 }}>{f.tag}</span>
              <h3 style={{ fontSize: 21, marginBottom: 14, lineHeight: 1.2 }}>{f.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: TEXT_DIM, marginBottom: 20 }}>{f.desc}</p>
              <div style={{ fontFamily: MONO, fontSize: 13, color: YELLOW, borderTop: `1px solid ${LINE}`, paddingTop: 16 }}>{f.readout}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div id="reviews" style={{ padding: '120px 0', borderBottom: `1px solid ${LINE}` }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: 560, marginBottom: 50 }}
          >
            <div style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: YELLOW, marginBottom: 12 }}>FROM THE LOG BOOK</div>
            <h2 style={{ fontFamily: DISPLAY, textTransform: 'uppercase', fontSize: 'clamp(32px,4.5vw,44px)', lineHeight: 1.05 }}>
              Notes from people<br />who actually train
            </h2>
          </motion.div>

          {entries.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="row g-5"
              style={{ padding: '36px 0', borderBottom: i < entries.length - 1 ? `1px solid ${LINE}` : 'none' }}
            >
              <div className="col-md-3">
                <span style={{ fontFamily: MONO, fontSize: 12, border: `1px solid ${LINE_STRONG}`, padding: '5px 12px', display: 'inline-block', marginBottom: 12 }}>
                  {t.initials}
                </span>
                <div style={{ fontFamily: MONO, fontSize: 13, color: TEXT_DIM }}>{t.meta}</div>
              </div>
              <div className="col-md-9">
                <blockquote style={{ margin: 0, fontSize: 16.5, lineHeight: 1.75 }}>
                  “{t.quote}”
                </blockquote>
                <cite style={{ display: 'block', marginTop: 18, fontStyle: 'normal', fontSize: 13, color: TEXT_DIM }}>
                  — {t.cite}
                </cite>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ padding: '130px 0', textAlign: 'center', borderBottom: `1px solid ${LINE}` }}
      >
        <div className="container" style={{ maxWidth: 680 }}>
          <h2 style={{ fontFamily: DISPLAY, textTransform: 'uppercase', fontSize: 'clamp(38px,6vw,62px)', lineHeight: 1, marginBottom: 20 }}>
            Your next PR is<br />already in the log.
          </h2>
          <p style={{ color: TEXT_DIM, fontSize: 17, maxWidth: 480, margin: '0 auto 40px' }}>
            Free forever for a single training log. No card required.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            <Link to="/register" style={{ ...btnSolid, padding: '16px 34px', fontSize: 15.5 }}>
              Start your log — free <FaArrowRight size={15} />
            </Link>
            <a href="#features" style={{ ...btn, padding: '16px 34px', fontSize: 15.5 }}>Explore features</a>
          </div>
        </div>
      </motion.div>

      {/* FOOTER */}
      <footer style={{ padding: '80px 0 40px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4 mb-5 p-5"
            style={{ border: `1px solid ${LINE}` }}
          >
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Training notes in your inbox</div>
              <div style={{ fontSize: 14, color: TEXT_DIM }}>One email a week. No spam.</div>
            </div>
            <form className="d-flex gap-2 w-100" style={{ maxWidth: 420 }} onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
              <input
                type="email"
                placeholder="you@example.com"
                required
                style={{ flex: 1, background: 'transparent', border: `1px solid ${LINE_STRONG}`, padding: '13px 16px', color: TEXT, fontSize: 14, outline: 'none' }}
              />
              <button type="submit" style={{ ...btnSolid, padding: '13px 26px', fontSize: 14 }}>
                Subscribe
              </button>
            </form>
          </motion.div>

          <div className="row gy-5">
            <div className="col-lg-4">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, fontWeight: 700, fontSize: 19 }}>
                <FaDumbbell size={20} color={YELLOW} /> FITFORGE
              </div>
              <p style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.7, maxWidth: 280 }}>
                A training log for people who'd rather look at their numbers than a badge.
              </p>
            </div>

            {footerColumns.map((col, idx) => (
              <div key={idx} className="col-lg-2 col-md-3 col-6">
                <h6 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: YELLOW, marginBottom: 16 }}>
                  {col.title}
                </h6>
                <ul className="list-unstyled mb-0">
                  {col.links.map((link, i) => (
                    <li key={i} className="mb-3">
                      <a href="#" style={{ fontSize: 14, color: TEXT_DIM, textDecoration: 'none' }}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <hr style={{ borderColor: LINE, margin: '3rem 0 1.5rem' }} />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-center text-md-start">
            <div style={{ fontSize: 13, color: TEXT_DIMMER }}>© 2026 FitForge</div>
            <div className="d-flex gap-3 justify-content-center">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 38, height: 38, border: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                  <Icon size={14} color={TEXT_DIM} />
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