import {useQuiz} from "../contexts/QuizContext";

function Options({question}) {
    const {answer, dispatch} = useQuiz();
    console.log(question)
    const hasAnswer = answer !== null;
    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    className={`
                        btn btn-option 
                        ${index === answer ? "answer" : ""} 
                        ${hasAnswer
                        ? index === question.correctOption ? "correct" : "wrong"
                        : ""}
                        `}
                    key={option}
                    disabled={hasAnswer}
                    onClick={() => dispatch({type: "newAnswer", payload: index})}
                >
                    {option}
                </button>
            ))}
        </div>
    )
}

export default Options;