import {createEl} from "./createEl";

export function loadScript(src: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const remove = (e: Event) => (e.target as any)?.remove();
		createEl('script', {
			src: src,
			appendTo: document.head,
			load: (e) => {
				remove(e);
				resolve();
			},
			error: (e) => {
				remove(e);
				reject(e);
			},
		})
	})
}