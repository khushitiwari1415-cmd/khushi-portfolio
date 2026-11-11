import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { CaseStudy } from "./CaseStudy.jsx";
import { caseStudies } from "./case-studies.js";
import "./theme.css";
import "./styles.css";
import "./hero.css";

const caseSlug = window.location.pathname.match(/^\/work\/(organisation|intent)\/?$/)?.[1];

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {caseSlug && caseStudies[caseSlug] ? <CaseStudy slug={caseSlug} /> : <App />}
  </React.StrictMode>,
);
