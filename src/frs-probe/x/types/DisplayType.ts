// 定义 displayType 的所有可选值
export const DisplayTypes = [
  'Tweet',
  'defaultDisplayType',
  'FocalTweet',
  'MediaGrid',
  'User'
] as const;

// 从数组定义联合类型
export type DisplayType = typeof DisplayTypes[number];
