# 🏖️ Peñasco Real Estate - Full-Stack Monorepo

Aplicación web moderna y responsiva para venta de bienes raíces (Real Estate) en Puerto Peñasco, Sonora. Diseñada con arquitectura monorepo y optimizada para despliegue serverless continuo en **Vercel** desde un solo repositorio.

---

## 📁 Estructura del Proyecto

```text
penasco-real-state/
├── /frontend               # Cliente web (React + Vite + Tailwind CSS + Lucide Icons)
│   ├── /src
│   │   ├── /components
│   │   │   ├── Navbar.jsx          # Navegación con branding y acceso rápido a contacto
│   │   │   ├── Hero.jsx            # Encabezado con buscador interactivo y filtros
│   │   │   ├── PropertyCard.jsx    # Tarjeta de propiedad (imagen, precio, specs)
│   │   │   ├── PropertyGrid.jsx    # Cuadrícula de catálogo con filtros y estados
│   │   │   ├── PropertyModal.jsx   # Vista de detalle con galería y formulario de contacto
│   │   │   ├── FeaturesBanner.jsx  # Beneficios de inversión y certeza legal
│   │   │   ├── ContactModal.jsx    # Modal de asesoría general
│   │   │   └── Footer.jsx          # Pie de página y datos de contacto
│   │   ├── App.jsx                 # Estado global y consumo de /api/properties
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js              # Configuración con proxy local a http://localhost:5000
│   └── package.json
│
├── /backend                # API REST (Node.js + Express)
│   ├── /data
│   │   └── properties.json         # Mock data con fotos en alta definición
│   ├── index.js                    # Servidor Express exportado para Serverless
│   └── package.json
│
├── /api
│   └── index.js                    # Adaptador puente Serverless para Vercel
│
├── vercel.json             # Reglas de enrutamiento y serverless runtime
└── package.json            # Gestión y scripts del monorepo
```

---

## 🚀 Puesta en Marcha en Local

### 1. Instalación de dependencias

Instala las dependencias en ambos entornos:

```bash
# Instalar backend
cd backend
npm install

# Instalar frontend
cd ../frontend
npm install
```

### 2. Ejecución en desarrollo

Abre dos terminales (o corre desde la raíz):

**Terminal 1 (Backend - Puerto 5000):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend - Puerto 5173):**
```bash
cd frontend
npm run dev
```

> **Nota:** El archivo `vite.config.js` incluye un proxy para que cualquier llamada a `/api` en desarrollo se redirija automáticamente a `http://localhost:5000`.

---

## 📡 Endpoints de la API

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/properties` | Obtiene el catálogo. Acepta query params: `search`, `type`, `zone`, `bedrooms`. |
| `GET` | `/api/properties/:id` | Obtiene la ficha detallada de una propiedad específica. |
| `POST` | `/api/contact` | Procesa el formulario de contacto (`name`, `email`, `phone`, `propertyTitle`, `message`). |
| `GET` | `/api/health` | Estado del servicio. |

---

## ⚡ Configuración de Despliegue en Vercel

Para desplegar este monorepo en Vercel bajo un único dominio:

1. **Conecta tu repositorio de GitHub / GitLab a Vercel.**
2. En la pantalla de configuración del proyecto (**Project Settings**):
   - **Framework Preset:** Selecciona `Vite` (o `Other`).
   - **Root Directory:** Déjalo en `./` (la raíz del repositorio).
   - **Build Command:** Configúralo como:
     ```bash
     npm --prefix frontend install && npm --prefix frontend run build
     ```
     *(o simplemente `cd frontend && npm install && npm run build`)*
   - **Output Directory:** Configúralo como:
     ```bash
     frontend/dist
     ```
   - **Install Command:** Déjalo por defecto o `npm --prefix backend install`.

3. **¿Cómo funciona el `vercel.json`?**
   El archivo `vercel.json` en la raíz contiene:
   - Configuración de runtime `@vercel/node` para la API.
   - Regla de **rewrite** para redirigir `/api/(.*)` hacia el backend Express.
   - Regla de **rewrite** para dirigir cualquier ruta del cliente al `index.html` de Vite (evitando errores 404 al refrescar).
