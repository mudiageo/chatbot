import {writable} from 'svelte/store'

let messages = writable([{
    sender:  null,
    class: 'end',
    bg: 'bg-gray-100',
    value: null
}])