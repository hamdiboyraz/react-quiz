import React, {createContext, useContext, useEffect, useReducer} from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 20;

const initialState = {
    questions: [],
    status: "loading", // "loading", "error", "ready", "active", "finished"
    index: 0, // currentQuestion
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
}

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            };
        case "dataFailed":
            return {
                ...state,
                status: "error",
            }
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            }
        case "newAnswer":
            const currentQuestion = state.questions[state.index]; // state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points: action.payload === currentQuestion.correctOption ? state.points + currentQuestion.points : state.points
            }
        case "nextQuestion":
            return {
                ...state,
                index: state.index + 1,
                answer: null
            }
        case "finish":
            return {
                ...state,
                status: "finished",
                highScore: state.points > state.highScore ? state.points : state.highScore,

            }
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
            }
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status
            }
        default:
            throw new Error("Unknown action");
    }
}

function QuizProvider({children}) {
    const [{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining
    }, dispatch] = useReducer(reducer, initialState);

    const numberOfQuestions = questions.length;
    const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then(res => res.json())
            .then(data => dispatch({type: "dataReceived", payload: data}))
            .catch(err => dispatch({type: "dataFailed"}));
    }, [])

    return (
        <QuizContext.Provider value={{
            questions,
            status,
            index,
            answer,
            points,
            highScore,
            secondsRemaining,
            numberOfQuestions,
            maxPoints,
            dispatch
        }}>
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }
    return context;
}

export {QuizProvider, useQuiz};