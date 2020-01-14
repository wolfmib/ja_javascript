import requests
import json
import time
import sys

# ja_language
import ja_language as ja_lan

# ja_api
import ja_api as ja_api
import pandas as pd

if __name__ == "__main__":


    # Initial ja_language_agent
    ja_lan_agent = ja_lan.language_translator()
    try:
        ja_lan_df = pd.read_pickle('./ja_lan_env.pkl')
        apply_lan = ja_lan_df['ja_lan'][0]
        print("[INFO]: Your apply language is {%s}" % apply_lan)
        ja_lan_agent.set_language_code(apply_lan)
    except:
        print("[INFO]: No ja_lan_env.pkl found !")
        print("Set language as default 'English' ")

    print("\n\n")
    print("--------------------------------------------------------")
    print(ja_lan_agent.print("[Douge]: Start for testing basic api-function"))
    print("--------------------------------------------------------")

    # TEST GET API ######################################################

    # Obtenir URL
    print("TEST GET API \n####################3#########################\n")
    print(ja_lan_agent.print("Please input:  "), "url")
    print(ja_lan_agent.print("for example: "), "www.google.com")
    input_url = input()
    print("\n\n---------------------------------------------------\n\n")

    # Obtenir Status Code
    print(ja_lan_agent.print("Please input:  "), "checking status_code")
    print(ja_lan_agent.print("for example: "), "200")
    input_status_code = int(input())
    print("\n\n---------------------------------------------------\n\n")

    # Obtenir How many times
    print(ja_lan_agent.print("How may times you want to test ?"))
    print(ja_lan_agent.print("for example: "), " 10 ")
    test_runs = int(input())
    print("\n\n---------------------------------------------------\n\n")

    # Inital final_df
    col_list = ['status_code', 'time', 'size', 'is_json', 'url']
    final_df = pd.DataFrame(columns=col_list)
    print(final_df)
    for any_run in range(1, test_runs+1):
        status_code, pass_time, package_size, is_json = ja_api.test_get_par_url_status_code(input_url, input_status_code)
        print("------- %2d run--------------------------------" % any_run)
        print("Status code:      %6d" % status_code)
        print("Time:                %4.1f ms" % (pass_time))
        print("Size:                %4.1f KB" % package_size)
        print("Is JSON format:      %s " % is_json)
        print("-----------------------------------------------")

        # Cree pickle_file
        _tem_df = pd.DataFrame(
            [[status_code, pass_time, package_size, is_json, input_url]], columns=col_list)
        print(_tem_df)
        final_df = final_df.append(_tem_df, ignore_index=True)

    # Faire Summary
    print("\n\n")
    print(ja_lan_agent.print("The average time is "))
    print(" %4.2f ms\n" % final_df['time'].mean())

    print("-----------------------------pickle_file-----------------------------")
    print(final_df)
    _pickle_file_name = "ja_test_get_summary.pickle"
    print(ja_lan_agent.print("\nSave the File into pickle: \n"), _pickle_file_name)
    final_df.to_pickle(_pickle_file_name)

    print("###########################################################################\n\n")
