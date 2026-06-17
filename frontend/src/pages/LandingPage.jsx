import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaFire, FaMedal, FaArrowRight, FaDumbbell, FaChartLine, FaRunning, FaShieldAlt } from 'react-icons/fa';

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

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <motion.section
        className="position-relative vh-100 d-flex align-items-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e2937 50%, #312e81 100%)',
          color: 'white'
        }}
      >
        {/* Subtle animated background elements */}
        <div className="position-absolute inset-0 opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="position-absolute top-10 start-10 text-white"
            style={{ fontSize: '12rem', opacity: 0.05 }}
          >
            <FaDumbbell />
          </motion.div>
        </div>

        <div className="container position-relative z-2">
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
                    Sign In
                  </Link>
                  {/* 👇 NEW: Admin Login Button */}
                  <Link 
                    to="/admin/login" 
                    className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold"
                  >
                    <FaShieldAlt className="me-2" /> Admin
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

                {/* Floating badges */}
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

        {/* Scroll prompt */}
        <motion.div 
          className="position-absolute bottom-5 start-50 translate-middle-x"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="text-center small opacity-60"></div>
        </motion.div>
      </motion.section>

      {/* Features */}
      <div className="container py-5 my-5">
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
            { 
              icon: <FaHeartbeat size={48} />, 
              title: "Intelligent Tracking", 
              desc: "Log workouts faster than ever with smart suggestions and automatic progression detection." 
            },
            { 
              icon: <FaFire size={48} />, 
              title: "Recovery & Energy", 
              desc: "Understand your body better with HRV, sleep impact, and optimal training windows." 
            },
            { 
              icon: <FaMedal size={48} />, 
              title: "Goal Mastery", 
              desc: "Dynamic goals that adapt to your progress and keep you motivated every week." 
            },
            { 
              icon: <FaChartLine size={48} />, 
              title: "Powerful Analytics", 
              desc: "Stunning visualizations of strength, volume, body metrics, and long-term trends." 
            }
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

      {/* Stats */}
      <motion.div 
        className="py-5 bg-dark text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="row text-center g-5">
            {[
              { number: "24,891", label: "Active Users" },
              { number: "187K", label: "Workouts Logged" },
              { number: "4.2M", label: "Kilograms Lifted" },
              { number: "4.98", label: "Average Rating" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="col-md-3"
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <div className="display-3 fw-bold text-teal mb-2">{stat.number}</div>
                <div className="h5 opacity-75">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Final CTA */}
      <motion.div 
        className="py-5 text-center text-white"
        style={{ background: 'linear-gradient(90deg, #1e2937, #312e81)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container py-5">
          <h2 className="display-5 fw-bold mb-4">Ready to Become Stronger?</h2>
          <p className="lead mb-5 opacity-90">Join the movement. No credit card required.</p>
          
          <Link 
            to="/register" 
            className="btn btn-light btn-lg px-5 py-3 fs-5 fw-semibold"
          >
            Get Started Free
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;