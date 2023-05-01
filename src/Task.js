export default class Task {
  constructor(name, dateDue, prio = '2', isDone = false, note = '') {
    this.mName = name;
    this.mDateDue = dateDue;
    // Prio: 1-highest, 2-medium, 3-low
    this.mPrio = prio;
    this.mIsDone = isDone;
    this.mNote = note;
  }

  get name() {
    return this.mName;
  }

  set name(name) {
    this.mName = name;
  }

  get dateDue() {
    return this.mDateDue;
  }

  set dateDue(dateDue) {
    this.mDateDue = dateDue;
  }

  get prio() {
    return this.mPrio;
  }

  set prio(prio) {
    if (prio < 0 || prio > 3) {
      console.log(`PRIO ${prio} ISN'T VALID`);
      return;
    }
    this.mPrio = prio;
  }

  get isDone() {
    return this.mIsDone;
  }

  set isDone(isDone) {
    this.mIsDone = isDone;
  }

  get note() {
    return this.mNnote;
  }

  set note(note) {
    this.mNnote = note;
  }
}
