// 画面描画の際に実行
$(() => {
  // TODO_LISTの初期値を描画する
  insertTodoList();
});

// TODO_LISTに要素追加(値あり且つEnter)
$('.input_add').on('keydown', (e) => {
  const inputAddTodo = $('.input_add').val();
  if (e.key === 'Enter' && inputAddTodo.length !== 0) {
    const nextTodoId = TODO_LIST.length + 1;
    const todo = {
      id: nextTodoId,
      todo: inputAddTodo,
    };
    // todolistに値追加
    TODO_LIST.push(todo);
    // todolistの再描画
    insertTodoList();
  }
});

// TODO_LISTをhtmlに挿入する
const insertTodoList = () => {
  // todolistを全て削除
  $('ul.list').empty();
  // todolist描画
  TODO_LIST.map((element) => {
    const todo_id = element.id;
    const todo_value = element.todo;
    const insert_todo_element = `
    <li class="todo" data-id=${todo_id}>
      <span class="task">${todo_value}</span>
      <div class="trash_wrapper">
        <div class="trash"></div>
      </div>
    </li>
    `;
    $('ul.list').append(insert_todo_element);
  });
};

// trashマークを押下した際、対象のtodoを削除する
$(document).on('click', '.trash_wrapper', function () {
  const todo = $(this).siblings('.task').text();
  console.log(todo);
  if (confirm(`${todo}を本当に削除していいですか？`)) {
    // 該当のtodoを削除
    $(this).closest('.todo').remove();
  }
});

// 検索機能
$(document).on('input', '.input_search', function () {
  const searchKeyword = $('.input_search').val();

  console.log(TODO_LIST);

  function searchTodoList() {
    return TODO_LIST.filter((element) => {
      const regexp = new RegExp('^' + searchKeyword, 'i');
      return element.todo.match(regexp);
    });
  }

  const showTodoList = searchTodoList();

  $('ul.list').empty();

  showTodoList.map((element) => {
    const todo_id = element.id;
    const todo_value = element.todo;
    const insert_todo_element = `
    <li class="todo" data-id=${todo_id}>
      <span class="task">${todo_value}</span>
      <div class="trash_wrapper">
        <div class="trash"></div>
      </div>
    </li>
    `;
    $('ul.list').append(insert_todo_element);
  });
});

// todolist(初期値)
const TODO_LIST = [
  {
    id: 1,
    todo: 'Todo1',
  },
  {
    id: 2,
    todo: 'Todo2',
  },
];
