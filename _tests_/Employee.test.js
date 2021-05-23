const Employee = require('../lib/Employee');

// jest.mock('../lib/Employee')

test('Get employee information based off inquirer prompts', () =>{
    const employee = new Employee('');


    const email = "lexc2007@gmail.com"
    expect(employee.name).toBe('');
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toBe(email);
    expect(employee.role).toBe('Employee');

})