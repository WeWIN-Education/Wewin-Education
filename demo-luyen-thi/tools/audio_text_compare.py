"""Word edit alignment that handles repeated listening passages without jumping between repeats."""
import re,unicodedata

def number(n):
 small='zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split()
 if n<20:return small[n]
 if n<100:return ['', '', 'twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'][n//10]+(' '+small[n%10] if n%10 else '')
 return str(n)

def normalize(text):
 text=unicodedata.normalize('NFKD',text.lower()).replace('’',"'").replace('-',' ')
 text=re.sub(r'\b\d{1,2}\b',lambda m:number(int(m[0])),text)
 text=re.sub(r"[^a-z0-9\s]",'',text)
 for a,b in [('colour','color'),('grey','gray'),('tyre','tire'),('katie','katy'),('windsock','wind sock'),('lifebelt','life belt'),('favourite','favorite'),('centre','center'),('moustache','mustache'),('practise','practice'),('realise','realize'),('centimetres','cm'),('kilometres','km'),('ms','miss')]:text=re.sub(r'\b'+a+r'\b',b,text)
 return text.split()

def compare(reference,observed):
 expected=normalize(reference);actual=normalize(observed);n=len(expected);m=len(actual)
 cost=[list(range(m+1))]
 for i in range(1,n+1):
  row=[i]+[0]*m;previous=cost[-1]
  for j in range(1,m+1):row[j]=min(previous[j-1]+(expected[i-1]!=actual[j-1]),previous[j]+1,row[j-1]+1)
  cost.append(row)
 i,j=n,m;steps=[]
 while i or j:
  if i and j and cost[i][j]==cost[i-1][j-1]+(expected[i-1]!=actual[j-1]):
   steps.append(('equal' if expected[i-1]==actual[j-1] else 'replace',i-1,i,j-1,j));i-=1;j-=1
  elif i and cost[i][j]==cost[i-1][j]+1:steps.append(('delete',i-1,i,j,j));i-=1
  else:steps.append(('insert',i,i,j-1,j));j-=1
 steps.reverse();diffs=[];group=None
 for tag,i,j,a,b in steps+[('equal',n,n,m,m)]:
  if tag=='equal':
   if group:
    x,y,u,v=group;diffs.append(dict(expected=' '.join(expected[x:y]),heard=' '.join(actual[u:v]),context=' '.join(expected[max(0,x-5):min(n,y+5)]),expectedStart=x,expectedEnd=y,heardStart=u,heardEnd=v));group=None
  elif group:group[1]=j;group[3]=b
  else:group=[i,j,a,b]
 return dict(referenceWords=n,recognizedWords=m,differenceRate=round(cost[n][m]/max(n,1),4),differences=diffs,comparison='word-edit-v2')
