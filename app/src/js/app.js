import { createApp } from 'vue';
import Hello from './components/hello';

const app = createApp({
    data() {
        return {
            message: 'Hello Vue!'
        };
    }
});

app.component('hello', Hello);

app.mount('#app');