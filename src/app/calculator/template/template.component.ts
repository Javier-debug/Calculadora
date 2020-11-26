import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ICalculator } from 'src/app/interfaces/calculator/calculator.interface';
import { AddCalAction } from 'src/app/models/calculator/calculator.redux';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  toCalculate : string;
  actual : ICalculator;
  id: number;
  secondVal: string;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.secondVal = ""
    this.toCalculate = ""
    this.id = 0;
    this.actual = {
      id: 0,
      _id: "a",
      valOne: 0,
      valTwo: 0,
      Result: 0
    }
  }


  addNumber(number: string): void {
    if (this.toCalculate.indexOf('+') == -1 && this.toCalculate.indexOf('-') == -1 && this.toCalculate.indexOf('/') == -1 && this.toCalculate.indexOf('x') == -1) {
      if(number == '.') {
        if(this.toCalculate != "") {
          this.toCalculate = this.toCalculate + number;
        }
      }
      else {
        this.toCalculate = this.toCalculate + number;
      }
    }
    else {
      if(number == '.') {
        if(this.secondVal != "") {
          this.secondVal = + this.secondVal + number;
          this.toCalculate = this.toCalculate + number;
        }
      }
      else {
        this.secondVal = + this.secondVal + number;
        this.toCalculate = this.toCalculate + number;
      }
    }
  }

  addAction(action: string) {
    if(this.toCalculate.indexOf('+') == -1 && this.toCalculate.indexOf('-') == -1 && this.toCalculate.indexOf('/') == -1 && this.toCalculate.indexOf('x') == -1){
      this.actual.valOne= parseInt(this.toCalculate)
      switch(action){
        case '+':
          this.actual.action = '+';
          break;
          case '-':
          this.actual.action = '-';
          break; 
          case '/':
          this.actual.action = '/';
          break;
          case 'x':
          this.actual.action = 'x';
          break;
      }
      this.toCalculate = this.toCalculate + action;
    }
  }

  dropActual(): void {
    this.actual.valOne = 0
    this.actual.valTwo = 0
    this.secondVal = ""
    this.toCalculate = ""
  }

  checkResult() {
    if(this.secondVal != "") {
      this.actual.valTwo = parseInt(this.secondVal);
      this.store.dispatch(new AddCalAction( {
        id: this.id,
        valOne: this.actual.valOne,
        valTwo: this.actual.valTwo,
        action: this.actual.action,
        Result: (this.actual.valOne + this.actual.valTwo)
      }))
      this.id++; 
      this.toCalculate = (this.actual.valOne + this.actual.valTwo) + "";
      this.actual.action = "+";
      this.actual.valOne =  (this.actual.valOne + this.actual.valTwo);
    }
    
  }
}
