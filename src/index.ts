import { prompt } from 'inquirer';
import MathPrompter from "./MathPrompter";

const clear = require('clear');

async function mainMenu() {
    const answer = await prompt({
        name: 'action',
        message: 'What you want to count?',
        type: 'list',
        choices: [
            {name: '1) Order of an Element of a Group', value: MathPrompter.printElementsOrder},
            {name: '2) Primitive Roots of a Group', value: MathPrompter.printPrimitiveRoots},
            {name: '3) Inverse Elements of a Group', value: MathPrompter.printInverseElements},
            {name: '4) Lucas Test', value: MathPrompter.printLucasTestResult},
            {name: 'Exit', value: () => process.exit(0)},
        ],
    });
    await answer.action()
}

(async () => {
    clear();
    while (true) await mainMenu();
})();
