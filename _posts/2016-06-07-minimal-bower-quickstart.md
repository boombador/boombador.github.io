---
title: Minimal Setup of Bower with Private Dependency
---

Example taken from frontendjunkie.com blog post.

```bash
PROJ=foxtel.js
PROJ_URL=git@privateip.com:paulm/foxtel-js.git#~0.0.2

bower init
bower install $PROJ=$PROJ_URL --save
```

## Resources Consulted

- http://www.frontendjunkie.com/2014/01/using-bower-as-package-management-tool.html
