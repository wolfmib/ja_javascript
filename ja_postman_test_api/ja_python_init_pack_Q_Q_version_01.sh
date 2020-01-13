#!bash/bin

echo "[Jean]: Commencer pour ja_python_init_pack_Q_Q_version_01"
echo "[Jason]: Make sure that in your current folder, it's clean, (empy I mean...)"
echo "[Jason]: Make sure that your git-key is connected to ja_server ..."
echo "[Jason]: Make sure that you have python3 well installed in your devices ..."
echo "[Jason]: Enter anykey to contiune..."
read nothing_



# Try et Catch handling
# https://stackoverflow.com/questions/22009364/is-there-a-try-catch-command-in-bash
set -o pipefail
shopt -s expand_aliases
declare -ig __oo__insideTryCatch=0

# if try-catch is nested, then set +e before so the parent handler doesn't catch us
alias try="[[ \$__oo__insideTryCatch -gt 0 ]] && set +e;
           __oo__insideTryCatch+=1; ( set -e;
           trap \"Exception.Capture \${LINENO}; \" ERR;"
alias catch=" ); Exception.Extract \$? || "







# Copy git-file to __ja_temp
echo "[Jean]: Commencer pour git cline packages pour python developing.."

try {
    git clone --single-branch --branch ja_python_init_pack_Q_Q_version_01 git@github.com:wolfmib/ja_devops_pack.git __ja_temp
} catch {
    echo "Can't git clone ... please check the error , or contact git-server-admin in company.."
}

# Commencer pout copy files

cp -rf __ja_temp/ja_pack_files__/*.sh .
cp -rf __ja_temp/ja_pack_files__/*.py .
cp __ja_temp/ja_pack_files__/.gitignore .
cp __ja_temp/ja_pack_files__/ja_git_push_back_v2.sh .
echo "[Jean]: J'ai fini les copy "
echo
echo
echo "-----------------------------"
ls -a .
echo "-----------------------------"
echo
echo


# Creeer python3 env
echo "[Jean]: Ensuite, creer env pour vous ..."
python3 -m venv env 


# Source the ja_env
source env/bin/activate
echo "[Jean]: Je change to the env pour vous cette fois"
echo "         a prochain fois, tu peut utiliser ja_init.sh"
echo "------------------------------------------------------"
echo
echo


# Check .gitignore
echo "[Jason]: Please noticed that the .gitignore is being apply for python version now"
echo "         Type Enter to continue"
read nothing_
cat .gitignore
echo "###############################################################"
echo
echo
echo
read nothing_



# Install packages
echo "[Jean]: pip3 install les basic packages..."
pip3 install Translator
pip3 install googletrans
pip3 install pandas


# Setting les language
python3 macos_set_language.py 


# Creer les freeze.files
echo "[Jean]: Current instlaled packaged , C'est .."
pip3 freeze 
pip3 freeze > requirements.txt


# Remove tem-files
rm -rf __ja_temp

echo "[Jean]: Voilla , tu peux continue pour votre devloping code avec python, aller !"
echo 


