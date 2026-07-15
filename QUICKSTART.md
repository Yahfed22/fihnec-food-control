# GUÍA DE INSTALACIÓN RÁPIDA - FHNEC Food Control

## ⚡ 5 Pasos para empezar

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/Yahfed22/fihnec-food-control.git
cd fihnec-food-control
```

### 2️⃣ Instalar Node.js (si no lo tienes)
Descarga de: https://nodejs.org/

### 3️⃣ Instalar dependencias
```bash
npm install
```

### 4️⃣ Iniciar el servidor
```bash
npm start
```

### 5️⃣ Acceder a la aplicación
- Se abrirá automáticamente en: `http://localhost:3000`
- O abre manualmente en tu navegador

## 🔓 Login

**Email:** Cualquier email (ej: demo@example.com)  
**Contraseña:** Cualquier contraseña  

¡Eso es todo! Ya puedes usar la aplicación.

## 📂 Estructura de carpetas

```
fihnec-food-control/
├── src/
│   ├── components/          # Componentes React
│   ├── pages/               # Páginas
│   ├── store/               # Redux
│   ├── utils/               # Funciones auxiliares
│   ├── App.tsx
│   └── index.tsx
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🆘 Problemas comunes

### Error: "npm not found"
**Solución:** Instala Node.js desde https://nodejs.org/

### Error: "port 3000 is already in use"
**Solución:**
```bash
# En Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# En Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Los datos no se guardan
**Solución:** Los datos se guardan en localStorage del navegador. Si limpias el navegador, se pierden.

## 📚 Comandos útiles

```bash
# Iniciar en desarrollo
npm start

# Compilar para producción
npm run build

# Ejecutar tests
npm test

# Limpiar caché
npm cache clean --force
```

## 🌐 Desplegar online

### Opción 1: Vercel (Recomendado)
1. Sube tu código a GitHub
2. Ve a https://vercel.com
3. Conecta tu repositorio
4. Vercel despliega automáticamente

### Opción 2: Netlify
1. Sube tu código a GitHub
2. Ve a https://netlify.com
3. Arrastra la carpeta `dist/` o conecta GitHub
4. Tu app estará online en minutos

## ✅ Verificar instalación

Abre la consola del navegador (F12) y verifica:
- No hay errores rojos
- La aplicación carga correctamente
- El localStorage está disponible

## 🎉 ¡Listo!

Ya tienes FHNEC Food Control funcionando. Ahora puedes:
- ✅ Crear eventos
- ✅ Agregar personas
- ✅ Registrar pagos
- ✅ Ver reportes
- ✅ Exportar a Excel

¡Que disfrutes la aplicación!

---

**¿Preguntas?** Revisa el README.md para más detalles.
