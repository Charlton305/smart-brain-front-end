import { useState } from "react"
import Form from "./Form"

const Register = ({ handleSignInChange, handleDisplayRegisterFormChange, loadUser }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const onEmailChange = (data) => {
    setEmail(() => data.target.value)
  }
  const onNameChange = (data) => {
    setName(() => data.target.value)
  }

  const onPasswordChange = (data) => {
    setPassword(() => data.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    fetch("https://smart-brain-back-end-sexl.onrender.com/register", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.id) {
          loadUser(response)
          handleSignInChange()
        } else {
          console.log(response)
        }
      })
      .catch(err => console.log(err))
    handleDisplayRegisterFormChange()
  }

  return (
    <Form
      onEmailChange={onEmailChange}
      onNameChange={onNameChange}
      onPasswordChange={onPasswordChange}
      onSubmit={onSubmit}
      formType="Register"
    />
  )
}
export default Register