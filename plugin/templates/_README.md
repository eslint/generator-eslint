# eslint-plugin-<%= pluginId %>

<%= desc %>

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-<%= pluginId %>`:

```
$ npm install eslint-plugin-<%= pluginId %> --save-dev
```


## Usage

Add `<%= pluginId %>` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "<%= pluginId %>"
    ]
}
```

<% if (hasRules) { %>
Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "<%= pluginId %>/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here

<% } %>



