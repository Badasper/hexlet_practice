import State from './State';

// ==============================
// CONCRETE Bell STATE
// ==============================

export default class BellState extends State {
  name = 'bell';
  clickMode() {
    this.setCurrentState(this.getStates().clock);
  }
  tick() {
    this.setCurrentState(this.getStates().clock);
  }
  /* eslint-disable */ 
  incrementH() {
    return false;
  }
  incrementM() {
    return false;
  }
  /* eslint-enable */
}
