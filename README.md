# Vue Todo App
Simple Todo List project using Vue, Vuex and LocalStorage for persistence. The stack also includes Bootstrap 4, Font-Awesome 5 icons and Offline Google fonts. The design is inspired by Neumorphism trend.

You can create lists of tasks, edit their names and delete them. All tasks can be edited and deleted when done. Possible future functionalities would be drag and drop, done checkbox for tasks, Firebase storage, Unit tests etc.

## Requirements
**Node.js v12+**

## Project setup
```
yarn install
```

### Install Fonts
```
npm run fonts
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

---

### Sample local build test scenario
To test the project in production mode it needs to be run from a local http server.

**Example:**
```
npm i -g http-server
source ~/.bashrc
cd <project_dir>
npm run build
http-server dist
```
The open the provided url in the browser.

## Contact

If you want to contact me you can reach me at <nikolaidotcom@gmail.com>.