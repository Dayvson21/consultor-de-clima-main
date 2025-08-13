
const cep = document.getElementById("cepEntrada");
const botao = document.getElementById("btn");
const div2 = document.getElementById("div2");


const ApiClima = "https://openweathermap.org/api"

botao.addEventListener("click", () => {
    carregarClima()
});

async function carregarClima() {
    try {
        const ApiCorreios = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
        const dados = await ApiCorreios.json();

        if (dados.error) {
            div2.innerHTML = "<p>CEP não encontrado.</p>";
            return;
        }
        criarCard(dados);
    } catch (error) {
        div2.innerHTML = "<p>Erro ao buscar dados.</p>";
        console.error(error);
    }

}

function criarCard(dados) {
    const divClima = `               
    <div class="card">
        <h6>"Endereço: ${dados.logradouro}"</h6>
        <h6>"Complemento: ${dados.complemento}"</h6>
        <h6>"Bairro: ${dados.bairro}"</h6> 
        <h6>"Estado: ${dados.uf}"</h6>
        <h6>"CEP: ${dados.cep}"</h6>
      
    </div>
    `
    div2.innerHTML = divClima
};