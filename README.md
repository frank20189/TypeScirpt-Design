<!--
 * @Author: liming-pan
 * @Date: 2022-04-25 10:54:46
 * @LastEditors: liming-pan
 * @FilePath: \todo-ts\README.md
-->

# 传统写法
  1. 绑定事件处理函数
    1. 增加项
      每一项的试图 -> 增加到列表
      增加一项{id timestamp ,content :string,completed:false}

    2. 删除项
      将对应项的视图 -> 列表 -> 删除
      根据id值remove

    3. 改变完成状态
      将对应项目的完成状态 -> 是否完成 toggle
      列表数据根据id更改completed

# 面向对象、类的继承，横向切割 
  1. 程序分类
    1. 外层：通过浏览器事件 -> 调用方法 -> 事件处理函数的绑定
    2. 操作数据： addTodo,removeTodo,toggleComplete
    3. 操作DOM，addItem,removeItem,changeComplete
    4. 管理模板：todoView -> 接受参数
