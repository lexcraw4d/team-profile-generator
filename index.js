const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
// let gitHub = github();
const initializePrompt = () => {
	inquirer
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
				console.log(response);
			} else {
				//write html file here
			}
		});
};
const initializeQuestions = (employeeRole) => {
	console.log('<------ Adding new employee ------>');
	inquirer
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
			if (employeeRole === 'Engineer') {
				console.log('Role to be added: Engineer');
				//create Engineer inquirer prompt
				//use allinfo.name allinfo.id etc for initial info
				//inquire prompt additional question for param
				// and add here class fx e.g. Engineer(passInfo)
			} else if (employeeRole === 'Manager') {
				console.log('Role to be added: Manager');
				//mgr prompt inquirer variable here
				// and add here class fx e.g. Manage(passInfo)
			} else if (employeeRole == 'Intern') {
				console.log('Role to be added: Intern');
				//intern prompt inquirer variable here
				// and add here class fx e.g. intern(passInfo)
			}
		});
};

//get prompts for roles
//add information and pass as params to class
//.then after else if
//push as an obj to [empty arr] var after fx class

initializePrompt();
