import assert from 'assert';

const funcs = [
    function permute(nums: number[]): number[][] {
        const result: number[][] = [];
        const stack: number[] = [];
        function permuteEx(): void {
            if (nums.length === 0) result.push(stack.slice());
            for (let i = 0; i < nums.length; i++) {
                stack.push(nums[i]);
                nums.splice(i, 1);
                permuteEx();
                nums.splice(i, 0, stack.pop()!);
            }
        }
        permuteEx();

        return result;
    },
    function permute(nums: number[]): number[][] {
        const result: number[][] = [];

        function permuteEx(p: number[], pool: number[]): void {
            if (p.length === nums.length) {
                result.push(p);
                return;
            }
            for (let i = 0; i < nums.length - p.length; i++) {
                const _p = p.slice();
                const _pool = pool.slice();
                _p.push(_pool[i]);
                _pool[i] = _pool[_pool.length - 1];
                _pool.pop();
                permuteEx(_p, _pool);
            }
        }

        permuteEx([], nums);

        return result;
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
