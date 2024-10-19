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

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-<%= pluginId %>` and add `<%= pluginId %>` to the `plugins` key:

```js
import <%= pluginId %> from "eslint-plugin-<%= pluginId %>";

export default [
    {
        plugins: {
            <%= pluginId %>
        }
    }
];
```

<% if (hasRules) { %>
Then configure the rules you want to use under the `rules` key.

```js
import <%= pluginId %> from "eslint-plugin-<%= pluginId %>";

export default [
    {
        plugins: {
            <%= pluginId %>
        },
        rules: {
            "<%= pluginId %>/rule-name": "warn"
        }
    }
];
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
