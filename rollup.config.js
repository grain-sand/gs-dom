import dts from 'rollup-plugin-dts';
import alias from '@rollup/plugin-alias';
import esbuild from 'rollup-plugin-esbuild';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const input = 'src/index.ts';
const external = ['gs-base'];

const tsConfig = {
	respectExternal: false,
	exclude: ["test/**/*.ts"],
};

const plugins = [
	alias(),
	resolve(),
	typescript(tsConfig),
	esbuild({
		target: 'es2022', // 设置为 ES2022 以确保使用 const/let
		minifySyntax: true, // 压缩时保留现代语法
	}),
	terser()
];

export default [
	{
		input,
		external,
		output: [
			{
				file: 'dist/lib/index.d.ts',
				format: 'esm',
				sourcemap: false,
			},
		],
		plugins: [dts(tsConfig)],
	},
	{
		input,
		external,
		output: [
			{
				file: 'dist/lib/index.js',
				format: 'esm',
				sourcemap: false,
			},
			{
				file: 'dist/lib/index.cjs',
				format: 'cjs',
				sourcemap: false,
			},
		],
		plugins,
	},
	{
		input,
		output:{
			file: 'dist/lib/index.web.js',
			format: 'esm',
			sourcemap: false,
		},
		plugins,
	},
];
