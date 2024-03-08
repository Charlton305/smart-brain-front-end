import { useEffect } from "react"

const FaceRecognition = ({ imageURL, boxes }) => {
  // useEffect(() => {
  //   console.log(boxes[0])
  // })
  return (
    <div className="center">
      <div className="absolute mt2">
        <img id="inputImage" src={imageURL} />
        {boxes.map((box, i) => {
          return <div
            key={i}
            className="bounding-box"
            style={{
              top: box.topRow,
              left: box.leftCol,
              bottom: box.bottomRow,
              right: box.rightCol
            }}>
          </div>
        })}
      </div>
    </div>
  )
}
export default FaceRecognition