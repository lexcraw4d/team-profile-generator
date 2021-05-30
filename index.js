const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const fs = require('fs');
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
				fs.writeFileSync('./dist/team.html', starterHtml(employeeArr), (err) => {
					if (err) throw err;
					console.log('Successfully created team HTML file!');
				});
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
function createHtml() {
	const html = [];

	function mngrHtml(employee) {
		return `    
		<!-- Manager -->
		<div class="col s4 m4 l4 .center-align grey lighten-1">
		<div class="card center-align">
		<div class="blue lighten-2 white-text">
	   <div> <h5>${employee.name}</h5></div>
	   <div><h6>Manager</h6></div>
	   </div>
	   <div>Employee ID: ${employee.id}
	   <div>Phone: 8643631977</div>
	   <div>Email: <a href="mailto:${employee.email}">${employee.email}</a></div>
	   <div>Office number: ${employee.officeNumber}</div>
	  
	   </div>
	</div>
	</div>	
		`;
	}

	function engrHtml(employee) {
		return `<!-- Engineer -->
		
			<div class="col s4 m4 l4 .center-align grey lighten-1">
				<div class="card center-align">
				<div class="blue lighten-2 white-text">
			   <div> <h5>${employee.name}</h5></div>
			   <div><h6>Engineer</h6></div>
			   </div>
			   <div>Employee ID: ${employee.id}
			   <div>Phone: 8643631977</div>
			   <div>Email: <a href="mailto:${employee.email}">${employee.email}</a></div>
			   <div>Github: <a href="https://github.com/${employee.github}">${employee.github}</a></div>
			   </div>
			</div>
			</div>
			</div>
		`;
	}

	function intHtml(employee) {
		return `<!-- Intern -->
		<div class="col s4 m4 l4 .center-align grey lighten-1">
		<div class="card center-align">
		<div class="blue lighten-2 white-text">
	   <div> <h5>${employee.name}</h5></div>
	   <div><h6>Intern</h6></div>
	   </div>
	   <div>Employee ID: ${employee.id}
	   <div>Phone: 8643631977</div>
	   <div>Email: <a href="mailto:${employee.email}">${employee.email}</a></div>
	   <div>School: ${employee.school}</div>
	   </div>
	</div>
	</div>`
	}

	for (i = 0; i < employeeArr.length; i++) {
		let teamMember = employeeArr[i];
		console.log(teamMember)
		if (teamMember.getRole() === 'Manager') {
			html.push(mngrHtml(teamMember));
		} else if (teamMember.getRole() === 'Engineer') {
			html.push(engrHtml(teamMember));
		} else {
			html.push(intHtml(teamMember));
		}
	}
	return html.join('');
}

function starterHtml() {
	return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

    <title>Team Profile</title>
</head>

<body>
    <div class=".center-align"><h2 class=".center-align">Team Generator</h2></div>
	
			<div class="row">
				<!-- START OF TEAM MEMBER CARDS-->
	
				${createHtml()}
				
				<!-- END OF TEAM MEMBER CARDS-->
		
	</body>
	</html>`;
}

//get prompts for roles
//add information and pass as params to class using allInfo
//.then after else if
//push as an obj to [empty arr] var after fx
initializePrompt();
