import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { CaseStudy } from "./CaseStudy.jsx";
import { ProfilePage } from "./ProfilePage.jsx";
import { caseStudies } from "./case-studies.js";
import "./theme.css";
import "./styles.css";
import "./hero.css";
import "./navigation.css";
import "./profile.css";
import "./typography.css";

const caseAliases = { 'case-1': 'organisation', 'case-2': 'intent' };
const path = window.location.pathname;
const caseSlug = path.match(/^\/work\/(organisation|intent)\/?$/)?.[1]
  ?? caseAliases[path.match(/^\/(case-[12])\/?$/)?.[1]];
const profilePage = window.location.pathname.match(/^\/(resume|about|contact)\/?$/)?.[1];
const page = caseSlug && caseStudies[caseSlug]
  ? <CaseStudy slug={caseSlug} />
  : profilePage ? <ProfilePage page={profilePage} /> : <App />;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {page}
  </React.StrictMode>,
);
