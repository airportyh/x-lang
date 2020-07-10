let arr = [1, 2, 3, 4, 5, 6];
print("arr", arr);
let squared = map(arr, function (item) {
	let a = mul(item, item);
	return add(a, 3);
});
print("squared", squared);
let filtered = filter(arr, function (item) {
	return eq(mod(item, 2), 0);
});
print("filtered", filtered);
let reduced = reduce(arr, function (product, item) {
	return mul(product, item);
}, 1);
print("reduced", reduced);
function sqr(n) {
	return mul(n, n);
};
function distance(x1, y1, x2, y2) {
	return mul(sqr(sub(x1, x2)), sqr(sub(y1, y2)));
};
print("distance(3 4 8 9)", distance(3, 4, 8, 9));

/*
Runtime functions:
*/

function print(...args) {
    console.log(...args);
}

function add(...args) {
    return args.reduce((sum, num) => sum + num, 0);
}

function sub(x, y) {
    return x - y;
}

function mul(...args) {
    return args.reduce((sum, num) => sum * num, 1);
}

function div(x, y) {
    return x / y;
}

function mod(x, y) {
    return x % y;
}

function abs(n) {
    return Math.abs(n);
}

function pow(n, m) {
    return Math.pow(n, m);
}

function sqrt(x) {
    return Math.sqrt(x);
}

function gt(x, y) {
    return x > y;
}

function eq(one, other) {
    return one === other;
}

function $if(cond, consequent, alternate) {
    if (cond) {
        return consequent();
    } else {
        return alternate();
    }
}

function each(arr, fun) {
    return arr.forEach(fun);
}

function map(arr, fun) {
    return arr.map(fun);
}

function filter(arr, fun) {
    return arr.filter(fun);
}

function reduce(arr, fun, initValue) {
    return arr.reduce(fun, initValue);
}
    
