/*
 * @Author: liming-pan
 * @Date: 2022-04-25 12:23:23
 * @LastEditors: liming-pan
 * @FilePath: \todo-ts\src\event\util.ts
 */
export function findParentNode(
  target: HTMLElement,
  className: string
): HTMLElement {
  while ((target = target.parentNode as HTMLElement)) {
    if (target.className === className) {
      return target;
    }
  }
}

export function createElement(
  tagName: string,
  className: string,
  todoItem: string
): HTMLElement {
  const oItem: HTMLElement = document.createElement(tagName);
  oItem.className = className;
  oItem.innerHTML = todoItem;
  return oItem;
}
