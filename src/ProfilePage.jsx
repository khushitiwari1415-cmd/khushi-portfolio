import { useEffect, useState } from 'react';
import { SiteHeader } from './SiteHeader.jsx';
import { caseStudies } from './case-studies.js';
import envelope from './assets/letter-envelope.png';

const email = 'khushitiwari1415@gmail.com';
const contactLinks = [
  ['LinkedIn', 'https://www.linkedin.com/in/khushitiwari1415/'],
  ['GitHub', 'https://github.com/khushitiwari1415-cmd/khushi-portfolio'],
  ['Notion portfolio', 'https://rocky-squid-b1f.notion.site/khushi-tiwari'],
];

function About() {
  return <>
    <div className="profile-cover">
      <h1>About me</h1>
      <p className="profile-intro">I’m Khushi Tiwari, a Product Designer.</p>
    </div>
    <section className="about-story" aria-labelledby="about-story-title">
      <h2 id="about-story-title">Curiosity comes <em>first.</em></h2>
      <div>
        <p>I’m drawn to the why behind every interaction. I turn human needs into clear, intuitive experiences, with a focus on making complex tasks feel simpler.</p>
        <p>Away from the screen, I’m usually exploring, sketching, or getting lost in music.</p>
        <a className="profile-link" href="/#behind-the-pixels">Read my design notes <span aria-hidden="true">↗</span></a>
      </div>
    </section>
    <div className="profile-end"><a className="hero-link" href="/contact">Say hello <span aria-hidden="true">↗</span></a></div>
  </>;
}

function Resume() {
  return <>
    <div className="profile-cover">
      <h1>Resume</h1>
      <p className="profile-intro">Khushi Tiwari · Product Designer</p>
      <button className="hero-link" type="button" onClick={() => window.print()}>Print résumé</button>
    </div>
    <section className="resume-work" aria-labelledby="project-experience">
      <h2 id="project-experience">Selected project experience</h2>
      {Object.entries(caseStudies).map(([slug, study]) => <article className="resume-project" key={slug}>
        <div>
          <h3><a href={'/work/' + slug}>{study.name} <span aria-hidden="true">↗</span></a></h3>
          <p>{study.intro}</p>
          <p className="profile-meta">{study.facts.Role} · {study.facts.Timeline} · {study.facts.Team}</p>
        </div>
        <img src={study.cover.src} width={study.cover.width} height={study.cover.height} alt="" />
      </article>)}
    </section>
  </>;
}

function Contact() {
  const [feedback, setFeedback] = useState('');
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setFeedback('Email address copied.');
    } catch {
      setFeedback('Select the email address to copy it.');
    }
  }

  return <>
    <div className="contact-cover">
      <img src={envelope} alt="" width="112" height="112" />
      <h1>Let’s make something <em>thoughtful.</em></h1>
      <p>Have a project in mind, or just want to say hello?</p>
      <div className="contact-email">
        <a href={'mailto:' + email}>{email}</a>
        <button type="button" onClick={copyEmail}>Copy email</button>
      </div>
      <p className="contact-feedback" role="status">{feedback}</p>
      <ul className="contact-links" aria-label="Find me online">
        {contactLinks.map(([label, href]) =>
          <li key={href}><a href={href}>{label} <span aria-hidden="true">↗</span></a></li>
        )}
      </ul>
    </div>
    <div className="profile-end"><a className="hero-link" href="/#letters">Write a letter by the lake <span aria-hidden="true">↗</span></a></div>
  </>;
}

const pages = {
  about: ['About', About],
  resume: ['Resume', Resume],
  contact: ['Contact', Contact],
};

export function ProfilePage({ page }) {
  const [title, Content] = pages[page];
  useEffect(() => { document.title = title + ' — Khushi Tiwari'; }, [title]);

  return <>
    <a className="skip" href="#profile-main">Skip to content</a>
    <SiteHeader current={title} />
    <main className="profile-page" id="profile-main"><Content /></main>
  </>;
}
