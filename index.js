class Musician {
  static count = 0;

  #name;
  #instrument;

  constructor(name, instrument) {
    this.#name = name;

    this.#instrument = instrument;

    Musician.count++;
  }

  get name() {
    return this.#name;
  }

  get instrument() {
    return this.#instrument;
  }

  set name(newName) {
    this.#name = newName;
  }

  set instrument(newInstrument) {
    this.#instrument = newInstrument;
  }

  play() {
    console.log(`${this.#name} грає на ${this.#instrument}`);
  }
}

class Guitarist extends Musician {
  #band;

  constructor(name, instrument, band) {
    super(name, instrument);

    this.#band = band;
  }

  get band() {
    return this.#band;
  }

  set band(newBand) {
    this.#band = newBand;
  }

  joinBand(band) {
    this.#band = band;
  }

  play() {
    console.log(
      `${super.name} грає на ${super.instrument} в групі ${this.#band}`
    );
  }
}

class Bassist extends Musician {
  #band;

  constructor(name, instrument, band) {
    super(name, instrument);

    this.#band = band;
  }

  get band() {
    return this.#band;
  }

  set band(newBand) {
    this.#band = newBand;
  }

  joinBand(band) {
    this.#band = band;
  }

  play() {
    console.log(
      `${this.name} грає на ${this.instrument} в групі ${this.#band}`
    );
  }
}

Object.defineProperty(Musician.prototype, "band", {
  set: function (newBand) {
    this.band = newBand;
  },
});

class Band {
  #name;
  #members;

  constructor(name, members) {
    this.#name = name;
    this.#members = members;
  }

  get name() {
    return this.#name;
  }

  get members() {
    return this.#members;
  }

  set name(newName) {
    this.#name = newName;
  }

  addMember(newMember) {
    if (Musician.prototype.isPrototypeOf(newMember)) {
      newMember.band = this.#name;

      this.#members.push(newMember);
    } else {
      console.log("Новий учасник має бути екземпляром класу Musician");
    }
  }

  playMusic() {
    this.#members.forEach((member) => member.play());
  }
}

class Performance {
  #band;
  #location;
  #date;

  constructor(band, location, date) {
    this.#band = band;
    this.#location = location;
    this.#date = date;
  }

  get band() {
    return this.#band;
  }

  get location() {
    return this.#location;
  }

  get date() {
    return this.#date;
  }

  info() {
    console.log(
      `Гурт ${this.#band.name} виступить в ${
        this.#location
      } ${this.#date.toLocaleDateString()}`
    );
  }
}

class Concert extends Performance {
  #ticketPrice;

  constructor(band, location, date, ticketPrice) {
    super(band, location, date);
    this.#ticketPrice = ticketPrice;
  }

  get ticketPrice() {
    return this.#ticketPrice;
  }

  set ticketPrice(newPrice) {
    if (typeof newPrice === "number" && newPrice > 0) {
      this.#ticketPrice = newPrice;
    } else {
      console.error("Невірна ціна квитка");
    }
  }

  info() {
    console.log(
      `Гурт ${this.band.name} виступить в ${
        this.location
      } ${this.date.toLocaleDateString()}, ціна квитка ${this.#ticketPrice}`
    );
  }
}

class Vocalist {
  #name;
  #band;

  constructor(name, band) {
    this.#name = name;
    this.#band = band;
  }

  get name() {
    return this.#name;
  }

  get band() {
    return this.#band;
  }

  set name(newName) {
    if (typeof newName === "string" && newName.length > 0) {
      this.#name = newName;
    } else {
      console.error("Невірне ім'я вокаліста");
    }
  }

  set band(newBand) {
    if (typeof newBand === "string" && newBand.length > 0) {
      this.#band = newBand;
    } else {
      console.error("Невірна назва гурту");
    }
  }

  info() {
    console.log(`Вокаліст ${this.name} є членом гурту ${this.band}`);
  }
}

class SongWriter {
  #songs;

  constructor(songs) {
    if (Array.isArray(songs)) {
      this.#songs = songs;
    } else {
      console.error("Невірний список пісень");
    }
  }

  get songs() {
    return this.#songs;
  }

  addSong(song) {
    if (typeof song === "string" && song.length > 0) {
      this.#songs.push(song);
    } else {
      console.error("Невірна пісня");
    }
  }

  info() {
    console.log(`Написав ${this.songs.length} пісень`);
  }
}

class LeadSinger extends Vocalist {
  #songs;
  constructor(name, band) {
    super(name, band);

    this.#songs = [];
  }

  get songs() {
    return this.#songs;
  }

  writeSong(song) {
    if (typeof song === "string" && song.length > 0) {
      this.#songs.push(song);
    } else {
      console.error("Невірна пісня");
    }
  }

  info() {
    console.log(
      `Лідер гурту ${this.name} є членом гурту ${this.band} і написав ${this.songs.length} пісень`
    );
  }
}

let musician = new Musician("John", "Guitarist");

let guitarist = new Guitarist("Jimmy Page", "гітара", "Led Zeppelin");

let bassist = new Bassist("Paul McCartney", "бас-гітара", "The Beatles");

let band = new Band("The Beatles", [bassist]);

band.addMember(guitarist);

let vocalist = new Vocalist("Freddie Mercury", "Queen");

let songwriter = new SongWriter(["Yesterday", "Hey Jude", "Let It Be"]);

let performance = new Performance(band, "Liverpool", new Date("2023-08-01"));

Object.assign(LeadSinger.prototype, songwriter);

let concert = new Concert(band, "BBC studios", new Date("1994-07-06"), 100);

let leadsinger = new LeadSinger("Mick Jagger", "The Rolling Stones");

musician.play();
guitarist.play();
bassist.play();
band.playMusic();
performance.info();
concert.info();
vocalist.info();
songwriter.info();
leadsinger.info();
