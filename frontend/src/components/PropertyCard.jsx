import React, { useState } from 'react';
import { MapPin, Bed, Bath, Maximize2, Heart, ArrowUpRight, Sparkles } from 'lucide-react';

export default function PropertyCard({ property, onSelectProperty }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Formateador de moneda en USD
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-brand-200 transition-all duration-300 flex flex-col">
      
      {/* Contenedor de la Imagen */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />

        {/* Badge superior izquierdo */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {property.badge && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-600/90 backdrop-blur-md text-white shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {property.badge}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-slate-100">
            {property.propertyType}
          </span>
        </div>

        {/* Botón Favorito superior derecho */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isFavorite 
              ? 'bg-rose-500 text-white scale-110' 
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
          }`}
          aria-label="Guardar en favoritos"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Precio superpuesto en la parte inferior de la imagen */}
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-xs font-medium text-slate-200 uppercase tracking-wider">Precio de Lista</p>
          <p className="text-2xl font-black tracking-tight">{formattedPrice}</p>
        </div>
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Ubicación */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-700 mb-2">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Título */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Descripción corta */}
          <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {property.shortDescription}
          </p>
        </div>

        {/* Especificaciones: Recámaras, Baños, Metros Cuadrados */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="grid grid-cols-3 gap-2 py-1 text-slate-600 text-xs">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              <span><strong className="font-semibold text-slate-800">{property.bedrooms}</strong> Recs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span><strong className="font-semibold text-slate-800">{property.bathrooms}</strong> Baños</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-slate-400" />
              <span><strong className="font-semibold text-slate-800">{property.areaSqM}</strong> m²</span>
            </div>
          </div>

          {/* Botón de acción */}
          <button
            onClick={() => onSelectProperty(property)}
            className="mt-4 w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-50 hover:bg-brand-600 hover:text-white text-slate-700 border border-slate-200/80 hover:border-brand-600 transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
          >
            <span>Ver Ficha Completa</span>
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
}
