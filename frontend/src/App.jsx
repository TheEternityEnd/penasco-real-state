import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import PropertyGrid from './components/PropertyGrid.jsx';
import PropertyModal from './components/PropertyModal.jsx';
import FeaturesBanner from './components/FeaturesBanner.jsx';
import Footer from './components/Footer.jsx';
import ContactModal from './components/ContactModal.jsx';

export default function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros de búsqueda
  const [filters, setFilters] = useState({
    search: '',
    type: 'Todos',
    zone: 'Todas',
    bedrooms: 'Cualquiera'
  });

  // Modales
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Función para consultar las propiedades al backend (/api/properties)
  const fetchProperties = useCallback(async (currentFilters = filters) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (currentFilters.search) params.append('search', currentFilters.search);
      if (currentFilters.type && currentFilters.type !== 'Todos') params.append('type', currentFilters.type);
      if (currentFilters.zone && currentFilters.zone !== 'Todas') params.append('zone', currentFilters.zone);
      if (currentFilters.bedrooms && currentFilters.bedrooms !== 'Cualquiera') params.append('bedrooms', currentFilters.bedrooms);

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await fetch(`/api/properties${queryString}`);

      if (!response.ok) {
        throw new Error(`Error en el servidor (${response.status})`);
      }

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setProperties(result.data);
      } else {
        throw new Error(result.message || 'Estructura de respuesta no válida');
      }
    } catch (err) {
      console.error('Error al consultar propiedades:', err);
      setError('No se pudo conectar con la API de propiedades. Verifica que el servidor backend esté activo.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Carga inicial
  useEffect(() => {
    fetchProperties(filters);
  }, []);

  // Manejador de búsqueda desde el Hero
  const handleHeroSearch = (newFilters) => {
    const updated = {
      ...filters,
      ...newFilters
    };
    setFilters(updated);
    fetchProperties(updated);
  };

  // Cambio de filtro por categoría de propiedad
  const handleTypeChange = (type) => {
    const updated = { ...filters, type };
    setFilters(updated);
    fetchProperties(updated);
  };

  // Cambio de filtro por zona
  const handleZoneChange = (zone) => {
    const updated = { ...filters, zone };
    setFilters(updated);
    fetchProperties(updated);
  };

  // Restablecer todos los filtros
  const handleResetFilters = () => {
    const reset = {
      search: '',
      type: 'Todos',
      zone: 'Todas',
      bedrooms: 'Cualquiera'
    };
    setFilters(reset);
    fetchProperties(reset);
  };

  const hasActiveFilters = 
    filters.search !== '' || 
    filters.type !== 'Todos' || 
    filters.zone !== 'Todas' || 
    filters.bedrooms !== 'Cualquiera';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Barra de Navegación */}
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />

      {/* Sección Hero con buscador */}
      <Hero 
        onSearchSubmit={handleHeroSearch} 
        currentFilters={filters} 
      />

      {/* Catálogo de Propiedades (Grid y Filtros) */}
      <main className="flex-1">
        <PropertyGrid
          properties={properties}
          loading={loading}
          error={error}
          onRetry={() => fetchProperties(filters)}
          activeType={filters.type}
          onTypeChange={handleTypeChange}
          activeZone={filters.zone}
          onZoneChange={handleZoneChange}
          onResetFilters={handleResetFilters}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Sección Informativa de Beneficios */}
        <FeaturesBanner />
      </main>

      {/* Pie de Página */}
      <Footer />

      {/* Modal de Detalle de Propiedad */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* Modal de Asesoría General */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

    </div>
  );
}
