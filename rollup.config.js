import dts from 'rollup-plugin-dts'
import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const input = 'src/index.ts'

const external = ['grain-sand-base']

const tsConfig = {
	respectExternal: false,
	exclude: ["test/**/*.ts"],
}

const output = (suffix) => ({
	file: `dist/lib/index.${suffix}`,
	format: 'esm'
});

const jsConfig = (suffix, external,plugins=[]) => ({
	input, external,
	output: output(suffix),
	plugins: [
		alias(),
		resolve(),
		typescript(tsConfig),
		esbuild(),
		...plugins
	],
	sourceMap: true
})

export default [
	jsConfig('js', external),
	jsConfig('web.js', [],[terser()]),
	{
		input, external,
		output: output('d.ts'),
		plugins: [dts(tsConfig)]
	}
]

