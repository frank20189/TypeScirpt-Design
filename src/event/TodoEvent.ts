import {
  getTodoList,
  removeTodo,
  toggleTodo,
  addTodo,
} from "../service/TodoService";
import { ITodoData } from "../types/todoTypes";
import TodoDom from "./TodoDom";

/*
 * @Author: liming-pan
 * @Date: 2022-04-25 11:19:00
 * @LastEditors: liming-pan
 * @FilePath: \todo-ts\src\event\TodoEvent.ts
 */
class TodoEvent extends TodoDom {
  private todoData: ITodoData[];
  constructor(todoData: ITodoData[], todoWrapper: HTMLElement) {
    super(todoWrapper);
    this.todoData = todoData;
    this.init(this.todoData);
  }

  /**
   * 通过装饰器模式增加方法
   * @param todoData 通过装饰器模式传递获取后端接口传递数据
   */
  @getTodoList
  private init(todoData: ITodoData[]) {
    this.todoData = todoData;
    this.initList(this.todoData);
  }

  /**
   * 添加代办事件
   * @param todo 传递参数，todo需要添加的代办事件
   * @returns 返回undefined或者数字
   */
  @addTodo
  public addTodo(todo: ITodoData): undefined | number {
    const _todo: null | ITodoData = this.todoData.find((item: ITodoData) => {
      return item.content === todo.content;
    });
    if (!_todo) {
      this.todoData.push(todo);
      this.addItem(todo);
      return;
    }
    return 1001;
  }

  /**
   * 根据id删除todolist中的数据
   * @param id 传入需要删除的id
   */
  @removeTodo
  public removeTodo(target: HTMLElement, id: number): void {
    this.todoData = this.todoData.filter((todo: ITodoData) => {
      return todo.id !== id;
    });
    this.removeItem(target);
  }

  /**
   * 根据id选择已经完成的事件
   * @param id 传入已经完成的id
   */
  @toggleTodo
  public toggleTodo(target: HTMLElement, id: number): void {
    this.todoData = this.todoData.map((todo: ITodoData) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        this.changeCompleted(target, todo.completed);
      }
      return todo;
    });
  }
}
export default TodoEvent;
