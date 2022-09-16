const RolledNumbers = (props) => {
  const { letters, numbers } = props;
  return (
    <>
      <div className="rolled-container">
        {numbers.map((num, i) => (
          <div className="rolled" key={i}>
            <span className="rolled-letter">{letters[i]}</span>
            <span className="rolled-number">{num}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default RolledNumbers;
