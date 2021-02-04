import random
import sys
import json

size = int(sys.argv[1])

with open('external/quotables/author-quote.txt', 'rt') as f:
    lines = f.readlines()

quotes = []
for _ in range(0, size):
    line = random.choice(lines)
    author, quote = line.split('\t')
    quotes.append({
        'author': author,
        'quote': quote
    })

with open('src/quotes.json', 'wt') as f:
    json.dump(quotes, f, indent=2)
