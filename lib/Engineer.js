const Employee = require('./Employee');
const inquirer = require('inquirer');

class Engineer extends Employee {
	constructor(name, id, email) {
		super(name, id, email);
		this.github = github;
	}
	getGithub() {
		inquirer.prompt([
			{
				type: 'text',
				name: 'github',
				message: 'What is your github?',
			},
		]);
		return this.github;
	}


}
module.exports = Engineer