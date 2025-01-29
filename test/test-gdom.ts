// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, it, expect} from "vitest";
import {logJson} from "gs-base";
import {query, newGDom, parents, nextAll, prevAll, find} from "../src";

const console = (top as any).console;

describe('gdom', () => {
	document.body.innerHTML = `
		<button>test1</button>
		<fieldset>
			<button class="b2">test2</button>
		</fieldset>
		<fieldset>
			<button>test3</button>
		</fieldset>
		<fieldset>
			<button class="b4">test4</button>
			<div>
				<button>b5</button>
				<button>b6</button>
				<button>b7</button>
			</div>
		</fieldset>
	`
	it('find', async (): Promise<void> => {
		console.log(query([{selector: 'button', content: /t2/}, '^fieldset',{selector:'~fieldset',index:-1},'>button']))
		// const btn = document.querySelector('button.b2') as HTMLElement;
		// // console.log(newGDom(btn).query)
		//
		// console.log(find('button', document.body))
		//
		// console.log(nextAll('button', btn))
		// console.log(prevAll('button', btn))


		// console.log(query({
		// 	withBy: 'return',
		// 	by: btn,
		// 	selectors: {selector: 'button', content: 'test', visible: 'checkParents'}
		// }))
		// console.log(query({withBy: 'return', by: btn, selectors: {selector: 'button', content: 'abc'}}))
		// console.log(query({withBy: 'return', by: btn, selectors: {selector: 'a', content: 'test'}}))

		// console.log(find({selectors: 'button', by: document.body, gdom: true}))
		// console.log(find('button'))
	})
})