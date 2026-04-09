// noinspection TypeScriptUnresolvedReference

import { describe, it, expect, beforeEach } from 'vitest';
import { gdom, $, addProxyFn } from '../src';

// 测试gdom模块的各个功能
describe('gdom', () => {
  beforeEach(() => {
    // 清理测试环境
    document.body.innerHTML = '';
  });

  // 测试gdom选择器功能
  describe('selector', () => {
    it('should select elements by selector', () => {
      const container = document.createElement('div');
      const el1 = document.createElement('div');
      el1.className = 'test';
      const el2 = document.createElement('div');
      el2.className = 'test';
      container.appendChild(el1);
      container.appendChild(el2);
      document.body.appendChild(container);

      const result = gdom('.test');
      expect(result.length).toBe(2);
    });

    it('should select single element by id', () => {
      const element = document.createElement('div');
      element.id = 'test';
      document.body.appendChild(element);

      const result = gdom('#test');
      expect(result.length).toBe(1);
    });

    it('should return document when no selector provided', () => {
      const result = gdom();
      expect((result as any)[0]).toBe(document);
    });

    it('should handle DOMContentLoaded', () => {
      let called = false;
      gdom(() => {
        called = true;
      });
      // 模拟DOMContentLoaded事件
      document.dispatchEvent(new Event('DOMContentLoaded'));
      expect(called).toBe(true);
    });

    it('should create element from tag string', () => {
      const result = gdom('<div>');
      expect(result.length).toBe(1);
      expect((result[0] as HTMLElement).tagName).toBe('DIV');
    });

    it('should create element with props', () => {
      const result = gdom('<div>', {
        id: 'test',
        class: 'test-class'
      });
      expect(result.length).toBe(1);
      expect((result[0] as HTMLElement).id).toBe('test');
      expect((result[0] as HTMLElement).className).toBe('test-class');
    });
  });

  // 测试gdom代理方法
  describe('proxy methods', () => {
    it('should have query method', () => {
      const container = document.createElement('div');
      const el1 = document.createElement('div');
      el1.className = 'test';
      const el2 = document.createElement('div');
      el2.className = 'test';
      container.appendChild(el1);
      container.appendChild(el2);
      document.body.appendChild(container);

      const result = gdom(container).query('.test');
      expect(result.length).toBe(2);
    });

    it('should have on method', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      let called = false;
      gdom(element).on('click', () => {
        called = true;
      });

      // 触发事件
      element.dispatchEvent(new Event('click'));
      expect(called).toBe(true);
    });

    it('should have trigger method', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      let called = false;
      gdom(element).on('customEvent', () => {
        called = true;
      });

      // 触发事件
      gdom(element).trigger('customEvent');
      expect(called).toBe(true);
    });

    it('should have append method', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');
      document.body.appendChild(parent);

      gdom(parent).append(child);
      expect(parent.contains(child)).toBe(true);
    });

    it('should have appendTo method', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');
      document.body.appendChild(parent);

      gdom(child).appendTo(parent);
      expect(parent.contains(child)).toBe(true);
    });

    it('should have filter method', () => {
      const container = document.createElement('div');
      const el1 = document.createElement('div');
      el1.className = 'test';
      const el2 = document.createElement('div');
      container.appendChild(el1);
      container.appendChild(el2);
      document.body.appendChild(container);

      const result = gdom(container).filter('.test');
      expect(result.length).toBe(1);
    });

    it('should have createEl method', () => {
      const result = (gdom() as any).createEl('div', { id: 'test' });
      expect(result.length).toBe(1);
      expect((result[0] as HTMLElement).id).toBe('test');
    });

    it('should have input method', () => {
      const inputElement = document.createElement('input');
      document.body.appendChild(inputElement);

      gdom(inputElement).input('test');
      expect(inputElement.value).toBe('test');
    });
  });

  // 测试$ alias
  describe('$ alias', () => {
    it('should work as alias for gdom', () => {
      const element = document.createElement('div');
      element.id = 'test';
      document.body.appendChild(element);

      const result = $('#test');
      expect(result.length).toBe(1);
    });
  });

  // 测试addProxyFn功能
  describe('addProxyFn', () => {
    it('should add custom proxy method', () => {
      // 添加自定义代理方法
      addProxyFn('customMethod', (by) => {
        return () => {
          return by.length;
        };
      });

      const elements = [document.createElement('div'), document.createElement('div')];
      const result = (gdom(elements) as any).customMethod();
      expect(result).toBe(2);
    });
  });
});
