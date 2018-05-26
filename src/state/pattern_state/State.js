// ==============================
// ABSTRACT STATE
// ==============================

export default class State {
  name = 'abstract';
  constructor(context) {
    this.context = context;
  }
  setCurrentState(state) {
    this.context.currentState = state;
  }

  getStates() {
    return this.context.states;
  }
  getModeName() {
    return this.name;
  }
}
