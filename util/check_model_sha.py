from bs4 import BeautifulSoup
import requests
import json


def get_data_from_json_as_array(file):
    with open(file, 'r') as data_file:
        json_data = data_file.read()
    data = json.loads(json_data)
    return data


def get_sha256(url):
    page = requests.get(url)
    #print(page.status_code)
    if page.status_code == 404:
        print(url + " can't be reached.")
        return "null 404 page"
    else:
        try:
            soup = BeautifulSoup(page.content, "html.parser")
            # Target the SHA256 String
            x = soup.select_one('li:-soup-contains("SHA256")').text.split(":")[1].strip()

            #x = soup.find_all('ul')[1].find_all('li')[0].strong.next_sibling.strip()

            #print("Extracted SHA from the site: " + x)
            return x
        except:
            return "null can't find sha on page"


def compare_sha(string1, string2):
    string1 = string1.strip().upper()
    string2 = string2.strip().upper()
    outcome = string1 == string2
    print(str(outcome) + " - Compared : " + string1 + " with " + string2)
    return string1 == string2


def check_ckpt_release(json_elem):
    model_name = json_elem.get("name")
    model_ckpt_link = json_elem.get("download_link")
    model_sha = json_elem.get("SHA256")

    sha_from_url = get_sha256(model_ckpt_link)

    if compare_sha(model_sha, sha_from_url): # SHA Matches
        print("PASS (Model): " + model_name, model_ckpt_link, model_sha)
        return "NULL"
    else:
        msg = "FAIL - SHA doesnt match on " + model_name + " " + model_ckpt_link + " " +model_sha + " != " + sha_from_url
        print(msg)
        return msg

def check_vae_sha(json_elem):
    model_name = json_elem.get("name")
    vae_link = json_elem.get("vae_link")
    vae_sha = json_elem.get("vae_SHA256")

    if vae_link is None:
        print('NO VAE LISTED -- SKIPPING ' + model_name)
        return "NULL"

    sha_from_url = get_sha256(vae_link)

    if compare_sha(vae_sha, sha_from_url): # SHA Matches
        print("PASS (VAE): " + model_name, vae_link, vae_sha)
        return "NULL"
    else:
        msg = "FAIL - SHA doesnt match on " + model_name + "'s VAE " + vae_link + " " +vae_sha + " != " + sha_from_url
        print(msg)
        return msg

def test_models_sha(target):
    models = get_data_from_json_as_array(target)

    models_with_bad_sha = []
    model_vaes_with_bad_sha = []

    #print(models)
    for entry in models:
        release = entry.get('releases')
        for r in release:
            response = check_ckpt_release(r)
            vae_response = check_vae_sha(r)
            if response != "NULL":
                models_with_bad_sha.append(response)
            if vae_response != "NULL":
                model_vaes_with_bad_sha.append(vae_response)

    #print(ckpt_array[0].get('name'))
    #print(ckpt_array)
    return models_with_bad_sha, model_vaes_with_bad_sha


def has_mixmatched_sha(array):
    return len(array) > 0


def get_mixmatched_output(array):
    output = ""
    for y in array:
        output += y + " <br>"
    return output

if __name__ == '__main__':
    x = test_models_sha("assets/models.json")
