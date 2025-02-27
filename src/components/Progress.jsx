import {useQuiz} from "../contexts/QuizContext";

function Progress() {
    const {index, numberOfQuestions, points, maxPoints, answer} = useQuiz();
    return (
        <header className="progress">
            <progress
                value={index + Number(answer !== null)}
                max={numberOfQuestions}/>

            <p>
                Question <strong>{index + 1}</strong> / {numberOfQuestions}
            </p>

            <p>
                <strong>{points}</strong> / {maxPoints}
            </p>
        </header>
    )
}

export default Progress;