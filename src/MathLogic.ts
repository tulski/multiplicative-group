

export default class MathLogic {
    private static GCD(a: number, b:number): number {
        if (!b) return a;
        return this.GCD(b, a % b);
    }

    public static getElementsOrder(n: number): ElementOrder[] {
        const roots: ElementOrder[] = [];
        for (let k = 1; k <= n - 1; k++) {
            if (MathLogic.GCD(k, n) === 1) {
                roots.push({element: k, order: MathLogic.getElementOrder(n, k)});
            }
        }
        return roots;
    }

    private static getElementOrder(n: number, b: number) {
        let a = 1;
        let d = 1;
        while((a = (a * b) % n) !== 1) {
            d++;
        }
        return d;
    }

    public static getPrimitiveRoots(n: number): ElementOrder[] {
        const elementsOrder = this.getElementsOrder(n);
        return elementsOrder.filter(elementOrder => elementOrder.order === elementsOrder.length);
    }

    public static findInverseNumbers(order: number, moduloEquals: number, limit: number) {
        let elements: {[key: number]: InverseElement} = {};
        let boundary = 100;
        let counter = 0;
        while (Object.keys(elements).length < limit) {
            const a = Math.floor(Math.random() * boundary);
            const b = Math.floor(Math.random() * boundary);
            if ((a*b)%order === moduloEquals) elements[a*b] = {a, b};
            counter++;
            if (counter % 5 === 0) boundary *= 2;
            if (counter > 100000) {
                console.warn(`Cannot find ${limit} elements`);
                break;
            }
        }
        return Object.values(elements);
    }

    public static isPrimeNumberLucasTest(n: number): boolean {
        for (let b = 2; b <= n - 1; b++) {
            if ([... Array(n-2)].reduce((acc) => (acc * b)%n, b) !== 1) {
                return false;
            }
            for (const primeFactor of MathLogic.primeFactors(n - 1)) {
                if (Math.pow(b, (n - 1) / primeFactor) === 1)
                    return false;
            }
        }
        return true;
    }

    private static power(n: number, r: number, q: number) {
        let total = n;
        for (let i of [... Array(r).keys()]) {
            total = (total * n) % q;
        }
        return total;
    }

    private static primeFactors(n: number): number[] {
        const factors: number[] = [];
        for (let factor = 2; factor <= Math.sqrt(n); factor += 1) {
            while (n % factor === 0) {
                n /= factor;
                factors.push(factor);
            }
        }

        if (n !== 1) {
            factors.push(n);
        }
        return factors;
    }
}

interface ElementOrder {
    element: number;
    order: number;
}

interface InverseElement {
    a: number;
    b: number;
}
