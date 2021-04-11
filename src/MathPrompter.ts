import { prompt } from 'inquirer';
import MathLogic from "./MathLogic";

export default class MathPrompter {
    public static async printElementsOrder() {
        const order = await MathPrompter.promptNumber()
        console.table(MathLogic.getElementsOrder(order));
    }

    public static async printPrimitiveRoots() {
        const order = await MathPrompter.promptNumber();
        console.table(MathLogic.getPrimitiveRoots(order));
    }

    public static async printInverseElements() {
        const order = await MathPrompter.promptNumber();
        const moduloEquals = await MathPrompter.promptNumber(`(a * b) mod ${order} = `);
        const limit = await MathPrompter.promptNumber(`How many inverse elements you want to find?`);
        console.table(MathLogic.findInverseNumbers(order, moduloEquals, limit));

    }

    public static async printLucasTestResult() {
        const order = await MathPrompter.promptNumber();
        const result = MathLogic.isPrimeNumberLucasTest(order);
        console.log(result ? `${order} is prime number` : `${order} is composite number`);
    }

    private static async promptNumber(message: string = 'Order'): Promise<number> {
        const { number } = await prompt({
            name: 'number',
            message,
            type: 'number',
            validate: (value) => !!value,
        });
        return number;
    }
}
