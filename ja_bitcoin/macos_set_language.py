import os
import ja_language as ja_lan
import subprocess
import pandas as pd


# From Analyzer System:
    #  language is English: support German, French, Japanese, Korean Spanish, Russian.....: de, fr, ko, ja,es,ru, zh-TW, zh-CN


ja_lan_dict = { 1:'ja',2:'zh-TW',3:'zh-CN',4:'en',5:'fr',6:'de',7:'ru',8:'es',9:'ko'}

if __name__ == "__main__":
    print("Select Language: \n\
     1.日本語:\n\
     2.繁體中文:\n\
     3.簡體中文:\n\
     4.English:\n\
     5 Française:\n\
     6.Deutsche:\n\
     7.русский:\n\
     8.española:\n\
     9.한국어:\n") 

    
    # Obtenir les setting
    value = 0
    while value not in [1,2,3,4,5,6,7,8,9]:
        value = int(input())


        # Obtenir Option Choisir..
        if value not in [1,2,3,4,5,6,7,8,9]:
            print("[INFO]: You type wrong number  %d,   try again!!"%value)

    # Creer nouvelle DataFrame
    ja_lan_df = pd.DataFrame({'ja_lan':[ja_lan_dict[value]]})
    

    # Save to pickle file et afficher cet lan.
    translator = ja_lan.language_translator()
    print("\n\n------------ pickle file content------------")
    ja_lan_df.to_pickle('ja_lan_env.pkl')
    print(ja_lan_df)
    print("--------------------------------------------\n\n")

    # Obtenir les setting vien de ja_lan_env.pkl
    current_lan = ja_lan_df['ja_lan'][0]
    print(translator.translate_par_les_mots_et_dest("[INFO]: Save your setting to file 'ja_lan_env.pkl'!",current_lan))

    
    # Afficher Information
    print( translator.translate_par_les_mots_et_dest("Your languge is setting to  %s"%(translator.language_dict[current_lan]),current_lan))
    
    
