"use client";

import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-sub-title">✨ WELCOME TO THE FUTURE OF WRITING</p>

        <h1>
          Write. Read. <span className="text-gradient">Inspire.</span>
        </h1>

        <p className="hero-desc">
          Discover amazing blogs about Technology, React, Next.js and AI. Join a
          community of passionate developers and creators.
        </p>

        <div className="hero-actions">
          <button className="btn-primary-glow">Explore Blogs</button>
          <button className="btn-secondary-outline">Start Writing</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
