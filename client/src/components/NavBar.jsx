import React from "react";
import Logo from "../assests/logo.png";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-primary/20 bg-secondary/90 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.15)]">
            <img
              src={Logo}
              alt="Spam Zero Logo"
              className="h-9 w-9 object-contain"
            />
          </div>

          <div>
            <h1 className="font-tech text-3xl tracking-widest text-white">
              Spam <span className="text-primary">Zero</span>
            </h1>

            <p className="font-body text-xs tracking-[4px] uppercase text-gray-400">
              AI Spam Detection
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse"></span>
          <span className="font-body text-sm text-primary">
            AI Protection Active
          </span>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;