export default class Statistics {
  start?: number;
  end = -1;

  strokes = 0;
  hits = 0;
  misses = 0;
  words = 0;

  accuracy = 1;
  hitsPerMinute = 0;
  wordsPerMinute = 0;

  _lastCharacter = ''

  constructor(start?: number) {
    this.start = start
  }

  addStroke(character: string, isHit: boolean) {
    if (!this.start) {
      this.start = new Date().getTime() - 100;
    }
    this.end = new Date().getTime();

    const timeInMinutes = Math.max(0, (this.end - this.start)) / (60 * 1000)

    this.strokes++;
    if (character.length > 0) {
      if (isHit) {
        this.hits++;
        if (timeInMinutes > 0) {
          this.hitsPerMinute = this.hits / timeInMinutes;
        }
        if ((character === ' ' && this._lastCharacter !== '.') || character === '.') {
          this.words++;
          this.wordsPerMinute = this.words / timeInMinutes;
        }
      } else {
        this.misses++;
      }
    }

    if (this.strokes > 0) {
      this.accuracy = this.hits / this.strokes;
    }
    this._lastCharacter = character;
  }
}