# aba-app-v1

## Normas de desarrollo

### 1. Gitflow
Nuestro flujo de trabajo sigue el modelo Gitflow para la gestión de ramas y despliegues:

- **main**: Esta rama está destinada exclusivamente para los despliegues a producción. Todo el código en `main` debe ser estable.
- **develop**: Usada para integrar y testear las nuevas funcionalidades antes de enviarlas a producción. Las pruebas y revisiones se realizan aquí.
- **feature/***: Cada nueva funcionalidad o ajuste se desarrolla en una rama `feature/` a partir de `develop`. Una vez completada la funcionalidad, se envía un Pull Request (PR) a `develop`.

#### Flujo de trabajo:
1. Crear una rama `feature/*` para la nueva funcionalidad.
2. Hacer un **PR** de la rama `feature/*` a `develop` para realizar las pruebas.
3. Una vez aprobadas y testeadas las funcionalidades en `develop`, realizar un **PR** a `main` y añadir un **Tag** para marcar la versión de lanzamiento.

### 2. Estructura Modular

#### Shared Module (Módulo Compartido)
Este módulo contiene **componentes, servicios y utilidades comunes** que podrían ser reutilizables en cualquier aplicación, sin depender de la lógica de negocio específica.

Son elementos que **no tienen estado** y que, por su naturaleza, pueden ser fácilmente compartidos entre diferentes aplicaciones o módulos.

**Ejemplos:**
- **Pipes:** Formateo de fechas, manejo de textos (ej: capitalización).
- **Directivas:** Directivas reutilizables como `*ngIfElse`, manejo de eventos, etc.
- **Componentes UI:** Botones, modales, tarjetas, que no dependen de la lógica de negocio (componentes "atómicos").
- **Servicios generales:** Servicios de validación de formularios, helpers para manipulación de fechas, etc.

#### Core Module (Módulo Central)
Este módulo contiene los **servicios, componentes y guardias esenciales** para que la aplicación funcione correctamente. Estos son específicos para la aplicación y no suelen ser compartidos con otras aplicaciones.

**Ejemplos:**
- **Servicios de autenticación:** Manejo de tokens, login/logout.
- **Servicios API:** Interacciones con el backend específicas de esta aplicación.
- **Guardias de rutas:** Protecciones de rutas basadas en roles o autenticación.
- **Interceptors HTTP:** Modificación de requests/responses a nivel global.
- **Componentes de layout:** Header, footer, barra de navegación (componentes de estructura).

#### Feature Modules (Módulos de Funcionalidades)
Estos módulos están diseñados para contener **páginas y subpáginas específicas** de la aplicación, organizadas para que puedan cargarse de forma **lazy** (carga diferida).

Usan tanto componentes y servicios del módulo **Shared** (componentes atómicos) como del módulo **Core** (servicios y lógica específica), y combinan estos elementos para crear componentes más grandes (moleculares y orgánicos).

**Ejemplos:**
- **Páginas de usuarios:** Un módulo para la gestión de usuarios, que usa elementos compartidos como botones o tablas (del módulo Shared) y lógica centralizada de autenticación (del módulo Core).
- **Páginas de administración:** Para manejar configuraciones específicas, como el panel de control, que puede tener componentes de formularios reutilizables de Shared y servicios de configuración de Core.

### Principio de Slicing Vertical
La idea es estructurar los módulos para que **cada funcionalidad esté completamente encapsulada**, lo que permite que cada módulo funcione de forma independiente y sea escalable.

- **Shared** y **Core** proporcionan las herramientas comunes y específicas respectivamente.
- Los módulos de funcionalidades ensamblan estos elementos para crear flujos completos de la aplicación.


