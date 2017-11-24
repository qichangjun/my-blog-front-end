import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable}  from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import { MainService } from '../../main/main/main.service';
@Component({
  selector: 'app-label-input',
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.css']
})
export class LabelInputComponent implements OnInit {
  labelInput : string;  
  options : Array<any> = ['a','b','c'];
  searchControl = new FormControl();
  @Output() addLabel = new EventEmitter<any>();
  @Input() chips : Array<any>;
  constructor(
    private _MainService : MainService
) {}

  ngOnInit(){      
    this.searchControl.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .subscribe(async (value) => {       
      this.options = value && value.trim() ? await this._MainService.getLabelLists(value.trim()) : []
    });
  }

  async addChip(){
    if (!this.labelInput){
      return
    }
    this.chips.push(this.labelInput)
    this.addLabel.emit({chips : this.chips,labelInput:this.labelInput})
    this.labelInput = ''
    
  }

  deleteChip(i){
    this.chips.splice(i,1)
    this.addLabel.emit({chips : this.chips,labelInput:this.labelInput})
  }
}
