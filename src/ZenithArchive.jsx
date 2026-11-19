import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './zenith.css';

const clips = [
  { id: 'witCKqtsUkU', title: 'How to Make a Ship' },
  { id: 'vtUkHbDr5QM', title: 'I Assassinated a King' },
  { id: '4R_0s9jwj3w', title: 'Flying My Airship' },
];
const links = [
  ['Original website', 'https://www.zenithserver.net/'],
  ['YouTube', 'https://www.youtube.com/@zenithservernet'],
  ['TikTok', 'https://www.tiktok.com/@zenithserver'],
  ['Discord', 'https://discord.gg/JnX4ytH'],
];

export default function ZenithArchive() {
  const dialog = useRef(null);
  const [selected, select] = useState(null);

  function open(clip) {
    select(clip);
    dialog.current.showModal();
  }

  return (
    <article className="project-item zenith-archive" id="zenith" aria-labelledby="zenith-heading">
      <div className="zenith-story">
        <header className="zenith-heading">
          <div className="item-media-pair__logo"><img src="/zenith_logo.webp" alt="" loading="lazy" /></div>
          <div className="item-content"><h3 id="zenith-heading">Zenith</h3><div className="item-meta">Aug 2019 – Sep 2024</div></div>
        </header>
        <dl className="zenith-impact">
          <div><dt>Unique players</dt><dd>1,000+</dd></div>
          <div><dt>Volunteer staff</dt><dd>12</dd></div>
        </dl>
        <p className="zenith-description">I created and ran a Minecraft world where players could build towns, fly airships, and fight over kingdoms. I designed levels, wrote custom Java add-ons, led the volunteer team, and worked with advertisers to bring new players into the world.</p>
        <nav className="project-links zenith-links" aria-label="Zenith archive links">
          {links.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noreferrer">{name}</a>)}
        </nav>
      </div>
      <div className="zenith-films">
        <h4>Scenes from Zenith</h4>
        <div className="zenith-reel">
          {clips.map(clip => (
            <button key={clip.id} type="button" onClick={() => open(clip)} aria-label={`Play ${clip.title}`} aria-haspopup="dialog">
              <img src={`/zenith/${clip.id}.webp`} alt="" loading="lazy" width="360" height="640" />
              <span className="zenith-play" aria-hidden="true" />
              <span className="zenith-film-title">{clip.title}</span>
            </button>
          ))}
        </div>
      </div>
      {createPortal(
        <dialog className="zenith-player" ref={dialog} aria-labelledby="zenith-player-title" onClose={() => select(null)}>
          {selected && <>
            <header><h4 id="zenith-player-title">{selected.title}</h4><button autoFocus type="button" onClick={() => dialog.current.close()}>Close</button></header>
            <iframe title={selected.title} src={`https://www.youtube-nocookie.com/embed/${selected.id}?autoplay=1&playsinline=1`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            <a href={`https://www.youtube.com/shorts/${selected.id}`} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
          </>}
        </dialog>, document.body)}
    </article>
  );
}
