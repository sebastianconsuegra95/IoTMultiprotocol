import json

def format(input):
    # Convert in python object (dic)
    input_dict_json = json.loads(input.data)

    # Create diccionary with the desidered JSON structure
    output_dict_json = {"device": input_dict_json["device"]}
    output_dict_json.update(input_dict_json["data"])

    # Convert in JSON
    # ident -> identification level
    json_output = json.dumps(output_dict_json, indent=2)

    return json_output
