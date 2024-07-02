import {useEffect, useReducer} from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState = {
    questions: [],
    status: "loading", // "loading", "error", "ready", "active", "finished"
    index: 0, // currentQuestion
    answers: []
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
        default:
            throw new Error("Unknown action");
    }
}

function App() {
    const [{questions, status, index}, dispatch] = useReducer(reducer, initialState);

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
                {status === "active" && <Question question={questions[index]}/>}
            </Main>
        </div>
    );
}

export default App;
