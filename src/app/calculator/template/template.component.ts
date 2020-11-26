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
      this.actual.valOne= parseFloat(this.toCalculate)
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
      var result = 0;
      this.actual.valTwo = parseFloat(this.secondVal);
      switch(this.actual.action){
        case '+':
          result = (this.actual.valOne + this.actual.valTwo);
          console.log(result)
          break;
          case '-':
            result = (this.actual.valOne - this.actual.valTwo);
            console.log(result)
          break; 
          case '/':
            result = (this.actual.valOne / this.actual.valTwo);
            console.log(result)
          break;
          case 'x':
            result = (this.actual.valOne * this.actual.valTwo);
            console.log(result)
          break;
      }
      this.store.dispatch(new AddCalAction( {
        id: this.id,
        valOne: this.actual.valOne,
        valTwo: this.actual.valTwo,
        action: this.actual.action,
        Result: result
      }))
      this.id++; 
      this.toCalculate = result + "";
      this.actual.action = "+";
      this.actual.valOne =  result;
      this.actual.valTwo = 0;
      this.secondVal = ""
    }
    
  }

  intToPor(): void {
    if(this.toCalculate != "") {
      console.log(this.actual.valOne)
      if(this.actual.valOne == 0) {
        if(this.toCalculate.indexOf('+') == -1 && this.toCalculate.indexOf('-') == -1 && this.toCalculate.indexOf('/') == -1 && this.toCalculate.indexOf('x') == -1){
          var porcentage = (parseFloat(this.toCalculate)/100);
          this.toCalculate = porcentage + ""
        }
      }
      else {
        
        var porcentage = parseFloat(this.secondVal)/100;
        this.secondVal = porcentage + ""
        this.toCalculate = this.actual.valOne + this.actual.action + porcentage +""
      }
    }
  }
}
