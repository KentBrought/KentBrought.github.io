import ShortsGallery from './ShortsGallery';

const kayberClips = [
  { id: 'FD-8FkM10nE', title: 'Reading Funny KayBer Replies (Part 3)' },
  { id: 'hIzHM4TTSVQ', title: 'These Icebreakers Make New Friends Fast' },
  { id: 'TXSIQ2WkQCk', title: 'Funniest KayBer Posts' },
];

const links = [
  ['Visit Website', 'https://kayber.com/'],
  ['Visit App Store', 'https://apps.apple.com/us/app/kayber/id6670231752'],
  ['Visit Play Store', 'https://play.google.com/store/apps/details?id=com.kaybermobile'],
  ['YouTube', 'https://www.youtube.com/@KayBerOfficial'],
  ['TikTok', 'https://www.tiktok.com/@kayberofficial'],
];

export default function KayBerArchive() {
  return (
    <article className="project-item kayber-archive" id="kayber" aria-labelledby="kayber-heading">
      <header className="archive-heading">
        <img className="kayber-logo" src="/kayber_logo.webp" alt="" loading="lazy" />
        <div><h3 id="kayber-heading">KayBer</h3><div className="item-meta">May 2024 – Mar 2026</div></div>
      </header>
      <p className="kayber-description">I launched a social board with live, nested conversations using React, React Native, and Supabase. Anonymous sign-in let people join a thread as soon as they opened the app.</p>
      <div className="kayber-media">
        <img className="kayber-screen" src="/kayber_screenshot.webp" alt="KayBer’s discussion feed on the web" loading="lazy" />
        <ShortsGallery heading="KayBer Shorts" project="kayber" clips={kayberClips} />
      </div>
      <nav className="project-links" aria-label="KayBer links">
        {links.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer">{label}</a>)}
      </nav>
    </article>
  );
}
