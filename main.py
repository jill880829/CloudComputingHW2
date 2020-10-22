import json
todoList = {}
def maintain_calendar(request):
    global todoList

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': 'http://35.202.72.199:8080'
    }
    request_json = request.get_json()
    for key, value in request_json.items():
        if key in todoList:
            todoList[key] += value
        else:
            todoList[key] = value
    return (json.dumps(todoList, indent=4), 200, headers)
