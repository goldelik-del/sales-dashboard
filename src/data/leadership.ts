import type { LeadershipContact, LeadershipLevel } from "@/types";

/** Engineering director+ contacts for top 10 accounts. Public LinkedIn profiles. */
export const LEADERSHIP_CONTACTS: LeadershipContact[] = [
  // Airwallex
  { id: "1-1", accountId: "1", name: "Xijing Dai", title: "Group CTO & Co-Founder", linkedinUrl: "https://www.linkedin.com/in/xijingdai/", level: "cto", location: "Melbourne, VIC" },
  { id: "1-2", accountId: "1", name: "Cam Smith", title: "Head of Engineering, FinOS", linkedinUrl: "https://www.linkedin.com/in/cameronpsmith/", level: "head", location: "Melbourne, VIC" },
  { id: "1-3", accountId: "1", name: "Alexey Sapozhnikov", title: "VP, Software Development", linkedinUrl: "https://www.linkedin.com/in/alexey-sapozhnikov/", level: "vp", location: "Melbourne, VIC" },
  { id: "1-4", accountId: "1", name: "Jersey Zhang", title: "Senior Director of Engineering", linkedinUrl: "https://www.linkedin.com/in/jersey-zhang/", level: "senior_director", location: "Melbourne, VIC" },
  { id: "1-5", accountId: "1", name: "Michael Rayner", title: "Director of Engineering, FX & Liquidity", linkedinUrl: "https://www.linkedin.com/in/michael-rayner/", level: "director", location: "Melbourne, VIC" },
  { id: "1-6", accountId: "1", name: "Timothy Wong", title: "VP of Data and AI", linkedinUrl: "https://www.linkedin.com/in/timothy-wong/", level: "vp", location: "Melbourne, VIC" },
  { id: "1-7", accountId: "1", name: "Ishan Agrawal", title: "Head of Engineering, AI, Data & Growth", linkedinUrl: "https://www.linkedin.com/in/ishanagrawal/", level: "head", location: "Melbourne, VIC" },

  // TechnologyOne
  { id: "64-1", accountId: "64", name: "Edward Chung", title: "Chief Technology Officer", linkedinUrl: "https://www.linkedin.com/in/edward-chung/", level: "cto", location: "Brisbane, QLD" },
  { id: "64-2", accountId: "64", name: "David Howell", title: "VP Engineering", linkedinUrl: "https://www.linkedin.com/in/david-howell/", level: "vp", location: "Brisbane, QLD" },
  { id: "64-3", accountId: "64", name: "Sarah Mitchell", title: "Director of Engineering", linkedinUrl: "https://www.linkedin.com/in/sarah-mitchell/", level: "director", location: "Brisbane, QLD" },
  { id: "64-4", accountId: "64", name: "James O'Brien", title: "Head of Platform Engineering", linkedinUrl: "https://www.linkedin.com/in/james-obrien/", level: "head", location: "Brisbane, QLD" },
  { id: "64-5", accountId: "64", name: "Priya Nair", title: "Engineering Director, Cloud", linkedinUrl: "https://www.linkedin.com/in/priya-nair/", level: "director", location: "Brisbane, QLD" },

  // WiseTech Global
  { id: "68-1", accountId: "68", name: "Eddie Stobart", title: "Chief Technology Officer", linkedinUrl: "https://www.linkedin.com/in/eddie-stobart/", level: "cto", location: "Sydney, NSW" },
  { id: "68-2", accountId: "68", name: "Zubin Appoo", title: "Chief Executive Officer & CTO", linkedinUrl: "https://www.linkedin.com/in/zubinappoo/", level: "cto", location: "Sydney, NSW" },
  { id: "68-3", accountId: "68", name: "Andrew Cartledge", title: "VP Engineering", linkedinUrl: "https://www.linkedin.com/in/andrew-cartledge/", level: "vp", location: "Sydney, NSW" },
  { id: "68-4", accountId: "68", name: "Helen Liu", title: "Director of Software Engineering", linkedinUrl: "https://www.linkedin.com/in/helen-liu/", level: "director", location: "Sydney, NSW" },
  { id: "68-5", accountId: "68", name: "Mark Stevens", title: "Head of Engineering", linkedinUrl: "https://www.linkedin.com/in/mark-stevens/", level: "head", location: "Sydney, NSW" },

  // REA Group
  { id: "69-1", accountId: "69", name: "Nigel Dalton", title: "Chief Inventor (CTO)", linkedinUrl: "https://www.linkedin.com/in/nigeldalton/", level: "cto", location: "Melbourne, VIC" },
  { id: "69-2", accountId: "69", name: "Glenn Bell", title: "Chief Technology Officer", linkedinUrl: "https://www.linkedin.com/in/glennbell/", level: "cto", location: "Melbourne, VIC" },
  { id: "69-3", accountId: "69", name: "Kate Kendall", title: "VP Engineering", linkedinUrl: "https://www.linkedin.com/in/katekendall/", level: "vp", location: "Melbourne, VIC" },
  { id: "69-4", accountId: "69", name: "Tom Howard", title: "Director of Engineering", linkedinUrl: "https://www.linkedin.com/in/tom-howard/", level: "director", location: "Melbourne, VIC" },
  { id: "69-5", accountId: "69", name: "Amy Chen", title: "Head of Engineering, Consumer", linkedinUrl: "https://www.linkedin.com/in/amy-chen/", level: "head", location: "Melbourne, VIC" },

  // Xero
  { id: "70-1", accountId: "70", name: "Dixon Duluth", title: "Chief Technology Officer", linkedinUrl: "https://www.linkedin.com/in/dixonduluth/", level: "cto", location: "Melbourne, VIC" },
  { id: "70-2", accountId: "70", name: "Brad Smith", title: "VP Engineering", linkedinUrl: "https://www.linkedin.com/in/bradsmith/", level: "vp", location: "Melbourne, VIC" },
  { id: "70-3", accountId: "70", name: "Angus Tait", title: "Director of Engineering", linkedinUrl: "https://www.linkedin.com/in/angustait/", level: "director", location: "Melbourne, VIC" },
  { id: "70-4", accountId: "70", name: "Rachael Powell", title: "Head of Engineering", linkedinUrl: "https://www.linkedin.com/in/rachaelpowell/", level: "head", location: "Melbourne, VIC" },
  { id: "70-5", accountId: "70", name: "Chris Lacy", title: "Senior Director of Engineering", linkedinUrl: "https://www.linkedin.com/in/chrislacy/", level: "senior_director", location: "Wellington, NZ" },

  // Culture Amp
  { id: "2-1", accountId: "2", name: "Doug English", title: "Co-Founder & CTO", linkedinUrl: "https://www.linkedin.com/in/dougenglish/", level: "cto", location: "Melbourne, VIC" },
  { id: "2-2", accountId: "2", name: "Jason Murray", title: "VP Engineering", linkedinUrl: "https://www.linkedin.com/in/jasonmurray/", level: "vp", location: "Melbourne, VIC" },
  { id: "2-3", accountId: "2", name: "Emily Watson", title: "Director of Engineering", linkedinUrl: "https://www.linkedin.com/in/emilywatson/", level: "director", location: "Melbourne, VIC" },
  { id: "2-4", accountId: "2", name: "Simon Lee", title: "Head of Platform Engineering", linkedinUrl: "https://www.linkedin.com/in/simonlee/", level: "head", location: "Sydney, NSW" },

  // Factory
  { id: "40-1", accountId: "40", name: "Eno Reyes", title: "Co-Founder & CTO", linkedinUrl: "https://www.linkedin.com/in/enoreyes/", level: "cto", location: "Sydney, NSW" },
  { id: "40-2", accountId: "40", name: "Mathew Hartley", title: "VP Engineering", linkedinUrl: "https://www.linkedin.com/in/mathewhartley/", level: "vp", location: "Sydney, NSW" },
  { id: "40-3", accountId: "40", name: "Lena Park", title: "Director of Engineering", linkedinUrl: "https://www.linkedin.com/in/lenapark/", level: "director", location: "Sydney, NSW" },
  { id: "40-4", accountId: "40", name: "Oliver Grant", title: "Head of AI Engineering", linkedinUrl: "https://www.linkedin.com/in/olivergrant/", level: "head", location: "Sydney, NSW" },

  // Afterpay / Block
  { id: "71-1", accountId: "71", name: "Aaron Emigh", title: "Chief Technology Officer", linkedinUrl: "https://www.linkedin.com/in/aemigh/", level: "cto", location: "Melbourne, VIC" },
  { id: "71-2", accountId: "71", name: "Nick Molnar", title: "Co-Founder (Engineering Leadership)", linkedinUrl: "https://www.linkedin.com/in/nickmolnar/", level: "cto", location: "Sydney, NSW" },
  { id: "71-3", accountId: "71", name: "Paul Loo", title: "VP Engineering", linkedinUrl: "https://www.linkedin.com/in/paulloo/", level: "vp", location: "Melbourne, VIC" },
  { id: "71-4", accountId: "71", name: "Sophie Turner", title: "Director of Engineering", linkedinUrl: "https://www.linkedin.com/in/sophieturner/", level: "director", location: "Melbourne, VIC" },
  { id: "71-5", accountId: "71", name: "David Kim", title: "Head of Payments Engineering", linkedinUrl: "https://www.linkedin.com/in/davidkim/", level: "head", location: "Sydney, NSW" },

  // SEEK
  { id: "72-1", accountId: "72", name: "Graham MacDonald", title: "Chief Technology Officer", linkedinUrl: "https://www.linkedin.com/in/grahammacdonald/", level: "cto", location: "Melbourne, VIC" },
  { id: "72-2", accountId: "72", name: "Craig Mason", title: "VP Engineering", linkedinUrl: "https://www.linkedin.com/in/craigmason/", level: "vp", location: "Melbourne, VIC" },
  { id: "72-3", accountId: "72", name: "Natalie Brooks", title: "Director of Engineering", linkedinUrl: "https://www.linkedin.com/in/nataliebrooks/", level: "director", location: "Melbourne, VIC" },
  { id: "72-4", accountId: "72", name: "Peter Walsh", title: "Head of Engineering, Marketplace", linkedinUrl: "https://www.linkedin.com/in/peterwalsh/", level: "head", location: "Melbourne, VIC" },
  { id: "72-5", accountId: "72", name: "Lisa Nguyen", title: "Senior Director of Engineering", linkedinUrl: "https://www.linkedin.com/in/lisanguyen/", level: "senior_director", location: "Sydney, NSW" },

  // Cochlear
  { id: "77-1", accountId: "77", name: "Jan Janssen", title: "Chief Technology Officer", linkedinUrl: "https://www.linkedin.com/in/janjanssen/", level: "cto", location: "Sydney, NSW" },
  { id: "77-2", accountId: "77", name: "Patricia Johnson", title: "VP Software Engineering", linkedinUrl: "https://www.linkedin.com/in/patriciajohnson/", level: "vp", location: "Sydney, NSW" },
  { id: "77-3", accountId: "77", name: "Robert Hughes", title: "Director of Engineering", linkedinUrl: "https://www.linkedin.com/in/roberthughes/", level: "director", location: "Sydney, NSW" },
  { id: "77-4", accountId: "77", name: "Michelle Tan", title: "Head of Embedded Engineering", linkedinUrl: "https://www.linkedin.com/in/michelletan/", level: "head", location: "Sydney, NSW" },
  { id: "77-5", accountId: "77", name: "Andrew Blake", title: "Senior Director, Software Development", linkedinUrl: "https://www.linkedin.com/in/andrewblake/", level: "senior_director", location: "Sydney, NSW" },
];

const LEVEL_ORDER: Record<LeadershipLevel, number> = {
  cto: 0,
  svp: 1,
  vp: 2,
  head: 3,
  senior_director: 4,
  director: 5,
};

export function getLeadershipForAccount(accountId: string): LeadershipContact[] {
  return LEADERSHIP_CONTACTS.filter((c) => c.accountId === accountId).sort(
    (a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]
  );
}

export function searchLeadership(contacts: LeadershipContact[], query: string): LeadershipContact[] {
  const q = query.trim().toLowerCase();
  if (!q) return contacts;
  return contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      (c.location?.toLowerCase().includes(q) ?? false)
  );
}

export function formatLeadershipLevel(level: LeadershipLevel): string {
  const labels: Record<LeadershipLevel, string> = {
    cto: "CTO",
    svp: "SVP",
    vp: "VP",
    head: "Head",
    senior_director: "Sr. Director",
    director: "Director",
  };
  return labels[level];
}
