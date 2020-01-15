import ja_language as ja_lan
import pandas as pd



if __name__ == "__main__":


    # Inital JA Language Agent
    ja_lan = ja_lan.language_translator()
    try:
        ja_lan_df = pd.read_pickle('ja_lan_env.pkl')
        apply_lan = ja_lan_df['ja_lan'][0]

        ja_lan.set_language_code(apply_lan)
        print(ja_lan.print("[INFO]: Your apply language is {%s}" % apply_lan))


    except:
        print("[INFO]: No ja_lan_env.pkl found !")
        print("Set language as default 'English' ")



