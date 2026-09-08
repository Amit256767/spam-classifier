import NavBar from './components/NavBar';
import Card from './components/Card';
import { BrainCircuit, Fingerprint, ScanSearch, ShieldCheck } from 'lucide-react';

const steps = [
  { icon: ScanSearch, title: 'Prepare', text: 'Your message is normalized for meaningful analysis.' },
  { icon: Fingerprint, title: 'Vectorize', text: 'TF-IDF turns language patterns into model signals.' },
  { icon: BrainCircuit, title: 'Classify', text: 'The trained classifier evaluates the message.' },
  { icon: ShieldCheck, title: 'Protect', text: 'Receive a clear safe or threat verdict.' },
];

const App = () => (
  <div className="app-shell" id="top">
    <NavBar />
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> Intelligent message security</div>
          <h1 id="hero-title">Keep every inbox<br /><span>one step safer.</span></h1>
          <p className="hero-description">Spam Zero uses machine learning to help you identify suspicious messages before they demand your attention.</p>
          <div className="hero-points" aria-label="Product capabilities">
            <span><ShieldCheck size={16} /> Privacy-minded analysis</span>
            <span><ShieldCheck size={16} /> Instant classification</span>
          </div>
        </div>
        <Card />
      </section>
      <section className="trust-strip" aria-label="Spam Zero product information">
        <div><span className="stat-label">Classification engine</span><strong>TF-IDF + ML</strong></div>
        <div><span className="stat-label">Supported content</span><strong>SMS, email &amp; chat</strong></div>
        <div><span className="stat-label">Analysis mode</span><strong>On-demand scanning</strong></div>
      </section>
      <section className="how-it-works" id="how-it-works" aria-labelledby="how-title">
        <div className="section-heading"><p className="section-kicker">How it works</p><h2 id="how-title">A focused decision, from message to verdict.</h2><p>Spam Zero follows a transparent, purpose-built classification workflow.</p></div>
        <div className="steps-grid">{steps.map(({ icon: Icon, title, text }, index) => <article className="step-card" key={title}><div className="step-topline"><span>0{index + 1}</span><Icon size={20} aria-hidden="true" /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
    </main>
    <footer><span>© {new Date().getFullYear()} Spam Zero</span><span>Machine learning–assisted message screening</span></footer>
  </div>
);

export default App;
