export interface AccountIntelligence {
  accountId: string;
  recentNews: string[];
  annualReportHighlights: string[];
  cursorAngles: string[];
  sources: { label: string; url: string }[];
}

export const ACCOUNT_INTELLIGENCE: AccountIntelligence[] = [
  {
    accountId: "1",
    recentNews: [
      "Airwallex reported a 95% increase in engineering deployment velocity from AI-assisted development in its 2025 year-end update.",
      "The company's AirDev agents now merge 120+ code requests daily across 200+ repositories.",
      "Airwallex is investing US$1B in US expansion and entering 10+ new markets in 2026.",
    ],
    annualReportHighlights: [
      "Over 90% of employees actively use AI tools; engineering is explicitly scaling as an AI-native function.",
      "Melbourne and Sydney remain core engineering hubs with a growing intern and graduate program.",
    ],
    cursorAngles: [
      "standardize AI-assisted development across 250 engineers",
      "accelerate agent-driven workflows with governed Teams seats",
      "maintain quality gates as agent-authored MR volume scales",
    ],
    sources: [
      { label: "Airwallex 2025 EOY Update", url: "https://www.airwallex.com/en-us/blog/2025-eoy-mission-update" },
      { label: "AirDev engineering blog", url: "https://careers.airwallex.com/blog/airwallex-ai-agents-software-development/" },
    ],
  },
  {
    accountId: "64",
    recentNews: [
      "TechnologyOne continues investing in cloud SaaS for government, education, and local council customers across ANZ.",
      "FY25 results highlighted recurring revenue growth and accelerated SaaS migration among public-sector clients.",
    ],
    annualReportHighlights: [
      "R&D investment remains a core pillar with Brisbane-based engineering scaling platform capabilities.",
      "Annual report emphasises digital transformation partnerships with Australian government agencies.",
    ],
    cursorAngles: [
      "speed platform delivery for regulated public-sector customers",
      "reduce cycle time on large ERP codebases with AI pair programming",
      "centralise engineering standards across distributed teams",
    ],
    sources: [
      { label: "TechnologyOne Investor Centre", url: "https://www.technologyonecorp.com/investors" },
    ],
  },
  {
    accountId: "68",
    recentNews: [
      "WiseTech Global continues expanding its CargoWise platform with AI and automation features for logistics.",
      "Recent investor updates cite strong revenue growth driven by global supply-chain digitisation.",
    ],
    annualReportHighlights: [
      "FY25 annual report highlights sustained investment in product R&D and global engineering headcount.",
      "Company strategy centres on deep logistics domain software at scale with high compliance requirements.",
    ],
    cursorAngles: [
      "boost velocity on complex logistics codebases without sacrificing compliance",
      "equip 250+ engineers with consistent AI tooling and SSO governance",
      "onboard developers faster on a large proprietary platform",
    ],
    sources: [
      { label: "WiseTech Annual Reports", url: "https://www.wisetechglobal.com/investors/annual-reports/" },
    ],
  },
  {
    accountId: "69",
    recentNews: [
      "REA Group is integrating AI across realestate.com.au for property search, valuations, and agent tools.",
      "Recent results show continued investment in product and technology amid property market recovery.",
    ],
    annualReportHighlights: [
      "Annual report emphasises technology-led differentiation in Australian property media.",
      "Melbourne engineering hub drives consumer and developer-facing platform innovation.",
    ],
    cursorAngles: [
      "ship AI-powered property features faster across web and mobile squads",
      "align 250 engineers on secure, admin-controlled AI usage",
      "reduce toil on legacy integrations while innovating on search",
    ],
    sources: [
      { label: "REA Group Investors", url: "https://www.rea-group.com/about-us/investors/" },
    ],
  },
  {
    accountId: "70",
    recentNews: [
      "Xero is embedding AI assistants across its small-business accounting platform globally.",
      "FY25 reporting highlighted subscriber growth and increased product investment in Melbourne.",
    ],
    annualReportHighlights: [
      "Annual report cites technology and product development as primary growth levers.",
      "Engineering organisation scaling to support AI features and platform reliability at global scale.",
    ],
    cursorAngles: [
      "accelerate AI feature delivery for millions of SMB customers",
      "give engineering leaders visibility into AI adoption and spend",
      "standardise Cursor Teams across Melbourne engineering squads",
    ],
    sources: [
      { label: "Xero Investor Centre", url: "https://www.xero.com/about/investors/" },
    ],
  },
  {
    accountId: "2",
    recentNews: [
      "Culture Amp is investing in AI-powered people analytics and coach features for HR teams.",
      "The company continues expanding its platform while maintaining a Melbourne engineering centre of excellence.",
    ],
    annualReportHighlights: [
      "Focus on product-led growth with sustained R&D spend on engagement and performance tools.",
      "Engineering culture emphasises craft, psychological safety, and platform reliability.",
    ],
    cursorAngles: [
      "help 200 engineers ship AI analytics features with consistent tooling",
      "reduce boilerplate so squads focus on customer-facing HR innovation",
      "roll out Teams with SSO for a distributed AU engineering org",
    ],
    sources: [
      { label: "Culture Amp News", url: "https://www.cultureamp.com/company/news" },
    ],
  },
  {
    accountId: "40",
    recentNews: [
      "Factory is scaling its AI software engineering platform with significant Sydney-headquartered growth.",
      "The company is hiring aggressively across engineering as demand for AI dev tools surges.",
    ],
    annualReportHighlights: [
      "Rapid headcount growth in engineering as core investment area.",
      "Product strategy centres on AI agents for code review, debugging, and development automation.",
    ],
    cursorAngles: [
      "equip builders building AI dev tools with best-in-class AI IDE experience",
      "dogfood advanced agent workflows at scale across 200 engineers",
      "manage Premium seat mix for power users running heavy agent workloads",
    ],
    sources: [
      { label: "Factory", url: "https://factory.ai" },
    ],
  },
  {
    accountId: "71",
    recentNews: [
      "Afterpay (Block) continues integrating cash app and BNPL technology across APAC engineering hubs.",
      "Melbourne and Sydney teams focus on payments reliability, fraud, and merchant experience.",
    ],
    annualReportHighlights: [
      "Block annual reporting highlights investment in AI and engineering productivity globally.",
      "APAC engineering scaling to support regulated financial product delivery.",
    ],
    cursorAngles: [
      "accelerate compliant payments code with AI assistance under enterprise controls",
      "standardise tooling across Melbourne/Sydney engineering teams",
      "support Block-wide AI coding standards with Teams admin features",
    ],
    sources: [
      { label: "Block Investor Relations", url: "https://block.xyz/investors" },
    ],
  },
  {
    accountId: "72",
    recentNews: [
      "SEEK is deploying AI across job matching, candidate recommendations, and employer products.",
      "FY results show continued technology investment in marketplace and AI capabilities.",
    ],
    annualReportHighlights: [
      "Annual report highlights digital product investment as competitive moat in ANZ employment market.",
      "Melbourne engineering org scaling AI/ML and platform modernisation.",
    ],
    cursorAngles: [
      "ship AI matching improvements faster across 200 engineers",
      "govern third-party model usage with team-wide spend controls",
      "onboard engineers to a large legacy + modern stack more quickly",
    ],
    sources: [
      { label: "SEEK Investors", url: "https://www.seek.com.au/about/investors" },
    ],
  },
  {
    accountId: "77",
    recentNews: [
      "Cochlear is investing in software for next-generation hearing devices and clinical tooling.",
      "Annual results highlight R&D spend on connected care and software-enabled implants.",
    ],
    annualReportHighlights: [
      "FY annual report cites software and digital health as strategic growth vectors.",
      "Sydney engineering teams building regulated medical-device software at scale.",
    ],
    cursorAngles: [
      "accelerate regulated embedded and cloud software development safely",
      "give 200 engineers consistent AI tooling with enterprise governance",
      "reduce documentation and test scaffolding toil in medical software",
    ],
    sources: [
      { label: "Cochlear Annual Reports", url: "https://www.cochlear.com/au/en/corporate/investors/annual-reports" },
    ],
  },
];

export const INTELLIGENCE_BY_ACCOUNT_ID = Object.fromEntries(
  ACCOUNT_INTELLIGENCE.map((i) => [i.accountId, i])
) as Record<string, AccountIntelligence>;

export function getAccountIntelligence(accountId: string): AccountIntelligence | undefined {
  return INTELLIGENCE_BY_ACCOUNT_ID[accountId];
}
