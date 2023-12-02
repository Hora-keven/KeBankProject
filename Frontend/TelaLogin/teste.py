import requests
import time

url = 'http://192.168.0.106:8080/api/version1/users/'

for _ in range(10):
    response = requests.get(url=url)
    print(response.status_code)
    time.sleep(1) 