// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, it, expect} from "vitest";
import {logJson} from "gs-base";
import {observe, waitFind} from "../src";

const console = (top as any).console;

describe('wait', () => {
	it('wait', async (): Promise<void> => {
		setTimeout(() => {
			document.body.innerHTML = '<button>有按钮</button><div>abc</div><button class="abc">有按钮</button>'
		}, 100)
		const btn = await waitFind('button.abc')
		console.log(btn)
	})
	it('wait-gdom', async (): Promise<void> => {
		setTimeout(() => {
			document.body.innerHTML = '<button>有按钮</button><div>abc</div><button class="abc">有按钮</button>'
		}, 100)
		const btn = await waitFind('button.abc',{gdom:true})
		console.log(btn)

	})
	it('observer', async (): Promise<void> => {
		observe({
			subtree: true,
			selectors: [
				{
					selector: 'button',
					addedElements: (elements) => {
						console.log(elements)
					}
				}
			],
			addedElements: (elements) => {
				console.log(elements)
			}
		})
		setTimeout(() => {
			document.body.innerHTML = '<button>有按钮</button><div>abc</div>'
		}, 100)
	})
})