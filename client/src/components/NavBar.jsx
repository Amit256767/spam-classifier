import Logo from "../assests/logo.png";
import { Activity, Menu } from 'lucide-react';

const NavBar = () => {
  return (
    <header className="site-header"><nav className="navbar" aria-label="Main navigation">
      <a className="brand" href="#top" aria-label="Spam Zero home"><span className="brand-mark"><img src={Logo} alt="" /></span><span>Spam <b>Zero</b></span></a>
      <div className="nav-links"><a href="#analyzer">Analyzer</a><a href="#how-it-works">How it works</a></div>
      <div className="protection-status"><Activity size={15} /><span>Protection active</span></div>
      <button className="menu-button" type="button" aria-label="Navigation links are below"><Menu size={21} /></button>
    </nav></header>
  );
};

export default NavBar;
