
const cep = document.getElementById("cepEntrada");
const botao = document.getElementById("btn");


const ApiClima = "https://openweathermap.org/api"


botao.addEventListener("click", () => {
    const ApiCorreios = `https://viacep.com.br/ws/${cep.value}/json/`;
    try {

        fetch(ApiCorreios)
            .then(response => response.json())
            .then(data =>
                console.log(data))
            `<div class="card">
                <h6>"Endereço: ${}"</h6>
                <h6>"Bairro: ${}"</h6>
                <h6>"Estado: ${}"</h6>
                <h6>"CEP: ${}"</h6>
            </div>`

    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
});