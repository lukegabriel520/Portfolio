import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Send,
  Menu,
  X
} from 'lucide-react';
import AnimatedSection from './components/AnimatedSection';
import ProjectCard from './components/ProjectCard';
import AccoladeCard from './components/AccoladeCard';
import AffiliationCard from './components/AffiliationCard';
import TestimonialCarousel from './components/TestimonialCarousel';
import { projects, accolades, affiliations, testimonials, personalInfo } from './data/portfolioData';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'accolades', label: 'Accolades' },
    { id: 'affiliations', label: 'Affiliations' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                <img 
                  src="/LL_Logo.png" 
                  alt="Luke Lumakin Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">
                {personalInfo.name}
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-black bg-gray-100'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-50"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 border border-gray-200 shadow-lg">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'text-black bg-gray-100'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <AnimatedSection className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                  {personalInfo.name}
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 font-medium">
                  {personalInfo.role}
                </p>
                <p className="text-lg text-gray-600 max-w-lg">
                  {personalInfo.slogan}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200} className="grid grid-cols-2 gap-6 max-w-md">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900">Languages</h3>
                  <p className="text-gray-600">{personalInfo.languages.join(', ')}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900">Status</h3>
                  <p className="text-gray-600">{personalInfo.status}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-sm col-span-2">
                  <h3 className="font-semibold text-gray-900">Education</h3>
                  <p className="text-gray-600">{personalInfo.school}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400} className="flex space-x-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-md"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-md"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={600} className="relative">
              <div className="w-full max-w-md mx-auto relative">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-100 rounded-full z-0"></div>
                <div className="absolute bottom-0 -right-10 w-20 h-20 bg-pink-100 rotate-12 rounded-lg z-0"></div>
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/ProfilePhoto.png"
                  alt="Profile"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </AnimatedSection>
          </div>
        </div>
      </section>
      
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A showcase of my latest works
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="accolades" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Accolades & Recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Achievements and recognition received throughout my academic journey
            </p>
          </AnimatedSection>

          <AccoladeCard accolades={accolades} />
        </div>
      </section>

      <section id="affiliations" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Affiliations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organizations and communities I'm actively involved with
            </p>
          </AnimatedSection>
      
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliations.map((affiliation, index) => (
              <AffiliationCard key={index} affiliation={affiliation} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="recommendations" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recommendations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What colleagues and mentors say about working with me
            </p>
          </AnimatedSection>

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to collaborate on your next project or discuss opportunities
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200} className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-colors bg-white"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-colors bg-white"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-colors bg-white"
                  placeholder="What's this about?"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-colors bg-white resize-none"
                  placeholder="Tell me about your project or opportunity..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-md"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <AnimatedSection delay={300} className="text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">{personalInfo.email}</p>
            </AnimatedSection>
            <AnimatedSection delay={400} className="text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">LinkedIn</h3>
              <p className="text-gray-600">linkedin.com/in/lukelumakin</p>
            </AnimatedSection>
            <AnimatedSection delay={500} className="text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Github className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">GitHub</h3>
              <p className="text-gray-600">github.com/lukegabriel520</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-center justify-center space-x-4">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src="/LL_Logo.png" 
                alt="Luke Lumakin Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-bold text-gray-900">
              {personalInfo.name}
            </span>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  );
}

export default App;
