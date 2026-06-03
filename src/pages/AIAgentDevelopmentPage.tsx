import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AIAgentDevelopmentPage() {
  return (
    <>
      <Helmet>
        <title>AI Agent & AI App Development | AbuQitmirLabs</title>
        <meta name="description" content="Leading AI development solutions including autonomous agents, RAG systems, chatbots, and generative AI for global businesses." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/ai-agent-development" />
        <meta property="og:title" content="AI Agent & AI App Development | AbuQitmirLabs" />
        <meta property="og:description" content="Autonomous AI agents, RAG systems, and generative AI solutions for global businesses." />
        <meta property="og:url" content="https://abuqitmirlabs.tech/ai-agent-development" />
      </Helmet>

      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Agent & AI App Development
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            We build intelligent AI agents, RAG systems, and generative AI solutions
            that automate your business workflows and drive real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-2xl text-lg transition"
            >
              💬 WhatsApp Karein
            </a>
            <a
              href="mailto:shiraz@abuqitmirlabs.tech"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 py-4 rounded-2xl text-lg transition"
            >
              📧 Email Karein
            </a>
          </div>
        </section>

        {/* Services */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">What We Build</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '🤖', title: 'Autonomous AI Agents', desc: 'Self-operating agents that handle complex multi-step tasks automatically.' },
              { icon: '📚', title: 'RAG Systems', desc: 'Retrieval Augmented Generation — AI that knows your business data.' },
              { icon: '💬', title: 'Custom AI Chatbots', desc: 'Intelligent chatbots for customer support, sales, and internal ops.' },
              { icon: '🚀', title: 'LLM-Powered SaaS', desc: 'Full SaaS platforms built on GPT-4, Claude, and Gemini APIs.' },
              { icon: '⚙️', title: 'Workflow Automation', desc: 'AI pipelines that automate your repetitive business processes.' },
              { icon: '🔍', title: 'Semantic Search', desc: 'Vector-based intelligent search for your documents and data.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">Technologies We Use</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['OpenAI GPT-4', 'Claude API', 'Gemini', 'LangChain', 'LlamaIndex',
                'Pinecone', 'Weaviate', 'Firebase', 'Supabase', 'FastAPI', 'Python', 'TypeScript'].map((tech) => (
                <span key={tech} className="bg-white border border-purple-100 text-purple-700 font-medium px-5 py-2 rounded-full shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-purple-600 py-16 px-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">AI Project Shuru Karein</h2>
          <p className="text-purple-100 mb-8 text-lg">Free consultation — aaj hi baat karein</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-400 hover:bg-green-500 text-white font-bold px-10 py-4 rounded-2xl text-lg transition"
            >
              💬 WhatsApp: +92 323 3260859
            </a>
            <a
              href="mailto:shiraz@abuqitmirlabs.tech"
              className="bg-white text-purple-600 hover:bg-purple-50 font-bold px-10 py-4 rounded-2xl text-lg transition"
            >
              📧 shiraz@abuqitmirlabs.tech
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
