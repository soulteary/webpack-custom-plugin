# webpack-custom-plugin

useage:

add option to `package.json` content:

```
  "customWebpack": {
    "custom-public-path": [
      "this.YOUR_DYNAMIC_ENTRY_POINT && this.YOUR_DYNAMIC_ENTRY_POINT.host || '/'"
    ]
  },
```

browser script:

```
window.YOUR_DYNAMIC_ENTRY_POINT = { host: 'https://your-website.com/host/' };
```


features：

- [x] [Not generating ouput with multiple entries #6040](https://github.com/webpack/webpack/issues/6040)
- [x] dynamic output path via browser script
