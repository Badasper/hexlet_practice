import State from './State';

// ==============================
// CONCRETE Clock STATE
// ==============================

export default class ClockState extends State {
  name = 'clock';
  timeType = 'clockTime';
  clickMode() {
    this.setCurrentState(this.getStates().alarm);
  }
  incrementH() {
    this.context.incrementH(this.timeType);
  }
  incrementM() {
    this.context.incrementM(this.timeType);
  }
  tick() {
    if (this.context.isAlarmTime() && this.context.alarmOn) {
      this.setCurrentState(this.getStates().bell);
    }
  }
}
