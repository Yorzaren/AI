import os
from check_model_sha import get_mixmatched_sha_output, has_mixmatched_sha, test_models_sha

# https://stackoverflow.com/a/70123641
env_file = os.getenv('GITHUB_ENV')

arr = test_models_sha("assets/models.json")

with open(env_file, "a") as myfile:
    myfile.write("COUNT_BAD_SHA="+str(has_mixmatched_sha(arr))+"\n")
    myfile.write("BAD_SHA_OUTPUT="+get_mixmatched_sha_output(arr))