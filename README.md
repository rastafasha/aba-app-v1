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

