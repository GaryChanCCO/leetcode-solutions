import assert from 'assert';

const funcs = [
    function longestCommonPrefix(strs: string[]): string {
        let end = 0;
        outer: while (end < strs[0].length) {
            for (let i = 1; i < strs.length; i++) {
                if (strs[i][end] !== strs[0][end]) break outer;
            }
            end++;
        }

        return strs[0].substring(0, end);
    },
    function longestCommonPrefix(strs: string[]): string {
        let resultCharArr: string[] = [];

        if (strs[0].length === 0) return '';

        let currentCharInd = 0;
        while (currentCharInd < strs[0].length) {
            const currentChar = strs[0].charAt(currentCharInd);
            for (let i = 1; i < strs.length; i++) {
                if (currentChar !== strs[i].charAt(currentCharInd)) {
                    return resultCharArr.join('');
                }
            }
            resultCharArr.push(currentChar);
            currentCharInd++;
        }
        return resultCharArr.join('');
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    //TODO
}

function test(testCase: TestCase, actualFuncInd: number, expectedFuncInd: number): boolean {
    try {
        assert.deepStrictEqual(funcs[actualFuncInd](...testCase), funcs[expectedFuncInd](...testCase));
        return true;
    } catch (e) {
        console.log('❌'.repeat(32));
        console.log(`actualFuncInd: ${actualFuncInd}`);
        console.log(`expectedFuncInd: ${expectedFuncInd}`);
        console.log(`testCase: ${JSON.stringify(testCase)}`);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
        return false;
    }
}

{
    let count = 0;
    outer: for (const testCase of testCaseIterator()) {
        if (++count < 10) {
            console.log('----------------------------------------------------');
            console.log(`Testcase ${count}:`);
            console.log(JSON.stringify(testCase, undefined, 2));
        }
        for (let i = 0; i < funcs.length - 1; i++) {
            if (!test(testCase, i, i + 1)) break outer;
        }
    }
}
