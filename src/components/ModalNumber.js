import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

const ModalNumber = (props) => {
  const [match, setMatch] = useState(false);
  const { open, close, numbers, letters, pattern, bingo } = props;

  useEffect(() => {
    if (numbers && pattern.includes(numbers)) {
      setMatch(true);
    }
  }, [pattern, numbers]);

  useEffect(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => {
        close(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
      setMatch(false);
    };
  }, [open, close]);

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlay" onClick={() => close(false)}>
        <div className="content-modal">
          <div className="rolled-modal-container">
            <div className="rolled-modal">
              <span className="rolled-letter-modal">{letters}</span>
              <span className="rolled-number-modal">{numbers}</span>
            </div>
            {!match ? (
              <h1>TRY AGAIN!</h1>
            ) : bingo ? (
              <h1>
                BINGO! <br /> Congratulations! 🎉🎉🎉
              </h1>
            ) : (
              <h1>YOU GOT A MATCH!</h1>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default ModalNumber;
