import json

def format(input):
    # Convert in python object (dic)
    input_dict_json = json.loads(input.data)

    # Create diccionary with the desidered JSON structure
    output_dict_json={
        "device": input_dict_json["Content"][0]["HwId"],
        "temperatura": input_dict_json["Content"][0]["Data"][0]["Values"][0]["Value"],
        "presion": input_dict_json["Content"][0]["Data"][0]["Values"][1]["Value"]
    }

    # Convert in JSON
    # ident -> identation level
    json_output = json.dumps(output_dict_json, indent=2)

    return json_output