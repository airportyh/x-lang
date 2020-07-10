arr = { 1 2 3 4 5 6 }
print("arr" arr)
squared = map(arr [|item|
    a = mul(item item)
    add(a 3)
])
print("squared" squared)
filtered = filter(arr [|item|
    eq(mod(item 2) 0)
])
print("filtered" filtered)
reduced = reduce(arr [|product item|
    mul(product item)
] 1)
print("reduced" reduced)

sqr(n) [
    mul(n n)
]

distance(x1 y1 x2 y2) [
    mul(sqr(sub(x1 x2)) sqr(sub(y1 y2)))
]

print("distance(3 4 8 9)" distance(3 4 8 9))
