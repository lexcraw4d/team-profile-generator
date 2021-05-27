const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
// let gitHub = github();
let employeeArr = [];

const initializePrompt = () => {
	return inquirer
		.prompt([
			{
				type: 'checkbox',
				name: 'employeeType',
				message: 'Which team of employee would you like to add?',
				choices: ['Engineer', 'Intern', 'Manager', 'None to add, my team is complete!'],
			},
		])
		.then((response) => {
			if (response.employeeType != 'None to add, my team is complete!') {
				initializeQuestions(response.employeeType);
				// console.log(response);
			} else {
				//write html file here
			}
		});
};
const initializeQuestions = (employeeRole) => {
	console.log('<------ Adding new employee ------>');

	return inquirer
		.prompt([
			{
				type: 'text',
				name: 'name',
				message: 'What is your name?',
			},
			{
				type: 'number',
				name: 'id',
				message: 'What is your id?',
				//validate later here
			},
			{
				type: 'text',
				name: 'email',
				message: 'What is your email address?',
			},
		])
		.then((allInfo) => {
			if (employeeRole == 'Engineer') {
			return inquirer
					.prompt({
						type: 'text',
						name: 'github',
						message: 'What is your Github username?',
					})
				}
				else if (employeeRole == 'Manager') {
					return inquirer
					.prompt({
						type: 'text',
						name: 'office',
						message: 'What is your office number?',
					})
				} 
				else if (employeeRole == 'Intern') {
					return inquirer
					.prompt({
						type: 'text',
						name: 'school',
						message: 'What school do you attend?',
					})
				}
			});
		
		};



//get prompts for roles
//add information and pass as params to class using allInfo
//.then after else if
//push as an obj to [empty arr] var after fx
initializePrompt();
