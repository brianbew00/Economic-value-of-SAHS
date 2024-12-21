
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

    // Display results
    document.getElementById("results").innerHTML = `
        <p>Total Expenses: $${totalExpenses.toFixed(2)}</p>
        <p>Tax on Services: $${taxOnServices.toFixed(2)}</p>
        <p>Break-Even Gross Income: $${breakEvenIncome.toFixed(2)}</p>
    `;
});
