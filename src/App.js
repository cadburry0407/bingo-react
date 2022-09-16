import { useEffect, useState } from 'react';

import BingoCard from './components/BingoCard';
import BingoGuide from './components/BingoGuide';
import RolledNumbers from './components/RolledNumbers';
import ModalNumber from './components/ModalNumber';

import {
  getFiveRandomNumbers,
  letterB,
  letterI,
  letterN,
  letterG,
  letterO,
} from './utils/numbers';

const App = () => {
  const [bLine, setBLine] = useState([]);
  const [iLine, setILine] = useState([]);
  const [nLine, setNLine] = useState([]);
  const [gLine, setGLine] = useState([]);
  const [oLine, setOLine] = useState([]);
  const [cardPattern, setCardPattern] = useState([]);
  const [winningPattern, setWinningPattern] = useState([]);
  const [bingoNumbers, setBingoNumbers] = useState(
    [...Array(76).keys()].slice(1)
  );
  const [rolledNumbers, setRolledNumbers] = useState([]);
  const [rolledLetters, setRolledLetters] = useState([]);
  const [bingo, setBingo] = useState(false);
  const [rolledModal, setRolledModal] = useState(false);

  useEffect(() => {
    document.title = 'Bingo React';
  }, []);

  const newSet = () => {
    setBLine(getFiveRandomNumbers(letterB, 5));
    setILine(getFiveRandomNumbers(letterI, 5));
    setNLine(getFiveRandomNumbers(letterN, 5));
    setGLine(getFiveRandomNumbers(letterG, 5));
    setOLine(getFiveRandomNumbers(letterO, 5));
  };

  useEffect(() => {
    newSet();
  }, []);

  useEffect(() => {
    nLine[2] = 'FREE';
    setCardPattern(bLine.concat(iLine, nLine, gLine, oLine));
  }, [bLine, iLine, nLine, gLine, oLine]);

  const newCard = () => {
    newSet();

    // reset roll state
    setRolledNumbers([]);
    setRolledLetters([]);
    setBingoNumbers([...Array(76).keys()].slice(1));
    setBingo(false);
  };

  useEffect(() => {
    const patterns = [];

    const pattern1 = [
      cardPattern[0],
      cardPattern[1],
      cardPattern[2],
      cardPattern[3],
      cardPattern[4],
    ];

    const pattern2 = [
      cardPattern[5],
      cardPattern[6],
      cardPattern[7],
      cardPattern[8],
      cardPattern[9],
    ];

    const pattern3 = [
      cardPattern[10],
      cardPattern[11],
      cardPattern[13],
      cardPattern[14],
    ];

    const pattern4 = [
      cardPattern[15],
      cardPattern[16],
      cardPattern[17],
      cardPattern[18],
      cardPattern[19],
    ];

    const pattern5 = [
      cardPattern[20],
      cardPattern[21],
      cardPattern[22],
      cardPattern[23],
      cardPattern[24],
    ];

    const pattern6 = [
      cardPattern[0],
      cardPattern[5],
      cardPattern[10],
      cardPattern[15],
      cardPattern[20],
    ];

    const pattern7 = [
      cardPattern[1],
      cardPattern[6],
      cardPattern[11],
      cardPattern[16],
      cardPattern[21],
    ];

    const pattern8 = [
      cardPattern[2],
      cardPattern[7],
      cardPattern[17],
      cardPattern[22],
    ];

    const pattern9 = [
      cardPattern[3],
      cardPattern[8],
      cardPattern[13],
      cardPattern[18],
      cardPattern[23],
    ];

    const pattern10 = [
      cardPattern[4],
      cardPattern[9],
      cardPattern[14],
      cardPattern[19],
      cardPattern[24],
    ];

    const pattern11 = [
      cardPattern[4],
      cardPattern[8],
      cardPattern[16],
      cardPattern[20],
    ];

    const pattern12 = [
      cardPattern[0],
      cardPattern[6],
      cardPattern[18],
      cardPattern[24],
    ];

    patterns.push(pattern1);
    patterns.push(pattern2);
    patterns.push(pattern3);
    patterns.push(pattern4);
    patterns.push(pattern5);
    patterns.push(pattern6);
    patterns.push(pattern7);
    patterns.push(pattern8);
    patterns.push(pattern9);
    patterns.push(pattern10);
    patterns.push(pattern11);
    patterns.push(pattern12);

    setWinningPattern(patterns);

    let patternCombineArr = [];

    patterns.forEach((numArr) => {
      patternCombineArr.push(...numArr);
    });
  }, [cardPattern]);

  const rollNumbers = () => {
    const random = Math.floor(Math.random() * bingoNumbers.length);

    const randomNumber = bingoNumbers[random];

    setRolledNumbers((prevState) => [...prevState, randomNumber]);

    const index = bingoNumbers.indexOf(randomNumber);
    if (index > -1) bingoNumbers.splice(index, 1);

    if (letterB.includes(randomNumber))
      setRolledLetters((prevState) => [...prevState, 'b']);
    if (letterI.includes(randomNumber))
      setRolledLetters((prevState) => [...prevState, 'i']);
    if (letterN.includes(randomNumber))
      setRolledLetters((prevState) => [...prevState, 'n']);
    if (letterG.includes(randomNumber))
      setRolledLetters((prevState) => [...prevState, 'g']);
    if (letterO.includes(randomNumber))
      setRolledLetters((prevState) => [...prevState, 'o']);

    winningPattern.forEach((numArr) => {
      // remove from array [1,2,3,4,5] winningPattern
      const index = numArr.indexOf(randomNumber);
      if (index > -1) numArr.splice(index, 1);

      if (numArr.length === 0) setBingo(true);
    });
  };

  const wrapperFunction = () => {
    rollNumbers();
    setRolledModal(true);
  };

  return (
    <main>
      <div className="container">
        <div className="bingo_letters">
          <div className="bingo_numbers-item">B</div>
          <div className="bingo_numbers-item">I</div>
          <div className="bingo_numbers-item">N</div>
          <div className="bingo_numbers-item">G</div>
          <div className="bingo_numbers-item">O</div>
        </div>

        <BingoCard cardPattern={cardPattern} rolledNumbers={rolledNumbers} />

        <div>
          {bingo ? (
            <h1 className="win">
              BINGO!
              <br /> Congratulations! 🎉🎉🎉
            </h1>
          ) : (
            ''
          )}
        </div>
        <BingoGuide />

        <div className="bingo_buttons">
          <button className="btn" onClick={newCard}>
            New Card
          </button>
          <button className="btn" onClick={wrapperFunction} disabled={bingo}>
            Roll Number
          </button>
        </div>

        <RolledNumbers numbers={rolledNumbers} letters={rolledLetters} />
      </div>
      <ModalNumber
        open={rolledModal}
        close={() => setRolledModal(false)}
        numbers={rolledNumbers[rolledNumbers.length - 1]}
        letters={rolledLetters[rolledLetters.length - 1]}
        pattern={cardPattern}
        bingo={bingo}
      />
    </main>
  );
};

export default App;
