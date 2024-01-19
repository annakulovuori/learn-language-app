function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "25px",
        fontFamily: "Roboto, sans-serif",
        color: "#292929",
      }}
    >
      <div
        style={{
          backgroundColor: "#EFB4FA",
          width: "45%",
          justifyContent: "center",
          display: "flex",
          borderRadius: "15px",
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
