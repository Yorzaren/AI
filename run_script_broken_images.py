import os
from find_broken_image_links import get_bad_link_output, has_bad_links, check_images

# https://stackoverflow.com/a/70123641
env_file = os.getenv('GITHUB_ENV')

arr = check_images("assets/embeddings.json")

with open(env_file, "a") as myfile:
    myfile.write("COUNT_BAD_LINKS="+str(has_bad_links(arr))+"\n")
    myfile.write("BAD_LINKS_OUTPUT="+get_bad_link_output(arr))