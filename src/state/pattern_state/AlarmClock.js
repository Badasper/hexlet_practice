import ClockState from './ClockState';
import AlarmState from './AlarmState';
import BellState from './BellState';

class AlarmClock {
  clockTime = { hours: 12, minutes: 0 };
  alarmTime = { hours: 6, minutes: 0 };
  alarmOn = false;
  states = {
    clock: new ClockState(this),
    alarm: new AlarmState(this),
    bell: new BellState(this),
  };

  constructor() {
    this.currentState = this.states.clock;
  }
  clickMode() {
    this.currentState.clickMode();
  }
  longClickMode() {
    this.alarmOn = !this.alarmOn;
  }
  clickH() {
    this.currentState.incrementH();
  }
  clickM() {
    this.currentState.incrementM();
  }
  tick() {
    this.incrementM('clockTime');
    if (this.clockTime.minutes === 0) {
      this.incrementH('clockTime');
    }
    this.currentState.tick();
  }
  isAlarmOn() {
    return this.alarmOn;
  }
  isAlarmTime() {
    return this.clockTime.minutes === this.alarmTime.minutes &&
           this.clockTime.hours === this.alarmTime.hours;
  }
  minutes() {
    return this.clockTime.minutes;
  }
  hours() {
    return this.clockTime.hours;
  }
  alarmMinutes() {
    return this.alarmTime.minutes;
  }
  alarmHours() {
    return this.alarmTime.hours;
  }
  getCurrentMode() {
    return this.currentState.getModeName();
  }
  incrementM(typeTime) {
    const data = this[typeTime];
    data.minutes = (data.minutes + 1) % 60;
  }
  incrementH(typeTime) {
    const data = this[typeTime];
    data.hours = (data.hours + 1) % 24;
  }
}

export default AlarmClock;
