const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
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
			} else {
				
			}
		});
};
let initializeQuestions = (employeeRole) => {
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
				promptEngineer(allInfo, employeeRole);
			} else if (employeeRole == 'Manager') {
				promptManager(allInfo, employeeRole);
			} else if (employeeRole == 'Intern') {
				promptIntern(allInfo, employeeRole);
			}
		});
};

let promptEngineer = (basicInfo, role) => {
	return inquirer
		.prompt({
			type: 'text',
			name: 'github',
			message: 'What is your Github username?',
		})
		.then(({ github }) => {
			let engineer = new Engineer(basicInfo.name, basicInfo.id, basicInfo.email, github);
			employeeArr.push(engineer);
			initializePrompt();
			// console.table(engineer);
		});
};
let promptManager = (basicInfo, role) => {
	return inquirer
		.prompt({
			type: 'text',
			name: 'office',
			message: 'What is your office number?',
		})
		.then(({ office }) => {
			let manager = new Manager(basicInfo.name, basicInfo.id, basicInfo.email, office);
			// console.table(manager);
			employeeArr.push(manager);
			initializePrompt();
		});
};
let promptIntern = (basicInfo, role) => {
	return inquirer
		.prompt({
			type: 'text',
			name: 'school',
			message: 'What school do you attend?',
		})
		.then(({ school }) => {
			let intern = new Intern(basicInfo.name, basicInfo.id, basicInfo.email, school);
			// console.table(intern);
			employeeArr.push(intern);
			initializePrompt();
		});
};
//get prompts for roles
//add information and pass as params to class using allInfo
//.then after else if
//push as an obj to [empty arr] var after fx
initializePrompt();
