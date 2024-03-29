import assert from 'assert';

const funcs = [
    function lengthOfLongestSubstring(s: string): number {
        let candidate = 0;
        const charArr = Array.from(s);
        let char2Index = new Map<string, number>();
        let start = 0;
        for (let i = 0; i < charArr.length; i++) {
            const char = charArr[i];
            if (char2Index.has(char)) {
                candidate = Math.max(char2Index.size, candidate);
                const newStart = char2Index.get(char)! + 1;
                for (let j = start; j < newStart; j++) {
                    char2Index.delete(charArr[j]);
                }
                start = newStart;
            }
            char2Index.set(char, i);
        }
        candidate = Math.max(char2Index.size, candidate);
    
        return candidate;
    },
    function lengthOfLongestSubstring(s: string): number {
        let result = 0;
        for (let start = 0; start < s.length; start++) {
            for (let end = 0; end < s.length; end++) {
                const subStr = s.substring(start, end + 1);
                const charSet = new Set(Array.from(subStr));
                if (charSet.size === subStr.length) {
                    result = Math.max(result, charSet.size);
                }
            }
        }
    
        return result;
    }
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
