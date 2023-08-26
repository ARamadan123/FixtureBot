const players = [
    {
        name: "Boody",
        number: 54,
    },
    {
        name: "Khaled Rammal",
        number: 9, 
    },
    {
        name: "Michael Asaad",
        number: 121,
    }
]

for (let i = 0; i < players.length; i++) {
    console.log(`${players[i].number.toString().padEnd(5)}${players[i].name}`)
}