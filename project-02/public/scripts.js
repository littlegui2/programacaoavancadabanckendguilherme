const EventEmitter = require('events')
const fs = require('fs')
const { dirname } = require('path')
const path = require('path')
const data = require('./api/urls.json')

const ul = document.querySelector('ul')
const input = document.querySelector('input')
const form = document.querySelector('form')

async function load(){
    const res = await fetch('http://localhost:3000/').then(data => data.json())
    res.urls.map(({name , url}) => addElement({name ,url}))
}
load()

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"
    


    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(element) {
    if (confirm('Tem certeza que deseja deletar?'))
        element.parentNode.remove()
}


form.addEventListener('submit', (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo!')

    const [name, url] = value.split(',')

    if (!url) 
        return alert('O texto não está formatado da maneira correta.')

    if (!/^http/.test(url)) 
        return alert('Digite a url da maneira correta.')

    addElement({ name, url })
    adicionarurl({ name , url})

    input.value = ''
})