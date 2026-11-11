import { useEffect } from 'react';
import { SiteHeader } from './SiteHeader.jsx';
import { caseStudies } from './case-studies.js';

export function ProfilePage({ page }) {
  const isResume = page === 'resume';
  const title = isResume ? 'Resume' : 'About';
  useEffect(() => { document.title = title + ' — Khushi Tiwari'; }, [title]);

  return <>
    <a className="skip" href="#profile-main">Skip to content</a>
    <SiteHeader current={title} />
    <main className="profile-page" id="profile-main">
      <h1>{title}</h1>
      {isResume ? <>
        <p className="profile-intro">Khushi Tiwari · Product Designer</p>
        <section aria-labelledby="project-experience">
          <h2 id="project-experience">Selected project experience</h2>
          {Object.entries(caseStudies).map(([slug, study]) => <article key={slug}>
            <h3><a href={'/work/' + slug}>{study.name} <span aria-hidden="true">↗</span></a></h3>
            <p>{study.intro}</p>
            <p className="profile-meta">{study.facts.Role} · {study.facts.Timeline} · {study.facts.Team}</p>
          </article>)}
        </section>
      </> : <>
        <p className="profile-intro">I’m Khushi Tiwari, a Product Designer.</p>
        <p>I’m drawn to the why behind every interaction. I turn human needs into clear, intuitive experiences, with a focus on making complex tasks feel simpler.</p>
        <p>Away from the screen, I’m usually exploring, sketching, or getting lost in music.</p>
        <a className="profile-link" href="/#behind-the-pixels">Read my design notes <span aria-hidden="true">↗</span></a>
      </>}
    </main>
  </>;
}
