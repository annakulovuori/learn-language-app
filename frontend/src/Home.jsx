function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", //kaikki keskelle
        alignItems: "center",
        justifyContent: "center",
        margin: "25px",
        fontFamily: "Roboto, sans-serif",
        color: "#292929", //tekstin väri tumma harmaa
      }}
    >
      <div
        style={{
          backgroundColor: "#EFB4FA", // otsikon divin taustaväriksi pinkki
          width: "45%", //divin leveys 45% koko sivusta
          justifyContent: "center", //divi keskelle
          display: "flex",
          borderRadius: "15px", //pyöristetyt reunat
        }}
      >
        <p style={{ fontSize: "40px" }}>READY TO LEARN?</p>
      </div>
      <p style={{ fontSize: "20px" }}>
        ON THE PLAYER TAB YOU CAN PRACTICE WORDS
      </p>
      <p style={{ fontSize: "20px" }}>
        ON THE ADMIN TAB YOU CAN CREATE AND EDIT WORD PAIRS
      </p>
      <p style={{ fontSize: "20px" }}>
        TO FIND MORE INFO PLEASE CLICK YOURSELF INTO THE INFO TAB
      </p>
    </div>
  );
}

export default Home;
