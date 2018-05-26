import State from './State';

// ==============================
// CONCRETE Alarm STATE
// ==============================

export default class AlarmState extends State {
  name = 'alarm';
  timeType = 'alarmTime';
  clickMode() {
    this.setCurrentState(this.getStates().clock);
  }

  incrementH() {
    this.context.incrementH(this.timeType);
  }
  incrementM() {
    this.context.incrementM(this.timeType);
  }
  tick() {
    if (this.context.isAlarmTime()) {
      this.setCurrentState(this.getStates().bell);
    }
  }
}
