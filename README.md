# To-Do List Fullstack App

Este proyecto es una aplicación de To-Do List fullstack, compuesta por un backend en .NET 8 (C#) y un frontend moderno en Angular 17+ con Angular Material. Permite gestionar tareas con operaciones CRUD completas, interfaz responsiva y experiencia de usuario profesional.

---

## Tabla de Contenidos
- [Requisitos](#requisitos)
- [Instalación](#instalación)
  - [Backend (.NET)](#backend-net)
  - [Frontend (Angular)](#frontend-angular)
- [Ejecución](#ejecución)
- [Uso de la aplicación](#uso-de-la-aplicación)
- [Cómo se creó la app con GitHub Copilot](#cómo-se-creó-la-app-con-github-copilot)
- [Notas y detalles técnicos](#notas-y-detalles-técnicos)

---

## Requisitos
- Node.js 18+ y npm
- .NET 8 SDK

---

## Instalación

### Backend (.NET)
1. Ve a la carpeta del backend:
   ```sh
   cd To-Do-List
   ```
2. Restaura los paquetes y compila:
   ```sh
   dotnet restore
   dotnet build
   ```

### Frontend (Angular)
1. Ve a la carpeta del frontend:
   ```sh
   cd todo-list-frontend
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```

---

## Ejecución

### 1. Inicia el backend
Desde la carpeta `To-Do-List`:
```sh
cd To-Do-List
# Por defecto corre en https://localhost:5067
dotnet run
```

### 2. Inicia el frontend
Desde la carpeta `todo-list-frontend`:
```sh
cd todo-list-frontend
ng serve --proxy-config proxy.conf.json
```
Esto levanta el frontend en http://localhost:4200 y enruta las llamadas a `/tasks` hacia el backend automáticamente.

---

## Uso de la aplicación
1. Abre http://localhost:4200 en tu navegador.
2. Puedes:
   - Ver la lista de tareas.
   - Crear, editar y eliminar tareas.
   - Usar la interfaz responsiva y moderna basada en Angular Material.

---

## Cómo se creó la app con GitHub Copilot

### Backend
- Copilot generó el backend en C# usando ASP.NET Core 8, con un controlador RESTful (`TasksController`) y un modelo `TaskItem`.
- Se decidió no usar Entity Framework, optando por una lista en memoria para simplificar el desarrollo y evitar dependencias innecesarias.
- El atributo `id` de `TaskItem` se hizo nullable para permitir la creación de tareas sin requerir un id manual.
- Copilot configuró CORS para permitir el acceso desde el frontend Angular.
- Swagger se habilitó automáticamente para pruebas y documentación de la API.

### Frontend
- Copilot generó el proyecto Angular, instaló Angular Material y configuró módulos y temas.
- Se crearon componentes standalone para la lista de tareas, formulario de alta/edición y diálogo de confirmación de borrado.
- Copilot implementó el servicio Angular para consumir la API REST, usando HttpClient y un proxy para evitar problemas de CORS.
- Se configuró el enrutamiento SPA con `loadComponent` y rutas para listar, crear y editar tareas.
- Se aplicaron estilos modernos y responsivos, y se importó el tema de Material y la fuente de Material Icons.
- Copilot resolvió errores comunes de Angular 17+ (bootstrap, providers, SSR/SPA, duplicación de componentes, recarga de datos tras operaciones CRUD, etc.).
- Se ajustó la lógica para que la tabla se refresque correctamente tras crear, editar o eliminar tareas.

### Detalles y asistencia específica de Copilot
- Copilot propuso y aplicó parches para solucionar errores de bootstrap y duplicación de plataforma en Angular.
- Sugirió y aplicó la configuración de CORS en el backend.
- Generó los templates y estilos SCSS para una UI profesional.
- Asistió en la depuración de problemas de recarga de datos y navegación en Angular.
- Propuso la estructura de carpetas y la integración entre backend y frontend.
- El usuario solo tuvo que ajustar detalles menores (como el tipo nullable de id y la omisión de Entity Framework).

---

## Notas y detalles técnicos
- El backend es stateless y almacena las tareas en memoria (se pierden al reiniciar el servidor).
- El frontend usa Angular 17+ con componentes standalone y Angular Material.
- El proxy (`proxy.conf.json`) permite que el frontend consuma la API sin problemas de CORS.
- El proyecto es ideal para pruebas, demos y como base para proyectos más grandes.

---

¡Listo para usar y modificar según tus necesidades!
