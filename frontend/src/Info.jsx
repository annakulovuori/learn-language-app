function Info() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Roboto, sans-serif",
        color: "#292929",
      }}
    >
      <p style={{ fontSize: "30px" }}>ADMIN</p>
      <p style={{ fontSize: "20px" }}>
        by pressing + icon you can add a new word pair
      </p>
      <p style={{ fontSize: "20px" }}>
        write words in what order you want, but remember the words will be saved
        in that order
      </p>
      <p style={{ fontSize: "30px" }}>PLAYER</p>
      <p style={{ fontSize: "20px" }}>
        write translations and click submit button, the app will tell you which answers were right and give you a score
      </p>
      <h4 style={{ fontSize: "20px" }}>Author: Anna Kulovuori</h4>
    </div>
  );
}

export default Info;
