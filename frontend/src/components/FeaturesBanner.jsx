import React from 'react';
import { ShieldCheck, TrendingUp, Sun, FileCheck2, Anchor, Award } from 'lucide-react';

export default function FeaturesBanner() {
  const benefits = [
    {
      icon: <FileCheck2 className="w-6 h-6 text-brand-600" />,
      title: 'Fideicomiso Seguro',
      description: 'Estructuración jurídica transparente y segura para compradores nacionales e internacionales.'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-600" />,
      title: 'Alto Retorno de Inversión',
      description: 'Puerto Peñasco cuenta con una de las tasas de ocupación turística más dinámicas de la zona norte.'
    },
    {
      icon: <Sun className="w-6 h-6 text-brand-600" />,
      title: 'Clima y Playas Cálidas',
      description: 'Más de 320 días soleados al año con las aguas pacíficas y cristalinas del Mar de Cortés.'
    },
    {
      icon: <Award className="w-6 h-6 text-brand-600" />,
      title: 'Propiedades Certificadas',
      description: 'Cada listado pasa por auditoría legal, libre de gravamen y avalúo comercial actualizado.'
    }
  ];

  return (
    <section id="por-que-nosotros" className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Ventajas Exclusivas
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ¿Por qué Invertir en Bienes Raíces en Puerto Peñasco?
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Brindamos certeza jurídica y acompañamiento de principio a fin para hacer de tu compra una experiencia gratificante y segura.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-2xs mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
