function vote(candidate) {
    // Handle the vote logic here
    console.log("Vote for " + candidate);
    // You can replace the console.log statement with your own logic to process the vote
    document.getElementById("vote_status").innerText="Vote taken into account! Redirecting...";
    redirect("/results");
}

function success_qr_code_reading(){
    document.getElementById("qr_status").innerText="QR code read successfully! Redirecting...";
    redirect("/vote");
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?-=[];,./';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function redirect(page) {
    const wait_before_redirect = new Promise(resolve => setTimeout(resolve, 1000))
    wait_before_redirect.then(() => {
        window.location.replace(page)
    });
}