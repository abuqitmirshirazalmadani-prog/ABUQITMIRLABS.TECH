export interface ProgrammaticSEOFaq {
  q: string;
  a: string;
}

export interface ProgrammaticSEOPageData {
  slug: string;
  service: string;
  industry: string;
  location: string;
  title: string;
  description: string;
  directAnswer: string;
  compliance: string;
  techStack: string[];
  faq: ProgrammaticSEOFaq[];
}

export const programmaticSEOPages: ProgrammaticSEOPageData[] = [
  {
    slug: 'fintech/web-development',
    service: 'Web Development',
    industry: 'Fintech',
    location: 'Dubai, UAE',
    title: 'Fintech Web Development in Dubai | AbuQitmirLabs',
    description: 'Bespoke fintech web development in Dubai. Secure payment gateways, DIFC compliance, and ultra-low latency architecture engineered for GCC finance.',
    directAnswer: 'AbuQitmirLabs builds institutional fintech web applications in Dubai, combining sub-second settlement interfaces, zero-trust security architecture, and automated regulatory reporting tailored for UAE financial institutions, payment facilitators, and venture-backed GCC digital banking platforms operating under DFSA and Central Bank protocols.',
    compliance: 'DIFC Data Protection Law, DFSA regulatory sandboxes, UAE Central Bank standards, and PCI-DSS Level 1 certification.',
    techStack: [
      'Next.js 15 & React 19',
      'TypeScript',
      'AWS Middle East (UAE) Region',
      'PostgreSQL with RLS',
      'Stripe & Checkout.com GCC Gateways',
      'Redis Distributed Cache'
    ],
    faq: [
      {
        q: 'How does AbuQitmirLabs ensure DIFC and UAE Central Bank compliance for fintech platforms?',
        a: 'We architect every fintech web solution with strict role-based access control (RBAC), end-to-end payload encryption at rest and in transit, audit-trail logging, and regional data residency within UAE cloud zones complying with DFSA rules.'
      },
      {
        q: 'What is the standard delivery timeline for a production-ready fintech web application?',
        a: 'Our engineering sprints deliver an audited Minimum Viable System (MVS) with core ledger integrations and payment rails in 8 to 12 weeks, followed by continuous penetration testing and sandbox certification.'
      }
    ]
  },
  {
    slug: 'healthcare/mobile-app-development',
    service: 'Mobile App Development',
    industry: 'Healthcare',
    location: 'Riyadh, Saudi Arabia',
    title: 'Healthcare App Development Riyadh | AbuQitmirLabs',
    description: 'Custom healthcare mobile app development in Riyadh. Seha-compliant, HL7/FHIR telemedicine platforms built with Flutter and ISO-certified cloud security.',
    directAnswer: 'AbuQitmirLabs engineers HIPAA and Saudi Ministry of Health (MOH) compliant mobile applications in Riyadh, delivering teleconsultation video streams, digital prescription dispatch, and bilingual Arabic-English patient portals powered by low-latency cloud infrastructure hosted within National Cybersecurity Authority (NCA) compliant data centers.',
    compliance: 'Saudi MOH Seha regulations, NCA Essential Cybersecurity Controls (ECC), HL7/FHIR interoperability, and PDPL (Personal Data Protection Law).',
    techStack: [
      'Flutter & Dart',
      'Node.js & NestJS',
      'Oracle Cloud Saudi Arabia / AWS Bahrain',
      'WebRTC Encrypted Video Calling',
      'PostgreSQL Healthcare Schema',
      'Twilio / Unifonic Arabic SMS'
    ],
    faq: [
      {
        q: 'Are your healthcare applications compliant with Saudi PDPL and MOH cloud guidelines?',
        a: 'Yes. All data schemas, audio/video streams, and electronic health records (EHR) remain strictly hosted within sovereign Saudi cloud boundaries adhering to NCA guidelines and MOH telemetry standards.'
      },
      {
        q: 'Can our mobile app integrate directly with existing hospital EHR systems like Cerner or Epic?',
        a: 'We build bidirectional HL7/FHIR-compatible middleware APIs that sync lab diagnostics, appointments, and billing data seamlessly with major hospital information systems (HIS).'
      }
    ]
  },
  {
    slug: 'ecommerce/custom-software',
    service: 'Custom Software',
    industry: 'E-commerce',
    location: 'London, UK',
    title: 'E-commerce Custom Software London | AbuQitmirLabs',
    description: 'Custom e-commerce software engineering in London. Headless high-volume commerce, ERP inventory sync, and multi-currency checkout systems.',
    directAnswer: 'AbuQitmirLabs engineers bespoke enterprise e-commerce platforms in London for direct-to-consumer and B2B brands outgrowing Shopify. We deliver headless microservices architectures, millisecond inventory reconciliation, and intelligent dynamic pricing algorithms compliant with UK GDPR and Strong Customer Authentication mandates.',
    compliance: 'UK GDPR, Data Protection Act 2018, PCI-DSS Level 1, and FCA-mandated Strong Customer Authentication (SCA).',
    techStack: [
      'Next.js Commerce',
      'Node.js & Go Microservices',
      'AWS London (eu-west-2)',
      'Algolia AI Search',
      'Kafka Event Streaming',
      'GraphQL Federated APIs'
    ],
    faq: [
      {
        q: 'Why choose custom e-commerce software over Shopify Plus or Magento?',
        a: 'Custom software eliminates monthly transaction rake fees, lifts rigid checkout limits, reduces catalog latency to under 50ms, and provides full ownership over proprietary customer data and supply-chain logistics.'
      },
      {
        q: 'How do you handle peak holiday flash sales and traffic spikes in the UK?',
        a: 'Our systems use auto-scaling containerized microservices on AWS London, combined with edge caching and asynchronous order queues, battle-tested to sustain over 100,000 concurrent checkout requests without downtime.'
      }
    ]
  },
  {
    slug: 'ai-automation/enterprise-engineering',
    service: 'Enterprise Engineering',
    industry: 'AI Automation',
    location: 'New York, USA',
    title: 'Enterprise AI Automation New York | AbuQitmirLabs',
    description: 'Enterprise AI automation and software engineering in New York. Autonomous workflows, custom RAG pipelines, and private LLM deployments for Wall St.',
    directAnswer: 'AbuQitmirLabs designs deterministic AI automation systems in New York for financial, legal, and operational enterprises. We deploy self-hosted retrieval-augmented generation (RAG) pipelines, proprietary vector embeddings, and autonomous agent workflows that accelerate institutional productivity while safeguarding confidential proprietary intellectual property.',
    compliance: 'SOC 2 Type II, SEC Rule 17a-4, FINRA compliance, and NYDFS 23 NYCRR 500 cybersecurity standards.',
    techStack: [
      'Python & FastAPI',
      'TypeScript & React 19',
      'LangChain & LlamaIndex',
      'vLLM Private Model Inference',
      'Qdrant Vector Database',
      'AWS GovCloud / Azure US East'
    ],
    faq: [
      {
        q: 'Does AbuQitmirLabs ensure corporate data is never used to train public LLM models?',
        a: 'Strictly. We implement private VPC deployments, enterprise zero-data-retention API contracts, and on-premises vector caches so proprietary business data never leaks into third-party foundation models.'
      },
      {
        q: 'What ROI metrics do your New York enterprise automation clients achieve?',
        a: 'Clients typically document an 80% reduction in document audit cycle times, a 60% decrease in manual underwriting triage, and 24/7 autonomous reconciliation with under 0.01% error rates.'
      }
    ]
  }
];

export function getProgrammaticSEOPage(industrySlug: string, serviceSlug: string): ProgrammaticSEOPageData | undefined {
  const targetSlug = `${industrySlug.toLowerCase()}/${serviceSlug.toLowerCase()}`;
  return programmaticSEOPages.find(
    (p) => p.slug.toLowerCase() === targetSlug || 
           p.slug.toLowerCase() === `${industrySlug}/${serviceSlug}`.toLowerCase()
  );
}
