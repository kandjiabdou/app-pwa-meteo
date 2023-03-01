import json

with open('cities.json', 'r') as f:
    data = json.load(f)

for ville in data['cities']:
    del ville['city_code']
    del ville['department_name']
    del ville['department_number']
    del ville['region_name']
    del ville['region_geojson_name']
    del ville['zip_code']
    del ville['insee_code']

with open('data.json', 'w') as f:
    json.dump(data, f)
