
<script>
  import {onMount} from 'svelte'
  let messages = []
  let prompt 
  onMount(() => {
    messages =  JSON.parse(localStorage.getItem('messages'))|| []  
    prompt =  JSON.parse(localStorage.getItem('prompt')) || ''
 
})
    let newMessage
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
       let data = JSON.stringify({
         context: context,
         temperature: 1,
         token_max_length: 30,
         top_p: 0.9,
         stop_sequence: 'Mudia: '
       })
        const response = await fetch(`http://api.vicgalle.net:5000/generate?context=${context}&token_max_length=30&top_p=0.8&temperature=1&stop_sequence=Mudia: `, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },

       
        })

        console.log('test1')

        const test = await response.json()
        console.log(test)

        
}
</script>
<svelte:head>
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
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
          <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow"> 
            <span class="block"> Hey </span>
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
  <input class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700" placeholder="Message" name="message" bind:value={newMessage} required type="text">
  <button class="btn btn-outline" type="submit">Submit</button>
</div>
</form>
</div>
