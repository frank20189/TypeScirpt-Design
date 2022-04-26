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

  /**
   * 完成初始化渲染数据，只对Dom进行操作
   * @param todoData 传入对应的todoData做数据渲染页面，操作DOM元素
   */
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

  /**
   * 用于添加一条todo，只对Dom进行操作
   * @param todo 传递添加项目todo，添加渲染数据
   */
  protected addItem(todo: ITodoData): void {
    const oItem: HTMLElement = createElement(
      "div",
      "todo-item",
      this.todoView(todo)
    );
    this.todoWrapper.appendChild(oItem);
  }

  /**
   * 将需要删除的，从Dom元素中移除
   * @param target 传入需要删除的target目标
   */
  protected removeItem(target: HTMLElement) {
    const oParentNode: HTMLElement = findParentNode(target, "todo-item");
    oParentNode.remove();
  }

  /**
   * 修改todo样式
   * @param target 传入需要修改状态的目标元素
   * @param completed 根据状态，修改Dom元素样式
   */
  protected changeCompleted(target: HTMLElement, completed: boolean) {
    const oParentNode: HTMLElement = findParentNode(target, "todo-item");
    const oContent: HTMLElement = oParentNode.getElementsByTagName("span")[0];

    oContent.style.textDecoration = completed ? "line-through" : "none";
  }
}

export default TodoDom;
