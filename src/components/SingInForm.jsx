import { useState } from "react"
import Form from "./Form"

const SingInForm = ({ handleSignInChange, handleDisplayRegisterFormChange, loadUser }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onEmailChange = (data) => {
    setEmail(() => data.target.value)
  }

  const onPasswordChange = (data) => {
    setPassword(() => data.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    fetch("https://smart-brain-back-end-sexl.onrender.com/signin", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          loadUser(data)
          handleSignInChange()
        } else {
          console.log(data)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <Form
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onSubmit={onSubmit}
      formType="Sign in"
      handleDisplayRegisterFormChange={handleDisplayRegisterFormChange}
    />
  )
}
export default SingInForm