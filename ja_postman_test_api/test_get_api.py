import requests
import json
import time
import sys

def test_post_headers_body_json():
    url = 'https://www.google.com/'
    
    # Additional headers.
    headers = {'Content-Type': 'application/json' } 

    
    # get mode
    start = time.time()
    resp  = requests.get(url)      
    end   = time.time()  

    # Obtenir pass_time
        # X 1000 to become ms 
    pass_time =  (end - start ) * 1000
    
    # Validate response headers and body contents, e.g. status code.
        #print("Response code = ",resp.status_code)
        #print(resp.__attrs__)
    assert resp.status_code == 200
        #resp_body = json.loads(resp._content('utf-8'))
        #print("resp_body = ",resp._content)
    try:
        obtenir_json = resp.json()
        print(obtenir_json)
    except json.decoder.JSONDecodeError:
        print("C'est pas JSON !")
        # print response full body as text
        print(resp.text)


    print(resp.__attrs__)
    print("usrl:")
    print(resp.url)
    assert resp.url == url

    # Obtenir package size.
    package_size = float(sys.getsizeof(resp)*1024/1000)
    print("the file size of resp.text =  %4.2f KB "%package_size)

    return resp.status_code , pass_time, package_size
    
    

if __name__ == "__main__":


    status_code , pass_time, package_size = test_post_headers_body_json()
    
    print("-----------------")
    print("Status code:      %6d"%status_code)
    print("Time:                %4.1f ms"%(pass_time))
    print("Size:                %4.1f KB"%package_size)
    print("------------------")
