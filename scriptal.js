function calcular() {
    var n1 = document.getElementById("n1").value
    var n2 = document.getElementById("n2").value
    var n3 = document.getElementById("n3").value

    var media = (Number(n1) + Number(n2) + Number(n3)) / 3

    if (isNaN(n1) || isNaN(n2) || isNaN(n3) || n1 < 0 || n2 < 0 || n3 < 0) {
        alert("Inserir apenas números positivos por gentileza!");
        return;
    }

    alert(`A média dos valores é:  ${media.toFixed(2)}`)

    console.log(`A média dos valores é: ${media}`)
}

