#!/usr/bin/env python
import bibtexparser
import sys
import json

month_names = "jan feb mar apr may jun jul aug sep oct nov dec".split()

def month_replace(s):
    ret = s
    for m in month_names:
        search = " " + m
        rep = " {" + m + "}"
        ret = ret.replace(search, rep)
    return ret

def month_to_num(m):
    d = {month_names[i] : i for i in range(len(month_names))}
    return d[m] + 1

def curate_entry(entry):
    [d, m] = entry['month'].split('~')
    j = entry['journal'] if 'journal' in entry else f"in {entry['booktitle']}, {entry['publisher']}"
    
    # print(entry)

    role = 'minor'
    if 'keywords' in entry:
        if 'role\_lead' in entry['keywords']:
            role = 'lead'
        elif 'role\_major' in entry['keywords']:
            role = 'major'

    ret = {
        'journal' : j,
        'authors' : list(map(
            lambda author_string: " ".join(reversed(author_string.split(', '))),
            entry['author'].replace('\n', ' ').split(' and ')
        )),
        'date' : f"{entry['year']}-{month_to_num(m):02}-{int(d):02}",
        'title' : entry['title'].replace('{', '').replace('}',''),
        'url' : entry['url'],
        'abstract' : entry['abstract'].replace('{','').replace('}','') if 'abstract' in entry else None,
        'image' : f"images/publications/{entry['ID']}.jpg",
        'citekey' : entry['ID'],
        'role' : role
    }
    return ret

class Bibtex2JSONError(Exception):
    pass

with open('publications.bib') as bibtex_file:
    bibtex_string = month_replace(bibtex_file.read())
    bib_database = bibtexparser.loads(bibtex_string)

    with open('../src/data/publications.json', 'w') as outf:
        print(json.dumps([curate_entry(e) for e in bib_database.entries], indent=4), file=outf)
