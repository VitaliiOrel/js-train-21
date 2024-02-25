class Musician {
  static count = 0;
  #name;
  #instrument;
  // статичне поле count, яке відслідковує кількість музикантів, початкове значення 0
  // Об'являємо приватні поля #name; #instrument;

  constructor(name, instrument) {
    this.#name = name;
    this.#instrument = instrument;
    this.count++;
    // Конструктор приймає два параметри: name та instrument
    // присвоєння вхідного значення name до приватного поля #name
    // присвоєння вхідного значення instrument до приватного поля #instrument
    // збільшення значення статичного поля на 1
  }

  get name() {
    return this.#name
    // гетер для приватного поля #name
    // повертає значення приватного поля #name
  }

  get instrument() {
    return this.#instrument
    // гетер для приватного поля #instrument
    // повертає значення приватного поля #instrument
  }

  set name(newName) {
    this.#name = newName
    // сетер для приватного поля #name
    // присвоює нове значення приватному полю #name
  }

  set instrument(newInstrument) {
    this.#instrument = newInstrument
    // сетер для приватного поля #instrument
    // присвоює нове значення приватному полю #instrument
  }

  play() {
    console.log(`${this.#name} грає на ${this.#instrument}`)
    // метод, що виводить рядок в консоль <#name> грає на <#instrument>
  }
}


class Guitarist extends Musician {
  #band;// Об'являємо приватні поля #band;

  constructor(name, instrument, band) {// Конструктор приймає три параметри: name, instrument та band
  super(name, instrument);// виклик конструктора батьківського класу super з двома параметрами name, instrument
  this.#band = band// присвоєння вхідного значення band до приватного поля #band
  }

  get band() {// гетер для приватного поля #band
    return this.#band// повертає значення приватного поля #band
  }

  set band(newBand) {// сетер для приватного поля #band
   this.#band = newBand// присвоює нове значення приватному полю #band
  }

  joinBand(newBand) {// метод joinBand, що змінює значення #band, this.#band = band
    this.#band = newBand
  }

  play() {
    console.log(`${super.name} грає на ${super.instrument} в групі ${this.#band}`)// перевизначений метод play(), що виводить рядок в консоль ${super.name} грає на ${super.instrument} в групі ${this.#band}
  }
}

class Bassist extends Musician {
  #band;// Об'являємо приватні поля  #band;
  constructor(name, instrument, band) {// Конструктор приймає три параметри: name, instrument та band
  super(name, instrument);// виклик конструктора батьківського класу super з двома параметрами name, instrument
  this.#band = band;// присвоєння вхідного значення band до приватного поля #band
  }
  get band() {// гетер для приватного поля #band
  return this.#band// повертає значення приватного поля #band
  }

  set band(newBand) {// сетер для приватного поля #band
   this.#band = newBand// присвоює нове значення приватному полю #band
  }

  joinBand(newBand) {// метод joinBand, що змінює значення #band,this.#band = band
    this.#band = newBand
  }
  
  play() {
  console.log(`${super.name} грає на ${super.instrument} в групі ${this.#band}`)// перевизначений метод play(), що виводить рядок в консоль ${super.name} грає на ${super.instrument} в групі ${this.#band}
  }
}

Object.defineProperty(Musician.prototype, 'band', {
  set: function(newBand) {
    this._band = newBand;
  }
})

class Band {
  #name; 
  #members;
  // Об'являємо приватні поля #name; #members;
  constructor(name, members) {
    this.#name = name;
    this.#members = members;
  }
  /*
   * Створюємо конструктор з двома вхідними параметрами: #name і #members
   * #members - це масив об'єктів, що є екземплярами класу Musician або його нащадків
   */
  get name() {
  return this.#name// Створюємо getter для #name, що повертає приватну властивість #name
  }

  get members() {
  return this.#members// Створюємо getter для #members, що повертає приватну властивість #members
  }

  set name(newName) {
   this.#name = newName// Створюємо сетер для #name
  }

  addMember(newMember) {
    this.#members.push(newMember)
    if (newMember instanceof Musician) {
      this.#members.push(newMember);
      Musician.band(this.name);
    } else {
      console.log("Новий учасник повинен бути екземпляром класу Musician")
    }
  }
  // Створюємо метод addMember(), що додає нового учасника до гурту
  // Перевіряємо чи Musician є прототипом newMember
  // Ось тут ми використовуємо сетер band класу Musician
  // До приватного поля #members яке є масивом додаємо мового музиканта
  // Якщо ні виводимо в консоль повідомлення Новий учасник повинен бути екземпляром класу Musician
  playMusic() {
    this.#members.forEach(member => member.play())  
  }
  // Створюємо метод playMusic(), за допомогою forEach перебираємо масив і викликаємо метод play() для кожного учасника гурту
}


const musician = new Musician("John", "Guitarist")
const guitarist = new Guitarist("Jimmy Page", "гітара", "Led Zeppelin")
const bassist = new Bassist("Paul McCartney", "бас-гітара", "The Beatles")
const band = new Band("The Beatles", [bassist])// Створення band екземпляру класу Band

const performance = new Performance(band, "Liverpool", new Date('2023-08-01'))// Створення performance екземпляра класу Performance

musician.play();
guitarist.play()
bassist.play()
band.playMusic()
performance.info()