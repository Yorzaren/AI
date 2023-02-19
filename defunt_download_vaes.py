import json
import requests


def download(url, name):
    print("Downloading: " + url)
    r = requests.get(url, allow_redirects=True)
    open(name, 'wb').write(r.content)


def get_data_from_json_as_array(file):
    with open(file, 'r') as data_file:
        json_data = data_file.read()
    data = json.loads(json_data)
    return data


if __name__ == '__main__':
    model_list = get_data_from_json_as_array("assets/models.json")
    for model in model_list:
        release = model.get('releases')
        for r in release:
            dl_name = r.get('name').replace(".ckpt", ".vae.bin")
            vae_link = r.get('vae_link')
            if vae_link is not None:
                download(vae_link.replace("blob","resolve"), dl_name)