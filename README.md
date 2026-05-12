# VanguardiaPass Enterprise

Seguridad de vanguardia en las contraseñas de cualquier tipo de negocio. Generador de grado criptográfico con estética profesional y enfoque en la privacidad.

## Características

- **Seguridad Criptográfica**: Generación de entropía real mediante `window.crypto.getRandomValues`.
- **Diseño Responsivo**: Adaptado para móviles, tablets y escritorio.
- **PWA (Progressive Web App)**: Instalable y con soporte offline mediante Service Workers.
- **Sin Dependencias**: Construido 100% con Vanilla HTML, CSS y JavaScript.
- **Accesibilidad**: Cumple con estándares ARIA para una mejor experiencia de usuario.

## Tecnologías

- **HTML5**: Estructura semántica.
- **CSS3**: Variables nativas, animaciones y diseño responsivo.
- **JavaScript (ES6+)**: Lógica funcional sin frameworks.
- **Service Workers**: Estrategia Network-First con fallback en caché.

## Instalación y Ejecución

1. Clonar el repositorio.
2. Ejecutar `npm install` (opcional, para herramientas de desarrollo).
3. Iniciar el servidor local:
   ```bash
   npm start
   ```

## Build de Producción

Para generar la versión optimizada en la carpeta `dist/`:
```bash
npm run build
```

## Licencia

Este proyecto está bajo la licencia MIT.
