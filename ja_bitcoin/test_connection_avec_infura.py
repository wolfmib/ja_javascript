from web3 import Web3
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



    # Connected avec infura node-services
    infura_url = "https://mainnet.infura.io/v3/912414023e2c4a88864de7614e5d3ee4"
    web3       = Web3(Web3.HTTPProvider(infura_url))


    # Verifier connection
    print(ja_lan.print("Check the web3 is conneced or not  "),web3.isConnected() )
    

    # Checked the blockNumber
    print(ja_lan.print("Check the "), "blockNumber", web3.eth.blockNumber)
    