import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaHeartbeat, FaFire, FaMedal, FaArrowRight, FaDumbbell, FaChartLine, 
  FaRunning, FaShieldAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn 
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
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.06,
      y: -12,
      transition: { type: "spring", stiffness: 400, damping: 18 }
    }
  };

  const footerColumns = [
    { title: "Product", links: ["Features", "Pricing", "Integrations", "Updates"] },
    { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
    { title: "Resources", links: ["Help Center", "Community", "Guides", "API Docs"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "Admin Portal"] }
  ];

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" 
           style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center gap-2" to="/">
            <FaDumbbell className="text-teal" /> FitForge
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-1">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/#features">Features</Link></li>
              <li className="nav-item"><a className="nav-link" href="#stats">Stats</a></li>
              
              <div className="d-flex gap-2 ms-3">
                <Link to="/login" className="btn btn-outline-light px-4 fw-bold">Login</Link>
                <Link to="/register"className="btn btn-outline-light px-4 fw-bold"> Get Started</Link> 
              </div>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="position-relative vh-100 d-flex align-items-center overflow-hidden pt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e2937 50%, #312e81 100%)',
          color: 'white'
        }}
      >
        <div className="container position-relative z-2 pt-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  variants={itemVariants}
                  className="d-inline-flex align-items-center gap-2 px-4 py-2 mb-4 rounded-pill border border-white border-opacity-20 bg-white bg-opacity-10 backdrop-blur-md"
                >
                  <span className="badge bg-teal text-white">AI POWERED</span>
                  <span className="small fw-medium">Track • Analyze • Transform</span>
                </motion.div>

                <motion.h1 
                  variants={itemVariants}
                  className="display-1 fw-bold lh-1 mb-4"
                  style={{ fontSize: '3.8rem' }}
                >
                  Level Up Your<br />
                  <span style={{ color: '#14b8a6' }}>Fitness Game</span>
                </motion.h1>

                <motion.p 
                  variants={itemVariants}
                  className="lead fs-4 mb-5 opacity-90"
                  style={{ maxWidth: '480px' }}
                >
                  Smart workout tracking with real-time insights, 
                  personalized plans, and progress you can actually see.
                </motion.p>

                <motion.div variants={itemVariants} className="d-flex flex-wrap gap-3">
                  <Link 
                    to="/register" 
                    className="btn btn-lg px-5 py-3 fw-semibold shadow-lg"
                    style={{ 
                      background: 'linear-gradient(90deg, #14b8a6, #22d3ee)',
                      color: '#0f172a',
                      border: 'none'
                    }}
                  >
                    Start Free <FaArrowRight className="ms-2" />
                  </Link>
                  <Link 
                    to="/login" 
                    className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold"
                  >
                    Login
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <div className="col-lg-6 d-none d-lg-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, type: "spring" }}
                className="position-relative"
              >
                <div className="bg-white bg-opacity-10 backdrop-blur-3xl rounded-4 p-6 shadow-2xl border border-white border-opacity-10">
                  <div className="ratio ratio-4x3 rounded-3 overflow-hidden bg-dark d-flex align-items-center justify-content-center">
                    <FaDumbbell size={180} className="text-teal opacity-75" />
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="position-absolute top-10 end-0 bg-white text-dark rounded-3 shadow p-3 text-center"
                  style={{ transform: 'translate(15%, -10%)' }}
                >
                  <div className="fw-bold fs-5">12,459</div>
                  <small>Workouts today</small>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <div id="features" className="container py-5 my-5">
        {/* ... your existing features section (unchanged) ... */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="display-5 fw-bold mb-3">Everything You Need to Succeed</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Built by athletes, for athletes.
          </p>
        </motion.div>

        <div className="row g-4">
          {[
            { icon: <FaHeartbeat size={48} />, title: "Intelligent Tracking", desc: "Log workouts faster than ever..." },
            { icon: <FaFire size={48} />, title: "Recovery & Energy", desc: "Understand your body better..." },
            { icon: <FaMedal size={48} />, title: "Goal Mastery", desc: "Dynamic goals that adapt..." },
            { icon: <FaChartLine size={48} />, title: "Powerful Analytics", desc: "Stunning visualizations..." }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover="hover"
              variants={cardVariants}
            >
              <div className="card h-100 border-0 shadow-lg rounded-4 p-5 text-center hover-card">
                <div className="mb-4 text-teal">{feature.icon}</div>
                <h4 className="fw-bold mb-3">{feature.title}</h4>
                <p className="text-muted">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      

      {/* Final CTA */}
<motion.div
  className="py-5 text-center text-white"
  style={{
    background: "#0b1220" // deep professional navy
  }}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <div className="container py-5">

    <motion.h2
      className="display-6 fw-bold mb-3"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      Build Strength. Track Progress. Stay Consistent.
    </motion.h2>

    <p className="lead text-white-50 mb-5">
      A simple, powerful fitness tracker designed to keep you disciplined every day.
    </p>

    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Link
        to="/register"
        className="btn btn-lg px-5 py-3 fw-semibold"
        style={{
          backgroundColor: "#ffffff",
          color: "#0b1220",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
        }}
      >
        Get Started Free
      </Link>
    </motion.div>

    <p className="mt-3 small text-white-50">
      No credit card required • Free forever plan available
    </p>

  </div>
</motion.div>

      {/* Footer */}
      <footer className="position-relative text-white pt-5 pb-4" style={{ background: '#0f172a' }}>
        {/* Top accent line */}
        <div 
          className="position-absolute top-0 start-0 w-100" 
          style={{ height: '3px', background: 'linear-gradient(90deg, #14b8a6, #6366f1, #14b8a6)' }}
        />

        <div className="container">
          <div className="row gy-5">
            {/* Brand column */}
            <div className="col-lg-4 col-md-12">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div 
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #14b8a6, #6366f1)' }}
                >
                  <FaDumbbell className="text-white" size={18} />
                </div>
                <span className="fw-bold fs-4">FitForge</span>
              </div>
              <p className="mb-0" style={{ maxWidth: '320px', color: 'rgba(255,255,255,0.55)' }}>
                Smart workout tracking with real-time insights and progress you can actually see.
              </p>
            </div>

            {/* Link columns */}
            {footerColumns.map((col, idx) => (
              <div key={idx} className="col-lg-2 col-md-3 col-6">
                <h6 className="fw-bold text-uppercase small mb-3" style={{ letterSpacing: '0.05em', color: '#14b8a6' }}>
                  {col.title}
                </h6>
                <ul className="list-unstyled mb-0">
                  {col.links.map((link, i) => (
                    <li key={i} className="mb-2">
                      {link === "Admin Portal" ? (
                        <Link to="/admin/login" className="footer-link text-decoration-none">
                          {link}
                        </Link>
                      ) : (
                        <a href="#" className="footer-link text-decoration-none">
                          {link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Bottom bar */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="small" style={{ color: 'rgba(255,255,255,0.45)' }}>
              © 2026 FitForge — All rights reserved.
            </div>
            <div className="d-flex gap-3">
              {[
                { Icon: FaFacebookF, label: "Facebook" },
                { Icon: FaTwitter, label: "Twitter" },
                { Icon: FaInstagram, label: "Instagram" },
                { Icon: FaLinkedinIn, label: "LinkedIn" }
              ].map(({ Icon, label }, i) => (
                <a 
                  key={i} 
                  href="#" 
                  aria-label={label}
                  className="social-icon d-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.08)' }}
                >
                  <Icon className="text-white" size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .footer-link {
            color: rgba(255,255,255,0.6);
            transition: color 0.2s ease;
          }
          .footer-link:hover {
            color: #2dd4bf !important;
          }
          .social-icon {
            transition: background 0.2s ease, transform 0.2s ease;
          }
          .social-icon:hover {
            background: #14b8a6 !important;
            transform: translateY(-2px);
          }
        `}</style>
      </footer>
    </div>
  );
};

export default LandingPage;