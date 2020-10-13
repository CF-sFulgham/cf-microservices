# Steven Fulgham 08/12/2020

function getJSON() {
  KEY=$1
  num=$2
  awk -F"[,:}]" '{for(i=1;i<=NF;i++){if($i~/'$KEY'\042/){print $(i+1)}}}' | tr -d '"' | sed -n ${num}p
}

POLICY=0410002417
ZIP=77045
FIRST_NAME=Viola
LAST_NAME=Guidry
COUNTRY=US

#Base 64 encode json string
function encodeJSON() {
  echo $1 | base64
}

function decodeJSON() {
  echo $1 | base64 --decode
}

#Get UnAuth token
function getBearerToken() {
  UNAUTH_TOKEN=$(curl -i localhost:3000?username | getJSON Token)
  echo "$UNAUTH_TOKEN"
}


function getUserByPolicy() {
  ENCODED_POLICY=$(encodeJSON "{\"policyNumber\": \"$POLICY\"}")
  BEARER_TOKEN=$(getBearerToken)
  
  echo $(curl \
    -i \
    --request \
    POST \
    -H "Content-Type: application/json" \
    -H "x-pri-keys: $ENCODED_POLICY" \
    -H "Authorization: Bearer $BEARER_TOKEN" \
    localhost:3000/customers/searches \
    -d '{"country":"US", "attestation": "true"}')
}

function getUserByFilter() {
  BEARER_TOKEN=$(getBearerToken)
  
  echo $(curl \
    -i \
    --request \
    POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $BEARER_TOKEN" \
    localhost:3000/customers/searches \
    -d '{"country":"US", "attestation": "true", "firstName": '\"$FIRST_NAME\"', "lastName": '\"$LAST_NAME\"', "postalCode": '\"$ZIP\"'}')
}