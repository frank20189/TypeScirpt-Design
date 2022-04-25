import { ITodoData } from "../types/todoTypes";
import TodoTemplete from "./TodoTemplate";
import { createElement, findParentNode } from "./util";

/*
 * @Author: liming-pan
 * @Date: 2022-04-25 12:10:36
 * @LastEditors: liming-pan
 * @FilePath: \todo-ts\src\event\TodoDom.ts
 */
class TodoDom extends TodoTemplete {
  private todoWrapper: HTMLElement;

  constructor(todoWrapper: HTMLElement) {
    super();
    this.todoWrapper = todoWrapper;
  }

  protected initList(todoData: ITodoData[]) {
    if (todoData.length) {
      const oFrag: DocumentFragment = document.createDocumentFragment();
      todoData.map((todo: ITodoData) => {
        const oItem: HTMLElement = createElement(
          "div",
          "todo-item",
          this.todoView(todo)
        );
        oFrag.appendChild(oItem);
      });
      this.todoWrapper.appendChild(oFrag);
    }
  }

  protected addItem(todo: ITodoData): void {
    const oItem: HTMLElement = createElement(
      "div",
      "todo-item",
      this.todoView(todo)
    );
    this.todoWrapper.appendChild(oItem);
  }

  protected removeItem(target: HTMLElement) {
    const oParentNode: HTMLElement = findParentNode(target, "todo-item");
    oParentNode.remove();
  }

  protected changeCompleted(target: HTMLElement, completed: boolean) {
    const oParentNode: HTMLElement = findParentNode(target, "todo-item");
    const oContent: HTMLElement = oParentNode.getElementsByTagName("span")[0];

    oContent.style.textDecoration = completed ? "line-through" : "none";
  }
}

export default TodoDom;
