
import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import About from './components/About';
import Services from './components/Services';
import AIChat from './components/AIChat';
// Import Education component to display it in the portfolio
import Education from './components/Education';

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <Experience />
      {/* Add Education section to the portfolio */}
      <Education />
      <Projects />
      <Skills />
      <Contact />
      <AIChat />
    </Layout>
  );
}

export default App;