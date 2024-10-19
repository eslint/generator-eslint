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

Add `<%= pluginId %>` to the `plugins` key of your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file). You can omit the `eslint-plugin-` prefix:

```js
{
    plugins: {
        "<%= pluginId %>"
    }
}
```

<% if (hasRules) { %>
Then configure the rules you want to use under the `rules` key.

```js
{
    rules: {
        "<%= pluginId %>/rule-name": "warn"
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
