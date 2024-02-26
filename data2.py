import requests
from bs4 import BeautifulSoup
import json

def scrape_and_save(url, filename):
    try:
        # Send GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  

        soup = BeautifulSoup(response.content, 'html.parser')

        div_content = soup.find('div', class_='styles_box__1sXJN').text.strip()

        # Save the scraped content to a JSON file
        with open(filename, 'w') as json_file:
            json.dump({'content': div_content}, json_file)

        print(f"Scraped content saved to {filename} successfully")

    except Exception as e:
        print('Error scraping content:', e)

# URL to scrape
url = 'https://www.onthesnow.com/british-columbia/skireport'  
filename = 'scraped_content.json'

scrape_and_save(url, filename)
