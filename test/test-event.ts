// noinspection TypeScriptUnresolvedReference

import {describe, expect, it} from 'vitest';
import {input, on, trigger, un} from '../src';

// 测试event模块的各个功能
describe('event', () => {
  // 测试on功能
  describe('on', () => {
    it('should add event listener', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      let called = false;
      on('click', () => {
        called = true;
      }, { by: element });

      // 触发事件
      element.dispatchEvent(new Event('click'));
      expect(called).toBe(true);

      document.body.removeChild(element);
    });

    it('should add multiple event listeners', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      let clickCalled = false;
      let mouseoverCalled = false;

      on(['click', 'mouseover'], (event) => {
        if (event.type === 'click') clickCalled = true;
        if (event.type === 'mouseover') mouseoverCalled = true;
      }, { by: element });

      // 触发事件
      element.dispatchEvent(new Event('click'));
      element.dispatchEvent(new Event('mouseover'));
      expect(clickCalled).toBe(true);
      expect(mouseoverCalled).toBe(true);

      document.body.removeChild(element);
    });

    it('should add event listeners with object syntax', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      let clickCalled = false;
      let mouseoverCalled = false;

      on({
        click: () => clickCalled = true,
        mouseover: () => mouseoverCalled = true
      }, { by: element });

      // 触发事件
      element.dispatchEvent(new Event('click'));
      element.dispatchEvent(new Event('mouseover'));
      expect(clickCalled).toBe(true);
      expect(mouseoverCalled).toBe(true);

      document.body.removeChild(element);
    });
  });

  // 测试un功能
  describe('un', () => {
    it('should remove event listener', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      let called = false;
      const listener = () => {
        called = true;
      };

      on('click', listener, { by: element });
      un('click', listener, element);

      // 触发事件
      element.dispatchEvent(new Event('click'));
      expect(called).toBe(false);

      document.body.removeChild(element);
    });
  });

  // 测试trigger功能
  describe('trigger', () => {
    it('should trigger event', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      let called = false;
      on('customEvent', () => {
        called = true;
      }, { by: element });

      // 触发事件
      trigger<CustomEventInit>('customEvent', { by: element, detail: { message: 'Hello' } });
      expect(called).toBe(true);

      document.body.removeChild(element);
    });

    it('should trigger event with data', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      let eventData: any = null;
      on('customEvent', (event: any) => {
        eventData = event.detail;
      }, { by: element });

      // 触发事件
      trigger<CustomEventInit>('customEvent', { by: element, detail: { message: 'Hello' } });
      expect(eventData.message).toBe('Hello');

      document.body.removeChild(element);
    });
  });

  // 测试input功能
  describe('input', () => {
    it('should set input value and trigger input event', () => {
      const inputElement = document.createElement('input');
      document.body.appendChild(inputElement);

      let called = false;
      on('input', () => {
        called = true;
      }, { by: inputElement });

      // 设置输入值
      input({ data: 'test', by: inputElement });
      expect(inputElement.value).toBe('test');
      expect(called).toBe(true);

      document.body.removeChild(inputElement);
    });

    it('should append input value', () => {
      const inputElement = document.createElement('input');
      inputElement.value = 'Hello';
      document.body.appendChild(inputElement);

      // 追加输入值
      input({ data: ' World', append: false, by: inputElement });
      expect(inputElement.value).toBe(' World');

      document.body.removeChild(inputElement);
    });
  });


});
