import keyword
from bs4 import BeautifulSoup
import requests

response = requests.get("https://crownedhotel.com/index.php/en/")
soup = BeautifulSoup(response.text, 'html.parser')

# Specify the target string in a case-insensitive manner
def find_language_elements(soup,  target):
    target_string = "language"
    # Find all elements with class names containing the target string
    elements_with_language_class = soup.find_all(class_=lambda x: x and target_string.lower() in x.lower())
    # Iterate through the matching elements and check child elements for the keyword
    for element in elements_with_language_class:
        if target in str(element):
            print("Found keyword in parent element:", target)

find_language_elements(soup, "English")
find_language_elements(soup, "Deutsch")
find_language_elements(soup, "Türkçe")