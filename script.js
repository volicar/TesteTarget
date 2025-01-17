const fs = require('fs'); 
const { DOMParser } = require('xmldom');

// Função para carregar arquivos JSON
function carregarJSON(caminho) {
    try {
        const dados = fs.readFileSync(caminho, 'utf8');
        return JSON.parse(dados);
    } catch (error) {
        throw new Error(`Erro ao carregar o JSON: ${error.message}`);
    }
}

// Função para carregar arquivos XML
function carregarXML(caminho) {
    try {
        const xmlText = fs.readFileSync(caminho, 'utf8');
        const parser = new DOMParser();
        return parser.parseFromString(xmlText, 'text/xml');
    } catch (error) {
        throw new Error(`Erro ao carregar o XML: ${error.message}`);
    }
}

// Questão 1: Soma de números de 1 a 13
function questao1() {
    let INDICE = 13;
    let SOMA = 0;
    let K = 0;

    while (K < INDICE) {
        K = K + 1;
        SOMA = SOMA + K;
    }

    console.log('Questão 1:');
    console.log(`Resultado da SOMA: ${SOMA}`); // Resultado: 91
}

// Questão 2: Verificar se um número pertence à sequência de Fibonacci
function questao2(numero) {
    let a = 0, b = 1, temp;

    while (b < numero) {
        temp = a + b;
        a = b;
        b = temp;
    }

    const pertence = (b === numero || numero === 0 || numero === 1);
    console.log('\nQuestão 2:');
    console.log(`${numero} ${pertence ? 'pertence' : 'não pertence'} à sequência de Fibonacci.`);
}

// Questão 3: Faturamento diário com JSON
function questao3Json(dados) {
    const faturamentosValidos = dados.filter(d => d.valor > 0).map(d => d.valor);

    const menor = Math.min(...faturamentosValidos);
    const maior = Math.max(...faturamentosValidos);
    const media = faturamentosValidos.reduce((a, b) => a + b, 0) / faturamentosValidos.length;
    const diasAcimaMedia = dados.filter(d => d.valor > media).length;

    console.log('\nQuestão 3 (JSON):');
    console.log(`Menor valor: ${menor.toFixed(2)}`);
    console.log(`Maior valor: ${maior.toFixed(2)}`);
    console.log(`Dias acima da média: ${diasAcimaMedia}`);
}

// Questão 3: Faturamento diário com XML
function questao3Xml(xmlDoc) {
    const rows = xmlDoc.getElementsByTagName('row');

    const dados = Array.from(rows).map(row => ({
        dia: parseInt(row.getElementsByTagName('dia')[0].textContent, 10),
        valor: parseFloat(row.getElementsByTagName('valor')[0].textContent)
    }));

    const faturamentosValidos = dados.filter(d => d.valor > 0).map(d => d.valor);

    const menor = Math.min(...faturamentosValidos);
    const maior = Math.max(...faturamentosValidos);
    const media = faturamentosValidos.reduce((a, b) => a + b, 0) / faturamentosValidos.length;
    const diasAcimaMedia = dados.filter(d => d.valor > media).length;

    console.log('\nQuestão 3 (XML):');
    console.log(`Menor valor: ${menor.toFixed(2)}`);
    console.log(`Maior valor: ${maior.toFixed(2)}`);
    console.log(`Dias acima da média: ${diasAcimaMedia}`);
}

// Questão 4: Percentual por estado
function questao4() {
    const faturamentoEstados = {
        SP: 67836.43,
        RJ: 36678.66,
        MG: 29229.88,
        ES: 27165.48,
        Outros: 19849.53
    };

    const total = Object.values(faturamentoEstados).reduce((acc, val) => acc + val, 0);

    console.log('\nQuestão 4:');
    for (const estado in faturamentoEstados) {
        const percentual = (faturamentoEstados[estado] / total) * 100;
        console.log(`${estado}: ${percentual.toFixed(2)}%`);
    }
}

// Questão 5: Inverter string
function questao5(string) {
    let invertida = '';
    for (let i = string.length - 1; i >= 0; i--) {
        invertida += string[i];
    }

    console.log('\nQuestão 5:');
    console.log(`String invertida: ${invertida}`);
}


function main() {
    try {
        questao1();
        questao2(21); // Substitua pelo número desejado

        const dadosJson = carregarJSON('./dados.json');
        questao3Json(dadosJson);

        const xmlDoc = carregarXML('./dados.xml');
        questao3Xml(xmlDoc);

        questao4();
        questao5('desenvolvedor');
    } catch (error) {
        console.error('Erro durante a execução:', error);
    }
}


main();
