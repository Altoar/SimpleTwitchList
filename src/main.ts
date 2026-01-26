import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import FontAwesomeIcon from "./plugins/fontAwesome";
import FloatingVue from "floating-vue";

const app = createApp(App);

app.use(createPinia());
app.use(FloatingVue);

app.component("Icon", FontAwesomeIcon);
app.mount("#app");
