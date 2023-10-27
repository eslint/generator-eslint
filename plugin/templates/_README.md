# eslint-plugin-<%= pluginId %>

<%= desc %>

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-<%= pluginId %>`:

```sh
npm install eslint-plugin-<%= pluginId %> --save-dev
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

<% } %>

## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->

<% if (hasRules) { %>

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->

<% } %>
