const express = require('express');
const cors = require('cors');
const path = require('path');
const properties = require('./data/properties.json');

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Ruta de estado de la API
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    name: 'Peñasco Real Estate API',
    version: '1.0.0',
    endpoints: [
      'GET /api/properties',
      'GET /api/properties/:id',
      'POST /api/contact'
    ]
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// GET /api/properties - Lista con filtros dinámicos
app.get('/api/properties', (req, res) => {
  try {
    const { search, type, zone, minPrice, maxPrice, bedrooms } = req.query;

    let filtered = [...properties];

    // Búsqueda por texto (título, descripción, ubicación)
    if (search && search.trim() !== '') {
      const query = search.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.zone.toLowerCase().includes(query)
      );
    }

    // Filtro por tipo de propiedad
    if (type && type !== 'Todos' && type !== 'Todas') {
      filtered = filtered.filter(p => p.propertyType.toLowerCase() === type.toLowerCase());
    }

    // Filtro por zona
    if (zone && zone !== 'Todas') {
      filtered = filtered.filter(p => p.zone.toLowerCase() === zone.toLowerCase());
    }

    // Filtro por rango de precio
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    // Filtro por número de habitaciones
    if (bedrooms && bedrooms !== 'Cualquiera') {
      filtered = filtered.filter(p => p.bedrooms >= Number(bedrooms));
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    res.status(500).json({
      success: false,
      message: 'Error al consultar las propiedades.'
    });
  }
});

// GET /api/properties/:id - Detalle de una propiedad
app.get('/api/properties/:id', (req, res) => {
  try {
    const property = properties.find(p => p.id === req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Propiedad no encontrada.'
      });
    }

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Error al obtener el detalle de la propiedad:', error);
    res.status(500).json({
      success: false,
      message: 'Error al procesar la solicitud.'
    });
  }
});

// POST /api/contact - Recepción de formulario de contacto
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, propertyId, propertyTitle, message } = req.body;

    // Validación básica de campos requeridos
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Por favor completa todos los campos requeridos (Nombre, Correo electrónico y Mensaje).'
      });
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Por favor proporciona una dirección de correo electrónico válida.'
      });
    }

    const contactEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      propertyId: propertyId || null,
      propertyTitle: propertyTitle || 'Consulta general',
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    console.log('--- NUEVO MENSAJE DE CONTACTO RECIBIDO ---');
    console.log(contactEntry);

    res.status(201).json({
      success: true,
      message: `¡Gracias ${name.trim()}! Hemos recibido tu solicitud sobre "${contactEntry.propertyTitle}". Un agente inmobiliario se comunicará contigo muy pronto.`,
      data: {
        id: contactEntry.id,
        receivedAt: contactEntry.createdAt
      }
    });
  } catch (error) {
    console.error('Error al procesar el contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Ocurrió un error al enviar tu mensaje. Inténtalo de nuevo más tarde.'
    });
  }
});

// Exportar la app para compatibilidad con Vercel Serverless Functions
module.exports = app;

// Escuchar puerto únicamente cuando se ejecuta directamente (desarrollo local)
if (require.main === module && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`[Backend Express] Servidor activo en http://localhost:${PORT}`);
  });
}
