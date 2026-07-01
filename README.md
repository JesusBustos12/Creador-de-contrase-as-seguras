# VanguardiaPass Enterprise

**VanguardiaPass Enterprise** es una aplicación web enfocada en la seguridad que permite la generación de contraseñas de grado criptográfico, con una estética profesional y un enfoque prioritario en la privacidad del usuario.

Diseñada como una Progressive Web App (PWA) de alto rendimiento, está construida con tecnologías web nativas, eliminando la dependencia de frameworks externos. Esto garantiza una ejecución rápida, soporte offline robusto y una experiencia de usuario fluida en cualquier dispositivo.

## Características Principales

- **Seguridad Criptográfica**: Generación de entropía real en el lado del cliente utilizando la API `window.crypto.getRandomValues`. Ninguna contraseña o dato sensible viaja por la red, garantizando privacidad absoluta (Zero-Knowledge).
- **Progressive Web App (PWA)**: Completamente instalable en dispositivos móviles y de escritorio. Soporte offline mediante Service Workers utilizando estrategias Network-First y Cache-Fallback.
- **Diseño Responsivo y Moderno**: Interfaz de usuario adaptable a cualquier tamaño de pantalla, con un diseño limpio, profesional y micro-interacciones fluidas utilizando CSS nativo.
- **Zero Dependencies**: Arquitectura construida 100% con Vanilla HTML5, CSS3 y JavaScript (ES6+), garantizando máxima velocidad de carga, mantenibilidad a largo plazo y control absoluto sobre el DOM.
- **Accesibilidad (A11y)**: Implementación de estándares ARIA para asegurar la compatibilidad con lectores de pantalla y ofrecer una experiencia inclusiva.

## Stack Tecnológico

- **Estructura**: HTML5 Semántico.
- **Estilos**: CSS3 (Variables nativas, flexbox/grid, animaciones).
- **Lógica**: JavaScript (ES6+ puro, arquitectura modular).
- **PWA**: Service Workers, Web App Manifest.
- **Despliegue e Integración**: Configuración para GitHub Pages y Vercel, con scripts de build personalizados en Node.js para optimización de assets.

## Estructura del Proyecto

```text
/
├── package.json              # Gestión de dependencias y scripts de desarrollo
├── build.js                  # Pipeline de construcción para optimización de producción
├── docs/                     # Código fuente y entorno de desarrollo (GitHub Pages)
│   ├── index.html            # Entry point de la aplicación
│   ├── manifest.json         # Web App Manifest
│   ├── sw.js                 # Service Worker
│   └── assets/               # Estilos, scripts y recursos estáticos
└── dist/                     # Build optimizado para producción
```

## Demo en vivo
[VanguardiaPass Enterprise](https://jesusbustos12.github.io/Creador-de-contrase-as-seguras/)

---

## Contacto

- **GitHub**: [JesusBustos12](https://github.com/JesusBustos12)
- **LinkedIn**: [Jesús Bustos Arizmendi](https://linkedin.com/in/jesus-bustos-arizmendi-325329283)
- **Correo**: jesusbustosarizmendi0@gmail.com
