import React, { useState } from 'react';
import { Home, Phone, Menu, X, Compass, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenContact }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-800 to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-900/10 group-hover:scale-105 transition-transform">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                PEÑASCO <span className="text-brand-600 font-semibold text-lg">REAL ESTATE</span>
              </span>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                Puerto Peñasco • Sonora, México
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#catalogo" 
              className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors"
            >
              Propiedades
            </a>
            <a 
              href="#zonas" 
              className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors"
            >
              Zonas Exclusivas
            </a>
            <a 
              href="#por-que-nosotros" 
              className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors"
            >
              Sobre Nosotros
            </a>
            <a 
              href="#contacto-general" 
              className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors"
            >
              Contacto
            </a>
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+526381023490" 
              className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 hover:text-brand-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-600" />
              <span>(638) 102-3490</span>
            </a>
            <button
              onClick={() => onOpenContact && onOpenContact()}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-brand-700 hover:bg-brand-800 text-white shadow-sm hover:shadow transition-all duration-200"
            >
              Solicitar Asesoría
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <a
            href="#catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Propiedades Disponibles
          </a>
          <a
            href="#zonas"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Zonas Exclusivas
          </a>
          <a
            href="#contacto-general"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Contacto Directo
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenContact) onOpenContact();
              }}
              className="w-full text-center py-3 rounded-lg text-sm font-semibold bg-brand-700 text-white shadow-sm"
            >
              Solicitar Asesoría Inmobiliaria
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
