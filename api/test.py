import requests
from bs4 import BeautifulSoup

url = "https://overwatch.blizzard.com/en-gb/career/FreyaTheCat-1718/"
response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")
title_element = soup.select_one(".Profile-player--title")

if title_element:
    title = title_element.text.strip()
    print("Title:", title)
else:
    print("Title element not found")

#
# img_element = soup.select_one("body > div:nth-of-type(1) > blz-section > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > img")

# if img_element:
#     img_url = img_element["src"]
#     rank, number = img_url.split("/rank/")[-1].split("-")[:2]
#     number = int(number)
#     print("Rank:", rank)
#     print("Number:", number)
# else:
#     print("Image element not found")
