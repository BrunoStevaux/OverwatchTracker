from flask import Flask, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests
from collections import OrderedDict

app = Flask(__name__)
CORS(app)

@app.route('/')
def get_player():
    player = OrderedDict()
    player["name"] = "Test#1234"
    url = "https://overwatch.blizzard.com/en-gb/career/FreyaTheCat-1718/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    title_element = soup.select_one(".Profile-player--title")
    player["title"] = title_element.text.strip() if title_element else None
    portrait_element = soup.select_one(".Profile-player--portrait")
    player["profileicon"] = portrait_element['src'] if portrait_element else None

    return jsonify(player)
if __name__ == "__main__":
    app.run(port=3001, debug=True)