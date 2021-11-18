#!/bin/bash

# Variaveis
# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
L_BLUE='\033[1;34m'

# Arquivos de conf (Menus)
MENUS=("")
MENUS_LABEL=("")
MENU_DEFAULT="menu-default.conf"
_PATH=$(echo "/opt/script-loja-funcionario/")
SAIR=0
LISTA_MENU=("")
LISTA_CMD=("")
ARGS=("")
LISTA_TAB=("")
ARG_TAG="ARG"
INDICE=1
MENUS+=($(ls $_PATH/ | grep -oP ".*[.conf]$" | awk '{print $0}'));
echo
echo

source "$_PATH/env.config"

if [[ $(( ${#MENUS[@]} - 1 )) > 1 ]]; then
  printf "${BLUE}#######################################################################################${NC}"
  echo
  printf "${BLUE}## [MENU]${L_BLUE}  Selecione qual menu deseja acessar${NC}"
  echo
  printf "${BLUE}#######################################################################################${NC}"
  echo
  for I in ${MENUS[@]}; do
  LABEL=$(cat "$_PATH/$I" | grep -Po '(?<=(<TITULO>)).*(?=</TITULO>)')
  echo
  MENUS_LABEL+=("$LABEL")
  printf "${YELLOW}[$INDICE]${NC}: $LABEL"
  INDICE=$(( INDICE + 1 ));
  done;
  echo

  echo
  printf "${BLUE}#######################################################################################${NC}"
  echo
  printf "${BLUE}## [SELECIONE]: ${L_BLUE} ${NC}"
  read -p "" ENTRADA;
  printf "${BLUE}#######################################################################################${NC}"
  echo
  while [[ $ENTRADA == 0 || $ENTRADA < 0 || $ENTRADA -gt $(( ${#MENUS[@]} - 1 )) ]]; do
    printf "${RED}[Error]${NC}: Opcao invalida\n"
    read -p "Selecionar menu: " ENTRADA;
  done
  echo
  printf "${YELLOW}[SISTEMA]${NC}   Lendo arquivo: ${MENUS[$ENTRADA]}"
  echo
  echo
  CONFIG_FILE="$_PATH/${MENUS[$ENTRADA]}"
else
  CONFIG_FILE="$_PATH/$MENU_DEFAULT"
fi

printf "${BLUE}#######################################################################################${NC}"
echo
printf "${BLUE}## [MENU]${L_BLUE}   $(cat "$CONFIG_FILE" | grep -Po '(?<=(<TITULO>)).*(?=</TITULO>)')${NC}"
echo
printf "${BLUE}#######################################################################################${NC}"
echo
echo

while IFS= read line; do
  # Verifica se a linha está comentada.
  if [[ ! $line =~ "#" ]]; then
    IFS='!' read -ra VAR <<< $line
    if [[ ${#VAR[@]} -gt 4 ]]; then
      continue;
    fi

    KEY=${VAR[0]};
    VALUE=${VAR[1]};
    ARGS+=("${VAR[2]}");
    LISTA_TAB+=("${VAR[3]}")

    KEY=$(echo $KEY | sed 's/"//g')
    LISTA_MENU+=("$KEY");
    LISTA_CMD+=("$VALUE");
  fi
done < "$CONFIG_FILE"

while [[ $SAIR < 1 ]]; do
INDICE=0
SAIR=1

printf "${YELLOW}[SISTEMA]${NC}   Selecione qual comando deseja executar:"
echo
for K in "${LISTA_MENU[@]}"; do
    if [[ "$INDICE" -gt 0 ]]; then
        printf "${YELLOW}[$INDICE]${NC}: $K"
        echo
    fi
    INDICE=$(( INDICE + 1 ));
done
echo
printf "${BLUE}#######################################################################################${NC}"
echo
printf "${BLUE}## [SELECIONE]: ${L_BLUE} ${NC}"
read -p "" ENTRADA;
printf "${BLUE}#######################################################################################${NC}"
echo
INDICE=0

while [[ $ENTRADA == 0 || $ENTRADA < 0 || $ENTRADA -gt $(( ${#LISTA_CMD[@]} - 1 )) ]]; do
  printf "${RED}[Error]${NC}: Opcao invalida\n"
  echo
  printf "${BLUE}#######################################################################################${NC}"
  echo
  printf "${BLUE}## [SELECIONE]:${NC}"
  read -p "" ENTRADA;
  printf "${BLUE}#######################################################################################${NC}"
  echo
done

CMD="${LISTA_CMD[$ENTRADA]}"

ARG_AMOUNT=0

for I in $(echo $CMD | grep -o "$ARG_TAG[1-9]"); do
    ARG_AMOUNT=$(( ARG_AMOUNT + 1 ));
done

echo
printf "${BLUE}#######################################################################################${NC}"
echo
printf "${BLUE}## [DESCRIÇÃO]${L_BLUE}   ${LISTA_MENU[$ENTRADA]} ${NC}"

if [[ "$ARG_AMOUNT" -gt 0 ]]; then
    echo
    printf "${BLUE}#######################################################################################${NC}"
    echo
    printf "${BLUE}## [ARGUMENTOS]${L_BLUE}   Insira os argumentos${NC}"
    echo
    printf "${BLUE}#######################################################################################${NC}"
    echo
    INDICE=0
    declare -a INPUT_ARGS
    for I in "${ARGS[$ENTRADA]}"; do
        IFS=' ' read -ra VAR <<< $I
        for K in "${VAR[@]}"; do
            printf "${YELLOW}[ARG]${NC}: $ARG_TAG$INDICE: $K: "
            read -e -p "" ARG;
            INPUT_ARGS=("${INPUT_ARGS[@]}" "$ARG")
            INDICE=$(( INDICE + 1 ));
        done
    done
    echo

    if [[ $(( ${#INPUT_ARGS[@]} - 1 )) > "$ARG_AMOUNT" ]]; then
            printf "${RED}[Error]${NC}: Argumentos inválidos, esperado $ARG_AMOUNT, mas recebeu $INDICE.\n"
            exit 1  
    fi

    INDICE=0
    for I in "${INPUT_ARGS[@]}"; do
        CMD=$(echo $CMD | sed "s/$ARG_TAG$INDICE/$I/g")
        INDICE=$(( INDICE + 1 ));
    done
fi
echo
printf "${BLUE}#######################################################################################${NC}"
echo

if [[ -z "${LISTA_TAB[$ENTRADA]}" ]]; then
  printf "${BLUE}## [EXECUTANDO]${L_BLUE} $CMD ${NC}"
  echo
  printf "${BLUE}#######################################################################################${NC}"
  echo
  printf "${BLUE}## [${GREEN}OUT${BLUE}] ${NC}"
  echo
  echo

  eval "$CMD"
  echo
  echo

fi

done;

printf "${BLUE}#######################################################################################${NC}"
echo
printf "${BLUE}## [SISTEMA]${L_BLUE}   Saiu programa!${NC}"
echo
printf "${BLUE}#######################################################################################${NC}"
echo
