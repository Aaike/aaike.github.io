import path from 'path';

export let paths = {
  source: 'src',
  output: 'dist',
  app: 'src/app',
  images: 'src/images',
  assets: './',
  styles: 'src/styles',
  icons: 'src/icons',
  fonts: 'src/fonts',
  doc: 'doc',
  unit: 'test/unit/src',
  e2e: 'test/e2e/src',
};

export let patterns = {
  app: paths.app + '/**/*.+(ts|tsx|js|jsx)',
  images: path.join(paths.images, '/**/*.+(jpg|png|gif|ico|svg)'),
  icons: path.join(paths.icons, '/**/*'),
  fonts: path.join(paths.fonts, '/**/*'),
  styles: path.join(paths.styles, '/**/*.+(scss|sass)'),
  unit: paths.unit + '/**/*.spec.js',
  e2e: paths.e2e + '/**/*.js'
};
