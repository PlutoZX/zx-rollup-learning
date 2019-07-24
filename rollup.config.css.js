import css from 'rollup-plugin-css-porter'; // 打包css


export default {
  input: 'cssSrc/index.js',
  output: {
    file: 'cssDist/bundle.js',
    format: 'es'
  },
  plugins: [
    css({ dest: 'cssDist/bundle.css' })
  ]
};
