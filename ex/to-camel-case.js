function capitalize(string) {
	let first = toUpperCase(at(string, 0));
	let rest = substring(string, 1);
	return concat(first, rest);
};
function toCamelCase(string) {
	let parts = split(string, /[-_]/);
	return join(map(parts, function (part, idx) {
		return $if(eq(idx, 0), function () {
			return part;
		},function () {
			return capitalize(part);
		});
	}), "");
};
print("\"\" =>", toCamelCase(""));
print("the-stealth-warrior =>", toCamelCase("the-stealth-warrior"));
print("The-Stealth-Warrior =>", toCamelCase("The-Stealth-Warrior"));
print("A-B-C =>", toCamelCase("ABC"));
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

function concat(...args) {
    return args.reduce((sum, num) => sum + num, "");
}

function split(str, separator) {
    return str.split(separator);
}

function join(arr, separator) {
    return arr.join(separator);
}

function at(arr, index) {
    return arr[index];
}

function substring(string, start, end) {
    return string.substring(start, end);
}

function toUpperCase(string) {
    return string.toUpperCase();
}

function toLowerCase(string) {
    return string.toLowerCase();
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

function entries(map) {
    return Array.from(map.entries());
}

function get(map, key) {
    return map.get(key);
}

function set(map, key, value) {
    map.set(key, value);
}

function size(setOrMap) {
    return setOrMap.size;
}

function length(arr) {
    return arr.length;
}

function $if(cond, consequent, alternate) {
    if (cond) {
        return consequent();
    } else {
        return alternate();
    }
}