import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MobileAppDevelopmentPage() {
  return (
    <>
      <Helmet>
        <title>Flutter & Native Mobile App Development | AbuQitmirLabs</title>
        <meta name="description" content="Expert Flutter & Native mobile app development for iOS and Android. AbuQitmirLabs builds high-performance apps for global businesses." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/mobile-app-development" />
        <meta property="og:title" content="Flutter & Native Mobile App Development | AbuQitmirLabs" />
        <meta property="og:description" content="Expert Flutter & Native mobile app development for iOS and Android." />
        <meta property="og:url" content="https://abuqitmirlabs.tech/mobile-app-development" />
      </Helmet>

      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Flutter & Native Mobile App Development
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            At AbuQitmirLabs .TECH, we build high-performance mobile apps for iOS and Android
            using Flutter and native technologies — on time, on budget, worldwide.
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl text-lg transition"
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
              { icon: '📱', title: 'Flutter Cross-Platform Apps', desc: 'One codebase for iOS & Android — faster delivery, lower cost.' },
              { icon: '🤖', title: 'Native Android (Kotlin)', desc: 'High-performance native apps for the Android ecosystem.' },
              { icon: '🍎', title: 'Native iOS (Swift)', desc: 'Elegant, fast iOS apps that feel right at home on Apple devices.' },
              { icon: '☁️', title: 'SaaS Mobile Apps', desc: 'Scalable cloud-connected mobile SaaS platforms.' },
              { icon: '🛒', title: 'E-Commerce Apps', desc: 'Feature-rich marketplace and shopping apps.' },
              { icon: '🧠', title: 'AI-Powered Apps', desc: 'Mobile apps with integrated AI, chatbots, and smart features.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { step: '01', title: 'Free Consultation', desc: 'Aapki requirements samjhein' },
                { step: '02', title: 'UI/UX Design', desc: 'Wireframes aur prototypes' },
                { step: '03', title: 'Development', desc: 'Agile sprints mein build' },
                { step: '04', title: 'Launch & Support', desc: 'Deploy aur maintain' },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{item.step}</div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-16 px-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">App Banwana Hai? Baat Karein!</h2>
          <p className="text-blue-100 mb-8 text-lg">Free consultation — koi charge nahi</p>
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
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-4 rounded-2xl text-lg transition"
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
