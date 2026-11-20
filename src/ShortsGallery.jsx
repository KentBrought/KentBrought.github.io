import { useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ShortsGallery({ heading, project, clips }) {
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
        <h4>{heading}</h4>
        <div className="zenith-reel">
          {clips.map(clip => (
            <button key={clip.id} type="button" onClick={() => open(clip)} aria-label={`Play ${clip.title}`} aria-haspopup="dialog">
              <img src={`/${project}/${clip.id}.webp`} alt="" loading="lazy" width="360" height="640" />
              <span className="zenith-play" aria-hidden="true" />
              <span className="zenith-film-title">{clip.title}</span>
            </button>
          ))}
        </div>
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
