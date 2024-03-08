const ImageLinkForm = ({ handleInputChange, onButtonSubmit, input }) => {
  return (
    <div>
      <p className="f3 center b">
        This magic brain will detect faces in your pictures. Give it a try!
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input value={input} onChange={handleInputChange} className="f4 pa2 w-70" />
          <button onClick={onButtonSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
        </div>
      </div>
    </div>
  )
}
export default ImageLinkForm