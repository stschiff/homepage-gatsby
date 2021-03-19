#!/usr/bin/env python
import bibtexparser
import sys
import json
# from bs4.dammit import EntitySubstitution

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

    # escaper = EntitySubstitution()

    print("<!doctype html>")
    print('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />')

    for entry in bib_database.entries:

        # entry = bibtexparser.customization.convert_to_unicode(entry_raw)

        j = entry['journal'] if 'journal' in entry else f"in {entry['booktitle']}, {entry['publisher']}"
        
        if 'keywords' not in entry or 'role\_lead' not in entry['keywords']:
            continue
        
        author_list = list(map(
            lambda author_string: " ".join(reversed(author_string.split(', '))),
            entry['author'].replace('\n', ' ').split(' and ')
        ))

        author_list_abbrv = list(map(underline_stephan, author_list))
        l = len(author_list)
        # if l > 12:
        #     pos = author_list.index("Stephan Schiffels")
        #     if pos >= 6 and pos < l - 6:
        #         author_list_abbrv = list(map(underline_stephan, author_list[0:6] + ["...", "Stephan Schiffels", "..."] + author_list[-7:]))    
        #     else:
        #         author_list_abbrv = list(map(underline_stephan, author_list[0:6] + ["..."] + author_list[-7:]))
        
        if l == 1:
            author_str = author_list_abbrv[0]
        else:
            author_str = ", ".join(author_list_abbrv[0:-1]) + " and " + author_list_abbrv[-1]

        title = entry['title'].replace('{', '').replace('}','').replace('\n', ' ')

        html_out = f"<p><strong>{title}</strong> by {author_str}. <i>{j}</i> ({entry['year']})</p>"
        print(html_out)
    
    print("</html>")

