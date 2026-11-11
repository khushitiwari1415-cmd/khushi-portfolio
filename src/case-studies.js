const webToNative = 'WebToNative is a no-code platform that converts websites into Android and iOS apps. Users can customise features, manage permissions, integrate add-ons, and preview updates in real time.';
const imageSizes = {
  'intent-0': [1500, 400],
  'intent-3': [1024, 624],
  'intent-4': [1024, 624],
  'intent-5': [1440, 1021],
  'intent-6': [1440, 817],
  'intent-7': [1440, 878],
  'intent-8': [1440, 1021],
  'intent-9': [1440, 817],
  'org-0': [1907, 911],
  'org-1': [1440, 740],
  'org-11': [1024, 613],
  'org-13': [1500, 400],
  'org-2': [1024, 613],
  'org-3': [1024, 577],
  'org-4': [1024, 577],
  'org-5': [1024, 577],
  'org-6': [1440, 812],
  'org-9': [1024, 577],
};

const asset = (name, caption) => {
  const [width, height] = imageSizes[name];
  return { src: '/assets/case-studies/' + name + '.png', caption, width, height };
};

export const caseStudies = {
  organisation: {
    name: 'Organisation',
    title: 'From Tool to System: Transforming WebToNative into a Collaborative Workspace',
    intro: 'A unified workspace where founders, agencies, and growing businesses can manage every app and every team member from one place.',
    cover: asset('org-13', 'Organisation case-study cover'),
    source: 'https://rocky-squid-b1f.notion.site/Organisation-32c71ab9856881368320e690e2cfc4b3',
    facts: { Role: 'UI/UX Designer (end-to-end)', Timeline: '2 weeks', Team: 'Designer + Product Manager', Tools: 'Figma · FigJam · ChatGPT · Claude · Gemini' },
    sections: [
      { id: 'overview', title: 'Project Overview', paragraphs: [webToNative, 'As adoption grew, teams started using WebToNative. The project introduced a shared workspace where teams could manage apps, members, roles, and permissions.'] },
      { id: 'problem', title: 'The Problem', heading: 'Built for individuals. Used by teams.', paragraphs: ['The product stayed single-user as teams grew. There was no way to assign ownership, control who could edit what, or track changes across a growing team.'], items: ['No clear ownership or accountability.', 'No way to restrict who could edit, configure, or delete apps.', 'Overlapping work and errors when members had no defined roles.', 'No visibility into team actions or app changes.'], images: [asset('org-0', 'Single-user dashboard with no collaboration or role structure')] },
      { id: 'research', title: 'Research', paragraphs: ['Three distinct user types emerged, each with different needs. The system treated them identically.'], groups: [['User types', ['Business owners needed control and billing security.', 'Developers needed access to configure apps.', 'Admins needed to manage teams and permissions.']], ['Pain points', ['No way to assign roles across teams', 'Limited visibility into team actions', 'Security concerns with shared access', 'Difficulty managing multiple apps']]], quote: 'Users don’t just need task management — they need structured ownership, control, and accountability across teams.' },
      { id: 'system', title: 'System Thinking', heading: 'A structural shift — from users to systems', paragraphs: ['I rethought the information architecture around organisations. An organisation owns its apps, and members have assigned roles with specific permissions. Apps cannot exist without an organisation, ensuring structured ownership.'] },
      { id: 'strategy', title: 'UX Strategy', heading: 'Designing the system behind the screens', items: ['Clarity over flexibility. Make roles and permissions explicit.', 'Control over chaos. Let owners delegate without losing visibility.', 'Simplicity through structure. Keep the system intuitive and reduce cognitive load.'] },
      { id: 'permissions', title: 'Role-Based Access Control', paragraphs: ['I introduced role-based access to prevent unauthorised access, enable delegation, and support growing teams.'], groups: [['Global roles', ['Owner — Full control over billing, deletion, and members.', 'Admin — Manage apps and users.']], ['Collaborator roles', ['Developer — Configure apps.', 'Viewer — Read-only access.']]] },
      { id: 'decisions', title: 'Key Design Decisions', items: ['Card layouts to support growing app inventories.', 'Grouped avatars to make team membership visible.', 'Status tags to show the state of an app.', 'Sidebar navigation to make areas easier to find.', 'Minimal colour to reduce visual noise.'], heading: 'Handling complexity', paragraphs: ['I designed for accidental deletion with OTP confirmation, invitations when users are signed out, and clear states for expired access or roles.'] },
      { id: 'screens', title: 'UI Screens', images: [asset('org-6', 'Apps in list view'), asset('org-5', 'Apps in grid view'), asset('org-4', 'Manage app access'), asset('org-3', 'App description for internal use'), asset('org-2', 'Invite members and assign app access')] },
      { id: 'iterations', title: 'Iterations', heading: 'Making the invisible, visible', paragraphs: ['The first wireframe established structure and navigation. Similar-looking cards, undifferentiated states, and competing actions made the layout difficult to scan.'], images: [asset('org-1', 'Initial low-fidelity wireframe'), asset('org-6', 'Final iteration with distinct app states and clearer actions')] },
      { id: 'invitations', title: 'Simplifying User Invitations', paragraphs: ['Previously, invitations from an app and from the members section selected every app by default. Admins had to deselect apps manually when access was only needed for one.'], groups: [['Inviting from an app', ['The invite grants access to that app.']], ['Inviting from members', ['The admin selects the specific apps before sending the invitation.']]], images: [asset('org-9', 'Invitation from an app'), asset('org-11', 'Member invitation and access options')] },
      { id: 'impact', title: 'Impact', paragraphs: ['The original case study describes clearer team collaboration and permissions, support for growing teams, and a workspace that non-technical users can navigate.'] },
      { id: 'learnings', title: 'Learnings', items: ['Designing for scalability requires simplifying complexity.', 'Users prefer clarity over flexibility in permissions.', 'Good UX reduces the need for explanations.'] },
    ],
  },
  intent: {
    name: 'Designing for Intent, Not Error',
    title: 'Designing for Intent, Not Error',
    intro: 'Redesigning a critical deletion flow in WebToNative through preventive UX, intentional friction, and more thoughtful action placement.',
    cover: asset('intent-0', 'Preventing accidental deletions by design case-study cover'),
    source: 'https://rocky-squid-b1f.notion.site/Designing-for-Intent-Not-Error-32f71ab985688055bd7cece936d4609a',
    facts: { Role: 'UI/UX Designer (end-to-end)', Timeline: '1 day', Team: 'Designer', Tools: 'Figma' },
    sections: [
      { id: 'overview', title: 'Project Overview', paragraphs: [webToNative, 'Users were unintentionally deleting their apps even with safeguards like confirmation and OTP. I redesigned the flow to introduce intentional friction, clarity, and control.'], quote: 'Good design doesn’t just guide actions—it prevents costly mistakes.' },
      { id: 'problem', title: 'The Problem', paragraphs: ['Delete App was placed inside a kebab menu alongside non-critical actions. Users could trigger it unintentionally, and the existing safeguards were ineffective once the flow had started. Deletion was irreversible.'] },
      { id: 'insights', title: 'Key Insights', paragraphs: ['Once users initiate an action, they tend to continue without reading fully, assume they are on the right path, and complete flows out of habit.'], quote: 'The real problem wasn’t lack of confirmation—it was easy access to a destructive action.' },
      { id: 'strategy', title: 'Solution Strategy', items: ['Introduce intentional friction early.', 'Make the risk visible.', 'Help users decide before entering the flow.'] },
      { id: 'placement', title: 'Repositioning the Delete Action', paragraphs: ['I removed Delete App from the kebab menu and moved it into View Details, so reaching it requires a deliberate navigation step.'], images: [asset('intent-3', 'Previous design'), asset('intent-4', 'Updated app actions')] },
      { id: 'danger-zone', title: 'Introducing a Danger Zone', paragraphs: ['I created a visually distinct Danger Zone inside View Details for Delete App and Transfer Ownership. Grouping these actions makes their risk clearer in context.'], images: [asset('intent-5', 'Dedicated Danger Zone inside View Details')] },
      { id: 'modal', title: 'Redesigning the Delete Modal', paragraphs: ['The new modal includes the app URL, platform, and order ID. It highlights permanent deletion, data loss, and irreversibility with clearer hierarchy and warnings.'], images: [asset('intent-6', 'Redesigned delete confirmation with app details and consequences')] },
      { id: 'comparison', title: 'Before vs After', groups: [['Before', ['Delete in the kebab menu', 'Easy to trigger accidentally', 'Generic confirmation', 'Safeguards after the action starts']], ['After', ['Delete inside View Details', 'Dedicated Danger Zone', 'Context-rich confirmation', 'Safeguards before entering the flow']]] },
      { id: 'screens', title: 'UI Screens', images: [asset('intent-7', 'Updated app actions with access to View Details'), asset('intent-8', 'Danger Zone for high-risk actions'), asset('intent-9', 'Final delete confirmation')] },
      { id: 'impact', title: 'Impact', paragraphs: ['The original case study reports fewer accidental deletions, improved confidence when managing apps, and a clearer understanding of destructive actions.'] },
      { id: 'learnings', title: 'Learnings', items: ['Users often act quickly and skim warnings.', 'Placement influences behaviour.', 'Friction is valuable when used intentionally.'] },
    ],
  },
};
