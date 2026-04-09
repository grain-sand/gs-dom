// noinspection TypeScriptUnresolvedReference

import {beforeEach, describe, expect, it} from 'vitest';
import {observe, waitFind} from '../src';

// 测试observer模块的各个功能
describe('observer', () => {
	beforeEach(() => {
		// 清理测试环境
		document.body.innerHTML = '';
	});

	// 测试observe功能
	describe('observe', () => {
		it('should observe added elements', async () => {
			const container = document.createElement('div');
			document.body.appendChild(container);

			let addedElements: HTMLElement[] = [];

			const observer = observe({
				by: container,
				selectors: [{
					selector: '.test',
					addedElements: (elements) => {
						addedElements = elements;
					}
				}]
			});

			// 添加元素
			const element = document.createElement('div');
			element.className = 'test';
			container.appendChild(element);

			// 等待观察器触发
			await new Promise(resolve => setTimeout(resolve, 100));

			expect(addedElements.length).toBe(1);
			expect(addedElements[0]).toBe(element);

			observer.disconnect();
		});

		it('should observe attribute changes', async () => {
			const element = document.createElement('div');
			document.body.appendChild(element);

			let mutation: MutationRecord | null = null;

			const observer = observe({
				by: element,
				changedAttributes: (mut) => {
					mutation = mut;
				}
			});

			// 修改属性
			element.setAttribute('data-test', 'value');

			// 等待观察器触发
			await new Promise(resolve => setTimeout(resolve, 100));

			expect(mutation).not.toBeNull();
			expect(((mutation as unknown) as MutationRecord).attributeName).toBe('data-test');

			observer.disconnect();
		});

		it('should observe text changes', async () => {
			const element = document.createElement('div');
			element.textContent = 'Initial text';
			document.body.appendChild(element);

			let textChanged = false;

			const observer = observe({
				by: element,
				addedTexts: () => {
					textChanged = true;
				},
				removedTexts: () => {
					textChanged = true;
				}
			});

			// 修改文本
			element.textContent = 'Updated text';

			// 等待观察器触发
			await new Promise(resolve => setTimeout(resolve, 100));

			expect(textChanged).toBe(true);

			observer.disconnect();
		});

		it('should support subtree observation', async () => {
			const container = document.createElement('div');
			const nested = document.createElement('div');
			container.appendChild(nested);
			document.body.appendChild(container);

			let addedElements: HTMLElement[] = [];

			const observer = observe({
				by: container,
				subtree: true,
				selectors: [{
					selector: '.test',
					addedElements: (elements) => {
						addedElements = elements;
					}
				}]
			});

			// 在嵌套元素中添加子元素
			const element = document.createElement('div');
			element.className = 'test';
			nested.appendChild(element);

			// 等待观察器触发
			await new Promise(resolve => setTimeout(resolve, 100));

			expect(addedElements.length).toBe(1);
			expect(addedElements[0]).toBe(element);

			observer.disconnect();
		});
	});

	// 测试waitFind功能
	describe('waitFind', () => {
		it('should find existing elements', async () => {
			const container = document.createElement('div');
			const element = document.createElement('div');
			element.className = 'test';
			container.appendChild(element);
			document.body.appendChild(container);

			const result = await waitFind('.test', {by: container});
			expect(result!.length).toBe(1);
			expect(result![0]).toBe(element);
		});

		it('should wait for elements to be added', async () => {
			const container = document.createElement('div');
			document.body.appendChild(container);

			// 延迟添加元素
			setTimeout(() => {
				const element = document.createElement('div');
				element.className = 'test';
				container.appendChild(element);
			}, 100);

			const result = await waitFind('.test', {by: container, timeout: 1});
			expect(result!.length).toBe(1);
		});

		it('should handle timeout', async () => {
			const container = document.createElement('div');
			document.body.appendChild(container);

			// 不添加元素，应该超时
			const result = await waitFind('.test', {by: container, timeout: 0.1});
			expect(result!.length).toBe(0);
		});

		it('should throw error on timeout when throwError is true', async () => {
			const container = document.createElement('div');
			document.body.appendChild(container);

			// 不添加元素，应该抛出错误
			await expect(waitFind('.test', {by: container, timeout: 0.1, throwError: true})).rejects.toThrow();
		});

		it('should respect minFindCount', async () => {
			const container = document.createElement('div');
			document.body.appendChild(container);

			// 延迟添加两个元素
			setTimeout(() => {
				const element1 = document.createElement('div');
				element1.className = 'test';
				container.appendChild(element1);

				const element2 = document.createElement('div');
				element2.className = 'test';
				container.appendChild(element2);
			}, 100);

			const result = await waitFind('.test', {by: container, timeout: 1, minFindCount: 2});
			expect(result!.length).toBe(2);
		});
	});
});
