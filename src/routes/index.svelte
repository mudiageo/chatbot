
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

let params = Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')


        const response = await fetch(`https://express-hello-world-hh2h.onrender.com/?${params}`)
       
        let stuv = await response.text()
     //   $: document.getElementById('console').innerHTML = text
        let botMessage = stuv.slice(0, -data.stop_sequence.length)
       
 messages = [...messages, {
          sender:  'Bot',
          class: 'start',
          bg: '',
          message: botMessage
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

    <!-- MESSAGE INPUT AREA -->
    <div class="fixed w-full flex justify-between bg-green-100" style="bottom: 0px;">
      <textarea
        class="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none"
        rows="1"
on:keyup={localStorage.setItem('newMessage', newMessage)}
bind:value={newMessage}
        placeholder="Message..."
        style="outline: none;"
      ></textarea>
      <button class="m-2" style="outline: none;">
        <svg
          class="svg-inline--fa text-green-400 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="paper-plane"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
          />
        </svg>
      </button>
    </div>
   
</div>
</form>
</div>
