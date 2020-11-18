import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Output() todoDelete = new EventEmitter<{index:number}>();
  
  toDoForm: FormGroup

  task = [{desc:"Homework", priority:"High", due:"1999-07-21", iscomplete: true,canEdit: false}];


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.toDoForm = this.fb.group({
      desc: this.fb.control('',[Validators.required]),
      priority: this.fb.control('',[Validators.required]),
      due: this.fb.control('',[Validators.required]),
    })
  }

  onTodoComplete(index){
    this.task[index].iscomplete=true;
  }

  onTodoDelete(index){
    this.task.splice(index,1);
  }

  processForm(){
    const toDo = this.toDoForm.value
    // console.log(toDo);
    console.log(toDo.desc);
    for(let i=0;i<this.task.length;i++){
      // if(toDo.desc==this.task[i].desc)
      if(toDo.due<this.task[i].due){
        alert("You cannot add a task with due date that in the past");
        return;
      }
    }

    this.task.push({
      desc:toDo.desc,
      priority:toDo.priority,
      due: toDo.due,
      iscomplete: false,
      canEdit: false,
    })

    console.log(this.task);
    
  }

}
