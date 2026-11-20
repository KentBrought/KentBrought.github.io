import ShortsGallery from './ShortsGallery';
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
  return (
    <article className="project-item zenith-archive" id="zenith" aria-labelledby="zenith-heading">
      <header className="zenith-heading">
          <div className="item-media-pair__logo"><img src="/zenith_logo.webp" alt="" loading="lazy" /></div>
          <div className="item-content"><h3 id="zenith-heading">Zenith</h3><div className="item-meta">Aug 2019 – Sep 2024</div></div>
      </header>
      <div className="zenith-story">
        <dl className="zenith-impact">
          <div><dt>Unique players</dt><dd>1,000+</dd></div>
          <div><dt>Volunteer staff</dt><dd>12</dd></div>
        </dl>
        <p className="zenith-description">I created and ran a Minecraft world where players could build towns, fly airships, and fight over kingdoms. I designed levels, wrote custom Java add-ons, led the volunteer team, and worked with advertisers to bring new players into the world.</p>
        <nav className="project-links zenith-links" aria-label="Zenith archive links">
          {links.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noreferrer">{name}</a>)}
        </nav>
      </div>
      <ShortsGallery heading="Scenes from Zenith" project="zenith" clips={clips} />
    </article>
  );
}
