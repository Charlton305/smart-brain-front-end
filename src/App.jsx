import { useState } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import Rank from "./components/Rank"
import FaceRecognition from './components/FaceRecognition';
import { returnClarifaiRequestOptions } from './clarifai/clarifaiData';

const App = () => {
  const [input, setInput] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [boxes, setBox] = useState([{ topRow: 0, bottomRow: 0, leftCol: 0, rightCol: 0 }])

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

  const onButtonSubmit = async () => {
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
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm input={input} handleInputChange={handleInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition boxes={boxes} imageURL={imageURL} />
    </div>
  );
};

export default App;




