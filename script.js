* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: #050816;
  color: #ffffff;
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(5, 8, 22, 0.8);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.navbar {
  max-width: 1180px;
  margin: 0 auto;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.logo-mark {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #2563eb, #06b6d4, #7c3aed);
  box-shadow: 0 0 25px rgba(6, 182, 212, 0.45);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
  color: #cbd5e1;
  font-size: 14px;
}

.nav-links a:hover {
  color: #ffffff;
}

.nav-btn {
  padding: 10px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 0 25px rgba(37, 99, 235, 0.35);
}

.menu-toggle {
  display: none;
  border: 0;
  background: transparent;
  color: #ffffff;
  font-size: 28px;
  cursor: pointer;
}

.hero {
  max-width: 1180px;
  margin: 0 auto;
  padding: 110px 24px;
  min-height: calc(100vh - 73px);
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
  position: relative;
}

.hero::before {
  content: "";
  position: absolute;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.25), transparent 65%);
  top: 70px;
  left: -120px;
  pointer-events: none;
}

.eyebrow {
  color: #67e8f9;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.hero h1 {
  font-size: clamp(44px, 7vw, 82px);
  line-height: 0.95;
  max-width: 760px;
  letter-spacing: -3px;
}

.hero h1 span {
  background: linear-gradient(135deg, #60a5fa, #22d3ee, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-text {
  max-width: 620px;
  color: #cbd5e1;
  font-size: 18px;
  margin-top: 24px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-top: 34px;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 22px;
  border-radius: 999px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn.primary {
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  box-shadow: 0 0 35px rgba(37, 99, 235, 0.4);
}

.btn.secondary {
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.04);
}

.hero-card {
  position: relative;
  padding: 34px;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(2, 6, 23, 0.96));
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  overflow: hidden;
}

.card-glow {
  position: absolute;
  inset: -80px -60px auto auto;
  width: 220px;
  height: 220px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.45), transparent 65%);
}

.hero-card h3 {
  position: relative;
  font-size: 26px;
  margin-bottom: 12px;
}

.hero-card p {
  position: relative;
  color: #cbd5e1;
}

.stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 28px;
}

.stats div {
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.stats strong {
  display: block;
  font-size: 22px;
}

.stats span {
  color: #94a3b8;
  font-size: 12px;
}

@media (max-width: 860px) {
  .navbar {
    position: relative;
  }

  .menu-toggle {
    display: block;
  }

  .nav-btn {
    display: none;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 72px;
    left: 24px;
    right: 24px;
    padding: 18px;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 18px;
    background: rgba(15, 23, 42, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-links.active {
    display: flex;
  }

  .hero {
    grid-template-columns: 1fr;
    padding-top: 72px;
  }

  .hero h1 {
    letter-spacing: -2px;
  }

  .stats {
    grid-template-columns: 1fr;
  }
}
