import { SiteHeader } from './SiteHeader.jsx';
import { Hero } from './Hero.jsx';
import { SelectedWork } from './SelectedWork.jsx';
import { DesignNotes } from './DesignNotes.jsx';
import { LetterFooter } from './LetterFooter.jsx';
import { Loader, shouldShowLoader } from './Loader.jsx';
import { useCallback, useState } from 'react';

export function App() {
  const [loading, setLoading] = useState(shouldShowLoader);
  const done = useCallback(() => setLoading(false), []);
  return <>
    {loading && <Loader onDone={done} />}
    <a className="skip" href="#main">Skip to content</a>
    <SiteHeader home />
    <main id="main">
      <Hero ready={!loading} />
      <SelectedWork />
      <DesignNotes />
    </main>
    <LetterFooter desk />
  </>;
}
