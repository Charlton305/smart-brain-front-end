import { useEffect, useState } from 'react';
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

  const handleSignInChange = (e) => {
    e.preventDefault()
    setSignedIn((current) => !current)
  }

  const handleDisplayRegisterFormChange = (e) => {
    e.preventDefault()
    setDisplayRegisterForm((current) => !current)
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
    setInput(() => "")

    const MODEL_ID = 'face-detection';
    const boundingBoxArray = []

    try {
      const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(input))
      const data = await response.json()

      const regions = data.outputs[0].data.regions;

      regions.forEach(region => {
        // Accessing and rounding the bounding box values
        const boundingBox = region.region_info.bounding_box;
        const topRow = boundingBox.top_row.toFixed(3);
        const leftCol = boundingBox.left_col.toFixed(3);
        const bottomRow = boundingBox.bottom_row.toFixed(3);
        const rightCol = boundingBox.right_col.toFixed(3);

        boundingBoxArray.push({ topRow, leftCol, bottomRow, rightCol });
      });
    } catch (error) {
      console.log("Bloody error, mate...", error)
    }
    calculateFaceLocation(boundingBoxArray)
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
          <Rank />
          <ImageLinkForm input={input} handleInputChange={handleInputChange} onButtonSubmit={onButtonSubmit} />
          <FaceRecognition boxes={boxes} imageURL={imageURL} />
        </div>
        : (
          !displayRegisterForm
            ? <SignInForm handleSignInChange={handleSignInChange} handleDisplayRegisterFormChange={handleDisplayRegisterFormChange} />
            : <Register handleSignInChange={handleSignInChange} handleDisplayRegisterFormChange={handleDisplayRegisterFormChange} />
        )
      }
    </div>
  );
};

export default App;




