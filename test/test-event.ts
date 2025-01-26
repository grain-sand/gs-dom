// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, it, expect} from "vitest";
import {logJson} from "gs-base";
import {on, un, waitFind} from "../src";

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
		}, {by: btn})
		on(e, {by: btn})
		un(e, btn)
		on('click',()=>{
			console.log('全局')
		})
	})
})