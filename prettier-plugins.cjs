// Use dynamic imports
const tailwindPlugin = import('prettier-plugin-tailwindcss');
const sortImportsPlugin = import('@trivago/prettier-plugin-sort-imports');

//wait for all plugins to be loaded
Promise.all([tailwindPlugin, sortImportsPlugin]).then(
  ([tailwindPlugin, sortImportsPlugin]) => {
    module.exports = {
      parsers: {
        typescript: {
          ...tailwindPlugin.parsers.typescript,
          preprocess: sortImportsPlugin.default.parsers.typescript.preprocess,
        },
      },
      options: {
        ...sortImportsPlugin.default.options,
      },
    };
  }
);
