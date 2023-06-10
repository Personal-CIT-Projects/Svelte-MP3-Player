import './app.css'
import App from './App.svelte'
import axios from "axios";

if(location.hostname.includes("127")) axios.defaults.baseURL = "https://localhost:44319/"
else axios.defaults.baseURL = "https://mp3-service.sanderc.net/"

const app = new App({
  target: document.getElementById('app'),
})

export default app
