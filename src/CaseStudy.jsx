import { useEffect, useState } from 'react';
import { caseStudies } from './case-studies.js';
import { LetterFooter } from './LetterFooter.jsx';
import { SiteHeader } from './SiteHeader.jsx';
import './case-study.css';

function StudyFigure({ image }) {
  return <figure className="study-figure">
    <img src={image.src} alt={image.caption} width={image.width} height={image.height} loading="lazy" />
    <figcaption>{image.caption}</figcaption>
  </figure>;
}

function StudySection({ section }) {
  return <section className="study-section" id={section.id} aria-labelledby={section.id + '-title'}>
    <h2 id={section.id + '-title'}>{section.title}</h2>
    {section.heading && <h3>{section.heading}</h3>}
    {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    {section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
    {section.groups && <div className="study-groups">
      {section.groups.map(([name, items]) => <div key={name}>
        <h3>{name}</h3>
        <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
      </div>)}
    </div>}
    {section.quote && <blockquote>{section.quote}</blockquote>}
    {section.images?.map(image => <StudyFigure key={image.src} image={image} />)}
  </section>;
}

export function CaseStudy({ slug }) {
  const study = caseStudies[slug];
  const otherSlug = slug === 'organisation' ? 'intent' : 'organisation';
  const other = caseStudies[otherSlug];
  const [active, setActive] = useState(study.sections[0].id);

  useEffect(() => {
    document.title = study.name + ' — Khushi Tiwari';
    const sections = study.sections.map(({ id }) => document.getElementById(id));
    let frame;
    const sync = () => {
      frame = undefined;
      const readingLine = Math.min(180, window.innerHeight * .25);
      const current = sections.findLast(section => section.getBoundingClientRect().top <= readingLine);
      setActive(current?.id ?? sections[0].id);
    };
    const schedule = () => {
      if (frame === undefined) frame = requestAnimationFrame(sync);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [study]);

  return <>
    <a className="skip" href="#study-main">Skip to case study</a>
    <SiteHeader />
    <main className="study" id="study-main">
      <div className="study-hero">
        <h1>{study.title}</h1>
        <p>{study.intro}</p>
        <img src={study.cover.src} alt={study.cover.caption} width={study.cover.width} height={study.cover.height} fetchPriority="high" />
      </div>
      <div className="study-layout">
        <aside className="study-sidebar">
          <nav aria-label="Case study contents">
            <p>Contents</p>
            <ul>{study.sections.map(section => <li key={section.id}>
              <a href={'#' + section.id} aria-current={active === section.id ? 'location' : undefined}>{section.title}</a>
            </li>)}</ul>
            <a className="study-top" href="#top">Back to top <span aria-hidden="true">↑</span></a>
          </nav>
        </aside>
        <article className="study-article" aria-label={study.name + ' case study'}>
          <dl className="study-facts">{Object.entries(study.facts).map(([name, value]) =>
            <div key={name}><dt>{name}</dt><dd>{value}</dd></div>
          )}</dl>
          {study.sections.map(section => <StudySection key={section.id} section={section} />)}
          <a className="study-source" href={study.source} target="_blank" rel="noreferrer">View original in Notion <span aria-hidden="true">↗</span></a>
        </article>
      </div>
      <section className="study-more" aria-labelledby="study-more-title">
        <h2 id="study-more-title">More Projects</h2>
        <a href={'/work/' + otherSlug}>
          <img src={other.cover.src} alt="" width={other.cover.width} height={other.cover.height} loading="lazy" />
          <span>{other.name} <span aria-hidden="true">↗</span></span>
        </a>
      </section>
    </main>
    <LetterFooter />
  </>;
}
