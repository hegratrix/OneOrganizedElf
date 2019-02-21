//Generates the Christmas Countdown
function showDate() {
    let year = moment().format('YYYY');
    const countDownDate = new Date(`Dec 25, ${year} 00:00:00`).getTime();
    var x = setInterval(function() {
			let now = new Date().getTime();
			let distance = countDownDate - now;
			let days = Math.floor(distance / (1000 * 60 * 60 * 24));
			let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			let seconds = Math.floor((distance % (1000 * 60)) / 1000);
			document.querySelector(".countdown").innerHTML = `Countdown to Christmas: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} sec`;
    }, 1000);
};

// function showDate() {
//     let year = moment().format('YYYY')
//     let countDownDate = new Date(`Dec 25, ${year} 00:00:00`).getTime()
//     let now = new Date().getTime();
//     let distance = countDownDate - now;
//     let seconds = Math.floor((distance % (1000 * 60)) / 1000);
//     // if (seconds < 0) {
//     //   year++
//     //   countDownDate = new Date(`Dec 25, ${year} 00:00:00`).getTime()
//     // }
//     let x = setInterval(function() {
//       distance = countDownDate - now;
//       let days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       seconds = Math.floor((distance % (1000 * 60)) / 1000);
//       document.querySelector(".countdown").innerHTML = `Countdown to Christmas: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} sec`
//     }, 1000) 
//   }