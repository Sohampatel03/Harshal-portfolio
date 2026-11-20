export default function SectionHeading({ eyebrow, lines, number, aside }) {
  let wordIndex = 0;
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow code-eyebrow">{"// "}{eyebrow}</p>
        <h2 data-reveal="mask">
          {lines.map((line, index) => (
            <span className="heading-line" key={`${line}-${index}`}>
              {line.split(" ").map((word) => {
                const order = wordIndex++;
                return (
                  <span className="heading-word" key={`${word}-${order}`}>
                    <span style={{ "--word-index": order }}>{word}</span>
                  </span>
                );
              })}
            </span>
          ))}
        </h2>
      </div>
      {aside || <span className="section-number">{number}</span>}
    </div>
  );
}
