const links = [
  ['Work', '/#work'],
  ['Resume', '/resume'],
  ['About', '/about'],
  ['Contact', '/#letters'],
];

export function SiteHeader({ current }) {
  return <header className="site-header" id="top">
    <a className="brand" href="/">Khushi Tiwari<span className="brand-dot" aria-hidden="true" /></a>
    <nav aria-label="Main navigation">
      {links.map(([label, href]) =>
        <a key={href} href={href} aria-current={current === label ? 'page' : undefined}>{label}</a>
      )}
    </nav>
  </header>;
}
