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

const caseSlug = window.location.pathname.match(/^\/work\/(organisation|intent)\/?$/)?.[1];
const profilePage = window.location.pathname.match(/^\/(resume|about|contact)\/?$/)?.[1];
const page = caseSlug && caseStudies[caseSlug]
  ? <CaseStudy slug={caseSlug} />
  : profilePage ? <ProfilePage page={profilePage} /> : <App />;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {page}
  </React.StrictMode>,
);
