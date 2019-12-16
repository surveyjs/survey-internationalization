import sys
import locale
from getlocales import getlocales

def gencunrrencies(locales):
    currencies = {}
    for l in locales:
        try:
            locale.setlocale(locale.LC_ALL, l)
        except:
            continue
        conv = locale.localeconv()
        currencies[l] = {
            'currency': {
                'symbol': conv['currency_symbol'],
                'symbolLocation': "left" if conv['p_cs_precedes'] else "right"
            }
        }
    return currencies

def main():
    path = sys.argv[1]
    locales = getlocales(path)
    currencies = gencunrrencies(locales)
    print(currencies)

if __name__ == '__main__':
    main()