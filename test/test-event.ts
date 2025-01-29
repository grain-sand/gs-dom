// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, expect, it} from "vitest";
import {logJson} from "gs-base";
import {newGDom, on, trigger, un, waitFind} from "../src";

const console = (top as any).console;

describe('event', () => {
	it('on', async (): Promise<void> => {
		const e = {
			mouseenter: (e) => {
				console.log(e.type)
			}
		}
		setTimeout(() => {
			document.body.innerHTML = '<button>有按钮</button>'
		}, 100)
		const btn = await waitFind('button')
		on(['click', 'mouseenter'], (e) => {
			console.log(e.type)
			e.stopPropagation();
		}, {by: btn})
		on(e, {by: btn})
		un(e, btn)
		on('click', () => {
			console.log('全局')
			trigger('click', btn!)
		})
	})
	it('gdom-on', async (): Promise<void> => {
		const btn = document.createElement('button');
		btn.innerHTML = '有gdom按钮';
		document.body.appendChild(btn);
		const gdom = newGDom(btn);
		gdom.on('click', (e) => {
			console.log('有按钮啊')
			e.stopPropagation();
		})
		console.log(gdom)
		console.log(gdom.raw)

	})
})