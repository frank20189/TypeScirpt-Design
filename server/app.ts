/*
 * @Author: liming-pan
 * @Date: 2022-04-25 13:21:51
 * @LastEditors: liming-pan
 * @FilePath: \todo-ts\server\app.ts
 */
import express, { Application } from "express";
import { ITodo } from "./typings";
import { fileOperation } from "./utils";
import bodyParse from "body-parser";

const app: Application = express();

// 配置post方法传递参数的类型
app.use(bodyParse.urlencoded({ extended: true }));
// 解析json格式
app.use(bodyParse.json());

// 配置跨域
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-methods", "POST,GET,PUT,DELETE,OPTIONS");
  next();
});

app.get("/todoList", function (req, res) {
  const todoList: string = fileOperation("todo.json") as string;
  res.send(todoList);
});

app.post("/toggle", function (req, res) {
  const id: number = parseInt(req.body.id);

  fileOperation("todo.json", function (todoList: ITodo[]) {
    return todoList.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
  });

  res.send({
    msg: "ok",
    statusCode: "200",
  });
});

app.post("/remove", function (req, res) {
  const id = parseInt(req.body.id);
  fileOperation("todo.json", function (todoList: ITodo[]) {
    return todoList.filter((todo) => todo.id !== id);
  });

  res.send({
    msg: "ok",
    statusCode: "200",
  });
});

app.post("/add", function (req, res) {
  const todo: ITodo = JSON.parse(req.body.todo);

  fileOperation("todo.json", function (todoList: ITodo[]) {
    const isExist = todoList.find((t: ITodo) => t.content === todo.content);

    if (isExist) {
      res.send({
        msg: "存在",
        statusCode: "100",
      });
    } else {
      todoList.push(todo);
      res.send({
        msg: "ok",
        statusCode: "200",
      });
    }
    return todoList;
  });
});

app.listen(8080, function () {
  console.log("welcome to EXPRESS");
  console.log("8080被监听了...");
});
