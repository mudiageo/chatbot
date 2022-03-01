
<script>
  import {onMount} from 'svelte'
  
 import { page } from '$app/stores' 
  let messages = []
  let prompt, newMessage = ''
  let botName = $page.params.bot || 'Mudiaga' 
  let yourName  = $page.params.you || 'You'
  
  
  
  onMount(() => {
    messages =  JSON.parse(localStorage.getItem('messages')) || []  
    newMessage =  localStorage.getItem('newMessage') || 'hey'
    prompt =  localStorage.getItem('prompt') || ''
    $:  localStorage.setItem('newMessage', newMessage)

 
})
  const handleText = async (e) => {

      messages = [...messages, {
          sender:  yourName,
          class: 'clearfix',
          bg: 'bg-gray-800',
          message: newMessage
        }]

        newMessage = ""
        localStorage.setItem('prompt', prompt)
        localStorage.setItem('messages', JSON.stringify(messages))
        let promptMessages = messages.map((item) => `${item.sender}: ${item.message} ${botName}: `).toString().replaceAll(`${botName}`, '')


        let context = `${prompt} ${promptMessages}`
       let data = {
         context: context,
         temperature: 1,
         token_max_length: 30,
         top_p: 0.9,
         stop_sequence: `${yourName}: `
       }

let params = Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')


        const response = await fetch(`https://express-hello-world-hh2h.onrender.com/?${params}`)
       
        let stuv = await response.text()
     //   $: document.getElementById('console').innerHTML = text
        let botMessage = stuv.slice(0, -data.stop_sequence.length)
       
 messages = [...messages, {
          sender:  botName,
          class: '',
          bg: '',
          message: botMessage
        }]

}

const deleteAllMessages = () => {
if(confirm("Are you sure you want to delete previous all messages?")) {

 localStorage.removeItem("messages")
}
}

</script>
<svelte:head>
  <!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
  <title> AI Chatbot</title>

</svelte:head>

<form on:submit|preventDefault={handleText} style="overscroll-behavior: none;">
  <!-- HEADING -->
      <div
        class="fixed w-full bg-sky-500 h-16 pt-2 text-black flex justify-between shadow-md"
        style="top:0px; overscroll-behavior: none;"
      >
        <!-- back button -
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-12 h-12 my-1 text-sky-100 ml-2"
          >
            <path
              class="text-sky-100 fill-current"
              d="M9.41 11H17a1 1 0 0 1 0 2H9.41l2.3 2.3a1 1 0 1 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L9.4 11z"
            />
          </svg>
        </a>-->
        <div class="my-3 text-black-800 font-bold text-lg tracking-wide">Prompt: <textarea class="bg-black-800" bind:value={prompt}></textarea></div>
        <!-- 3 dots -->
        <div on:click={deleteAllMessages}> Clear

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="icon-dots-vertical w-8 h-8 mt-2 mr-2"
             >
          <path
            class="text-sky-100 fill-current"
            fill-rule="evenodd"
            d="M12 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
          />
        </svg>
          </div>

        
      </div>

      <!-- MESSAGES -->
      <div class="mt-20 mb-16">

       {#each messages as item}
        <div class="clearfix">
          <div
            class="{item.bg}  w-3/4 mx-4 my-2 p-2 rounded-lg  {item.class}"
          >{item.message}</div>
        </div>
{/each}
</div>

    <!-- MESSAGE INPUT AREA -->
    <div class="fixed w-full flex justify-between bg-sky-200" style="bottom: 0px;">
      <textarea
        class="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 text-black-200 bg-gray-200 resize-none"
        rows="1"
on:keyup={localStorage.setItem('newMessage', newMessage)}
bind:value={newMessage}
        placeholder="Message..."
        style="outline: none;"
      ></textarea>
      <button class="m-2" style="outline: none;">
        <svg
          class="svg-inline--fa text-sky-400 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2"
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
   

</form>

