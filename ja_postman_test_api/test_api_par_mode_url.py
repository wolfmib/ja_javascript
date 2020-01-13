import requests
import json
import time
import sys

def test_post_headers_body_json():
    url = 'https://www.google.com/'
    
    # Additional headers.
    headers = {'Content-Type': 'application/json' } 

    
    # get mode
    resp = requests.get(url)       
    
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

    # TEST content size
    print("the file size of resp.text = ", sys.getsizeof(resp))

    return resp.status_code 
    
    

if __name__ == "__main__":

    start = time.time()
    status_code = test_post_headers_body_json()
    end   = time.time()
    pass_time = end - start
    print("start = ", start)
    print("end   = ",end)
    print("end - start = ",pass_time)
    print("Conver to ms by * 1000 =   %4.2f ms"%(pass_time*1000))


    

    print("-----------------")
    print("Status code:      %6d"%status_code)
    print("Time:                %4.2f ms"%(pass_time*1000))
    print("Size:            %4.2f"%())
    print("------------------")
