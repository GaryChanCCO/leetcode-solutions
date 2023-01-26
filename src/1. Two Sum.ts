import assert from 'assert';

function twoSum(nums: number[], target: number): number[] {
    if (target < 0) {
        target *= -1;
        nums = nums.map((i) => -i);
    }

    const subtractedNums = nums.map((i) => i - target);

    const num2Index = new Map<number, number>();
    nums.forEach((value, index) => {
        num2Index.set(value, index);
    });

    for (let i = 0; i < subtractedNums.length; i++) {
        const subtractedNum = subtractedNums[i]!;
        if (num2Index.has(-subtractedNum)) {
            const index = num2Index.get(-subtractedNum)!;
            if (i === index) {
                continue;
            } else {
                return [i, index];
            }
        }
    }

    return [-1, -1];
}

function _twoSum(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i === j) continue;
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    throw new Error();
}

function test() {
    let nums: number[] = [];
    let target: number = 0;
    try {
        for (let i = 2; i < 10000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.random());
            const i1 = Math.floor(Math.random() * i);
            let i2 = Math.floor(Math.random() * i);
            while (i2 === i1) i2 = Math.floor(Math.random() * i);
            target = nums[i1] + nums[i2];
            assert.deepStrictEqual(twoSum(nums, target), _twoSum(nums, target));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(target);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
