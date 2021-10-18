class User {
	constructor(name, lastname) {
		this.name = name;
		this.lastname = lastname;
		this.books = [];
		this.pets = [];
	}

	getFullName() {
		return `${this.lastname} ${this.name}`;
	}
	addPet(pet) {
		this.pets.push(pet);
	}

	countPets() {
		return this.pets.length;
	}
	addBook(nameBook, autorBook) {
		this.books.push({name: nameBook, autor: autorBook});
	}

	getBookNames() {
		let arr = this.books.map((book) => book.name);
		return arr;
	}
	getBooks() {
		return this.books;
	}
}

const andres = new User("andres", "fernandez");
const fnAndres = andres.getFullName();
console.log(fnAndres);

andres.addPet("bob");
andres.addPet("teo");
andres.addPet("eros");
const totalPets = andres.countPets();
console.log(totalPets);

andres.addBook("Don Quijote", "M. de Cervantes");
andres.addBook("El arte de la Guerra", "Sun Tzu");

const bookNames = andres.getBookNames();
console.log(bookNames);
