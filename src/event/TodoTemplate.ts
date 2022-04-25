import { ITodoData } from "../types/todoTypes";

/*
 * @Author: liming-pan
 * @Date: 2022-04-25 12:14:28
 * @LastEditors: liming-pan
 * @FilePath: \todo-ts\src\event\TodoTemplate.ts
 */
class TodoTemplete {
  protected todoView({ id, content, completed }: ITodoData): string {
    return `
      <input type="checkbox" ${completed ? "checked" : ""} data-id = "${id}"> 
      <span style="text-decoration:${
        completed ? "line-through" : "none"
      }">${content}</span>

      <button data-id=${id}>删除</button>
      `;
  }
}
export default TodoTemplete;
