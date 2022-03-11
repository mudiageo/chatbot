<script>
  import {onMount} from 'svelte'
  import Icon from 'svelte-awesome';
  import { beer, trash, comment, codeFork, camera, ban } from 'svelte-awesome/icons';
  //import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';  
  import { page } from '$app/stores' 
  import  { v4 as randomUUID} from 'uuid'
  let messages = []
  let selectedMessages  = []
  let prompt, newMessage = ''
  let timer;
  let botName = $page.params.bot || 'Mudiaga' 
  let yourName  = $page.params.you || 'You'
  
  
  
  onMount(() => {
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    messages =  JSON.parse(localStorage.getItem('messages')) || []  
    newMessage =  localStorage.getItem('newMessage') || 'hey'
    prompt =  localStorage.getItem('prompt') || ''
    $:  localStorage.setItem('newMessage', newMessage)


const recognition = new SpeechRecognition()
recognition.interimResults = true
recognition.lang = 'en-US'
recognition.addEventListener('result', (e)=> {
newMessage = e.results[0][0].transcript
})
 
})
  const handleText = async (e) => {

      messages = [...messages, {
          messageId: randomUUID(),
          sender:  yourName,
          class: 'end',
          bg: 'bg-gray-200',
          message: newMessage,
          timestamp: Date.now()
        }]

        newMessage = ""
        localStorage.setItem('newMessage', '')
        localStorage.setItem('prompt', prompt)
        localStorage.setItem('messages', JSON.stringify(messages))
        let promptMessages = messages.map((item) => `${item.sender}: ${item.message} ${botName}: `).toString().replaceAll(`${botName}: ,`, ' ')


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
          messageId: randomUUID(),
          sender:  botName,
          class: 'start',
          bg: '',
          message: botMessage,
          timestamp: Date.now()
        }]

}

const deleteAllMessages = () => {
if(confirm("Are you sure you want to delete previous all messages?")) {
messages=[]
 localStorage.removeItem("messages")
}
}
const deleteMessage = messageId => {
messages = messages.filter( message => message.messageId !== messageId)


}
const deleteSelectedMessages = () => {
if(confirm("Are you sure you want to delete the selected messages?")) {

 

selectedMessages.forEach( message => {
deleteMessage(message)
})
//localStorage.setItem("messages", messages)
cancelSelection()
}
}

const handleSelect = messageId => {

let myTimer = Date.now() - timer

if(myTimer > 800){

if(!selectedMessages.includes(messageId)){
selectedMessages = [...selectedMessages, messageId]
messages = messages.map((message) => {
if(message.messageId === messageId){
message.bg = 'bg-gray-600 text-white'
message.class = message.class+' bg-sky-200'
}
return message
})

}else{
selectedMessages = selectedMessages.filter( message => message !== messageId)
messages = messages.map((message) => {
if(message.messageId === messageId){
if(message.class === 'end bg-sky-200' || message.class === 'end'){
message.bg = 'bg-gray-200'
message.class = 'end'
}else{
message.bg = ''
message.class = 'start'
}


}
return message
})
}


if(document.getElementById("selection-menu").classList.contains("hidden")){
toggleMenu()
}

}

else{


if(selectedMessages.length > 0 && !selectedMessages.includes(messageId)){
selectedMessages = [...selectedMessages, messageId]
messages = messages.map((message) => {
if(message.messageId === messageId){
message.bg = 'bg-gray-600 text-white'
message.class = message.class+' bg-sky-200'
}

return message
})
 } else {
messages = messages.map((message) => {
if(message.messageId === messageId){
if(message.class === 'end bg-sky-200' || message.class === 'end'){
message.bg = 'bg-gray-200'
message.class = 'end'
}else{
message.bg = ''
message.class = 'start'
}
}
return message
})

selectedMessages = selectedMessages.filter( message => message !== messageId)
}
}
if(selectedMessages.length === 0 && !document.getElementById("selection-menu").classList.contains("hidden") ){toggleMenu()}

}
const cancelSelection = () => {
selectedMessages = []
messages = messages.map((message) => {
if(message.class === 'end bg-sky-200' || message.class === 'end'){
message.bg = 'bg-gray-200'
message.class = 'end'
}else{
message.bg = ''
message.class = 'start'
}
return message
})
toggleMenu()
}
const startVoiceCapture = () => {

recognition.start()
}

const stopVoiceCapture = () => {

recognition.stop()
}
const toggleMenu = () => {

 $: document.getElementById("normal-menu").classList.toggle("hidden")
 $: document.getElementById("selection-menu").classList.toggle("hidden")

}
const lastMessage = () => {
if(messages){
   return messages[messages.length-1].message }
else { return 'No recent messages'
}
}
const toggleChat = () => {
 $: document.getElementById("messages-section").classList.toggle("hidden")
 $: document.getElementById("chat-section").classList.toggle("hidden")
}

</script>
<svelte:head>
  <!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
  <title> AI Chatbot</title>

</svelte:head>
<form on:submit|preventDefault={handleText} class="" style="overscroll-behavior: none;">
<div class="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div id="chat-section" class="border-r border-gray-300 lg:col-span-1">
          <div class="mx-3 my-3">
            <div class="relative text-gray-600">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  viewBox="0 0 24 24" class="w-6 h-6 text-gray-300">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input type="search" class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                placeholder="Search" />
            </div>
          </div>

          <ul class="overflow-auto">
            <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            <li>
             
              <a on:click={toggleChat}
                class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                <img class="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600">{$page.params.bot}</span>
                    <span class="block ml-2 text-sm text-gray-600">6 hour</span>
                  </div>
                  <span class="block ml-2 text-sm text-gray-600">{lastMessage()}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div id="messages-section" class="hidden flex flex-col h-screen lg:col-span-2 lg:block">
          <div class="w-full h-full">
            <div id="normal-menu" class="relative flex items-center p-1 border-b border-gray-300 sticky top-0 z-30">
              <a on:click={toggleChat}>
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
        </a>
              <img class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
              <span class="block ml-2 font-bold text-gray-600">{$page.params.bot}</span>
            <!--  <span class="absolute w-3 h-3 bg-green-600 rounded-full left-0 top-3">
              </span>-->
<span on:click={deleteAllMessages} class="right-0 absolute justify-end p-3"><Icon data={trash}/></span>
            </div>
<div id="selection-menu" class="relative hidden flex items-center p-1 border-b border-sky-500 h-12 text-white bg-sky-500 sticky top-0 z-30">
              <a on:click={cancelSelection}>
          X
        </a>
                <span class="block ml-2 font-bold">{selectedMessages.length}</span>
            
<span on:click={deleteSelectedMessages} class="right-0 absolute justify-end p-3"><Icon data={trash}/></span>

            </div>
<!--on:mousedown={() => { timer = Date.now() }} on:mouseup={handleSelect(item.messageId)} on:pointerdown={() => { timer = Date.now() }} on:pointerup={handleSelect}-->
                 
            <div class="relative w-full p-6 overflow-y-auto h-full">
              <ul class="space-y-2">
                      {#each messages as item}

                <li style="-webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none;user-select: none;" on:touchstart={() => { timer = Date.now() }} on:touchend={handleSelect(item.messageId)} on:click={handleClick(item.messageId)}  class="flex justify-{item.class}">
                  

<div class="{item.bg} relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                    <span class="block">{item.message}</span>
                  </div>
                </li>
                {/each}
              </ul>
            </div>
<!--Message Input Section-->
            <div class="flex items-center justify-between bg-white w-full p-3 border-t border-gray-300 sticky bottom-0">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
           <!--   <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>-->
              <input type="text"
                class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" on:keyup={localStorage.setItem('newMessage', newMessage)}  bind:value={newMessage} placeholder="Message..."  required />
              {#if !newMessage.trim()}
<button on:touchstart={startVoiceCapture} on:touchend={stopVoiceCapture}>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
          {:else}
              <button type="submit">
                <svg class="w-5 h-5 text-blue-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
  {/if}         
            </div>
         
         
          </div>
        </div>
      </div>
   </form>
