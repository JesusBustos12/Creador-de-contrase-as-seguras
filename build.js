const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SRC_DIR = path.join(__dirname, 'public');
const DIST_DIR = path.join(__dirname, 'dist');

/**
 * Recursive mkdir and copy
 */
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Ignorar JS y CSS aquí, se procesarán después con herramientas de minificación
      if (!entry.name.endsWith('.js') && !entry.name.endsWith('.css')) {
        console.log(`Copying: ${entry.name}`);
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// Execution
console.log('--- VANGUARDIAPASS ENTERPRISE BUILD START ---');
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}

try {
  // 1. Crear estructura y copiar estáticos (excepto JS/CSS)
  copyDir(SRC_DIR, DIST_DIR);
  
  // 2. Asegurar que los directorios de destino existen para JS/CSS
  fs.mkdirSync(path.join(DIST_DIR, 'assets', 'css'), { recursive: true });
  fs.mkdirSync(path.join(DIST_DIR, 'assets', 'js'), { recursive: true });

  // 3. Ejecutar minificación profesional
  console.log('Minifying CSS...');
  execSync('npm run build:css', { stdio: 'inherit' });
  
  console.log('Minifying JS...');
  execSync('npm run build:js', { stdio: 'inherit' });

  console.log('--- BUILD COMPLETED SUCCESSFULLY ---');
  console.log(`Location: ${DIST_DIR}`);
} catch (err) {
  console.error('Build failed:', err);
  process.exit(1);
}
