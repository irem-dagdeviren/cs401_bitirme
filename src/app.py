from flask import Flask, jsonify
from flask_cors import CORS
from owlready2 import *
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import openpyxl
import json


app = Flask(__name__)
CORS(app)

def update_dictionary(dictionary, category, element, new_value):
    if category in dictionary:
        dictionary[category] = {(item[0], new_value) if item[0] == element else item for item in dictionary[category]}
    else:
        print(f"Category '{category}' not found in the dictionary.")


def get_all_links(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        links = set()

        for a_tag in soup.find_all('a', href=True):
            absolute_url = urljoin(url, a_tag['href'])
            links.add(absolute_url)

        return links

    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return set()


def create_class_map(ontology):
    class_map = {}
    for mnc in ontology.classes():
        individual = list(mnc.instances())
        values = set()
        for individuals in individual:
            values.add((individuals.name, 0))
        class_map[mnc.name] = values
    return class_map


def update_class_map(urls, ontology, class_map):
    for url in urls:
        if url.endswith(".jpg"):
            continue
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            all_class = ontology.classes()

            class_names = [cls.name.split('.')[-1] for cls in all_class]

            all_individual = list(onto.individuals())
            class_obj = [cls.name.split('.')[-1] for cls in all_individual]
            class_indicators = {}

            for mnc in onto.classes():

                individual = list(mnc.instances())
                updated_values_set = set()
                for individuals in individual:
                    element = soup.find(lambda tag: individuals.name.lower() in str(tag).lower())
                    indicator = 1 if element else 0

                    class_indicators[individuals.name] = {
                        'indicator': indicator,
                    }
                    if (indicator == 1):
                        update_dictionary(class_map, mnc.name, individuals.name, indicator)

           # print("Updated class_map:")
           # for i in class_map:
            #    print("\n", i, " : ", class_map[i])
        except:
            null = 0


def extract_data_from_excel(excel_file_path):
    try:
        workbook = openpyxl.load_workbook(excel_file_path)
        sheet = workbook.active
        excel_ratios = {}

        for row in sheet.iter_rows(min_row=2, values_only=True):
            if row[0] is not None:
                name = row[0].lower()
                ratio = row[1]
                excel_ratios[name] = ratio
            else:
                break

        return excel_ratios

    except FileNotFoundError:
        print("File not found. Please provide the correct path to your Excel file.")
        return {}

def set_encoder(obj):
    if isinstance(obj, set):
        return list(obj)
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")


def update_class_map_with_ratios(class_map, excel_ratios):
    for class_name, values in class_map.items():
        updated_values = set()
        
        for entry in values:
            name, current_value = entry
            if name in excel_ratios:
                ratio = excel_ratios[name]
                updated_value = current_value * ratio
                updated_values.add((name, round(updated_value,2)))
        class_map[class_name] = updated_values
   
    json_string = json.dumps(class_map, default=set_encoder, indent=2)

    return json_string

def return_totalValue(class_map_json):  

    class_map = json.loads(class_map_json)
    totalValue=0
    for i in class_map:
        for j in class_map[i]:
            totalValue+=j[1]
    print("Total Value: ", round(totalValue,2))        
    return round(totalValue,2)

target_url = "http://amorehotelistanbul.com/"
urls = get_all_links(target_url)
onto = get_ontology("deneme.rdf").load()

class_map = create_class_map(onto)
update_class_map(urls, onto, class_map)

excel_file_path = 'grades.xlsx'
excel_ratios = extract_data_from_excel(excel_file_path)

updated_class_map_json = update_class_map_with_ratios(class_map, excel_ratios)

res = return_totalValue(updated_class_map_json)

@app.route('/get_data', methods=['GET'])
def get_data():

    data = res
    return jsonify({'data': data})

@app.route('/get_table', methods=['GET'])
def get_table():

    data = updated_class_map_json
    return data

if __name__ == '__main__':
    app.run(debug=True)
