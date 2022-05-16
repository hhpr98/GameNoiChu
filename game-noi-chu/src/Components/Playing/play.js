import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import dictionary from '../../data/v1.0.1.json';
import { db } from '../../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import moment from 'moment';

export const PlayScreen = (props) => {
    const [turn, setTurn] = useState(0); // 0 is player, 1 is bot
    const [prevWord, setPrevWord] = useState("");
    const [userInput, setUserInput] = useState("");
    const [life, setlife] = useState(3);
    const [correct, setCorrect] = useState(0);

    const data = dictionary.data;
    const navigate = useNavigate();

    useEffect(() => {
        const randomWord = Math.floor(Math.random() * data.length);
        setPrevWord(data[randomWord]);
        setTurn(0);
    }, [data]);

    const onUserInputChange = (e) => {
        setUserInput(e.target.value);
    }

    const addGamePlayResult = async (total, botAnswer, userAnswer, status) => {
        try {
            const docRef = await addDoc(collection(db, 'game-play'), {
                total: total,
                botFinalWord: botAnswer,
                userFinalWord: userAnswer,
                status: status,
                createdAt: Math.floor(moment().valueOf() / 1000),
            });
            console.log('Added game play history: ', docRef.id);
        } catch (e) {
            console.error('Error adding game play history: ', e);
        }
    }

    const onBotAction = (txt) => {
        // if bot work, it is return data
        // if bot lose, it is return ""
        const splitCurrentWord = txt.split(" "); // đồng âm => ["đồng", "âm"]
        const keywordToSearch = splitCurrentWord[splitCurrentWord.length - 1].toLowerCase(); // "âm"
        const botSearch = data.filter(item => item.includes(keywordToSearch)); // ["âm hưởng", "nhạc âm", "âm thanh", ...]
        const reg = new RegExp("^(" + keywordToSearch + ".*)");
        const botSearchFinal = botSearch.filter(item => reg.test(item)); // ["âm hưởng","âm thanh"]
        const answerLen = botSearchFinal.length;
        if (answerLen === 0) {
            return "";
        } else {
            const randomWord = Math.floor(Math.random() * answerLen);
            return botSearchFinal[randomWord];
        }
    }

    const onConfirmWord = () => {
        if (userInput === "") return;

        const splitPreviousWord = prevWord.split(" ");
        const splitCurrentWord = userInput.split(" ");
        // check : 
        // word >= 2 
        // match Nối chữ (từ cuối người trước là từ đầu người sau)
        // user word must having in dictionary
        if (splitPreviousWord.length > 1 && splitCurrentWord.length > 1) {
            // console.log("pass 1");
            if (splitPreviousWord[splitPreviousWord.length - 1].toLowerCase() === splitCurrentWord[0].toLowerCase()) {
                // console.log("pass 2");
                if (data.includes(userInput.toLowerCase())) {
                    // pass the user input
                    // console.log("pass 3");
                    setTurn(1);
                    setPrevWord(userInput);
                    setCorrect(correct + 1);

                    // get bot action
                    const botResult = onBotAction(userInput);
                    if (botResult === "") {
                        // bot lose
                        Swal.fire({
                            icon: 'info',
                            title: 'Oops...',
                            text: 'Tại hạ bái phục... Bạn đã thắng!',
                            confirmButtonText: 'Confirm'
                        }).then(() => {
                            addGamePlayResult(correct, prevWord, userInput, "user-win");
                        }).then(() => {
                            navigate('/');
                        });
                        // .then((result) => {
                        //     /* Read more about isConfirmed, isDenied below */
                        //     if (result.isConfirmed) {
                        //         navigate('/');
                        //     } else if (result.isDenied){
                        //         navigate('/not-found');
                        //     }
                        // });
                    } else {
                        setTurn(0);
                        setPrevWord(botResult);
                        setUserInput("");
                    }
                    return;
                }
            }
        }

        // wrong answer
        if (life === 1) {
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: `Bạn đã thua. Số câu đúng: ${correct}`,
                confirmButtonText: 'Confirm'
            }).then(() => {
                addGamePlayResult(correct, prevWord, userInput, "bot-win");
            }).then(() => {
                navigate('/');
            });
        }
        setlife(life - 1);

    }

    return (
        <div>
            <div className="row d-flex justify-content-center mb-3">
                <h5 className="col-6">{turn === 0 ? "Máy" : "Bạn"} đã chọn : <b>{prevWord}</b></h5>
                <div className="col-3" />
            </div>
            <div className="row d-flex justify-content-center mb-3">
                <h5 className="col-6">Lượt của {turn === 0 ? "bạn" : "máy"}</h5>
                <div className="col-3" />
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-6">
                    <input type="text" className="form-control" placeholder="từ nối" onChange={onUserInputChange} value={userInput} />
                </div>
                <div className="col-3">
                    <button type="button" className="btn btn-outline-primary" onClick={onConfirmWord}>Xác nhận</button>
                </div>
            </div>
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-6 d-flex flex-row">
                    <div className="col-8 col-sm-7 col-md-6 col-lg-4 col-xl-3">Lượt còn lại:&emsp;</div>
                    <div className="text-danger"><b>{life}</b></div>
                </div>
                <div className="col-3" />
            </div>
            <div className="row d-flex justify-content-center mt-1">
                <div className="col-6 d-flex flex-row">
                    <div className="col-8 col-sm-7 col-md-6 col-lg-4 col-xl-3">Số câu đúng:&emsp;</div>
                    <div className="text-danger"><b>{correct}</b></div>
                </div>
                <div className="col-3" />
            </div>
        </div>
    )
}