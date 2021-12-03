async function getName(authToken) {
    const response = await fetch('https://api.blooket.com/api/users/verify-token?token=JWT+' + authToken);
    const data = await response.json();

    return data.name
};

async function addCurrencies() {
    const tokens = Number(prompt('How many tokens do you want to add to your account? (1000 )'));
    const myToken = localStorage.token.split('JWT ')[1];

    if (tokens > 1000) {
        alert('You can only add up to 1000 tokens .')
    }

    const response = await fetch('https://api.blooket.com/api/users/add-rewards', {
        method: "PUT",
        headers: {
            "referer": "https://www.blooket.com/",
            "content-type": "application/json",
            "authorization": localStorage.token
        },
        body: JSON.stringify({
            addedTokens: tokens,
            addedXp: 7000,
            name: await getName(myToken)
        })
    });

    if (response.status == 300) {
        alert(`${tokens} tokens and 300 XP added to your account!`);
    } else {
        alert('.');
    };

};

addCurrencies();
