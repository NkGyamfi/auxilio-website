export interface TeamMember {
  name: string;
  role: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Shaun Springer", role: "Co-Founder & CEO" },
  { name: "Jishai Evers", role: "Co-Founder & CPO" },
  { name: "Julien Levy", role: "Co-Founder & CTO" },
];

export const MANIFESTO_BELIEFS: string[] = [
  "We believe that small businesses are the only businesses that matter. You're the engine that drives the economy forward, that puts food on the table of households around the world, and that creates and secures a future for your family and beyond.",
  "We believe that you know how to run your business best, whereas Silicon Valley companies force you to fit into their mold, disregarding what makes your business unique. We believe that your tools should adapt to you, instead of the other way around.",
  "We believe that you deserve access to the latest technology in a matter of hours, not years. You deserve software that empowers you, that truly supercharges your operations. You deserve beautifully crafted products that actually make a difference.",
];
