// noinspection TypeScriptUnresolvedReference

import { describe, it, expect, beforeEach } from 'vitest';
import { append, appendTo, createEl, filter, find, query } from '../src';

// 测试dom模块的各个功能
describe('dom', () => {
  // 测试前的准备工作
  beforeEach(() => {
    // 清理测试环境
    document.body.innerHTML = '';
  });

  // 测试query功能
  describe('query', () => {
    it('should find elements by selector', () => {
      // 创建测试元素
      const div1 = document.createElement('div');
      div1.className = 'test';
      const div2 = document.createElement('div');
      div2.className = 'test';
      document.body.appendChild(div1);
      document.body.appendChild(div2);

      // 测试query函数
      const result = query('.test');
      expect(result.length).toBe(2);
      expect(result[0]).toBe(div1);
      expect(result[1]).toBe(div2);
    });

    it('should find elements with by parameter', () => {
      // 创建测试元素
      const container = document.createElement('div');
      const div1 = document.createElement('div');
      div1.className = 'test';
      const div2 = document.createElement('div');
      div2.className = 'test';
      container.appendChild(div1);
      document.body.appendChild(container);
      document.body.appendChild(div2);

      // 测试query函数 with by parameter
      const result = query({ selector: '.test', by: container });
      expect(result.length).toBe(1);
      expect(result[0]).toBe(div1);
    });
  });

  // 测试find功能
  describe('find', () => {
    it('should find elements by selector', () => {
      // 创建测试元素
      const div1 = document.createElement('div');
      div1.className = 'test';
      const div2 = document.createElement('div');
      div2.className = 'test';
      document.body.appendChild(div1);
      document.body.appendChild(div2);

      // 测试find函数
      const result = find('.test', document);
      expect(result.length).toBe(2);
      expect(result[0]).toBe(div1);
      expect(result[1]).toBe(div2);
    });

    it('should find elements with by parameter', () => {
      // 创建测试元素
      const container = document.createElement('div');
      const div1 = document.createElement('div');
      div1.className = 'test';
      const div2 = document.createElement('div');
      div2.className = 'test';
      container.appendChild(div1);
      document.body.appendChild(container);
      document.body.appendChild(div2);

      // 测试find函数 with by parameter
      const result = find('.test', container);
      expect(result.length).toBe(1);
      expect(result[0]).toBe(div1);
    });
  });

  // 测试createEl功能
  describe('createEl', () => {
    it('should create element with tag name', () => {
      const elements = createEl('div');
      expect(elements.length).toBe(1);
      expect(elements[0].tagName).toBe('DIV');
    });

    it('should create element with properties', () => {
      const elements = createEl('div', { className: 'test', innerText: 'Hello' });
      expect(elements.length).toBe(1);
      expect(elements[0].className).toBe('test');
      expect(elements[0].innerText).toBe('Hello');
    });

    it('should create element with children', () => {
      const children = createEl('span', { innerText: 'Child' });
      const elements = createEl('div', { children: [children[0]] });
      expect(elements.length).toBe(1);
      expect(elements[0].children.length).toBe(1);
      expect(elements[0].firstChild).toBe(children[0]);
    });
  });

  // 测试append功能
  describe('append', () => {
    it('should append element to target', () => {
      const target = document.createElement('div');
      const element = document.createElement('span');
      document.body.appendChild(target);

      append(element, target);
      expect(target.children.length).toBe(1);
      expect(target.firstChild).toBe(element);
    });

    it('should append multiple elements to target', () => {
      const target = document.createElement('div');
      const element1 = document.createElement('span');
      const element2 = document.createElement('span');
      document.body.appendChild(target);

      append([element1, element2], target);
      expect(target.children.length).toBe(2);
      expect(target.firstChild).toBe(element1);
      expect(target.lastChild).toBe(element2);
    });
  });

  // 测试appendTo功能
  describe('appendTo', () => {
    it('should append element to target', () => {
      const target = document.createElement('div');
      const element = document.createElement('span');
      document.body.appendChild(target);

      appendTo(target, element);
      expect(target.children.length).toBe(1);
      expect(target.firstChild).toBe(element);
    });

    it('should append multiple elements to target', () => {
      const target = document.createElement('div');
      const element1 = document.createElement('span');
      const element2 = document.createElement('span');
      document.body.appendChild(target);

      appendTo(target, [element1, element2]);
      expect(target.children.length).toBe(2);
      expect(target.firstChild).toBe(element1);
      expect(target.lastChild).toBe(element2);
    });
  });

  // 测试filter功能
  describe('filter', () => {
    it('should filter elements by selector', () => {
      const div1 = document.createElement('div');
      div1.className = 'test';
      const div2 = document.createElement('div');
      div2.className = 'other';
      const div3 = document.createElement('div');
      div3.className = 'test';
      document.body.appendChild(div1);
      document.body.appendChild(div2);
      document.body.appendChild(div3);

      const elements = [div1, div2, div3];
      const result = filter('.test', elements);
      expect(result.length).toBe(2);
      expect(result[0]).toBe(div1);
      expect(result[1]).toBe(div3);
    });
  });
});
