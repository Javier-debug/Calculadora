import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { getStateDiffChanges } from '@ngxs/store/src/internal/internals';
import { ICalculator } from '../../interfaces/calculator/calculator.interface';

export interface  IRCalculator {
  results: ICalculator[];
  selectedId: number;
}

export class AddCalAction {
  public static type = '[Calculator] Add';
  constructor(public result: ICalculator) {}
}

export class DeleteCalAction {
  public static type = '[Calculator] Delete';
  constructor(public id: number) {}
}

@Injectable()
@State<IRCalculator>({
  name: 'calState',
  defaults: {
    results: [],
    selectedId: 0
  }
})


export class CalState {
  constructor() {}

  @Selector()
  static getAllUsers(state: IRCalculator) {
    return state.results;
  }

  @Selector()
  static getSelectedUser(state: IRCalculator) {
    let index = state.results.findIndex((user) => user.id === state.selectedId);
    if(index !== -1) {
      return state.results[index]
    }
  }
  
  @Action(AddCalAction)
  add(state: StateContext<IRCalculator>, action: AddCalAction) {
    // Set
    state.setState({ results: [...state.getState().results, action.result], selectedId: action.result.id })
  }

  @Action(DeleteCalAction)
  delete(state: StateContext<IRCalculator>, action: DeleteCalAction) {
    let newState = [...state.getState().results]
    let index = newState.findIndex((user) => user.id === action.id);
    if(index !== -1) {
      newState.splice(index, 1);
      state.setState({ results: newState, selectedId: action.id })
    }
  }
}