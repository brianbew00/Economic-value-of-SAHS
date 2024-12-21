
document.getElementById("calculate").addEventListener("click", function () {
    const childcareCost = parseFloat(document.getElementById("childcare-cost").value);
    const maintenanceCost = parseFloat(document.getElementById("maintenance-cost").value);
    const workExpenses = parseFloat(document.getElementById("work-expenses").value);
    const minTaxRate = parseFloat(document.getElementById("min-tax-rate").value) / 100;
    const maxTaxRate = parseFloat(document.getElementById("max-tax-rate").value) / 100;

    console.log("Inputs:", { childcareCost, maintenanceCost, workExpenses, minTaxRate, maxTaxRate });

    if (isNaN(childcareCost) || isNaN(maintenanceCost) || isNaN(workExpenses) || isNaN(minTaxRate) || isNaN(maxTaxRate)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    const outsourcedTotal = childcareCost + maintenanceCost;
    const taxRates = [];
    const breakEvenIncomes = [];

    for (let rate = minTaxRate; rate <= maxTaxRate; rate += 0.05) {
        taxRates.push((rate * 100).toFixed(0) + "%");
        const breakEvenIncome = (outsourcedTotal + workExpenses) / (1 - rate);
        breakEvenIncomes.push(breakEvenIncome.toFixed(2));
    }

    renderChart(taxRates, breakEvenIncomes);
});

function renderChart(taxRates, breakEvenIncomes) {
    console.log("Rendering chart with data:", { taxRates, breakEvenIncomes });
    const ctx = document.getElementById("chart").getContext("2d");

    if (window.breakEvenChart) {
        window.breakEvenChart.destroy();
    }

    window.breakEvenChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: taxRates,
            datasets: [
                {
                    label: "Break-Even Income ($)",
                    data: breakEvenIncomes,
                    borderColor: "rgba(0, 123, 255, 1)",
                    backgroundColor: "rgba(0, 123, 255, 0.1)",
                    borderWidth: 2,
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}
