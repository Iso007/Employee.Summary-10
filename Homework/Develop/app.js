/*
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
*/

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []


function generatePage() {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath,render(teamMembers, "utf8"))
}


function buildTeam() {

    inquirer

        .prompt([
            {
                type: "list",
                name: "role",
                message: "What is the team member's role?",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "No more employees"
                ]
            }

        ])
        
        .then(response => {
            
            switch (response.role) {
                
                case "Manager":
                    addManager();
                    break;

                case "Engineer":
                    addEngineer();
                    break;

                case "Intern":
                    addIntern();
                    break;

                case "No more employees":
                    render(teamMembers);
                    generatePage();
                    break

            }
        })

    function addManager() {

        inquirer
            
            .prompt([

                {
                    type: "input",
                    name: "name",
                    message: "What is the manager's name?"
                },

                {
                    type: "input",
                    name: "id",
                    message: "What is the manager's employee ID?"
                },

                {
                    type: "input",
                    name: "email",
                    message: "What is your email?"
                },

                {
                    type: "input",
                    name: "officeNumber",
                    message: "What is your office number?"
                }

            ])
            
            .then(response => {

                const manager = new Manager(response.name, response.id, response.email, response.officeNumber)

                teamMembers.push(manager)
                
                console.log(response);
                console.log(teamMembers);

                buildTeam();

            })
    }

    function addEngineer() {
        
        inquirer
            
            .prompt([

                {
                    type: "input",
                    name: "name",
                    message: "What is the engineer's name?"
                },

                {
                    type: "input",
                    name: "id",
                    message: "What is the engineer's employee ID?"
                },

                {
                    type: "input",
                    name: "email",
                    message: "What is the engineer's email?"
                },

                {
                    type: "input",
                    name: "github",
                    message: "What is the engineer's GitHub username?"
                }
            ])
            
            .then(response => {

                const engineer = new Engineer(response.name, response.id, response.email, response.github)

                teamMembers.push(engineer)

                console.log(response);
                console.log(teamMembers);

                buildTeam();

            })
    }

    function addIntern() {

        inquirer
            
            .prompt([

                {
                    type: "input",
                    name: "name",
                    message: "What is the intern's name?"
                },

                {
                    type: "input",
                    name: "id",
                    message: "What is the intern's employee ID?"
                },

                {
                    type: "input",
                    name: "email",
                    message: "What is the intern's email?"
                },

                {
                    type: "input",
                    name: "school",
                    message: "What is the intern's school?"
                }
            ])
            
            .then(response => {

                const intern = new Intern(response.name, response.id, response.email, response.school)

                teamMembers.push(intern)

                console.log(response);
                console.log(teamMembers);

                buildTeam();
            })
    }
}

module.exports = teamMembers

buildTeam();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```