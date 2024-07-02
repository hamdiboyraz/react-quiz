function FinishScreen({points, maxPoints, highScore}) {
    const percentage = (points / maxPoints) * 100;

    let emoji;

    if (percentage === 100) {
        emoji = "🥇";
    } else if (percentage >= 80) {
        emoji = "🎉";
    } else if (percentage >= 50) {
        emoji = "🙃";
    } else if (percentage > 0) {
        emoji = "🤨";
    } else if (percentage === 0) {
        emoji = "🤦‍♂️";
    }

    return (
        <>
            <p className="result">
                <span>{emoji}</span>
                You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong> ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">(Highscore: {highScore} points)</p>
        </>
    )
}

export default FinishScreen;