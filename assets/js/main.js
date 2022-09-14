(function () {
    async function fetchRandom() {
        return fetch("https://api.adviceslip.com/advice", { method: "GET" })
            .then(function (response) {
                return response.json();
            })
            .catch(function (err) {
                console.log(err);
            })
    };

    async function randomAdvice() {
        let advice = null;
        let isFetchNew = false;
        do {
            advice = await fetchRandom();
            if (advice) {
                const lastId = localStorage.getItem('last_id');
                if (lastId === null) {
                    localStorage.setItem("last_id", advice.slip.id);
                    document.getElementById("advice-number").innerText = advice.slip.id;
                    document.getElementById("advice-text").innerText = `" ${advice.slip.advice} "`;
                } else {
                    if (lastId === advice.slip.id) {
                        isFetchNew = true;
                    } else {
                        document.getElementById("advice-number").innerText = advice.slip.id;
                        document.getElementById("advice-text").innerText = `" ${advice.slip.advice} "`;
                        localStorage.setItem("last_id", advice.slip.id);
                    }
                }
            }
        } while (isFetchNew)
    }
    randomAdvice();
    document.getElementById("btn-random").addEventListener("click", randomAdvice);
})();
