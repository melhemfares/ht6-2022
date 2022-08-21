import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

import Question from "../components/Question";

import {
    View
  } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Play = (props) => {
    const [loading, setLoading] = useState(true);
    const [quizData, setQuizData] = useState(null);
    const [currIndex, setIndex] = useState(0);
    const [lastSelected, setLast] = useState("progress");
    const [status, setStatus] = useState("progress");
    useEffect(() => {
        const fetchQuizData = async () => {
            const token = await AsyncStorage.getItem("@auth_token");
            let response = await fetch("http://localhost:3001/api/quiz", {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            if (!response.ok) {
                throw new Error("HTTP error status = " + response.status)
            } else {
                await response.json()
                .then((async (res) => {
                    setQuizData(res.questions);
                    setLoading(false);
                }));
            }
        }
        fetchQuizData().catch(console.error);
    }, []);
    async function handleAnswerSelection(item) {
        const body = {
            answer: item
        }
        const token = await AsyncStorage.getItem("@auth_token");
        let response = await fetch("http://localhost:3001/api/quiz/" + (currIndex + 1), {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            throw new Error("HTTP error status = " + response.status)
        } else {
            await response.json()
            .then((async (res) => {
                if (res) {
                    setIndex(currIndex + 1);
                    if (res.msg === "Correct answer!") {
                        setStatus("correct");
                    } else {
                        setStatus("incorrect");
                    }
                }
            }));
        }
    }
  return (
    <React.Fragment>
        {!loading ? (
            <>
                <View>
                    <View>
                        <Header>Question {currIndex + 1}/{quizData.length}</Header>
                    </View>
                    <Question
                    question={quizData[currIndex].question}
                    options={quizData[currIndex].options.map(el=>Object.values(el))}
                    onItemSelected={handleAnswerSelection}
                    status={status}
                    />
                    <Button disabled={true}>Next Question</Button>
                </View>
            </>
        ) : (
        <>
            <Header>Loading</Header>
            <Paragraph>
                Fetching question data...
            </Paragraph>
        </>
        )
        }
    </React.Fragment>
  )
};


export default memo(Play);