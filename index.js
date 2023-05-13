const players = ["Joe", "Caroline", "Sabrina"];

function luckyDraw(player) {
    return new Promise((resolve, reject) => {
        const win = Boolean(Math.round(Math.random()));

        process.nextTick(() => {
            if (win) {
                resolve(`${player} won a prize in the draw!`);
            } else {
                reject(new Error(`${player} lost the draw.`));
            }
        });
    });
}

players.forEach(async (player) => {
    try {
        const win = await luckyDraw(player);
        console.log(win);
    } catch (err) {
        console.log(err);
    }
});
