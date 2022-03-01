<script>
import {onMount} from 'svelte'
let bot =''
let you = ''

let prompt
onMount(() => {
 prompt =  localStorage.getItem('prompt') || 'You are talking to Mudiaga a web developer with over 8 years of experience in web technologies. He studied at MIT. He is a JavaScript Developer and he works with Sveltekit and Svelte alot.  You: Hello. /n Mudiaga: Hi. /n You: How are you doing today? /n Mudiaga: I am doing alright. /n You: How is MIT like? /n Mudiaga: '
})
</script>
<div class="hero min-h-screen bg-base-200">
  <div class="text-center hero-content">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">AI Chat Bot</h1>
      <p class="py-6">Input your name, the name of the entity you want to chat with and a prompt with information about the entity. An example prompt is given below in the prompt text area</p>
     <input class="input"
bind:value={bot}
        placeholder="Bot Name...">
      <br>
       <input class="input"
bind:value={you}
        placeholder="Your Name...">
      <br>
<div class="my-3 text-black-800 font-bold text-lg tracking-wide">
Prompt: <textarea on:input={this.parentNode.dataset.value = this.value} rows="1" placeholder="Prompt" class="bg-black-800" bind:value={prompt}></textarea></div>
        
<br>
      <a href="/{bot}-{you}" on:click={localStorage.setItem('prompt', prompt)} class="btn btn-primary">Get Started</a>
    </div>
  </div>
</div>
