
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

    // Calculate Break-Even Income
    const breakEvenIncome = totalExpenses / (1 - householdTaxRate);

    // Calculate Household Tax
    const householdTax = breakEvenIncome - totalExpenses;

    // Calculate Service Tax
    const serviceTax = totalExpenses * serviceTaxRate;

    // Calculate Total Tax Burden
    const totalTaxBurden = householdTax + serviceTax;

    // Debugging logs
    console.log("Total Expenses:", totalExpenses);
    console.log("Break-Even Income:", breakEvenIncome);
    console.log("Household Tax:", householdTax);
    console.log("Service Tax:", serviceTax);
    console.log("Total Tax Burden:", totalTaxBurden);

    // Prepare data for bar chart
    const labels = ["Break-Even Income", "Household Tax", "Service Tax", "Total Tax Burden"];
    const data = [breakEvenIncome, householdTax, serviceTax, totalTaxBurden];

    renderBarChart(labels, data);

    // Prepare data for line chart (for different household tax rates)
    const taxRates = [];
    const breakEvenIncomes = [];
    for (let rate = 0.1; rate <= 0.5; rate += 0.05) {
        taxRates.push((rate * 100).toFixed(0) + "%");
        const income = totalExpenses / (1 - rate);
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
                    backgroundColor: ["#007BFF", "#28A745", "#FFC107", "#DC3545"],
                    borderColor: ["#0056b3", "#19692c", "#d39e00", "#b21f2d"],
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
