// Timer functionality
let timerElement = document.getElementById('timer');
let timerTime = 13 * 60 + 26; // 13:26 in seconds

function updateTimer() {
  if (timerTime <= 0) {
    clearInterval(timerInterval);
  } else {
    timerTime--;
    const minutes = Math.floor(timerTime / 60);
    const seconds = timerTime % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

let timerInterval = setInterval(updateTimer, 1000);

// Toggle payment option details when selected
function toggleDetails(paymentOption) {
  const paymentDetail = paymentOption.closest('.payment-option').nextElementSibling;
  const chevronIcon = paymentOption.closest('.payment-option').querySelector('i.fas');

  // Toggle the chevron icon and payment details
  if (paymentDetail.style.display === 'none' || paymentDetail.style.display === '') {
    paymentDetail.style.display = 'block';
    chevronIcon.classList.remove('fa-chevron-down');
    chevronIcon.classList.add('fa-chevron-up');
  } else {
    paymentDetail.style.display = 'none';
    chevronIcon.classList.remove('fa-chevron-up');
    chevronIcon.classList.add('fa-chevron-down');
  }
}

// Ensure only one payment option is selected (handled by radio buttons)
document.querySelectorAll('input[name="payment"]').forEach((paymentOption) => {
  paymentOption.addEventListener('change', function() {
    // Close other payment option details when a new one is selected
    document.querySelectorAll('.payment-detail').forEach((detail) => {
      detail.style.display = 'none';
    });
    // Reset chevrons when selecting a new payment option
    document.querySelectorAll('.payment-option i.fas').forEach((icon) => {
      icon.classList.remove('fa-chevron-up');
      icon.classList.add('fa-chevron-down');
    });
  });
});

// Coupon Code Application
document.getElementById('apply-coupon').addEventListener('click', function() {
  const couponCode = document.getElementById('coupon-code').value.trim();
  const couponMessage = document.getElementById('coupon-message');

  if (couponCode === '') {
    couponMessage.textContent = 'Please enter a coupon code!';
    couponMessage.style.color = 'red';
  } else {
    couponMessage.textContent = 'Coupon applied successfully!';
    couponMessage.style.color = 'green';

    // Apply coupon logic (you can add actual coupon validation here)
    let totalAmount = document.getElementById('total-amount');
    let newTotal = 2552 - 100; // Simulating a ₹100 discount
    totalAmount.textContent = `₹${newTotal}`;
  }
});

// Payment form submission logic
document.getElementById('payment-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Check selected payment method
  const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked');
  if (!selectedPaymentMethod) {
    alert('Please select a payment method!');
    return;
  }

  const paymentMethod = selectedPaymentMethod.value;

  // Show payment summary modal
  const modal = document.getElementById('payment-summary-modal');
  const confirmPaymentButton = document.getElementById('confirm-payment');

  // Update modal with selected payment method
  const paymentSummaryList = modal.querySelector('ul');
  paymentSummaryList.innerHTML = `
    <li>Item Price: ₹2,549</li>
    <li>Delivery Fee: Free</li>
    <li>Platform Fee: ₹3</li>
    <li>Total Payable: ₹2,552</li>
    <li>Payment Method: ${paymentMethod}</li>
  `;

  modal.style.display = 'flex';

  // Confirm payment
  confirmPaymentButton.addEventListener('click', function() {
    modal.style.display = 'none';
    alert('Payment confirmed! Thank you for your purchase.');
  });

  // Close modal
  document.getElementById('close-modal').addEventListener('click', function() {
    modal.style.display = 'none';
  });
});

// Support chat button
document.getElementById('support-chat').addEventListener('click', function() {
  alert('Chat with support is not available in this demo.');
});
