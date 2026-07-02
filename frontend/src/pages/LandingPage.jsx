import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaHeartbeat, FaFire, FaMedal, FaArrowRight, FaDumbbell, FaChartLine,
  FaRunning, FaShieldAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,
  FaStar, FaTrophy, FaBolt
} from 'react-icons/fa';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.04,
      y: -8,
      transition: { type: 'spring', stiffness: 400, damping: 18 }
    }
  };

  const footerColumns = [
    { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Updates'] },
    { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
    { title: 'Resources', links: ['Help Center', 'Community', 'Guides', 'API Docs'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Admin Portal'] }
  ];

  const stats = [
    { num: '1.2M+', label: 'Workouts Logged', color: '#14b8a6' },
    { num: '98K+', label: 'Active Users', color: '#818cf8' },
    { num: '4.9★', label: 'Average Rating', color: '#fbbf24' },
    { num: '72%', label: 'Hit Goals Faster', color: '#f472b6' }
  ];

  const testimonials = [
    {
      text: '"FitForge completely changed how I train. The analytics helped me break a plateau I had for months — I hit a new deadlift PR within 6 weeks."',
      name: 'Jake Kim',
      role: 'Powerlifter, 3 yrs',
      initials: 'JK',
      gradient: 'linear-gradient(135deg,#14b8a6,#0ea5e9)'
    },
    {
      text: '"The recovery tracking is a game-changer. I used to overtrain constantly — now I know exactly when to rest and my gains have never been better."',
      name: 'Maya Rodriguez',
      role: 'CrossFit athlete',
      initials: 'MR',
      gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)'
    },
    {
      text: '"Simple, clean, and actually smart. The goal system keeps me honest without being overwhelming. Best fitness app I\'ve used in 5 years."',
      name: 'Alex Lee',
      role: 'Marathon runner',
      initials: 'AL',
      gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)'
    }
  ];

  const ctaStats = [
    { icon: <FaTrophy size={12} />, text: '98,000+ athletes', color: '#fbbf24' },
    { icon: <FaStar size={12} />, text: '4.9 average rating', color: '#f472b6' },
    { icon: <FaBolt size={12} />, text: 'Free forever plan', color: '#14b8a6' }
  ];

  return (
    <div style={{ background: '#0f172a', color: 'white', fontFamily: 'system-ui, sans-serif', overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(16px)', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}
      >
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#14b8a6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaDumbbell size={16} color="white" />
            </div>
            FitForge
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-2">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/#features">Features</Link></li>
              <li className="nav-item"><a className="nav-link" href="#stats">Stats</a></li>
              <div className="d-flex gap-2 ms-3">
                <Link to="/login" className="btn btn-outline-light px-4 fw-semibold" style={{ borderRadius: 9 }}>Login</Link>
                <Link to="/register" className="btn px-4 fw-semibold" style={{ background: 'linear-gradient(90deg,#14b8a6,#6366f1)', color: 'white', border: 'none', borderRadius: 9 }}>
                  Get Started
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <motion.section
        className="position-relative d-flex align-items-center overflow-hidden"
        style={{ minHeight: '100vh', paddingTop: '80px', background: '#0f172a' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
          backgroundSize: '50px 50px', pointerEvents: 'none'
        }} />
        {/* Orbs */}
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.25) 0%,transparent 70%)', top: -100, right: -80, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(20,184,166,0.2) 0%,transparent 70%)', bottom: -80, left: '10%', pointerEvents: 'none' }} />

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center g-5">

            {/* Left */}
            <div className="col-lg-6">
              <motion.div variants={containerVariants} initial="hidden" animate="visible">

                <motion.div
                  variants={itemVariants}
                  className="d-inline-flex align-items-center gap-2 mb-4 px-3 py-2"
                  style={{ borderRadius: 100, background: 'rgba(99,102,241,0.15)', border: '0.5px solid rgba(99,102,241,0.4)', fontSize: 13, color: '#a5b4fc' }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />
                  AI-Powered Fitness Tracking
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}
                >
                  Level Up Your<br />
                  <span style={{ background: 'linear-gradient(90deg,#14b8a6,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Fitness Game
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 440, marginBottom: '2rem' }}
                >
                  Smart workout tracking with real-time insights, personalized plans,
                  and progress you can actually see — powered by AI.
                </motion.p>

                <motion.div variants={itemVariants} className="d-flex flex-wrap gap-3 mb-4">
                  <Link
                    to="/register"
                    className="btn btn-lg d-flex align-items-center gap-2 fw-semibold"
                    style={{ background: 'linear-gradient(90deg,#14b8a6,#6366f1)', color: 'white', border: 'none', borderRadius: 10, padding: '12px 28px' }}
                  >
                    Start Free <FaArrowRight size={14} />
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-lg fw-semibold"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '12px 28px' }}
                  >
                    Login
                  </Link>
                </motion.div>

                {/* Social proof */}
                <motion.div variants={itemVariants} className="d-flex align-items-center gap-3">
                  <div className="d-flex">
                    {[
                      { i: 'JK', g: 'linear-gradient(135deg,#14b8a6,#6366f1)' },
                      { i: 'MR', g: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
                      { i: 'AL', g: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
                      { i: '+', g: 'linear-gradient(135deg,#10b981,#14b8a6)' }
                    ].map((av, i) => (
                      <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: av.g, border: '2px solid #0f172a', marginRight: -8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>
                        {av.i}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ color: '#f59e0b', fontSize: 12 }}>★★★★★</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                      <strong style={{ color: 'white' }}>12,400+</strong> athletes trust FitForge
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            </div>

            {/* Right — Live workout card */}
            <div className="col-lg-6 d-none d-lg-block">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, type: 'spring' }}
                style={{ position: 'relative' }}
              >
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '1.5rem', position: 'relative' }}>

                  {/* Floating live badge */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ position: 'absolute', top: -14, right: 20, background: '#14b8a6', color: '#0f172a', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 100 }}
                  >
                    🔥 Live
                  </motion.div>

                  {/* Card header */}
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#14b8a6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      AJ
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>Alex Johnson</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Today's Workout</div>
                    </div>
                    <div className="ms-auto d-flex align-items-center gap-2" style={{ fontSize: 12, color: '#4ade80' }}>
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }}
                      />
                      Active
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="row g-2 mb-4">
                    {[
                      { val: '847', lbl: 'Calories', color: '#14b8a6' },
                      { val: '58m', lbl: 'Duration', color: '#818cf8' },
                      { val: '94%', lbl: 'Intensity', color: '#fbbf24' }
                    ].map((s, i) => (
                      <div key={i} className="col-4">
                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px', textAlign: 'center' }}>
                          <div style={{ fontSize: '1.3rem', fontWeight: 700, color: s.color }}>{s.val}</div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.lbl}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress bars */}
                  {[
                    { name: 'Chest Press', pct: '100%', done: '4/4 sets', color: 'linear-gradient(90deg,#14b8a6,#6366f1)', textColor: '#14b8a6' },
                    { name: 'Incline Dumbbell', pct: '75%', done: '3/4 sets', color: 'linear-gradient(90deg,#6366f1,#8b5cf6)', textColor: 'rgba(255,255,255,0.5)' },
                    { name: 'Cable Fly', pct: '50%', done: '2/4 sets', color: 'linear-gradient(90deg,#f59e0b,#ef4444)', textColor: 'rgba(255,255,255,0.5)' }
                  ].map((ex, i) => (
                    <div key={i} className="mb-3">
                      <div className="d-flex justify-content-between mb-1" style={{ fontSize: 12 }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>{ex.name}</span>
                        <span style={{ color: ex.textColor }}>{ex.done}</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: ex.pct }}
                          transition={{ duration: 1.2, delay: i * 0.2 }}
                          style={{ height: '100%', borderRadius: 3, background: ex.color }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="d-flex justify-content-between" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                    <span>Weekly streak: <span style={{ color: '#fbbf24', fontWeight: 600 }}>🔥 14 days</span></span>
                    <span>PR broken: <span style={{ color: '#4ade80' }}>+12 lbs</span></span>
                  </div>

                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* ── STATS BAR ── */}
      <div id="stats" style={{ background: 'rgba(255,255,255,0.03)', borderTop: '0.5px solid rgba(255,255,255,0.06)', borderBottom: '0.5px solid rgba(255,255,255,0.06)', padding: '2rem 0' }}>
        <div className="container">
          <div className="row text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="col-6 col-md-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ borderLeft: i > 0 ? '0.5px solid rgba(255,255,255,0.08)' : 'none' }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 700, color: s.color }}>{s.num}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES (BENTO GRID) ── */}
      <div id="features" className="container py-5 my-4">
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: '#14b8a6', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.5rem' }}>Features</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '.75rem' }}>Everything You Need to Succeed</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500 }}>Built by athletes, for athletes. Every feature designed around how you actually train.</p>
        </motion.div>

        {/* Bento row 1: 2 large cards */}
        <div className="row g-4 mb-4">
          {[
            {
              icon: <FaHeartbeat size={22} />,
              iconBg: 'rgba(20,184,166,0.15)', iconColor: '#14b8a6',
              title: 'Intelligent Workout Tracking',
              desc: 'Log workouts in seconds with smart autocomplete and AI suggestions. Track every rep, set, and personal record with context-aware coaching tips.',
              glowColor: 'rgba(20,184,166,0.15)',
              extra: (
                <div className="d-flex align-items-flex-end gap-1 mt-3" style={{ height: 50 }}>
                  {[20, 30, 25, 40, 35, 45, 50].map((h, i) => (
                    <div key={i} style={{ width: 12, height: h, borderRadius: '3px 3px 0 0', background: i >= 5 ? '#14b8a6' : 'rgba(20,184,166,0.25)' }} />
                  ))}
                </div>
              )
            },
            {
              icon: <FaChartLine size={22} />,
              iconBg: 'rgba(99,102,241,0.15)', iconColor: '#818cf8',
              title: 'Powerful Analytics',
              desc: 'Stunning visualizations of your strength curves, volume trends, and body metrics. See exactly how you are improving over time.',
              glowColor: 'rgba(99,102,241,0.15)',
              extra: (
                <div className="row g-2 mt-2">
                  {[{ val: '+24%', lbl: 'Strength gain', color: '#818cf8' }, { val: '2.1×', lbl: 'Volume increase', color: '#818cf8' }].map((m, i) => (
                    <div key={i} className="col-6">
                      <div style={{ background: 'rgba(99,102,241,0.1)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: m.color }}>{m.val}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{m.lbl}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          ].map((f, i) => (
            <motion.div
              key={i}
              className="col-md-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover="hover"
              variants={cardVariants}
            >
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.75rem', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', background: f.glowColor, top: -30, left: -30, pointerEvents: 'none' }} />
                <div style={{ width: 44, height: 44, borderRadius: 12, background: f.iconBg, color: f.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: '.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{f.desc}</p>
                {f.extra}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bento row 2: 2 smaller cards */}
        <div className="row g-4">
          {[
            {
              icon: <FaFire size={22} />,
              iconBg: 'rgba(251,191,36,0.15)', iconColor: '#fbbf24',
              title: 'Recovery & Energy',
              desc: 'Know when to push and when to rest. Smart recovery scores based on your training load and sleep patterns.',
              glowColor: 'rgba(251,191,36,0.12)',
              extra: (
                <div className="d-flex gap-2 mt-3">
                  {[{ val: '87', lbl: 'Recovery' }, { val: 'High', lbl: 'Readiness' }].map((m, i) => (
                    <div key={i} style={{ flex: 1, background: 'rgba(251,191,36,0.1)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fbbf24' }}>{m.val}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{m.lbl}</div>
                    </div>
                  ))}
                </div>
              )
            },
            {
              icon: <FaMedal size={22} />,
              iconBg: 'rgba(244,114,182,0.15)', iconColor: '#f472b6',
              title: 'Goal Mastery',
              desc: 'Dynamic goals that adapt to your schedule, life events, and training plateaus — always keeping you on track.',
              glowColor: 'rgba(244,114,182,0.12)',
              extra: (
                <div className="mt-3">
                  <div className="d-flex justify-content-between mb-1" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                    <span>Monthly goal</span><span style={{ color: '#f472b6' }}>78%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }}>
                    <div style={{ height: '100%', width: '78%', borderRadius: 3, background: 'linear-gradient(90deg,#f472b6,#e879f9)' }} />
                  </div>
                </div>
              )
            }
          ].map((f, i) => (
            <motion.div
              key={i}
              className="col-md-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover="hover"
              variants={cardVariants}
            >
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.75rem', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', background: f.glowColor, bottom: -20, right: -20, pointerEvents: 'none' }} />
                <div style={{ width: 44, height: 44, borderRadius: 12, background: f.iconBg, color: f.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: '.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{f.desc}</p>
                {f.extra}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div className="container py-5">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: '#14b8a6', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.5rem' }}>What athletes say</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Real results from real people</h2>
          </motion.div>

          <div className="row g-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="col-md-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.5rem', height: '100%' }}>
                  <div style={{ color: '#f59e0b', fontSize: 13, marginBottom: '.75rem' }}>★★★★★</div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{t.text}</p>
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <motion.div
        className="position-relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #1e1b4b 0%, #0f172a 60%)',
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
          padding: '6rem 1rem'
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Grid bg, echoes hero */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 0%, transparent 75%)',
          pointerEvents: 'none'
        }} />

        {/* Ambient orbs */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.28) 0%,transparent 70%)', top: '-20%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle,rgba(20,184,166,0.22) 0%,transparent 70%)', bottom: -60, right: '8%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(244,114,182,0.15) 0%,transparent 70%)', bottom: 0, left: '6%', pointerEvents: 'none' }} />

        <div className="container position-relative text-center" style={{ zIndex: 2, maxWidth: 640 }}>

          {/* Eyebrow badge, matches hero's language */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="d-inline-flex align-items-center gap-2 mb-4 px-3 py-2"
            style={{ borderRadius: 100, background: 'rgba(20,184,166,0.15)', border: '0.5px solid rgba(20,184,166,0.4)', fontSize: 13, color: '#5eead4' }}
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#14b8a6' }}
            />
            Your next PR is closer than you think
          </motion.div>

          <motion.h2
            style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.12, marginBottom: '1rem' }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Ready to Transform<br />
            <span style={{ background: 'linear-gradient(90deg,#14b8a6,#6366f1,#f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% 100%' }}>
              Your Training?
            </span>
          </motion.h2>

          <motion.p
            style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.25rem' }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Join 98,000+ athletes already tracking smarter, recovering faster,
            and hitting goals they used to just hope for.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="d-flex flex-wrap justify-content-center gap-3 mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/register"
                className="btn btn-lg d-inline-flex align-items-center gap-2 fw-bold"
                style={{
                  background: 'linear-gradient(90deg,#14b8a6,#6366f1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 12,
                  padding: '15px 38px',
                  fontSize: 15,
                  boxShadow: '0 10px 30px -8px rgba(20,184,166,0.5)'
                }}
              >
                Get Started Free <FaArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a
                href="#features"
                className="btn btn-lg fw-semibold d-inline-flex align-items-center"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '0.5px solid rgba(255,255,255,0.18)', borderRadius: 12, padding: '15px 30px', fontSize: 15 }}
              >
                See How It Works
              </a>
            </motion.div>
          </motion.div>

          {/* Quick trust stats */}
          <motion.div
            className="d-flex flex-wrap justify-content-center gap-3 gap-md-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {ctaStats.map((s, i) => (
              <div key={i} className="d-flex align-items-center gap-2" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
                <span style={{ color: s.color }}>{s.icon}</span>
                {s.text}
              </div>
            ))}
          </motion.div>

          <p style={{ marginTop: '1.75rem', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            No credit card required · Cancel anytime
          </p>
        </div>
      </motion.div>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0f172a', borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: '3.5rem', paddingBottom: '2rem' }}>
        <div className="container">

          {/* Newsletter strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4 mb-5 p-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 16 }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Get training tips in your inbox</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>One email a week. No spam, unsubscribe anytime.</div>
            </div>
            <form className="d-flex gap-2 w-100" style={{ maxWidth: 380 }} onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@example.com"
                required
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 9, padding: '11px 14px', color: 'white', fontSize: 13, outline: 'none' }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(20,184,166,0.6)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
              <button
                type="submit"
                className="fw-semibold"
                style={{ background: 'linear-gradient(90deg,#14b8a6,#6366f1)', color: 'white', border: 'none', borderRadius: 9, padding: '11px 20px', fontSize: 13, whiteSpace: 'nowrap' }}
              >
                Subscribe
              </button>
            </form>
          </motion.div>

          <div className="row gy-5">

            {/* Brand */}
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#14b8a6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaDumbbell size={14} color="white" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 17 }}>FitForge</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, maxWidth: 280, marginBottom: 16 }}>
                Smart workout tracking with real-time insights and progress you can actually see.
              </p>
              <div className="d-flex align-items-center gap-2" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }}
                />
                All systems operational
              </div>
            </div>

            {/* Link columns */}
            {footerColumns.map((col, idx) => (
              <div key={idx} className="col-lg-2 col-md-3 col-6">
                <h6 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#14b8a6', marginBottom: '1rem' }}>
                  {col.title}
                </h6>
                <ul className="list-unstyled mb-0">
                  {col.links.map((link, i) => {
                    const linkStyle = {
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.45)',
                      textDecoration: 'none',
                      transition: 'color .15s, padding-left .15s'
                    };
                    const onEnter = e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.paddingLeft = '4px'; };
                    const onLeave = e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.paddingLeft = '0px'; };
                    return (
                      <li key={i} className="mb-2">
                        {link === 'Admin Portal' ? (
                          <Link to="/admin/login" style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>{link}</Link>
                        ) : (
                          <a href="#" style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>{link}</a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '2.5rem 0 1.5rem' }} />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026 FitForge — All rights reserved.</div>
            <div className="d-flex gap-2">
              {[
                { Icon: FaFacebookF, label: 'Facebook' },
                { Icon: FaTwitter, label: 'Twitter' },
                { Icon: FaInstagram, label: 'Instagram' },
                { Icon: FaLinkedinIn, label: 'LinkedIn' }
              ].map(({ Icon, label }, i) => (
                <motion.a
                  key={i}
                  href="#"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s, border-color .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(20,184,166,0.25)'; e.currentTarget.style.borderColor = 'rgba(20,184,166,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <Icon size={13} color="rgba(255,255,255,0.6)" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;