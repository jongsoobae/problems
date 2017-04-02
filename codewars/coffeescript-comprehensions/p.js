var people = [
  {firstName: 'Bill', lastName: 'Gates'},
  {firstName: 'Steve', lastName: 'Jobs'},
  {firstName: 'Brendan', lastName: 'Eich'},
  {firstName: 'Yukihiro', lastName: 'Matsumoto'},
  {firstName: 'Jeremy', lastName: 'Ashkenas'}
]

function findFirstNames(people, lastNameLength) {
	return people.filter(function (p) {
		return p.lastName.length == lastNameLength;
	}).map(function (p) {
		return p.firstName;
	});
}

console.log(findFirstNames(people, 4));