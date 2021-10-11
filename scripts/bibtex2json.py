#!/usr/bin/env python3
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

    cleaned_author_string = entry['author'].replace('\n', ' ').replace('{', '').replace('}', '')

    author_list = list(map(
        lambda author_string: " ".join(reversed(author_string.split(', '))),
        cleaned_author_string.split(' and ')
    ))

    author_abbrv = cleaned_author_string.split(' and ')[0].split(',')[0] + " et al."
    if len(author_list) == 2:
        [a1, a2] = cleaned_author_string.split(' and ')
        author_abbrv = a1.split(',')[0] + " and " + a2.split(',')[0]
    elif len(author_list) == 1:
        author_abbrv = cleaned_author_string.split(',')[0]

    title = entry['title'].replace('{', '').replace('}','').replace('\n', ' ')
    ret = {
        'journal' : j,
        'authors' : author_list,
        'date' : f"{entry['year']}-{month_to_num(m):02}-{int(d):02}",
        'title' : title,
        'url' : entry['url'],
        'abstract' : entry['abstract'].replace('{','').replace('}','').replace('\n', ' ') if 'abstract' in entry else None,
        'image' : f"images/publications/{entry['ID']}.jpg",
        'citekey' : entry['ID'],
        'role' : role,
        'pdf' : f"pdfs/{author_abbrv} {entry['year']} - {title.replace(':', ' -')}.pdf"
    }
    return ret

class Bibtex2JSONError(Exception):
    pass

with open('publications.bib') as bibtex_file:
    bibtex_string = month_replace(bibtex_file.read())
    bib_database = bibtexparser.loads(bibtex_string)

    with open('../src/data/publications.json', 'w') as outf:
        print(json.dumps([curate_entry(e) for e in bib_database.entries], indent=4), file=outf)
