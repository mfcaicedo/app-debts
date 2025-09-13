# app-debts

## 🚀 Despliegue local API Rest (NestJS)

### 1. Clonar el repositorio
```bash
git clone https://github.com/mfcaicedo/app-debts.git
cd app-debts/debts-api
```
### 2. Ir a la carpeta de la api
```bash
cd debts
```
### 3. Crear el archivo .env
```bash
SUPABASE_HOST=db.xxxxx.supabase.co
SUPABASE_PORT=5432
SUPABASE_USER=postgres
SUPABASE_PASSWORD=superpass
SUPABASE_DB=postgres
```
Usar supabase teniendo en cuenta que use supabase para la autenticación 
### 4.Instalar dependencias
```bash
npm install
```
### 5. Levantar el servidor
```bash
npm run start:dev
```
### 6. api disponible en 
http://localhost:3000


## 🚀 Despliegue local SPA (Angular 19)

### 2. Ir a la carpeta de la api
```bash
cd debts-api
```
### 3. Reemplazar las keys de supabase en el archivo enviroment.ts
```bash
    BASE_URL_SUPABASE: 'https://xxxxxxx.supabase.co',
    PUBLIC_API_KEY_SUPABASE: 'asfasdsxxxxxxxxxxxxx'
```
### 4.Instalar dependencias
```bash
npm install
```
### 5. Levantar el servidor
```bash
ng serve
```
### 6. front disponible en 
http://localhost:4200

## ⚙️ Decisiones Técnicas

### 🏗️ Arquitectura limpia (Hexagonal)
Se organizó el código en capas:
- **Domain** → Entidades y reglas de negocio puras.  
- **Application** → Casos de uso, orquestan la lógica.  
- **Infrastructure** → Controladores, repositorios (TypeORM), integración con Redis, etc.  
- **Enfoque: Vertical Slicing**
Vertical slicing es una técnica de organización que divide el sistema en secciones completas de
funcionalidad, abarcando desde el frontend hasta el backend. En lugar de separar el código por tipo
(como controladores o modelos), se agrupa por funcionalidades, lo que permite que cada parte
tenga todo lo necesario para funcionar de forma independiente. Esto facilita el desarrollo
incremental, mejora la organización en equipos y hace más manejable la evolución del sistema.

Esto facilita el **testeo, escalabilidad y mantenibilidad**.

---

### 🚀 Backend: NestJS + TypeORM + PostgreSQL
- **NestJS** → Modularidad y soporte para arquitecturas limpias.  
- **PostgreSQL (Supabase en la nube)** → Persistencia confiable y escalable (Se pedía en la prueba).  
- **TypeORM** → Simplifica el mapeo objeto-relacional (ORM) y acelera el desarrollo.  

---

### ⚡ Cache con Redis
- Cacheo de consultas `GET` de deudas por usuario.  
- Invalidación automática en operaciones de escritura (`create`, `update`, `delete`, `update-status`).  
- Mejora el rendimiento en consultas repetidas.  

---

### 🔐 Autenticación con Supabase Auth
- Se utilizó **Supabase Auth** en lugar de implementar JWT manualmente.  
- Ventajas:  
  -  **Gratis y fácil de implementar**, para una prueba técnica.  
  -  **Ahorra tiempo** en la gestión de login, registro y seguridad.  
---

### 📤 Exportación JSON/CSV
- Caso de uso extra implementado en la API.  
- Permite **descargar las deudas de un usuario** en **JSON o CSV**.  
- Aporta flexibilidad y valor agregado en reportes.
- Cabe destacar que no se integró con el front pero el enpoint esta disponible para consumirse

---

### 💻 Frontend: Angular 19
- Se eligió Angular por su **tipado estricto en TypeScript** y su modularidad.  
- Uso de **lazy loading**, **guards** e **interceptors** para buenas prácticas.  
---
Para el front también se uso una arquitectura limpia tomando los principios de la arquitectura hexagonal y permitiendo 
tener un proyecto muy escalable a largo plazo.

### 🎨 UI minimalista y responsiva
- Uso de **PrimeNG** para acelerar el diseño y facilidad de implementacion y uso  
- Interfaz limpia y organizada, enfocada en la usabilidad, no en un diseño complejo.  


