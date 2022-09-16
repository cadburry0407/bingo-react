const BingoNumbers = (props) => {
  const { cardPattern, rolledNumbers } = props;
  return (
    <>
      <div className="bingo_numbers">
        {cardPattern.map((num, i) => {
          return (
            <div
              key={i}
              className={
                i === 12
                  ? 'bingo_numbers-item-free'
                  : rolledNumbers.includes(num)
                  ? 'bingo_numbers-item-taken'
                  : 'bingo_numbers-item'
              }
            >
              {num}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BingoNumbers;
