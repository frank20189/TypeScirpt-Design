/*
 * @Author: liming-pan
 * @Date: 2022-04-25 15:57:27
 * @LastEditors: liming-pan
 * @FilePath: \todo-ts\src\service\TodoService.ts
 */
import $ from "jquery";
import { ITodoData } from "../types/todoTypes";

export function getTodoList(
  target: object,
  methodName: string,
  descripter: PropertyDescriptor
): void {
  const _origin = descripter.value;
  descripter.value = function (todoData: ITodoData) {
    $.get("http://localhost:8080/todoList")
      .then((res: string) => {
        if (!res) {
          return;
        }
        todoData = JSON.parse(res);
      })
      .then(() => {
        _origin.call(this, todoData);
      });
  };
}

export function removeTodo(
  target: object,
  methodName: string,
  descripter: PropertyDescriptor
): void {
  const _origin = descripter.value;

  descripter.value = function (target: HTMLElement, id: number) {
    $.post("http://localhost:8080/remove", { id }).then((res) => {
      _origin.call(this, target, id);
    });
  };
}

export function toggleTodo(
  target: object,
  methodName: string,
  descripter: PropertyDescriptor
): void {
  const _origin = descripter.value;

  descripter.value = function (target: HTMLElement, id: number) {
    $.post("http://localhost:8080/toggle", { id }).then(() => {
      _origin.call(this, target, id);
    });
  };
}

export function addTodo(
  target: object,
  methodName: string,
  descripter: PropertyDescriptor
): void {
  const _origin = descripter.value;

  descripter.value = function (todo: ITodoData) {
    $.post("http://localhost:8080/add", { todo: JSON.stringify(todo) }).then(
      (res) => {
        if (res.statusCode === "100") {
          alert("该项已存在");
          return;
        }
        _origin.call(this, todo);
      }
    );
  };
}
