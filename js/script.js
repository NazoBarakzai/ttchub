function handleApply(e) {
  e.preventDefault();

  const form = document.getElementById("applyForm");

  const data = {
    full_name: form.full_name.value,
    phone: form.phone.value,
    email: form.email.value,
    age: form.age.value,
    trade: form.trade.value,
    message: form.message.value
  };

  fetch("http://localhost:3000/apply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    if (response.success) {
      alert("Application submitted successfully!");
      form.reset();
    } else {
      alert(response.message);
    }
  })
  .catch(err => {
    console.error(err);
    alert("Error submitting form");
  });
}
