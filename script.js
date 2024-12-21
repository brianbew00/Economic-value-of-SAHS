
document.getElementById("calculate").addEventListener("click", function () {
    const childcareCost = parseFloat(document.getElementById("childcare-cost").value);
    const maintenanceCost = parseFloat(document.getElementById("maintenance-cost").value);
    const workExpenses = parseFloat(document.getElementById("work-expenses").value);
    const householdTaxRate = parseFloat(document.getElementById("household-tax-rate").value) / 100;
    const serviceTaxRate = parseFloat(document.getElementById("service-tax-rate").value) / 100;

    if (isNaN(childcareCost) || isNaN(maintenanceCost) || isNaN(workExpenses) || isNaN(householdTaxRate) || isNaN(serviceTaxRate)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    // Calculate total expenses
    const totalExpenses = childcareCost + maintenanceCost + workExpenses;

    // Calculate taxes on services
    const taxOnServices = totalExpenses * serviceTaxRate;

    // Calculate break-even gross income
    const breakEvenIncome = (totalExpenses + taxOnServices) / (1 - householdTaxRate);

    // Calculate tax rates for the chart
    const taxRates = [];
    const breakEvenIncomes = [];
    for (let rate = 0.1; rate <= 0.5; rate += 0.05) {
        taxRates.push((rate * 100).toFixed(0) + "%");
        const income = (totalExpenses + taxOnServices) / (1 - rate);
        breakEvenIncomes.push(income.toFixed(2));
    }

    renderChart(taxRates, breakEvenIncomes);

    // Display results
    document.getElementById("results").innerHTML = `
        <p>Total Expenses: $${totalExpenses.toFixed(2)}</p>
        <p>Tax on Services: $${taxOnServices.toFixed(2)}</p>
        <p>Break-Even Gross Income: $${breakEvenIncome.toFixed(2)}</p>
    `;
});

function renderChart(taxRates, breakEvenIncomes) {
    const ctx = document.getElementById("chart").getContext("2d");

    // Destroy existing chart if any
    if (window.breakEvenChart) {
        window.breakEvenChart.destroy();
    }

    // Create the chart
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
