import {useEffect, useReducer} from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";

const initialState = {
    questions: [],
    status: "loading", // "loading", "error", "ready", "active", "finished"
    index: 0, // currentQuestion
    answer: null,
    points: 0,
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
                status: "active"
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
        default:
            throw new Error("Unknown action");
    }
}

function App() {
    const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState);

    const numberOfQuestions = questions.length;

    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then(res => res.json())
            .then(data => dispatch({type: "dataReceived", payload: data}))
            .catch(err => dispatch({type: "dataFailed"}));
    }, [])

    return (
        <div className="app">
            <Header/>
            <Main>
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "ready" && <StartScreen numberOfQuestions={numberOfQuestions} dispatch={dispatch}/>}
                {status === "active" && (
                    <>
                        <Question question={questions[index]} answer={answer} dispatch={dispatch}/>
                        <NextButton answer={answer} dispatch={dispatch}/>
                    </>
                )}
            </Main>
        </div>
    );
}

export default App;
