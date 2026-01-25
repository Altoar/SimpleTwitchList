import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import FontAwesomeIcon from "./plugins/fontAwesome";

const app = createApp(App);

app.use(createPinia());

app.component("Icon", FontAwesomeIcon);
app.mount("#app");
