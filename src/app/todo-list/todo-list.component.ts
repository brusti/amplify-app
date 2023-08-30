import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService, Todo } from '../API.service';

/** Subscription type will be inferred from this library */
import { ZenObservable } from 'zen-observable-ts';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  public createForm: FormGroup;

  /* declare todoList variable */
  public todoList: Array<Todo> = [];
  /** Declare subscription variable */
  private subscription: ZenObservable.Subscription | null = null;

  constructor(private api: APIService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.api.ListTodos().then(event => {
      this.todoList = event.items as Todo[];
    });

    /* subscribe to new todoList being created */
    this.subscription = this.api.OnCreateTodoListener().subscribe(
      (event: any) => {
        const newTodo = event.value.data.onCreateTodo;
        this.todoList = [newTodo, ...this.todoList];
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }

  public onCreate(todo: Todo) {
    console.log(todo);
    this.api
      .CreateTodo(todo)
      .then((event) => {
        console.log('item created!');
        this.createForm.reset();
      })
      .catch((e) => {
        console.log('error creating todo...', e);
      });
  }
}
