from urllib import urlopen
from bs4 import BeautifulSoup

urls = [
    { 'url': 'http://japaneseemoticons.me/excited-emoticons/', 'filename': 'excited' },
    { 'url': 'http://japaneseemoticons.me/happy-emoticons/', 'filename': 'happy' },
    { 'url': 'http://japaneseemoticons.me/love-emoticons/', 'filename': 'love' },
    { 'url': 'http://japaneseemoticons.me/triumph-emoticons/', 'filename': 'triumph' }
    ]

for emojiSet in urls:
  #read url to get raw HTML
  html = urlopen(emojiSet['url']).read()

  #use soup to extract text
  soup = BeautifulSoup(html, 'html.parser')

  #extract emojis
  emojis = ''
  for td in soup.find_all('td'):
    emoji = td.get_text()
    if emoji != '':
      emojis += emoji + '\n'

  #save to file
  filename = emojiSet['filename'] + '.txt'
  f = open(filename, 'w')
  f.write(emojis.encode('utf-8'))
  f.close()
