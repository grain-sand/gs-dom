// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, it, expect} from "vitest";
import {logJson} from "gs-base";

const console = (top as any).console;

describe('gdom', () => {
	document.body.innerHTML = `
		<button>test</button>
	`
	it('proxy', async (): Promise<void> => {
		console.log('test-gdom', document.body)
	})
})