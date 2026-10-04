import React from 'react';
import { Home, Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contacto-general" className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Columna 1: Marca y descripción */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                PEÑASCO <span className="text-brand-400 font-semibold">REAL ESTATE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Especialistas en propiedades residenciales, villas frente al mar y condominios de alta plusvalía en Puerto Peñasco (Rocky Point), Sonora.
            </p>
            <p className="text-xs text-slate-500">
              Licencia Inmobiliaria Estatal #SON-RE-2048.
            </p>
          </div>

          {/* Columna 2: Zonas Destacadas */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Zonas Populares
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#catalogo" className="hover:text-brand-400 transition">Sandy Beach Resorts</a></li>
              <li><a href="#catalogo" className="hover:text-brand-400 transition">Las Conchas Residencial</a></li>
              <li><a href="#catalogo" className="hover:text-brand-400 transition">Marina & Malecón</a></li>
              <li><a href="#catalogo" className="hover:text-brand-400 transition">Choya Bay & Bahía La Cholla</a></li>
              <li><a href="#catalogo" className="hover:text-brand-400 transition">Playa Encanto</a></li>
            </ul>
          </div>

          {/* Columna 3: Tipos de Propiedad */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Categorías
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#catalogo" className="hover:text-brand-400 transition">Casas y Villas Frente al Mar</a></li>
              <li><a href="#catalogo" className="hover:text-brand-400 transition">Condominios con Alberca</a></li>
              <li><a href="#catalogo" className="hover:text-brand-400 transition">Penthouses Panorámicos</a></li>
              <li><a href="#catalogo" className="hover:text-brand-400 transition">Lotes y Terrenos Urbanizados</a></li>
              <li><a href="#catalogo" className="hover:text-brand-400 transition">Oportunidades de Inversión</a></li>
            </ul>
          </div>

          {/* Columna 4: Contacto Directo */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Oficina Principal
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>Blvd. Fremont #108, Plaza del Sol, Puerto Peñasco, Sonora, C.P. 83550</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+52 (638) 102-3490 / Toll-Free US: 1-800-555-ROCKY</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>contacto@penascorealestate.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Separador y derechos reservados */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Peñasco Real Estate. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition">Aviso de Privacidad</a>
            <a href="#" className="hover:text-slate-400 transition">Términos de Servicio</a>
            <a href="#" className="hover:text-slate-400 transition">Mapa de Sitio</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
