from urllib import urlopen
from bs4 import BeautifulSoup

urls = [
    { 'url': 'http://japaneseemoticons.me/excited-emoticons/', 'filename': 'excited' },
    { 'url': 'http://japaneseemoticons.me/happy-emoticons/', 'filename': 'happy' },
    { 'url': 'http://japaneseemoticons.me/love-emoticons/', 'filename': 'love' },
    { 'url': 'http://japaneseemoticons.me/triumph-emoticons/', 'filename': 'triumph' },
    { 'url': 'http://japaneseemoticons.me/confused-emoticons/', 'filename': 'confused' },
    { 'url': 'http://japaneseemoticons.me/crazy-emoticons/', 'filename': 'crazy' },
    { 'url': 'http://japaneseemoticons.me/hungry-emoticons/', 'filename': 'hungry' },
    { 'url': 'http://japaneseemoticons.me/shy-emoticons/', 'filename': 'shy' },
    { 'url': 'http://japaneseemoticons.me/smug-emoticons/', 'filename': 'smug' },
    { 'url': 'http://japaneseemoticons.me/surprised-emoticons/', 'filename': 'surprised' },
    { 'url': 'http://japaneseemoticons.me/angry-emoticons/', 'filename': 'angry' },
    { 'url': 'http://japaneseemoticons.me/hurt-or-sick-emoticons/', 'filename': 'hurt' },
    { 'url': 'http://japaneseemoticons.me/worried-emoticons/', 'filename': 'worried' },
    { 'url': 'http://japaneseemoticons.me/scared-emoticons/', 'filename': 'scared' },
    { 'url': 'http://japaneseemoticons.me/sad-emoticons/', 'filename': 'sad' }
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
