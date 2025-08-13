const cep = document.getElementById("cepEntrada");
const botao = document.getElementById("btn");
const div2 = document.getElementById("div2");

const API_KEY_CLIMA = "SUA_API_KEY_AQUI"; // Coloque sua chave do OpenWeather

botao.addEventListener("click", () => {
    carregarInfo();
});

async function carregarInfo() {
    try {
        // 1️⃣ Buscar endereço pelo CEP
        const resCep = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
        const dadosCep = await resCep.json();

        if (dadosCep.erro) {
            div2.innerHTML = "<p>CEP não encontrado.</p>";
            return;
        }

        // 2️⃣ Buscar clima pelo nome da cidade
        const cidade = dadosCep.localidade;
        const estado = dadosCep.uf;
        const resClima = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&units=metric&lang=pt_br&appid=${API_KEY_CLIMA}`
        );
        const dadosClima = await resClima.json();

        if (dadosClima.cod !== 200) {
            div2.innerHTML = "<p>Não foi possível obter o clima.</p>";
            return;
        }

        // 3️⃣ Mostrar endereço + clima
        criarCard(dadosCep, dadosClima);
    } catch (error) {
        div2.innerHTML = "<p>Erro ao buscar informações.</p>";
        console.error(error);
    }
}

function criarCard(endereco, clima) {
    const divInfo = `               
    <div class="card">
        <h3>📍 Endereço</h3>
        <p><strong>Logradouro:</strong> ${endereco.logradouro}</p>
        <p><strong>Complemento:</strong> ${endereco.complemento || "N/A"}</p>
        <p><strong>Bairro:</strong> ${endereco.bairro}</p>
        <p><strong>Estado:</strong> ${endereco.uf}</p>
        <p><strong>CEP:</strong> ${endereco.cep}</p>
        
        <h3>🌤 Clima em ${endereco.localidade}</h3>
        <p><strong>Temperatura:</strong> ${clima.main.temp}°C</p>
        <p><strong>Condição:</strong> ${clima.weather[0].description}</p>
        <p><strong>Umidade:</strong> ${clima.main.humidity}%</p>
        <p><strong>Vento:</strong> ${clima.wind.speed} m/s</p>
    </div>
    `;
    div2.innerHTML = divInfo;
}
