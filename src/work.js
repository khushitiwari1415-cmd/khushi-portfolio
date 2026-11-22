import { caseStudies } from './case-studies.js';

// Shared by the desk hero and the Selected work section. Copy comes from the original case studies.
export const work = [
  {
    id: 'organisation', href: '/case-1', index: '01', title: 'Organisation',
    headline: ['From one person’s tool', 'to a team’s workspace.'],
    problem: 'WebToNative was built for one person. Teams were already using it.',
    summary: 'Teams had outgrown a product made for one user, with no way to assign ownership or control who could edit what. I rebuilt it around organisations: apps belong to one, and members get roles with clear permissions.',
    cover: '/assets/case-studies/org-6.png',
    topics: ['Information architecture', 'Role-based access', 'Team invitations'],
    screens: ['org-1', 'org-6', 'org-4', 'org-2'],
    flowLabels: ['Wireframe', 'Apps', 'Access', 'Invite'],
    start: 1,
    note: { section: 'research', pin: { x: 64, y: 34 } },
  },
  {
    id: 'intent', href: '/case-2', index: '02', title: 'Designing for intent',
    headline: ['A little friction,', 'on purpose.'],
    problem: '“Delete app” sat in a kebab menu, one slip away from gone.',
    summary: 'People kept deleting apps by accident, even with a confirmation and OTP in the way. I moved the action into a Danger Zone and made the confirmation say exactly what you’d lose.',
    cover: '/assets/case-studies/intent-5.png',
    topics: ['Preventive UX', 'Action placement', 'Destructive flows'],
    screens: ['intent-3', 'intent-5', 'intent-6', 'intent-9'],
    flowLabels: ['Before', 'Danger zone', 'Confirm', 'Final'],
    start: 1,
    note: { section: 'insights', pin: { x: 72, y: 56 } },
  },
].map(project => {
  const study = caseStudies[project.id];
  const images = study.sections.flatMap(section => section.images ?? []);
  return {
    ...project,
    facts: study.facts,
    quote: study.sections.find(section => section.id === project.note.section)?.quote,
    screens: project.screens.map(name => images.find(image => image.src.endsWith(`/${name}.png`))).filter(Boolean),
  };
});
