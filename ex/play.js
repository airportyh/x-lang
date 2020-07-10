function main () {
	let x = add(1, 2, 3, 4, 5, 6, 7, 8, 9);
	let y = mul(1, 2, 3);
	print("Sum is:", x);
	print("Product is:", y);
	$if(gt(x, y), function () {
		print("Sum is bigger than product");
	}, function () {
		print("Sum is less than product");
	});
};
main();

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

function $if(cond, consequent, alternate) {
    if (cond) {
        consequent();
    } else {
        alternate();
    }
}
