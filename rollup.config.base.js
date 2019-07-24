import resolve from 'rollup-plugin-node-resolve'; // 读取nodemodules里的依赖
import babel from 'rollup-plugin-babel'; // 编译es6
import { terser } from "rollup-plugin-terser"; // 压缩混淆 和ugly的区别是可以处理es6
import filesize from 'rollup-plugin-filesize'; // 显示打包后文件大小



export default {
  input: 'baseSrc/index.js',
  output: {
    file: 'baseDist/bundle.js',
    format: 'es'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    terser(),
    filesize()
  ]
};
