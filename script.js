
const cep = document.getElementById("cepEntrada");
const botao = document.getElementById("btn");
const div2 = document.getElementById("div2");

const API_KEY_CLIMA = "2d607b911829dc9bade3f885698242af";

botao.addEventListener("click", () => {
    carregarClima()
});

async function carregarClima() {
    try {
        const ApiCorreios = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
        const dadosCorreios = await ApiCorreios.json();

        if (dadosCorreios.error) {
            div2.innerHTML = "<p>CEP não encontrado.</p>";
            return;
        }

        const cidade = dadosCorreios.localidade
        const ApiClima = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&units=metric&lang=pt_br&appid=${API_KEY_CLIMA}`
        );
        const dadosClima = await ApiClima.json();

        if (dadosClima.cod !== 200) {
            div2.innerHTML = "<p>Não foi possível obter o clima.</p>";
            return;
        }

        criarCard(dadosCorreios, dadosClima);

    } catch (error) {
        div2.innerHTML = "<p>Erro ao buscar informações.</p>";
        console.error(error);
    }

}

function criarCard(endereco, clima) {
    const divClima = `               
    <div class="card">
        <h3>📍 Endereço</h3>
        <h6>"Endereço: ${endereco.logradouro}"</h6>
        <h6>"Complemento: ${endereco.complemento}"</h6>
        <h6>"Bairro: ${endereco.bairro}"</h6> 
        <h6>"Cidade: ${endereco.localidade}"</h6> 
        <h6>"Estado: ${endereco.uf}"</h6>
        <h6>"CEP: ${endereco.cep}"</h6>  
    </div>
        <div class="card">
        <h3>🌤 Clima em ${endereco.localidade}</h3>
        <p><strong>Temperatura:</strong> ${clima.main.temp}°C</p>
        <p><strong>Condição:</strong> ${clima.weather[0].description}</p>
        <p><strong>Umidade:</strong> ${clima.main.humidity}%</p>
        <p><strong>Vento:</strong> ${clima.wind.speed} m/s</p>
    </div>
    `
    div2.innerHTML = divClima
};