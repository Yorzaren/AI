import requests
import json


def check_link(url):
    try:
        r = requests.get(url)
        return r.status_code == 200
    except requests.exceptions.HTTPError as errh:
        print("Http Error:", errh)
    except requests.exceptions.ConnectionError as errc:
        print("Error Connecting:", errc)
    except requests.exceptions.Timeout as errt:
        print("Timeout Error:", errt)
    except requests.exceptions.RequestException as err:
        return False


def get_data_from_json_as_array(file):
    with open(file, 'r') as data_file:
        json_data = data_file.read()
    data = json.loads(json_data)
    return data


def get_images_as_array(input_json):
    img_array = []
    for entry in input_json:
        images = entry.get('images')
        if images is not None:
            for img in images:
                img_array.append(img)
    return img_array


def check_images(target):
    json_info = get_data_from_json_as_array(target)
    # print(json_info)
    image_array = get_images_as_array(json_info)
    # print(image_array)
    broken_images_links = []
    for x in image_array:
        #print(x)
        if not check_link(x):
            #print(x)
            broken_images_links.append(x)
    return broken_images_links


def count_bad_links(array):
    return len(array)


def has_bad_links(array):
    return len(array) > 0


def get_bad_link_output(array):
    output = ""
    for y in array:
        output += y + " <br>"
    return output


if __name__ == "__main__":
    arr_l = check_images("assets/embeddings.json")
    print(count_bad_links(arr_l))
    print(get_bad_link_output(arr_l))
