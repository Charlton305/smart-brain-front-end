const Navigation = ({ handleSignInChange, signedIn, handleDisplayRegisterFormChange, displayRegisterForm }) => {
  return (
    signedIn
      ? <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={handleSignInChange} className="f3 link dim black underline pa3 pointer">Sign out</p>
      </nav>
      : !displayRegisterForm
        ? <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p onClick={handleDisplayRegisterFormChange} className="f3 link dim black underline pa3 pointer">Register</p>
        </nav>
        : <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p onClick={handleDisplayRegisterFormChange} className="f3 link dim black underline pa3 pointer">Sign in</p>
        </nav>
  )
};

export default Navigation
