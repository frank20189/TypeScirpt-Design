/*
 * @Author: liming-pan
 * @Date: 2022-04-25 15:38:42
 * @LastEditors: liming-pan
 * @FilePath: \todo-ts\server\utils.ts
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { ITodo } from "./typings";
function readFile(path: string): string {
  return readFileSync(resolve(__dirname, path), "utf-8");
}

function writeFile<T>(path: string, data: T): void {
  writeFileSync(resolve(__dirname, path), JSON.stringify(data));
}

export function fileOperation(path: string, fn?: Function): void | string {
  let todoList: ITodo[] = JSON.parse(readFile(path) || "[]");
  if (!fn) {
    return JSON.stringify(todoList);
  }
  todoList = fn(todoList);

  writeFile<ITodo[]>("todo.json", todoList);
}
