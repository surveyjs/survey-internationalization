import sys
from os import listdir
from os.path import isfile

def getlocales(path):
    return [f[:-4].replace('_', '-') for f in listdir(path) if f.find('_') != -1]

def main():
    path = sys.argv[1]
    locales = getlocales(path)
    print(locales)

if __name__ == '__main__':
    main()