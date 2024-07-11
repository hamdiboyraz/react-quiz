function NextButton({answer, index, numberOfQuestions, dispatch}) {
    if (answer === null) return null;

    const isLastQuestion = index === numberOfQuestions - 1;
    const buttonText = isLastQuestion ? "Finish" : "Next";
    const actionType = isLastQuestion ? "finish" : "nextQuestion";

    return (
        <button
            className="btn btn-ui"
            onClick={() => dispatch({type: actionType})}
        >
            {buttonText}
        </button>
    );
}


export default NextButton;