capitalize(string) [
    first = toUpperCase(at(string 0))
    rest = substring(string 1)
    concat(first rest)
]

toCamelCase(string) [
    parts = split(string /[-_]/)
    join(map(parts [|part idx|
        if eq(idx 0) [
            part
        ] else [
            capitalize(part)
        ]
    ]) "")
]

print("the-stealth-warrior =>" toCamelCase("the-stealth-warrior"))
print("\"\" =>" toCamelCase(""))
print("The-Stealth-Warrior =>" toCamelCase("The-Stealth-Warrior"))
print("A-B-C =>" toCamelCase("ABC"))
