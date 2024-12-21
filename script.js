
document.getElementById("calculate").addEventListener("click", function () {
    // Fetch input values
    const childcareCost = parseFloat(document.getElementById("childcare-cost").value);
    const maintenanceCost = parseFloat(document.getElementById("maintenance-cost").value);
    const workExpenses = parseFloat(document.getElementById("work-expenses").value);
    const householdTaxRate = parseFloat(document.getElementById("household-tax-rate").value) / 100;
    const serviceTaxRate = parseFloat(document.getElementById("service-tax-rate").value) / 100;

    // Validate input values
    if (
        isNaN(childcareCost) ||
        isNaN(maintenanceCost) ||
        isNaN(workExpenses) ||
        isNaN(householdTaxRate) ||
        isNaN(serviceTaxRate)
    ) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    // Calculate total expenses
    const totalExpenses = childcareCost + maintenanceCost + workExpenses;

    // Calculate taxes on services
    const taxOnServices = totalExpenses * serviceTaxRate;

    // Calculate taxes on spouse's wages
    const grossIncome = (totalExpenses + taxOnServices) / (1 - householdTaxRate);
    const taxOnWages = grossIncome * householdTaxRate;

    // Prepare data for bar chart
    const labels = ["Total Expenses", "Tax on Services", "Tax on Wages"];
    const data = [totalExpenses, taxOnServices, taxOnWages];

    renderBarChart(labels, data);

    // Calculate break-even gross income for line chart
    const taxRates = [];
    const breakEvenIncomes = [];
    for (let rate = 0.1; rate <= 0.5; rate += 0.05) {
        taxRates.push((rate * 100).toFixed(0) + "%");
        const income = (totalExpenses + taxOnServices) / (1 - rate);
        breakEvenIncomes.push(income.toFixed(2));
    }

    renderLineChart(taxRates, breakEvenIncomes);
});

function renderBarChart(labels, data) {
    const ctx = document.getElementById("bar-chart").getContext("2d");

    // Destroy existing chart if any
    if (window.barChart) {
        window.barChart.destroy();
    }

    // Create the bar chart
    window.barChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Cost Breakdown ($)",
                    data: data,
                    backgroundColor: ["#007BFF", "#28A745", "#FFC107"],
                    borderColor: ["#0056b3", "#19692c", "#d39e00"],
                    borderWidth: 1,
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

function renderLineChart(taxRates, breakEvenIncomes) {
    const ctx = document.getElementById("line-chart").getContext("2d");

    // Destroy existing chart if any
    if (window.lineChart) {
        window.lineChart.destroy();
    }

    // Create the line chart
    window.lineChart = new Chart(ctx, {
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
    });
}
