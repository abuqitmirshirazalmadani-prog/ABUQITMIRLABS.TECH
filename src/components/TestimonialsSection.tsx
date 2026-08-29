"use client";
import React from "react";
import { motion } from "motion/react";
import { TestimonialsColumn } from "./ui/testimonials-columns-1";

const testimonials = [
  {
    text: "AbuQitmirLabs delivered our mobile application ahead of schedule with flawless cross-platform performance on iOS and Android. True engineering partners.",
    name: "Fareed Khan",
    role: "Mobile App Client",
  },
  {
    text: "Working with the team on our corporate web platform was seamless. Fast load times, immaculate UI/UX, and zero technical debt.",
    name: "Hammad Sheikh",
    role: "Enterprise Web Client",
  },
  {
    text: "AbuQitmirLabs delivered a stunning, high-performance website that perfectly captures our brand. The site loads lightning-fast, is fully responsive, and has already boosted our online inquiries significantly.",
    name: "Rafay Badar",
    role: "Brand Director",
  },
  {
    text: "They built a bespoke e-commerce store with custom inventory management and integrated local payment gateways smoothly. Exceptional value for our budget.",
    name: "Khurram Jawad",
    role: "E-commerce Founder",
  },
  {
    text: "AbuQitmirLabs's team nailed our technical storytelling and architecture. The platform they built is fast, mobile-optimized, and conversion-focused. Our bounce rate dropped by 35%.",
    name: "David Ruiz",
    role: "CEO, Innovatech Solutions",
  },
  {
    text: "Working with AbuQitmirLabs transformed our legacy web presence into a sleek, user-friendly platform. Their Schema markup and SEO optimizations gave us immediate organic gains.",
    name: "Sarah Jenkins",
    role: "Owner, GreenLeaf Organics",
  },
  {
    text: "Transparent communication, deep technical competence, and reliable milestones. Highly recommended for web and mobile development.",
    name: "Samad Abbasi",
    role: "Managing Director",
  },
  {
    text: "Exceptional service and deep technical expertise. AbuQitmirLabs transformed our operational efficiency with custom AI workflow automation.",
    name: "Fawad Ahmed",
    role: "Tech Entrepreneur",
  },
  {
    text: "The best in the market for high-speed React applications and technical SEO mastery. Our inbound search pipeline grew dramatically in just 3 months.",
    name: "Maria Kowalski",
    role: "Head of Growth",
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsSection() {
  return (
    <section className="bg-black py-24 relative overflow-hidden border-y-4 border-black">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[800px] mx-auto mb-16"
        >
          <div className="bg-[#B9FF66] border-2 border-black py-1 px-4 rounded-lg font-mono text-[10px] font-black uppercase tracking-widest text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6">
            GMB Verification Active
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-center text-white uppercase mb-6 leading-none">
            Verified Client <span className="text-[#B9FF66]">Intel</span>
          </h2>
          <p className="text-center text-zinc-400 font-mono text-sm uppercase tracking-widest leading-relaxed">
            Direct feedback from our global network of high-performance partners.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[800px] overflow-hidden lg:px-12">
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none"></div>
    </section>
  );
}
