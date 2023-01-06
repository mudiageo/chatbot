<script>
import {onMount} from 'svelte'
import { browser} from '$app/env'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = openai.createCompletion({
  model: "text-davinci-003",
  prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: ",
  temperature: 0.9,
  max_tokens: 150,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0.6,
  stop: [" Human:", " AI:"],
}).then(res => {
  browser ? alert(res.json()) : null
 return res
})
let prompt
onMount(() => {
  alert(response)
 prompt = localStorage.getItem('story-prompt') || 'You are talking to Mudiaga a web developer with over 8 years of experience in web technologies. He studied at MIT. He is a JavaScript Developer and he works with Sveltekit and Svelte alot. '
})

const query = async () => {
  localStorage.setItem('story-prompt', prompt)
//  const data = {"inputs": prompt}
  
	    let data = {

         context: prompt,
         temperature: 1,
         token_max_length: 100,
         top_p: 0.9,
         stop_sequence: ''
       }

let params = Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')


   const response = await fetch(`https://express-hello-world-hh2h.onrender.com/?${params}`)
 
	prompt = await response.text();
	

}


//	console.log(JSON.stringify(response));
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="text-center hero-content">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">AI Story Generator</h1>
      <p class="py-6">Just input the first few lines of your story, and it generates the rest🔥</p>
     
<br>

<div class="my-3 text-black-800 font-bold text-lg tracking-wide">
Prompt: <textarea id="prompt" on:input={document.getElementById("prompt").parentNode.dataset.value = prompt} placeholder="Prompt" class="bg-black-800" bind:value={prompt}></textarea></div>
        
<br>
      <button on:click={query} class="btn btn-primary">Generate Awesome Storytime</button>
    </div>
    
    
  </div>
</div>
