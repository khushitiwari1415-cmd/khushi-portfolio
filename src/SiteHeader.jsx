import { useEffect, useRef, useState } from 'react';

const links = [
  ['Work', '/#work'],
  ['Resume', '/resume'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

// Homepage header: a Figma-style top bar on the same warm paper as the desk and the work board.
function DeskHeader() {
  const [section, setSection] = useState(null);
  const [following, setFollowing] = useState(false);
  const timer = useRef(0);

  // Light up the Work tab while the work board is on screen.
  useEffect(() => {
    const board = document.getElementById('work');
    if (!board) return undefined;
    const observer = new IntersectionObserver(([entry]) => setSection(entry.isIntersecting ? 'Work' : null),
      { rootMargin: '-45% 0px -45% 0px' });
    observer.observe(board);
    return () => { observer.disconnect(); window.clearTimeout(timer.current); };
  }, []);

  // Figma's "follow" mode: jump to wherever Khushi's cursor is on the board.
  function follow(event) {
    const target = document.querySelector('.board-cursor') ?? document.getElementById('work');
    if (!target) return;
    event.preventDefault();
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: still ? 'instant' : 'smooth', block: 'center' });
    setFollowing(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setFollowing(false), 2600);
  }

  return <>
    <header className="site-header figma-header" id="top">
      <a className="figma-file" href="/" aria-label="Khushi Tiwari, home">
        <span className="figma-file-icon" aria-hidden="true">K</span>
        <span className="figma-file-name">Khushi Tiwari<span aria-hidden="true"> / product-designer.fig</span></span>
      </a>

      <nav className="figma-tabs" aria-label="Main navigation">
        {links.map(([label, href]) =>
          <a key={href} href={href} aria-current={section === label ? 'location' : undefined}>{label}</a>)}
      </nav>

      <div className="figma-actions">
        <span className="figma-people">
          <a className="figma-avatar is-khushi" href="#work" onClick={follow} data-tip="Follow Khushi" aria-label="Follow Khushi to the work board">K</a>
          <span className="figma-avatar is-you" data-tip="You, just looking around" aria-hidden="true">Y</span>
        </span>
        <a className="figma-share" href="#letters">Say hello</a>
      </div>
    </header>
    {following && <div className="follow-frame" aria-live="polite"><span>Following Khushi</span></div>}
  </>;
}

export function SiteHeader({ current, home = false }) {
  if (home) return <DeskHeader />;
  return <header className="site-header" id="top">
    <a className="brand" href="/">
      Khushi Tiwari
      <span className="brand-dot" aria-hidden="true" />
    </a>
    <nav aria-label="Main navigation">
      {links.map(([label, href]) =>
        <a key={href} href={href} aria-current={current === label ? 'page' : undefined}>{label}</a>
      )}
    </nav>
  </header>;
}
