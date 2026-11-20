import { useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import videoStats from './video-views.json';

export default function ShortsGallery({ project, clips, links }) {
  const titleId = useId();
  const dialog = useRef(null);
  const [selected, select] = useState(null);

  function open(clip) {
    select(clip);
    dialog.current.showModal();
  }

  return (
    <>
      <div className="zenith-films">
        <div className="zenith-reel">
          {clips.map(clip => (
            <button key={clip.id} type="button" onClick={() => open(clip)} aria-label={`Play ${clip.title}, ${videoStats[clip.id].views.toLocaleString("en-US")} views`} aria-haspopup="dialog">
              <img src={`/${project}/${clip.id}.webp`} alt="" loading="lazy" width="360" height="640" />
              <span className="zenith-play" aria-hidden="true" />
              <span className="zenith-film-title">{clip.title}<small className="clip-views" title={`YouTube views as of ${videoStats[clip.id].asOf}`}>{videoStats[clip.id].views.toLocaleString("en-US")} views</small></span>
            </button>
          ))}
        </div>
        {links}
      </div>
      {createPortal(
        <dialog className="zenith-player" ref={dialog} aria-labelledby={titleId} onClose={() => select(null)}>
          {selected && <>
            <header><h4 id={titleId}>{selected.title}</h4><button autoFocus type="button" onClick={() => dialog.current.close()}>Close</button></header>
            <iframe title={selected.title} src={`https://www.youtube-nocookie.com/embed/${selected.id}?autoplay=1&playsinline=1`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            <a href={`https://www.youtube.com/shorts/${selected.id}`} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
          </>}
        </dialog>, document.body)}
    </>
  );
}
