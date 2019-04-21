//LISTEN FOR SUBMIT
    document.getElementById('loan-form').addEventListener('submit',function(e) {
        //Hide results
        document.getElementById('results').style.display='none';
        //show loader
        document.getElementById('loading').style.display='none';
        //SetTimeout
        setTimeout(calculateResults(),2000);
        e.preventDefault();
});
//CALCULATE RESULTS
function calculateResults() {
    //UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    principal = parseFloat(amount.value);
    calculatedInterest = parseFloat(interest.value)/100/12;
    calculatedPayment = parseFloat(years.value) * 12;
    // COMPUTE MONTHLY PAYMENT
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest)/(x-1);
    
    if(isFinite(monthly)) {
        monthlyPayment.value=monthly.toFixed(2);
        totalPayment.value=(monthly*calculatedPayment).toFixed(2);
        totalInterest.value=((monthly*calculatedPayment)-principal).toFixed(2);

        //show Results
        document.getElementById('results').style.display ='block';

        //hide Loader
        document.getElementById('loading').style.display ='none';
    } else {
        showError('check your numbers');
    }
    
}
function showError(error) {
    
    //show Results
    document.getElementById('results').style.display ='none';

    //hide Loader
    document.getElementById('loading').style.display ='none';

    //create div
    const errorDiv = document.createElement('div');

    //get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //add class
    errorDiv.className = 'alert alert-danger';

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading
    card.insertBefore(errorDiv,heading);

    //set Timeout
    setTimeout(clearError, 3000);
}
function clearError() {
    document.querySelector('.alert').remove();
}