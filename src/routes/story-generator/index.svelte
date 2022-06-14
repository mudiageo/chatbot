<script>
import {onMount} from 'svelte'
let prompt
onMount(() => {
 prompt = localStorage.getItem('story-prompt') || 'You are talking to Mudiaga a web developer with over 8 years of experience in web technologies. He studied at MIT. He is a JavaScript Developer and he works with Sveltekit and Svelte alot. '
})

const query = async () => {
  localStorage.setItem('story-prompt', prompt)
  const data = {"inputs": prompt}
  
	const response = await fetch(
		"https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	prompt = result

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
