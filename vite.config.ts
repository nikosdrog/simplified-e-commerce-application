import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3000 // Μπορείς να αλλάξεις την πόρτα που θέλεις να τρέχει ο server
    }
})
