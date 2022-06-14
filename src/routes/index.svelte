<script>
import {onMount} from 'svelte'
let prompt
onMount(() => {
 
})
</script>
<div class="hero min-h-screen bg-base-200">
  <div class="text-center hero-content">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Mudiaga's AI Projects</h1>
      <p class="py-6">This is a collection of Mudiaga's blazingly fast 🔥 and super awesome 🤩 AI projects</p>
     
<br>
<div class="my-3 text-black-800 font-bold text-lg tracking-wide">

<br>
      <a sveltekit:prefetch href="/chatbot" class="btn btn-primary">Chatbot</a>
      <a sveltekit:prefetch href="/story-generator" class="btn btn-primary">Story Generator </a>
    </div>
  </div>
</div>
</div>