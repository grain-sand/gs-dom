export type DomEl = HTMLElement | HTMLInputElement;

export type ElOrArr = DomEl | DomEl[];

export type DomOrEl = DomEl | Document;

export type DomElOrArr = DomOrEl | DomOrEl[];

export type WinOrDom = DomOrEl | Window;

export type WinOrDomOrArr = WinOrDom | WinOrDom[];
