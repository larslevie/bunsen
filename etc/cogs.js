const {env} = process;

const MINIFY = env.MINIFY === '1';

module.exports = {
  transformers: [].concat(
    {name: 'directives'},
    {
      name: 'stylelint',
      only: 'assets/src/**/*.scss',
      options: {syntax: 'scss'}
    },
    {name: 'sass', only: '**/*.scss'},
    {name: 'autoprefixer', only: '**/*.+(css|scss)'},
    MINIFY ? {name: 'clean-css', only: '**/*.+(scss|css)'} : [],
    {
      name: 'local-css',
      only: '**/*.scss',
      except: 'assets/src/global.scss',
      options: {debug: !MINIFY}
    },
    {
      name: 'local-css',
      only: 'assets/src/global.scss',
      options: {debug: !MINIFY, rename: false}
    },
    {
      name: 'eslint',
      only: 'assets/src/**/*.js'
    },
    {
      name: 'replace',
      only: '**/*.js',
      options: {
        flags: 'g',
        patterns: {
          'process.env.NODE_ENV': MINIFY ? "'production'" : "'development'"
        }
      }
    },
    {
      name: 'babel',
      only: 'assets/src/**/*.+(js|css|scss)',
      options: {
        plugins: ['transform-runtime'],
        presets: ['env', 'stage-0', 'react']
      }
    },
    {
      name: 'concat-commonjs',
      only: '**/*+(js|css|scss)',
      options: {
        alias: {
          react: `react/cjs/react.${
            MINIFY ? 'production.min' : 'development'
          }.js`
        },
        entry: 'assets/src/index.js',
        extensions: ['.js', '.css', '.scss']
      }
    },
    MINIFY
      ? {
        name: 'uglify-js',
        only: '**/*.+(js|css|scss)',
        except: '**/*+(-|_|.)min.js'
      }
      : []
  ),
  builds: {
    'assets/src/public/**/*': {base: 'assets/src/public', dir: 'assets/dist'},
    'assets/src/index.js': {base: 'assets/src', dir: 'assets/dist'}
  },
  manifestPath: 'assets/dist/manifest.json'
};
