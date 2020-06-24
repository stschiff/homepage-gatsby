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

def underline_stephan(s):
    if s == "Stephan Schiffels":
        return "<u>Stephan Schiffels</u>"
    else:
        return s

with open('publications.bib') as bibtex_file:
    bibtex_string = month_replace(bibtex_file.read())
    bib_database = bibtexparser.loads(bibtex_string)

    for entry in bib_database.entries:

        j = entry['journal'] if 'journal' in entry else f"in {entry['booktitle']}, {entry['publisher']}"
        
        if 'keywords' not in entry or 'role\_lead' not in entry['keywords']:
            continue
        
        author_list = list(map(
            lambda author_string: " ".join(reversed(author_string.split(', '))),
            entry['author'].replace('\n', ' ').split(' and ')
        ))

        author_list_abbrv = list(map(underline_stephan, author_list))
        if len(author_list) > 12:
            author_list_abbrv = list(map(underline_stephan, author_list[0:6] + ["..."] + author_list[-7:]))
        
        author_str = ", ".join(author_list_abbrv[0:-1]) + " and " + author_list_abbrv[-1]

        title = entry['title'].replace('{', '').replace('}','').replace('\n', ' ')

        print(f"<p><strong>{title}</strong> by {author_str}. <i>{j}</i> ({entry['year']})<p>")

