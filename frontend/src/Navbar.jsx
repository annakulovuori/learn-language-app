import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="links">
        <a href="/">Home</a>
        <a href="/player">player</a>
        <a href="/admin">admin</a>
        <a href="/info">info</a>
      </div>
    </nav>
  );
}
export default Navbar;
