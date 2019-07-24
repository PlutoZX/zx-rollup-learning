import commonjs from 'rollup-plugin-commonjs' // 将CommonJS模块转换为ES6，因此它们可以包含在Rollup包中
import vue from 'rollup-plugin-vue' // 打包vue



export default {
  input: 'vueSrc/fetoast.js',
  output: {
    file: 'vueDist/FeToast.js',
    format: 'es'
  },
  plugins: [
    commonjs(),
    vue()
  ]
};
