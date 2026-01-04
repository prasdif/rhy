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

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <AIChat />
    </Layout>
  );
}

export default App;