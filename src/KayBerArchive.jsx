import ShortsGallery from './ShortsGallery';

const kayberClips = [
  { id: 'FD-8FkM10nE', title: 'Reading Funny KayBer Replies (Part 3)' },
  { id: 'hIzHM4TTSVQ', title: 'These Icebreakers Make New Friends Fast' },
  { id: 'TXSIQ2WkQCk', title: 'Funniest KayBer Posts' },
];

const links = [
  ['Website', 'https://kayber.com/'],
  ['App Store', 'https://apps.apple.com/us/app/kayber/id6670231752'],
  ['Google Play', 'https://play.google.com/store/apps/details?id=com.kaybermobile'],
];

export default function KayBerArchive() {
  return (
    <article className="project-item kayber-archive" id="kayber" aria-labelledby="kayber-heading">
      <div className="kayber-story">
        <header className="archive-heading">
          <img className="kayber-logo" src="/kayber_logo.webp" alt="" loading="lazy" />
          <div><div className="item-meta">May 2024 – Mar 2026</div><h3 id="kayber-heading">KayBer</h3></div>
        </header>
        <p className="kayber-description">I built a social board where anyone could open a thread and join the conversation anonymously. The web and mobile apps shared live replies through Supabase.</p>
        <nav className="project-links kayber-links" aria-label="KayBer links">
          {links.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer">{label}</a>)}
        </nav>
        <img className="kayber-screen" src="/kayber_screenshot.webp" alt="KayBer’s discussion feed on the web" loading="lazy" />
      </div>
      <ShortsGallery project="kayber" clips={kayberClips} links={
        <nav className="project-links kayber-links" aria-label="KayBer channels">
          <a href="https://www.youtube.com/@KayBerOfficial" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://www.tiktok.com/@kayberofficial" target="_blank" rel="noreferrer">TikTok</a>
        </nav>
      } />
    </article>
  );
}
