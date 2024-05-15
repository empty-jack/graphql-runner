# Environment Setup

After git clone repo, to ensure the script functions correctly, we need to:

1. Install nvm (Node Version Manager), which allows you to install and use different versions 
of Node.js in an isolated environment.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

2. Install the latest version of `Node.js`:


```
nvm install node
```

verify that everything is set up correctly:

```
nvm current
```

```
command -v nvm
```

3. Install dependencies. If you encounter an error, use the `--legacy-peer-deps` flag, 
which will force npm to ignore peer dependency conflicts and install them anyway.

```
npm install --legacy-peer-deps
```

4. Install [gql-generator](https://www.npmjs.com/package/gql-generator)

```
sudo npm install gql-generator -g
```


Don’t forget to configure the Burp proxy to listen on all interfaces


# Configure script `scanner/index.js`

You need to change:

1. Set the required headers:

```
// authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.//',
// Cookie: '...//'
```

2. Set the GraphQL endpoint:

```
// Choose your target

const target = 'https://example.com/api/graphql';
```

3. Set the proxy address:

```
// process.env.GLOBAL_AGENT_HTTPS_PROXY="http://127.0.0.1:8080";
```

4. By default, the script processes the `mutations` folder. To switch to, for example, `queries`, replace the line with:

```
// Parse your schema with

const mutations = require('../gqlg/mutations');
```


# Usage

1. Place the schema.graphql file in the project’s root directory, which will be parsed:

```
gqlg --schemaFilePath ./schema.graphql --destDirPath ./gqlg --depthLimit 4
```

2. To start, use the command:

```
node scanner/index.js
```