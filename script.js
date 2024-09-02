// Referencias a los elementos del DOM
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateButton = document.getElementById('calculate');
const resultDiv = document.getElementById('result');
const resultsList = document.getElementById('resultsList');

// Funciones matemáticas
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) return "Error: División por cero";
    return a / b;
}
function percentage(a, b) { return (a / b) * 100; }

// Función para mostrar y actualizar resultados guardados en localStorage
function displayPreviousResults() {
    const storedResults = JSON.parse(localStorage.getItem('results')) || [];
    resultsList.innerHTML = '';
    storedResults.forEach(result => {
        const li = document.createElement('li');
        li.textContent = `${result.operation}: ${result.result}`;
        resultsList.appendChild(li);
    });
}

// Evento de cálculo
calculateButton.addEventListener('click', () => {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;

    let result;

    switch(operation) {
        case 'add': result = add(num1, num2); break;
        case 'subtract': result = subtract(num1, num2); break;
        case 'multiply': result = multiply(num1, num2); break;
        case 'divide': result = divide(num1, num2); break;
        case 'percentage': result = percentage(num1, num2); break;
        default: result = 'Operación inválida'; break;
    }

    // Mostrar resultado en la página
    resultDiv.textContent = `El resultado de la ${operation} es: ${result}`;

    // Guardar en localStorage
    const storedResults = JSON.parse(localStorage.getItem('results')) || [];
    storedResults.push({ operation, result });
    localStorage.setItem('results', JSON.stringify(storedResults));

    // Actualizar lista de resultados previos
    displayPreviousResults();
});

// Mostrar resultados previos al cargar la página
document.addEventListener('DOMContentLoaded', displayPreviousResults);