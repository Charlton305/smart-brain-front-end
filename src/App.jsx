import { useState } from 'react';
import ParticlesBg from 'particles-bg'
import { returnClarifaiRequestOptions } from './clarifai/clarifaiData';
import Navigation from "./components/Navigation";
import SignInForm from "./components/SingInForm"
import Register from './components/Register';
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import Rank from "./components/Rank"
import FaceRecognition from './components/FaceRecognition';

const App = () => {
  const [input, setInput] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [boxes, setBox] = useState([{ topRow: 0, bottomRow: 0, leftCol: 0, rightCol: 0 }])
  const [signedIn, setSignedIn] = useState(false)
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false)
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  })

  const loadUser = (data) => {
    setUser(() => ({ ...data }))
  }

  const handleSignInChange = () => {
    setSignedIn((current) => !current)
    setImageURL(() => "")
  }

  const handleDisplayRegisterFormChange = () => {
    setDisplayRegisterForm((current) => !current)
  }

  const updateEntries = entries => {
    setUser((prev) => ({ ...prev, entries }))
  }

  const calculateFaceLocation = (data) => {
    const image = document.getElementById("inputImage")
    const width = Number(image.width)
    const height = Number(image.height)
    const array = data.map((face) => {
      return {
        topRow: face.topRow * height + 10,
        leftCol: face.leftCol * width,
        bottomRow: height - (face.bottomRow * height) + 10,
        rightCol: width - (face.rightCol * width)
      }
    })
    setBoxState(array)
  }

  const setBoxState = (data) => {
    setBox(() => data)
  }

  const handleInputChange = event => {
    setInput(() => {
      return event.target.value
    })
  }

  const onButtonSubmit = async (e) => {
    setImageURL(() => input)
    // setInput(() => "")
    fetch("http://localhost:3000/image", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        url: input
      })
    })
      .then(response => response.json())
      .then(result => {
        const { boundingBoxArray, entries } = result

        if (boundingBoxArray) {
          calculateFaceLocation(boundingBoxArray)
        }
        if (entries) {
          updateEntries(entries)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="app">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation
        signedIn={signedIn}
        handleSignInChange={handleSignInChange}
        handleDisplayRegisterFormChange={handleDisplayRegisterFormChange}
        displayRegisterForm={displayRegisterForm} />
      {signedIn
        ? <div>
          <Logo />
          <Rank
            name={user.name}
            entries={user.entries}
          />
          <ImageLinkForm
            input={input}
            handleInputChange={handleInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition boxes={boxes} imageURL={imageURL} />
        </div>
        : (
          !displayRegisterForm
            ? <SignInForm
              loadUser={loadUser}
              handleSignInChange={handleSignInChange}
              handleDisplayRegisterFormChange={handleDisplayRegisterFormChange}
            />
            : <Register
              loadUser={loadUser}
              handleSignInChange={handleSignInChange}
              handleDisplayRegisterFormChange={handleDisplayRegisterFormChange}
            />
        )
      }
    </div>
  );
};

export default App;




