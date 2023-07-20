/** 
console.log("Está é a ação nº1")

setTimeout(() => {
    console.log("Está é a ação nº2")
}, 5000)

console.log("Está é a ação nº3")

//Como realizar uma requisição
//metodo fetch(url:string)

const resposta = fetch('https://jsonplaceholder.typicode.com/users')
console.log(resposta)
//Promise

//then() => Método usado para tratar Promises

fetch('https://jsonplaceholder.typicode.com/users').then((resposta) => {
    return resposta.json()
})
    .then((dados) => {
        let content = ""
        dados.forEach(usuario => {
            content += `<div>`
            content += `<h1>${usuario.name}</h1>`
            content += `<p>${usuario.email}</p>`
            content += `</div> <hr />`
        });
        document.body.innerHTML = content
    })


fetch('https://jsonplaceholder.typicode.com/posts').then((requisicao) => {
    return requisicao.json()
      
})

.then ((post) => {
    let corpo = ""
    post.forEach(coment => {
        corpo += `<div>`
        corpo += `<h1>Titulo: ${coment.title}</h1>`
        corpo += `<p>Comentario: ${coment.body}</p>`
        corpo += `</div><hr/>`
    });
    document.body.innerHTML = corpo
})



fetch('https://jsonplaceholder.typicode.com/photos').then((req) => {
    return req.json()
})

.then ((data) => {
    let content = ""
    data.forEach(busca => { 
        content += `<div>`
        content += `<h1>${busca.title}</h1>`
        content += `<p><img src=${busca.url}></p>`
        content += `</div><hr/>`        
    });

    document.body.innerHTML = content
})
*/

let end = document.querySelector('#endereco')
let bairro = document.querySelector('#bairro')
let cidade = document.querySelector('#cidade')
let estado = document.querySelector('#estado')
let cep = document.querySelector('#cep')

function preencherFormulario(endereco) {
    end.value = endereco.logradouro
    bairro.value = endereco.bairro
    cidade.value = endereco.localidade
    estado.value = endereco.uf
}

function limparCampos() {
    end.value = ''
    bairro.value = ''
    cidade.value = ''
    estado.value = ''
    cep.value = ''
}

function validarCep(cep) {
    return cep.length == 8 && /^[0-9]+$/.test(cep);
}

function buscarEndereco() {
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;
    if (validarCep(cep.value)) {
        fetch(url)
            .then((resposta) => {
                return resposta.json()
            })
            .then((endereco) => {
                //verificando se o cep existe
                if (endereco.hasOwnProperty("erro")) {
                    alert("CEP não encontrado")
                }
                preencherFormulario(endereco);
            })
    }
    else {
        alert('CEP invalido!')
        limparCampos()
    }

}


// Adicionando evento de saida de foco
cep.addEventListener("blur", buscarEndereco)
