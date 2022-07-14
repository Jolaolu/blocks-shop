# credits

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


Decision/Thoughts.

- Adding state management will probably make the code look cleaner but imo its an over kill for the project.
- I decided against having a multi route app as the scope of the work is considerably small as well making routing prety useless.
- I went with using Composition APi in the latest Vue version(2.7) to see how it compares against using Vue2 with the composition api package and Vue3.
- I defaulted to not caching the the cart items in a "real world" scenario i would save it in session storage. 
- Since the header isn't sticky and user will not know when cart is updated, I defaulted to having a toast notification with different messages when you add a new item and when you add an already selected item.
- A possible improvement will be to add client-side pagination.
- I used the Vue-Webpack proxy workaround to proxy and bypass the CORS errors on dev and netlify redirect to bypass it on the live version.
- I defaulted to having the loader show up when there is an error as opposed to showing a blank screen or just  text.
