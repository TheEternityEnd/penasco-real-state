import React, { useState, useEffect } from 'react';
import { 
  X, MapPin, Bed, Bath, Maximize2, Car, Calendar, CheckCircle2, 
  Send, Phone, Mail, User, ShieldCheck, Sparkles, AlertCircle, Check
} from 'lucide-react';

export default function PropertyModal({ property, onClose }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Estado del formulario de contacto
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Auto-llenar mensaje con referencia a la propiedad
  useEffect(() => {
    if (property) {
      setFormData(prev => ({
        ...prev,
        message: `Hola, estoy interesado(a) en "${property.title}" (Ref: ID #${property.id}). Por favor contáctenme para agendar un recorrido o recibir más detalles.`
      }));
      setSelectedImageIndex(0);
      setSubmitSuccess(null);
      setSubmitError(null);
    }
  }, [property]);

  // Manejar tecla ESC para cerrar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!property) return null;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          propertyId: property.id,
          propertyTitle: property.title,
          message: formData.message
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'No fue posible enviar el mensaje. Intenta más tarde.');
      }

      setSubmitSuccess(result.message);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      console.error('Error al enviar formulario:', err);
      setSubmitError(err.message || 'Error de conexión con el servidor.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Contenedor del Modal */}
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Barra superior de cierre */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider">
              {property.propertyType}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              ID Ref: #{property.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido con scroll interno */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8">
          
          {/* SECCIÓN 1: Galería Fotográfica */}
          <div className="space-y-3">
            {/* Imagen Principal */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={property.images[selectedImageIndex] || property.images[0]}
                alt={`${property.title} - Foto ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {property.badge && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold bg-brand-600/90 text-white backdrop-blur-md flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{property.badge}</span>
                </div>
              )}
            </div>

            {/* Carrusel de Miniaturas */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx 
                      ? 'border-brand-600 ring-2 ring-brand-500/20 scale-[0.98]' 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* SECCIÓN 2: Título, Precio y Datos Clave */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-brand-700 font-semibold text-xs sm:text-sm mb-1.5">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{property.location}</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {property.title}
              </h1>
            </div>

            <div className="md:text-right shrink-0 bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Precio de Venta</p>
              <p className="text-2xl sm:text-4xl font-black text-brand-700">{formattedPrice}</p>
              <p className="text-[11px] font-semibold text-slate-500">Dólares Americanos (USD)</p>
            </div>
          </div>

          {/* Barra de Especificaciones Técnicas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-600 shadow-2xs border border-slate-200/60">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-500">Recámaras</p>
                <p className="text-sm font-extrabold text-slate-800">{property.bedrooms} Suites</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-600 shadow-2xs border border-slate-200/60">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-500">Baños</p>
                <p className="text-sm font-extrabold text-slate-800">{property.bathrooms} Completos</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-600 shadow-2xs border border-slate-200/60">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-500">Superficie</p>
                <p className="text-sm font-extrabold text-slate-800">{property.areaSqM} m² <span className="text-xs font-normal text-slate-500">({property.areaSqFt} sq ft)</span></p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-600 shadow-2xs border border-slate-200/60">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-500">Cochera</p>
                <p className="text-sm font-extrabold text-slate-800">{property.parkingSpaces} Vehículos</p>
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: Grid de 2 Columnas: Detalles a la izquierda, Formulario a la derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Columna Izquierda: Descripción y Amenidades (7 columnas) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
                  Descripción Detallada
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
                  Amenidades y Características Principales
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asesor Asignado */}
              {property.agent && (
                <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100 flex items-center gap-4">
                  <img
                    src={property.agent.photo}
                    alt={property.agent.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-500/30"
                  />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-brand-800">Agente Responsable</p>
                    <h4 className="text-sm font-extrabold text-slate-900">{property.agent.name}</h4>
                    <p className="text-xs text-slate-600">{property.agent.role}</p>
                    <p className="text-xs font-medium text-brand-700 mt-0.5">{property.agent.phone}</p>
                  </div>
                </div>
              )}

            </div>

            {/* Columna Derecha: Formulario de Contacto (5 columnas) */}
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs">
              
              <div className="mb-5">
                <h3 className="text-base font-extrabold text-slate-900">
                  Agenda una Visita o Solicita Información
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Déjanos tus datos y el agente a cargo te responderá en menos de 24 horas.
                </p>
              </div>

              {/* Mensaje de Éxito */}
              {submitSuccess && (
                <div className="mb-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>¡Mensaje Enviado con Éxito!</span>
                  </div>
                  <p>{submitSuccess}</p>
                </div>
              )}

              {/* Mensaje de Error */}
              {submitError && (
                <div className="mb-5 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Error al enviar</span>
                  </div>
                  <p>{submitError}</p>
                </div>
              )}

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Nombre Completo <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre y apellido"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Correo Electrónico <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Teléfono / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="+52 o +1 (código de área)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Mensaje o Pregunta <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Enviando mensaje...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Contactar Asesor Inmobiliario</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tus datos están protegidos y nunca serán compartidos.</span>
                </p>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
