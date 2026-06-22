import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Map, 
  Paintbrush, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';

interface RoleCard {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  icon: React.ReactNode;
  technicalLabel: string;
}

const teamRoles: RoleCard[] = [
  {
    id: "pm",
    num: "01",
    title: "Project / Product Manager",
    subtitle: "Tactical Orchestration & Strategy",
    description: "Sets the strategy, budget, and timeline. Coordinates between team members and stakeholders.",
    bullets: ["Milestone & Velocity Mapping", "Budgetary Custodianship", "Unified Inter-team Liaison"],
    icon: <Map className="w-5 h-5 text-[#ccff00]" />,
    technicalLabel: "STRATEGIC_CMD_CENTER"
  },
  {
    id: "uiux",
    num: "02",
    title: "UI / UX Designer",
    subtitle: "Elite Sensory Architecture",
    description: "Creates the visual design of the app — screens, color schemes, and intuitive user journeys. Essential for any custom mobile application development project.",
    bullets: ["Atomic Interface Layouts", "Deliberate Typography Pairings", "Frictionless User Journeys"],
    icon: <Paintbrush className="w-5 h-5 text-fuchsia-400" />,
    technicalLabel: "VISUAL_DESIGN_ENGINE"
  },
  {
    id: "frontend",
    num: "03",
    title: "Mobile App Developers (Front-end)",
    subtitle: "Ecosystem Client Codebases",
    description: "Our Flutter app developers and native platform specialists write clean, maintainable code. For complex projects, we assign dedicated Kotlin/Java (Android) and Swift (iOS) experts.",
    bullets: ["Native Android/iOS Renders", "Cross-Platform Framework Code", "Sub-16ms Scroll Latency"],
    icon: <Cpu className="w-5 h-5 text-blue-400" />,
    technicalLabel: "CLIENT_RUN_COMPILER"
  },
  {
    id: "backend",
    num: "04",
    title: "Backend Developer",
    subtitle: "Information Infrastructure & Servers",
    description: "Manages servers, databases, and API integrations. Crucial for enterprise mobile app solutions requiring secure data handling.",
    bullets: ["PCI-DSS Payment Gateways", "Encrypted Session Pools", "Relational Database Indexing"],
    icon: <Database className="w-5 h-5 text-teal-400" />,
    technicalLabel: "DATA_VAULT_CONTROLLER"
  },
  {
    id: "qa",
    num: "05",
    title: "Quality Assurance (QA) Tester",
    subtitle: "Systems Integrity & Stress Testing",
    description: "Thoroughly tests the app before release. Identifies and resolves bugs, crashes, and performance bottlenecks.",
    bullets: ["Boundary Condition Trials", "Automated Playback Tests", "Crashlog Resolution Audits"],
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    technicalLabel: "STRESS_TEST_VAL_ENG"
  },
  {
    id: "devops",
    num: "06",
    title: "DevOps Engineer (Optional)",
    subtitle: "Automated Deployment Pipelines",
    description: "Manages servers and deployment pipelines on small or complex projects.",
    bullets: ["CI/CD Pipeline Compilation", "Zero-Downtime Container Ingress", "Cloud Storage Cluster Setups"],
    icon: <Terminal className="w-5 h-5 text-amber-400" />,
    technicalLabel: "INFRASTRUCTURE_OPS"
  }
];

export default function AppDevelopmentTeamRoles() {
  return (
    <section className="py-36 bg-black relative border-t border-neutral-900 overflow-hidden">
      {/* Background ambient mesh */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neutral-900/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-12 left-12 w-[300px] h-[300px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Block with Old Money Sans + Serif styling */}
        <div className="mb-24 max-w-4xl border-b border-white/10 pb-12">
          <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-4">
            [ TACTICAL RESOURCE HEURISTICS ]
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-none">
            Tactical Resource Heuristics: <span className="font-serif italic text-neutral-400">App Development Team Structure</span>
          </h2>
          <p className="mt-6 text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl font-sans">
            Building software at an outstanding echelon requires highly coordinated specialists. As a full-service mobile app development company, we deploy a multidisciplinary team to ensure your project's success.
          </p>
        </div>

        {/* Roles Grid - Cinematic Rows / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamRoles.map((role) => (
            <div
              key={role.id}
              id={`role-card-${role.id}`}
              className="group bg-[#060606] border border-white/5 hover:border-white/15 p-8 rounded-[2rem] transition-all duration-500 hover:bg-[#0c0c0c] flex flex-col justify-between min-h-[440px] relative overflow-hidden shadow-2xl"
            >
              {/* Card visual accent - top right index */}
              <div className="absolute top-6 right-8 font-serif italic text-4xl text-neutral-800 font-bold opacity-30 select-none group-hover:text-white/20 transition-colors">
                {role.num}
              </div>

              {/* Header */}
              <div className="space-y-4">
                <div className="inline-flex p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-[#ccff00]/5 group-hover:border-[#ccff00]/20 transition-all duration-500">
                  {role.icon}
                </div>
                
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 tracking-[0.25em] block uppercase">
                    {role.technicalLabel}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-wide text-white mt-1 group-hover:text-[#ccff00] transition-colors duration-300">
                    {role.title}
                  </h3>
                  <p className="text-xs font-serif italic text-neutral-400 mt-1">
                    {role.subtitle}
                  </p>
                </div>
              </div>

              {/* Main description paragraph */}
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light mt-6 font-sans">
                {role.description}
              </p>

              {/* Internal deliverables list */}
              <div className="mt-8 pt-6 border-t border-white/5 space-y-2">
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block font-bold">
                  // CRITICAL DELIVERABLES
                </span>
                <ul className="space-y-1.5">
                  {role.bullets.map((bullet, bi) => (
                    <li key={bi} className="text-xs text-neutral-300 flex items-center gap-2 font-mono tracking-tight font-medium">
                      <span className="text-[#ccff00] font-bold text-[10px]">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover highlight ribbon */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-transparent group-hover:bg-[#ccff00] transition-colors duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
