# 🔥 FHNEC Food Control - Sistema de Registro y Control de Alimentos

**Fraternidad Internacional de Hombres de Negocios del Evangelio Completo**

Sistema web completo para gestionar eventos, registrar personas, controlar pagos y generar reportes de alimentos.

## 🎯 Características Principales

✅ **Autenticación segura** - Login con email y contraseña  
✅ **Dashboard interactivo** - Panel de control completo  
✅ **Gestión de eventos** - Crear, editar y visualizar eventos  
✅ **Registro de personas** - Agregar asistentes a eventos  
✅ **Control de pagos** - Seguimiento de contado vs tarjeta  
✅ **Exportación a Excel** - Descargar datos en formato Excel  
✅ **Reportes dinámicos** - Gráficos y estadísticas en tiempo real  
✅ **Auditoría completa** - Historial de todas las acciones  
✅ **Borrar datos** - Gestión total de información  
✅ **Diseño responsive** - Funciona en móvil y PC  
✅ **Colores FHNEC** - Rojo (#DC143C), Verde (#228B22), Dorado (#DAA520)  

## 📋 Estructura de la Aplicación

```
src/
├── components/          # Componentes React
│   ├── Header.tsx      # Encabezado con logo FHNEC
│   ├── EventForm.tsx   # Formulario para crear eventos
│   ├── EventsList.tsx  # Listado de eventos
│   ├── PeopleForm.tsx  # Formulario para agregar personas
│   ├── Reports.tsx     # Gráficos y reportes
│   └── Audit.tsx       # Historial de auditoría
├── pages/              # Páginas principales
│   ├── Login.tsx       # Página de login
│   └── Dashboard.tsx   # Dashboard principal
├── store/              # Redux store
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       ├── eventsSlice.ts
│       ├── chaptersSlice.ts
│       └── auditSlice.ts
├── utils/              # Funciones de utilidad
│   └── excelExport.ts  # Exportación a Excel
├── App.tsx             # Componente raíz
└── index.tsx           # Punto de entrada
```

## 🚀 Instalación y Configuración

### Requisitos previos
- Node.js 16+ instalado
- npm o yarn

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/Yahfed22/fihnec-food-control.git
cd fihnec-food-control
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Configurar variables de entorno
```bash
cp .env.example .env.local
```

### Paso 4: Iniciar el servidor
```bash
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

## 🔐 Credenciales de Demo

**Email:** cualquier email (ej: demo@example.com)  
**Contraseña:** cualquier contraseña  

*Nota: En demo todos los datos se almacenan localmente en el navegador*

## 📱 Funcionalidades por Tab

### 📅 Eventos
- Crear nuevos eventos
- Visualizar todos los eventos
- Ver detalles expandibles
- Exportar a Excel
- Eliminar personas del evento

### 👥 Personas
- Agregar personas a eventos existentes
- Registrar pedidos y precios
- Especificar tipo de pago (contado/tarjeta)
- Rastrear histórico de personas

### 📊 Reportes
- Gráfico de recaudación por capítulo
- Distribución de pagos (contado vs tarjeta)
- Estadísticas generales
- Visualización en tiempo real

### 📋 Auditoría
- Historial completo de acciones
- Registro de usuario que realizó la acción
- Timestamps precisos
- Capacidad de limpiar historial

## 🛠️ Stack Tecnológico

- **React 18** - Interfaz de usuario
- **Redux Toolkit** - Gestión de estado
- **TypeScript** - Tipado seguro
- **Tailwind CSS** - Estilos responsivos
- **Recharts** - Gráficos interactivos
- **XLSX** - Exportación a Excel
- **Lucide React** - Iconos
- **date-fns** - Manipulación de fechas

## 📦 Dependencias Principales

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-redux": "^8.1.3",
  "@reduxjs/toolkit": "^1.9.5",
  "date-fns": "^2.30.0",
  "xlsx": "^0.18.5",
  "recharts": "^2.10.0",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.3.3"
}
```

## 🎨 Temas y Colores

### Paleta FHNEC
- **Rojo Primario:** #DC143C (Crimson)
- **Verde Primario:** #228B22 (Forest Green)
- **Dorado:** #DAA520 (Goldenrod)
- **Fondo:** #F5F5F5 (Whitesmoke)

## 📊 Flujo de Datos

```
Login → Dashboard → [Eventos | Personas | Reportes | Auditoría]
                          ↓
                    Redux Store
                    (Events, Auth, Chapters, Audit)
                          ↓
                    LocalStorage
                    (Persistencia)
```

## 🔄 Gestión de Estado (Redux)

### authSlice
- `isAuthenticated`: Boolean estado de login
- `user`: Datos del usuario actual
- `loading`: Estado de carga

### eventsSlice
- `events`: Array de eventos
- Acciones: addEvent, updateEvent, addPerson, removePerson

### chaptersSlice
- `chapters`: Array de capítulos
- Acciones: addChapter, updateChapter, deleteChapter

### auditSlice
- `logs`: Registro de acciones
- Acciones: addLog, clearLogs

## 💾 Persistencia

Los datos se guardan en:
- **localStorage** para usuario (sesión)
- **Redux store** para eventos y auditoría
- **sessionStorage** (opcional para datos temporales)

## 🚀 Deploy

### Netlify
```bash
npm run build
```
Sube la carpeta `dist/` a Netlify

### Vercel
```bash
vercel deploy
```

### GitHub Pages
```bash
npm run build
npm run deploy
```

## 🐛 Troubleshooting

### Problema: "npm install" falla
**Solución:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Problema: Los datos no se guardan
**Solución:** Verifica que localStorage no esté deshabilitado en el navegador

### Problema: Los estilos no aparecen
**Solución:**
```bash
npm run build
npm start
```

## 📝 Notas de Desarrollo

- Los datos se almacenan en el navegador (localStorage + Redux)
- Para persistencia en servidor, integra una API backend
- El sistema de auditoría rastrea todas las acciones
- Los reportes se generan en tiempo real
- La exportación a Excel incluye dos sheets: Eventos y Personas

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia privada.  
© 2024 FHNEC - Todos los derechos reservados

## 📞 Contacto

**FHNEC**  
Fraternidad Internacional de Hombres de Negocios del Evangelio Completo

---

**Versión:** 1.0.0  
**Última actualización:** 2026-07-15  
**Estado:** ✅ Producción Completa
