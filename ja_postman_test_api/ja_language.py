# Google
from googletrans import Translator




# Comment en faire:  Dans la main:   get_main_args = analyzer_input_args()
#                                    input_excel_name = get_main_args.input_ecelname etc..
def analyzer_input_args():
    parser = argparse.ArgumentParser(description='Game Simulation Parameters')
    parser.add_argument('--input_excelname', type=str,default="default", help="Default name: 'setting.xlsx'")
    parser.add_argument('--output_folder', type=str,default='output', help="Default: current path")
    parser.add_argument('--show_info', type=bool, default=False,help="Default: False, setting 'True' to printout info")
    parser.add_argument('--debug_mode', type=bool, default=False,help="Default: False, setting 'True' to printout debug detail information via print method in code")
    parser.add_argument('--show_estimate_time', type=bool,default=False, help="Estimate the processing cnts")
    parser.add_argument('--draw_line', type=int,default=False, help="SLOT Sumulator Used Only")
    parser.add_argument('--draw_fig', type=bool,default=False, help="Draw support fig.png during running")
    parser.add_argument('--unit_test', type=bool,default=False, help="Initial the unit_test for specific funciton in each project")
    parser.add_argument('--unit_test__case_number', type=int, default=0, help="Unit_test_case_number: You must set --unit_test True first.")
    parser.add_argument('--language',type=str, default='en',help='Default language is English: support German, French, Japanese, Korean Spanish, Russian.....: de, fr, ko, ja,es,ru, zh-TW, zh-CN')


    #Get Args:
    args = parser.parse_args()
    return args


# C'est class , utiliser pour
    # Input: 'Je vais bien'
    # Output: Translated(src=fr, dest=en, text=I'm fine, pronunciation=I'm fine, extra_data="{'translat...")
class language_translator():
    def __init__(self):
        self.name = 'language_translater'
        self.language_dict = {'zh-TW': "Traditional Chinese" , 'zh-CN':"Simplified Chinese" ,'ja': "Japanese" ,'fr': "French",'de':"German",'ko':"Korean",'ru':"Russian",'es':"Spanish",'en':'English'}
        self.translator = Translator()
      
    def set_language_code(self, apply_language_code):
        # Initial to 'en' first, va changer apres the setting checking
        if apply_language_code in self.language_dict:
            # Change the language_cod ici
            self.language_code = apply_language_code
        else:
            try:
               _res =  self.translate_par_les_mots("The code is not in default list description, but the code is applable in google lib")
               print(_res)
            except:
                print("Error: The code is not support,  please check....  code: %2s"%apply_language_code)


    def __obtenir_language_full_norm__(self,input_code):
        msg = "Current apply language is  " + self.language_code + "\n"
        msg += "Description is    %20s"%self.language_dict[self.language_code] + "\n"
        return msg

    def show_info(self):
        msg = self.name + "\n"
        for any_lan in self.language_dict:
            _description = self.language_dict[any_lan]
            msg += "This translator support:        %4s   as          %20s"%(any_lan,_description)
            msg += "\n"
        try:
            msg += self.__obtenir_language_full_norm__(self.language_code)
        except:
            print("[INFO]: No setting for self.language_code")
        return msg

    def translate_par_les_mots(self,input_str):

        __result  = self.translator.translate(input_str)
        # Obtenir the text:
        text = __result.extra_data['translation'][0][0]
        return text

    def translate_par_les_mots_et_dest(self,input_str,input_des='en'):

        try:
            __result = self.translator.translate(input_str,dest= self.language_code)
        except:
            __result = self.translator.translate(input_str,dest=input_des)
      
        # Obtenir the text:
       

        text = __result.extra_data['translation'][0][0]
        return text

    def print(self,input_str,input_dest='en'):
        return self.translate_par_les_mots_et_dest(input_str,input_dest)
        

    

if __name__ == '__main__':
    
    ######################## TEST Zone for laugnage_translator() ###############
    print("######################## TEST Zone for laugnage_translator() ###############\n\n")
    translator = language_translator()
    _info = translator.show_info()
    print(_info)

   

    for any_language in translator.language_dict:

        # Input words
        my_words   = "Start to convert format png to jpg,  Please type the folder name:  'work_tem' for example"
        print("Translating .... %30s  with Language Code: %4s\n"%(my_words,any_language))
        _info = translator.print(my_words,any_language)
        print(_info)
        print("--------------------------------------------------------------------------------------------\n\n")






   

    