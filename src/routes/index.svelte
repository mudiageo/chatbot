
<script>
  import {onMount} from 'svelte'
  let messages = []
  let prompt, newMessage = ''

  onMount(() => {
    messages =  JSON.parse(localStorage.getItem('messages')) || []  
    newMessage =  localStorage.getItem('newMessage') || 'hey'
    prompt =  localStorage.getItem('prompt') || ''
    $:  localStorage.setItem('newMessage', newMessage)

 
})
  const handleText = async (e) => {

      messages = [...messages, {
          sender:  'Mudia',
          class: 'end',
          bg: 'bg-gray-100',
          message: newMessage
        }]

        newMessage = ""
        localStorage.setItem('prompt', prompt)
        localStorage.setItem('messages', JSON.stringify(messages))
        let promptMessages = messages.map((item) => `${item.sender}: ${item.message} Bot: `).toString().replaceAll('Bot: ,', ' ')


        let context = `${prompt} ${promptMessages}`
       let data = {
         context: context,
         temperature: 1,
         token_max_length: 30,
         top_p: 0.9,
         stop_sequence: 'Mudia: '
       }
// setTimeout(()=>{
//   messages = [...messages, {
//           sender:  'Bot',
//           class: 'start',
//           bg: '',
//           message: 'Message received'
//         }]

// }, 3000)
let params = Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')


        const response = await fetch(`https://express-hello-world-hh2h.onrender.com/${params}`)
       
        let text = await response.json()

        $: document.getElementById('console').innerHTML = text

        messages = [...messages, {
          sender:  'Bot',
          class: 'start',
          bg: '',
          message: text
        }]
}
</script>
<svelte:head>
  <!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
  <title> AI Chatbot</title>

</svelte:head>
<div class="max-w-2xl border rounded">
<form on:submit|preventDefault={handleText}>
  <div class="w-full">
    <div class="relative flex items-center b-3 border-b border-gray-300">
     <span class="block ml-2 font-bold text-gray-600"> About Personality:  </span>
     <textarea class="bg-gray-300" bind:value={prompt}></textarea>

    </div>
    <div class="relative w-full p-6 overflow-y-auto h-[100%]">
      <ul class="space-y-2">
        <li class="flex justify-start">
          <div class="relative max-w-xl px-4 py-2 text-white-700 rounded shadow"> 
            <span id="console" class="block"> Hey </span>
          </div>
          </li>
        {#each messages as item}
          <li class="flex justify-{item.class}">
          <div class="relative max-w-xl px-4 py-2 text-gray-700 {item.bg} rounded shadow"> 
            <span class="block"> {item.message} </span>
          </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <div class="bottom-0 flex items-center justify-between w-full p-3 border-t border-gray-300">
  <input class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700" placeholder="Message" name="message" on:keyup={localStorage.setItem('newMessage', newMessage)} bind:value={newMessage} required type="text">
  <button class="btn btn-outline" type="submit">Submit</button>
</div>
</form>
</div>
