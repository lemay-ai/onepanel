import threading
import subprocess
import itertools
from subprocess import check_output

class NodejsThread(threading.Thread):
    def __init__(self, keywords):
        self.stdout = None
        self.stderr = None
        self.keywords = keywords
        threading.Thread.__init__(self)

    def run(self):
        p = subprocess.Popen(['nodejs', 'ex2.js', self.keywords],
                             shell=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        self.stdout, self.stderr = p.communicate()

# Create unique combinations of keywords
# from https://stackoverflow.com/questions/464864/how-to-get-all-possible-combinations-of-a-list-s-elements
from itertools import chain, combinations
def powerset(iterable):
    s = list(iterable)  # allows duplicate elements
    return chain.from_iterable(combinations(s, r) for r in range(len(s)+1))

#split list into lists with 5 elements
#from: https://stackoverflow.com/questions/1218793/segment-a-list-in-python
from itertools import zip_longest
def grouper(iterable, n, fillvalue=None):
    args = [iter(iterable)] * n
    return zip_longest(*args, fillvalue=fillvalue)

# Create list of keyword strings 
# from https://stackoverflow.com/questions/1482308/whats-a-good-way-to-combinate-through-a-set
def enumerateKeywords(keywordList, baseKeyword):
    searchlist = []
    for i, combo in enumerate(powerset(keywordList), 1):
        #print('combo #{}: {}'.format(i, combo))
        if len(combo)>0:
            searchlist.append(" ".join(combo)+" "+baseKeyword)
    return searchlist

def scrapeImages(keywordList, baseKeyword):
    
    for kw in keywordList:
        group=[baseKeyword, kw]
        instances={}
        print(group)
         
        t = NodejsThread(keywords=" ".join(group))
        t.start()
        t.join(1)

        #remove duplicate images
        # returned_value = subprocess.call("fdupes -rdN images/", shell=True)

        #remove blank images
        returned_value = subprocess.call("find images/ -size 0 -delete", shell=True)

        #count images
        ps = subprocess.Popen("find images/ -follow|wc -l",shell=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
        output = ps.communicate()[0]
        print('files so far:', output)

    #flatten directory tree
    # returned_value = subprocess.call("find images/ -mindepth 2 -type f -exec mv -t images/ -i '{}' +", shell=True)

    #remove spaces in filenames
    # returned_value = subprocess.call("find images/ -name '* *' -type f | rename 's/ /_/g'", shell=True)

