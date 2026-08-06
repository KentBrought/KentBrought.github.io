import { useEffect, useState } from 'react';
import './home.css';

const dustParticles = Array.from({ length: 96 }, (_, index) => ({
  id: index,
  x: `${(index * 37 + index * index * 13 + 11) % 100}%`,
  y: `${(index * 61 + index * index * 7 + 7) % 100}%`,
  size: `${1.15 + (index % 4) * 0.35}px`,
  delay: `${-(index % 23)}s`,
  duration: `${16 + (index % 13)}s`,
  driftX: `${((index * 73) % 181) - 90}px`,
  driftY: `${((index * 47) % 161) - 80}px`,
}));

export default function HomePage() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setHasScrolled(window.scrollY > 16);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll('.timeline-era, .experience-item, .project-item');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    revealTargets.forEach((target, index) => {
      target.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const previews = document.querySelectorAll('.item-image');
    const cleanups = [];

    previews.forEach((preview) => {
      const backImage = preview.querySelector('.hover-image');
      const ratioSource = backImage || preview.querySelector('img');

      if (backImage) preview.tabIndex = 0;
      if (!ratioSource) return;

      const setRatio = () => {
        if (!ratioSource.naturalWidth || !ratioSource.naturalHeight) return;
        preview.style.setProperty('--preview-ratio', `${ratioSource.naturalWidth} / ${ratioSource.naturalHeight}`);
      };

      if (ratioSource.complete) setRatio();
      else {
        ratioSource.addEventListener('load', setRatio, { once: true });
        cleanups.push(() => ratioSource.removeEventListener('load', setRatio));
      }
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <main>
      <header className={`site-header${hasScrolled ? ' site-header--scrolled' : ''}`}>
        <a href="#" className="site-header__name" data-text="KENT BROUGHT">KENT BROUGHT</a>
      </header>

      {/* Hero Section */}
          <section className="hero" aria-labelledby="ruffcut-title">
              <div className="hero-background" aria-hidden="true"></div>
              <div className="hero-haze hero-haze--one" aria-hidden="true"></div>
              <div className="hero-haze hero-haze--two" aria-hidden="true"></div>
              <div className="site-dust" aria-hidden="true">
                  {dustParticles.map((particle) => (
                      <span
                          key={particle.id}
                          style={{
                            '--dust-x': particle.x,
                            '--dust-y': particle.y,
                            '--dust-size': particle.size,
                            '--dust-delay': particle.delay,
                            '--dust-duration': particle.duration,
                            '--dust-drift-x': particle.driftX,
                            '--dust-drift-y': particle.driftY,
                          }}
                      />
                  ))}
              </div>
              <div className="hero-layout">
                  <div className="ruffcut-card" tabIndex="0" aria-label="RuffCut logo. Hover or focus to preview the video editor.">
                      <div className="ruffcut-card__inner">
                          <div className="ruffcut-card__face ruffcut-card__front">
                              <img src="/ruffcut/ruffcut-logo.png" alt="RuffCut logo" />
                          </div>
                          <div className="ruffcut-card__face ruffcut-card__back">
                              <img src="/ruffcut/ruffcut-editor.png" alt="RuffCut AI video editor interface" />
                          </div>
                          <span className="ruffcut-card__edge ruffcut-card__edge--left" aria-hidden="true"></span>
                          <span className="ruffcut-card__edge ruffcut-card__edge--right" aria-hidden="true"></span>
                          <span className="ruffcut-card__edge ruffcut-card__edge--top" aria-hidden="true"></span>
                          <span className="ruffcut-card__edge ruffcut-card__edge--bottom" aria-hidden="true"></span>
                      </div>
                  </div>
                  <div className="hero-content">
                      <h1 id="ruffcut-title" className="hero-title">RuffCut</h1>
                      <p className="hero-description">The ultimate AI agent that understands your media and edits directly on your video editing timeline.</p>
                      <a href="https://useruffcut.com/?utm_content=kent" target="_blank" rel="noopener noreferrer" className="hero-cta">Use RuffCut</a>
                  </div>
              </div>
          </section>

                
            
          
          {/* Experience and Projects Timeline */}
          <section className="timeline">
              <div className="container">
                  <div className="timeline-era timeline-era--future" aria-labelledby="timeline-era-0">
                      <span className="timeline-era__line" aria-hidden="true"></span>
                      <div className="timeline-era__heading">
                          <h2 id="timeline-era-0">The Future</h2>
                          <p>2026 - Now</p>
                      </div>
                      <span className="timeline-era__line" aria-hidden="true"></span>
                  </div>

                  <div className="section-backdrop section-backdrop--future" aria-hidden="true"></div>

                  <div className="experience-item">
                      <div className="item-image">
                          <img src="/timeline/samsara-logo.jfif" alt="Samsara logo" />
                      </div>
                      <div className="item-content">
                          <h3>Software Engineer — Samsara</h3>
                          <div className="item-meta">2026 – Present</div>
                          <ul>
                              <li>Building software at Samsara.</li>
                          </ul>
                          <div className="project-links">
                              <a href="https://www.samsara.com/" target="_blank" rel="noopener noreferrer">Visit Samsara</a>
                          </div>
                      </div>
                  </div>

                  <div className="project-item">
                      <div className="item-image">
                          <div className="timeline-mark timeline-mark--wide">RUFFCUT</div>
                      </div>
                      <div className="item-content">
                          <h3>RuffCut</h3>
                          <div className="item-meta">2026 – Present | AI Video Editing</div>
                          <ul>
                              <li>Building an AI agent that understands media and edits directly on a professional video-editing timeline.</li>
                          </ul>
                          <div className="project-links">
                              <a href="https://useruffcut.com/?utm_content=kent" target="_blank" rel="noopener noreferrer">Use RuffCut</a>
                          </div>
                      </div>
                  </div>

                  <div className="timeline-era timeline-era--mit" aria-labelledby="timeline-era-1">
                      <span className="timeline-era__line" aria-hidden="true"></span>
                      <div className="timeline-era__heading">
                          <h2 id="timeline-era-1">Massachusetts Institute of Technology</h2>
                          <p>2022-2026</p>
                      </div>
                      <span className="timeline-era__line" aria-hidden="true"></span>
                  </div>

                  <div className="section-backdrop section-backdrop--mit" aria-hidden="true"></div>

<div className="experience-item">
                      <div className="item-image">
                          <img src="/timeline/titan-logo.png" alt="Titan RT Teaching Tool logo" />
                          <img src="/timeline/titan-background.png" alt="Titan RT Teaching Tool preview" className="hover-image" />
                      </div>
                      <div className="item-content">
                          <h3>Researcher — Soderblom Lab / NASA Dragonfly</h3>
                          <div className="item-meta">2025 – Present | React, JavaScript, Python, Plotly</div>
                          <ul>
                              <li>Built the Titan RT Teaching Tool for interactively exploring Titan atmospheric radiative-transfer models, spectral data, and planetary imagery.</li>
                              <li>Implemented controls for haze and methane abundance, viewing geometry, composite imagery, and spectral comparisons across locations.</li>
                          </ul>
                          <div className="project-links">
                              <a href="https://github.com/KentBrought/titan-rt-teaching-tool" target="_blank" rel="noopener noreferrer">View Source Code</a>
                              <a href="https://titanrt.mit.edu/" target="_blank" rel="noopener noreferrer">Visit Tool</a>
                          </div>
                      </div>
                  </div>

<div className="project-item">
                      <div className="item-image">
                          <img src="/timeline/block-code-draw-logo.png" alt="Block, Code, Draw logo" />
                          <img src="/timeline/block-code-draw-demo.gif" alt="Block, Code, Draw gameplay preview" className="hover-image" />
                      </div>
                      <div className="item-content">
                          <h3>Block, Code, Draw</h3>
                          <div className="item-meta">Spring 2026 | React, Blockly, TensorFlow.js, MediaPipe</div>
                          <ul>
                              <li>Co-created a block-based drawing game where learners build programs and receive on-device AI feedback about their artwork.</li>
                              <li>Designed classic and challenge modes to teach sequencing, loops, conditionals, variables, and creative debugging.</li>
                          </ul>
                          <div className="project-links">
                              <a href="https://github.com/KentBrought/block-code-comp" target="_blank" rel="noopener noreferrer">View Source Code</a>
                              <a href="https://kentbrought.github.io/block-code-comp/" target="_blank" rel="noopener noreferrer">Play Demo</a>
                          </div>
                      </div>
                  </div>

<div className="project-item">
                      <div className="item-image">
                          <img src="/timeline/echo-of-the-dead-logo.svg" alt="Echo of the Dead logo" />
                      </div>
                      <div className="item-content">
                          <h3>Echo of the Dead</h3>
                          <div className="item-meta">Fall 2025 | Godot 4.5, GDScript, WebGL2</div>
                          <ul>
                              <li>Co-developed a survival platformer built around sound-based navigation, echolocation spells, limited visibility, and strategic combat.</li>
                              <li>Created atmospheric gameplay systems including fog of war, spell effects, damage feedback, exploration, audio, and web export support.</li>
                          </ul>
                          <div className="project-links">
                              <a href="https://github.com/sabpdo/Echo-of-the-Dead" target="_blank" rel="noopener noreferrer">View Source Code</a>
                              <a href="https://kbrought.itch.io/echo-of-the-dead" target="_blank" rel="noopener noreferrer">Play on Itch.io</a>
                          </div>
                      </div>
                  </div>

<div className="experience-item">      
                      <div className="item-image">      
                          <img src="yapclap_logo.png" alt="YapClap Logo" />      
                          <img src="yapclap_screenshot.png" alt="YapClap Screenshot" className="hover-image" />      
                      </div>      
                      <div className="item-content">      
                          <h3>Founder – YapClap.com</h3>      
                          <div className="item-meta">Jun 2025 – Dec 2025</div>      
                          <ul>      
                              <li>Architected and shipped a WebRTC + React / React‑Native video‑chat platform that pairs strangers quickly using Socket.IO signaling and TURN/STUN fallback</li>      
                              <li>Designed an on‑device Edge AI moderation pipeline (YOLOv8 + custom NSFW classifier) to block explicit content before it travels over the network</li>      
                          </ul>      
                          <div className="project-links">      
                              <a href="https://yapclap.com/" target="_blank" rel="noopener noreferrer">      
                                  Visit Website      
                                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">      
                                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <line x1="10" y1="14" x2="21" y2="3" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                  </svg>      
                              </a>      
                              <div className="social-wrapper">      
                                  <a href="https://www.youtube.com/@YapClapSocial" className="social-btn" target="_blank" title="YouTube Channel">      
                                      <svg viewBox="0 0 24 24">      
                                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>      
                                      </svg>      
                                  </a>      
                              </div>      
                          </div>      
                      </div>      
                  </div>

<div className="project-item">      
                      <div className="item-image">      
                          <img src="corgi_hackathon_logo.png" alt="Corgi Hackathon" />      
                          <img src="corgi_hackathon_screenshot.jpeg" alt="Corgi Hackathon Screenshot" className="hover-image" />      
                      </div>      
                      <div className="item-content">      
                          <h3>Corgi Insurance Tenant Policy Uploader</h3>      
                          <div className="item-meta">Jun 2025 | React, Tesseract.js, Gemini API, AI/ML</div>      
                          <ul>      
                              <li>Co‑built (two‑person team) a React app that OCRs PDF/image uploads (Tesseract.js + pdfjs‑dist), regex‑validates insurance fields, and routes qualified docs to Gemini LLM for PII checks — entirely client‑side</li>      
                              <li>Designed a drag‑and‑drop and camera capture UI to score documents in real time, significantly improving intake review speed and accuracy</li>      
                              <li>Stack: React, Tesseract.js, pdfjs‑dist, Gemini API, JavaScript, CSS</li>      
                          </ul>      
                          <div className="project-links">      
                              <a href="https://github.com/WesleyBLDC/corgi_hackathon" target="_blank">      
                                  View Source Code       
                                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">      
                                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <line x1="10" y1="14" x2="21" y2="3" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                  </svg>      
                              </a>      
                          </div>      
                      </div>      
                  </div>

<div className="project-item">      
                      <div className="item-image">      
                          <img src="mole_maker_logo.png" alt="Mole Maker Game" />      
                          <img src="mole_maker_screenshot.png" alt="Mole Maker Screenshot" className="hover-image" />      
                      </div>      
                      <div className="item-content">      
                          <h3>Mole Maker – 2D Chemistry Education Game</h3>      
                          <div className="item-meta">Mar 2025 – May 2025 | Godot, Game Design</div>      
                          <ul>      
                              <li>Developing a 2D educational game to teach chemistry concepts through interactive play</li>      
                              <li>Designed game flow, level progression, and synthesis mechanics</li>      
                              <li>Aligned with Next Generation Science Standards (NGSS) for chemistry education</li>      
                              <li>Created in collaboration with MIT's Educational Game Design course</li>      
                          </ul>      
                          <div className="project-links">      
                              <a href="https://kbrought.itch.io/mole-maker" target="_blank">      
                                  Play Game      
                                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">      
                                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <line x1="10" y1="14" x2="21" y2="3" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                  </svg>      
                              </a>      
                          </div>      
                      </div>      
                  </div>

<div className="experience-item">      
                      <div className="item-image">      
                          <img src="kayber_logo.png" alt="KayBer Logo" />      
                          <img src="kayber_screenshot.png" alt="KayBer Screenshot" className="hover-image" />      
                      </div>      
                      <div className="item-content">      
                          <h3>Founder – KayBer, Inc.</h3>      
                          <div className="item-meta">May 2024 – Dec 2024</div>      
                          <ul>      
                              <li>Launched a social board (React + React Native + Supabase) with live nested threads</li>      
                              <li>Implemented friction‑free anonymous auto‑sign‑in to reduce new‑user drop‑off and boost first‑session engagement</li>      
                          </ul>      
                          <div className="project-links">      
                              <a href="https://kayber.com/" target="_blank">      
                                  Visit Website      
                                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">      
                                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <line x1="10" y1="14" x2="21" y2="3" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                  </svg>      
                              </a>      
                              <a href="https://apps.apple.com/us/app/kayber/id6670231752" target="_blank">      
                                  Visit App Store      
                                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">      
                                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <line x1="10" y1="14" x2="21" y2="3" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                  </svg>      
                              </a>      
                              <a href="https://play.google.com/store/apps/details?id=com.kaybermobile" target="_blank">      
                                  Visit Play Store      
                                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">      
                                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <line x1="10" y1="14" x2="21" y2="3" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                  </svg>      
                              </a>      
                              <div className="social-wrapper">      
                                  <a href="https://www.youtube.com/@KayBerOfficial" target="_blank" className="social-btn" title="YouTube">      
                                      <svg viewBox="0 0 24 24">      
                                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>      
                                      </svg>      
                                  </a>      
                                  <a href="https://www.tiktok.com/@kayberofficial" target="_blank" className="social-btn" title="TikTok">      
                                      <svg viewBox="0 0 24 24">      
                                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>      
                                      </svg>      
                                  </a>      
                              </div>      
                          </div>      
                      </div>      
                   </div>

<div className="experience-item">      
                      <div className="item-image">      
                          <img src="maclea_logo.png" alt="MacLea Logo" />      
                          <img src="maclea_screenshot1.png" alt="MacLea Screenshot" className="hover-image" />      
                      </div>      
                      <div className="item-content">      
                          <h3>Undergraduate Research – Educational ML Tool</h3>      
                          <div className="item-meta">May 2023 – May 2024</div>      
                          <ul>      
                              <li>Created MacLea – an educational tool designed to teach students in elementary and middle school about machine learning</li>      
                              <li>Managing the MacLea Development Team with Professor Vincent Monardo; focusing on leading design and development</li>      
                              <li>Primarily used TensorFlow, React, OpenAI’s API, Pinecone, LangChain, Express, and Angular for ongoing development of an AI-powered tool that converts user input into structured visual blocks</li>      
                              <li>Featured in The Tech, MIT's newspaper</li>      
                          </ul>      
                          <div className="project-links">      
                              <a href="https://maclea.mit.edu/about/" target="_blank">      
                                  Visit MacLea      
                                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">      
                                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <line x1="10" y1="14" x2="21" y2="3" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                  </svg>      
                              </a>      
                              <a href="https://thetech.com/2024/05/09/ml-education-in-schools" target="_blank">      
                                  View News Article      
                                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">      
                                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <line x1="10" y1="14" x2="21" y2="3" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                  </svg>      
                              </a>      
                          </div>      
                      </div>      
                  </div>

<div className="experience-item">      
                          <div className="item-image">      
                              <img src="hyades_logo.png" alt="Hyades" />      
                              <img src="hyades_screenshot.png" alt="Hyades Screenshot" className="hover-image" />      
                          </div>      
                          <div className="item-content">      
                              <h3>Software Developer – Hyades</h3>      
                              <div className="item-meta">Jan 2023 – May 2023</div>      
                              <ul>      
                                  <li>Collaborating with student group members to improve computing at MIT</li>      
                                  <li>Contributing to Hyades, a self-configuring Kubernetes cluster for managing distributed computing systems</li>      
                                  <li>Using Kubernetes, Vagrant, and Ansible for cluster and container management</li>      
                              </ul>      
                          </div>      
                          <div className="project-links">      
                              <a href="https://maclea.mit.edu/about/" target="_blank">      
                                  Visit Hyades      
                                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">      
                                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <line x1="10" y1="14" x2="21" y2="3" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                  </svg>      
                              </a>      
                          </div>      
                      </div>

<div className="experience-item">      
                          <div className="item-image">      
                              <img src="urop_logo.png" alt="Computer Vision Research" />      
                              <img src="urop_photo.png" alt="UROP Photo" className="hover-image" />      
                          </div>      
                          <div className="item-content">      
                              <h3>Undergraduate Research – Computer Vision</h3>      
                              <div className="item-meta">Oct 2022 – May 2023</div>      
                              <ul>      
                                  <li>Researching efficiency of image processing algorithm designs to optimize computer vision tasks using image reconstruction</li>      
                                  <li>Collaborating with Professor Monardo to design multiple algorithms applying task-oriented image reconstruction to computer vision</li>      
                                  <li>Developing image reconstruction scripts using PyTorch, NumPy, and OpenCV</li>      
                              </ul>      
                          </div>      
                      </div>

<div className="experience-item">      
                          <div className="item-image">      
                              <img src="robotics_logo.png" alt="MIT Robotics" />      
                              <img src="robotics_screenshot.gif" alt="Robotics Screenshot" className="hover-image" />      
                          </div>      
                          <div className="item-content">      
                              <h3>MIT Robotics Team – Computer Science Subteam</h3>      
                              <div className="item-meta">Sep 2022 – Mar 2024</div>      
                              <ul>      
                                  <li>Built OpenCV‑powered object recognition, foreground extraction, and compass‑based localization for the Harvard Pacbot competition</li>      
                                  <li>Developed A*‑style pathfinding and autonomous bot strategies; authored sensor docs adopted by subsequent MIT Robotics teams</li>      
                              </ul>      
                          </div>      
                      </div>

                  <div className="timeline-era timeline-era--origins" aria-labelledby="timeline-era-2">
                      <span className="timeline-era__line" aria-hidden="true"></span>
                      <div className="timeline-era__heading">
                          <h2 id="timeline-era-2">Origins</h2>
                          <p>The Beginning - 2022</p>
                      </div>
                      <span className="timeline-era__line" aria-hidden="true"></span>
                  </div>

                  <div className="section-backdrop section-backdrop--origins" aria-hidden="true"></div>

<div className="experience-item">      
                          <div className="item-image">      
                              <img src="boe_logo.png" alt="Board of Education" />      
                              <img src="boe_screenshot1.jpg" alt="BOE Screenshot" className="hover-image" />      
                          </div>      
                          <div className="item-content">      
                              <h3>Technology Support Specialist – Board of Education</h3>      
                              <div className="item-meta">Jun 2021 – Aug 2022</div>      
                              <ul>      
                                  <li>Responsible for documenting all work in an online system, ordering and returning equipment, testing all units, imaging new laptops and desktops, activating Chromebooks, and delivering and setting them up in schools</li>      
                                  <li>Promoted from working at the high school to covering all schools in the county</li>      
                              </ul>      
                          </div>      
                      </div>

<div className="project-item">      
                      <div className="item-image">      
                          <img src="zenith_logo.png" alt="ZenithServer" />      
                          <img src="zenith_screenshot.png" alt="ZenithServer Screenshot" className="hover-image" />      
                      </div>      
                      <div className="item-content">      
                          <h3>Minecraft Server – ZenithServer.net</h3>      
                          <div className="item-meta">Aug 2019 – Sep 2024 | Java, Server Management</div>      
                          <ul>      
                              <li>Worked with advertising agencies for online public listing and marketing</li>      
                              <li>Organized staff team into startup-style management structure</li>      
                              <li>Led website creation and game level design</li>      
                              <li>Programmed addons using Java and Eclipse; managed server using Filezilla FTP</li>      
                          </ul>      
                          <div className="project-links">      
                              <a href="https://www.zenithserver.net/" target="_blank">      
                                  Visit Website      
                                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">      
                                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <line x1="10" y1="14" x2="21" y2="3" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                  </svg>      
                              </a>      
                              <div className="social-wrapper">      
                                  <a href="https://www.youtube.com/@zenithservernet" target="_blank" className="social-btn" title="YouTube">      
                                      <svg viewBox="0 0 24 24">      
                                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>      
                                      </svg>      
                                  </a>      
                                  <a href="https://www.tiktok.com/@zenithserver" target="_blank" className="social-btn" title="TikTok">      
                                      <svg viewBox="0 0 24 24">      
                                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>      
                                      </svg>      
                                  </a>      
                                  <a href="https://discord.gg/JnX4ytH" className="social-btn" title="Discord" target="_blank" rel="noopener noreferrer">      
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">      
                                          <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>      
                                      </svg>      
                                  </a>      
                              </div>      
                                    
                          </div>      
                      </div>      
                   </div>

                  <div className="project-item recognition-item recognition-item--certificate">
                      <div className="item-image">
                          <img src="certificate-merit.png" alt="Georgia Certificate of Merit emblem" />
                      </div>
                      <div className="item-content">
                          <h3>Georgia Certificate of Merit Award</h3>
                          <p>Recognition for academic excellence and achievement.</p>
                      </div>
                  </div>

                  <div className="project-item recognition-item">
                      <div className="item-image">
                          <img src="nocti_logo.png" alt="NOCTI logo" />
                      </div>
                      <div className="item-content">
                          <h3>NOCTI Certification</h3>
                          <p>Workforce Competency Credential in computer programming.</p>
                      </div>
                  </div>

                  <div className="project-item recognition-item recognition-item--ghp">
                      <div className="item-image">
                          <img src="ghp_logo.png" alt="Governor's Honors Program logo" />
                      </div>
                      <div className="item-content">
                          <h3>Governor's Honors Program</h3>
                          <p>Finalist and attendee with a major in mathematics and a minor in science.</p>
                      </div>
                  </div>

<div className="experience-item">      
                          <div className="item-image">      
                              <img src="it_intern_logo.png" alt="IT Intern" />      
                              <img src="it_intern_screenshot.png" alt="IT Intern Screenshot" className="hover-image" />      
                          </div>      
                          <div className="item-content">      
                              <h3>IT Intern</h3>      
                              <div className="item-meta">Jun 2020 – Dec 2020</div>      
                              <ul>      
                                  <li>Assisted with IT infrastructure maintenance and upgrades</li>      
                                  <li>Provided technical support to staff and resolved hardware/software issues</li>      
                                  <li>Gained hands-on experience with enterprise IT systems</li>      
                              </ul>      
                          </div>      
                   </div>

                  <div className="project-item recognition-item">
                      <div className="item-image">
                          <img src="amc_logo.png" alt="AMC 10 logo" />
                      </div>
                      <div className="item-content">
                          <h3>AMC 10 First Place</h3>
                          <p>Ranked first at my high school in the American Mathematics Competitions.</p>
                      </div>
                  </div>

<div className="project-item video1">      
                      <div className="item-image">      
                          {/* YouTube embed for Scissor Lift testing video */}      
                          <iframe       
                              width="100%"       
                              height="100%"       
                              src="https://www.youtube.com/embed/fcwOXB0jkIo"       
                              title="Scissor Lift Testing"       
                              frameBorder="0"       
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"       
                              allowFullScreen      
                              style={{ borderRadius: '10px' }}>      
                          </iframe>      
                      </div>      
                      <div className="item-content">      
                          <h3>Scissor Lift</h3>      
                          <div className="item-meta">Jan 2020 – Mar 2020 | Mechanical Engineering, Robotics</div>      
                          <ul>      
                              <li>Designed and created scissor lift compatible with pneumatics</li>      
                              <li>Built from fully recycled parts: steel auger guides and belt doctor blade</li>      
                              <li>Collaborated with robotics team members on design and testing</li>      
                          </ul>      
                          <div className="project-links">      
                              <a href="https://www.youtube.com/watch?v=fcwOXB0jkIo" target="_blank">      
                                  Watch on YouTube      
                                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">      
                                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <line x1="10" y1="14" x2="21" y2="3" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                  </svg>      
                              </a>      
                          </div>      
                      </div>      
                  </div>

<div className="project-item recognition-item recognition-item--mos">
                      <div className="item-image">
                          <img src="microsoft-office.png" alt="Microsoft Office logo" />
                      </div>
                      <div className="item-content">
                          <h3>Microsoft Office Master Specialist</h3>
                          <p>Certified in Word, Excel, PowerPoint, Access, and Outlook.</p>
                      </div>
                  </div>

<div className="project-item video2">      
                      <div className="item-image">      
                          {/* YouTube embed for FBLA Digital Video Production */}      
                          <iframe       
                              width="100%"       
                              height="100%"       
                              src="https://www.youtube.com/embed/Yk1BabtOIU8"       
                              title="FBLA Digital Video Production"       
                              frameBorder="0"       
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"       
                              allowFullScreen      
                              style={{ borderRadius: '10px' }}>      
                          </iframe>      
                      </div>      
                      <div className="item-content">      
                          <h3>FBLA – Digital Video Production</h3>      
                          <div className="item-meta">Aug 2018 – Oct 2019 | Video Production, Leadership</div>      
                          <ul>      
                              <li>Competed in Digital Video Production competition through national level</li>      
                              <li>Became Vice President after recruiting new members</li>      
                          </ul>      
                          <div className="project-links">      
                              <a href="https://www.youtube.com/watch?v=Yk1BabtOIU8" target="_blank">      
                                  Watch on YouTube      
                                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">      
                                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <polyline points="15 3 21 3 21 9" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                      <line x1="10" y1="14" x2="21" y2="3" fill="none" stroke="currentColor" strokeWidth="2"/>      
                                  </svg>      
                              </a>      
                          </div>      
                      </div>      
                  </div>
              </div>
          </section>

          {/* Footer */}      
          <footer>      
              <div className="container">      
                  <div className="footer-social-links" aria-label="Social media links">
                      <a href="https://www.linkedin.com/in/kent-brought/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                      <a href="https://github.com/KentBrought" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                      <a href="https://www.instagram.com/kent88.88/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
                  </div>
                  <p>&copy; 2025–2026 Kent Brought. <a href="https://github.com/KentBrought/KentBrought.github.io" target="_blank">View Source Code</a></p>      
              </div>      
          </footer>
    </main>
  );
}
