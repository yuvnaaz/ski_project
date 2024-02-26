from bs4 import BeautifulSoup
import requests 
import json

url = "https://www.onthesnow.com/british-columbia/skireport"
page = requests.get(url)
soup = BeautifulSoup(page.text, 'html.parser')

tables = soup.find_all('table')

resorts_data = []  

for table in tables[:-1]:
    resort_info = {}

    table_rows = table.find_all('tr')
    table_titles = [title.text.strip() for title in table_rows[0].find_all('th')]
    
    for row in table_rows[1:]:
        row_data = [data.text.strip() for data in row.find_all('td')]
        resort_name = row_data[0]  
        resort_info[resort_name] = {title: value for title, value in zip(table_titles, row_data)}
    
    resorts_data.append(resort_info)

with open("ski_resorts.json", "w") as json_file:
    json.dump(resorts_data, json_file, indent=4)

print("Data saved to ski_resorts.json")