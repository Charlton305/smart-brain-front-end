const Rank = ({name, entries}) => {
  return (
    <>
      <div className="white f3 center">
        {name}, your current rank is...
      </div>
      <div className="white f1 center">
        #{entries}
      </div>
    </>
  )
}
export default Rank