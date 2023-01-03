import os
from check_model_sha import get_mixmatched_output, has_mixmatched_sha, test_models_sha

# https://stackoverflow.com/a/70123641
env_file = os.getenv('GITHUB_ENV')

arr = test_models_sha("assets/models.json")
outputs = test_models_sha("assets/models.json")

model_output = outputs[0]
vae_output = outputs[1]

print(os.getenv("GITHUB_ENV"))

with open(env_file, "a") as myfile:
    myfile.write("BAD_SHA="+str(has_mixmatched_sha(model_output))+"\n")
    myfile.write("BAD_VAE_SHA="+str(has_mixmatched_sha(vae_output))+"\n")
    myfile.write("BAD_SHA_OUTPUT="+str(get_mixmatched_output(model_output))+"\n")
    myfile.write("BAD_VAE_SHA_OUTPUT="+str(get_mixmatched_output(vae_output)))