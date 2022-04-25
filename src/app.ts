/*
 * @Author: liming-pan
 * @Date: 2022-04-25 11:08:13
 * @LastEditors: liming-pan
 * @FilePath: \todo-ts\src\app.ts
 */
import { ITodoData } from "./types/todoTypes";
import TodoEvent from "./event/TodoEvent";
((doc) => {
  const oInput: HTMLInputElement = doc.querySelector("input");
  const oAddBtn: HTMLButtonElement = doc.querySelector("button");
  const oTodoList: HTMLElement = doc.querySelector(".todo-list");

  const todoList: ITodoData[] = [];

  const todoEvent = new TodoEvent(todoList, oTodoList);
  const init = (): void => {
    bindEvent();
  };

  function bindEvent(): void {
    oAddBtn.addEventListener("click", handleAddBtnClick, false);
    oTodoList.addEventListener("click", handleListClick, false);
  }

  function handleAddBtnClick(): void {
    const val: string = oInput.value.trim();

    if (val.length) {
      const ret = todoEvent.addTodo(<ITodoData>{
        id: new Date().getTime(),
        content: val,
        completed: false,
      });
      if (ret && ret === 1001) {
        alert("列表已存在");
        return;
      }

      oInput.value = "";
    }
  }

  function handleListClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    console.log(target);
    const tagName = target.tagName.toLowerCase();
    if (tagName === "input" || tagName === "button") {
      const id = parseInt(target.dataset.id);
      switch (tagName) {
        case "input":
          todoEvent.toggleTodo(target, id);
          break;
        case "button":
          todoEvent.removeTodo(target, id);
          break;
        default:
          break;
      }
    }
  }

  init();
})(document);
