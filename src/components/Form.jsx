const Form = ({
  onEmailChange,
  onNameChange,
  onPasswordChange,
  onSubmit,
  handleDisplayRegisterFormChange,
  formType
}) => {
  return (
    <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">{formType}</legend>
            {formType === "Register" &&
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onNameChange} />
              </div>}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange} />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                autoComplete="on"
                id="password"
                onChange={onPasswordChange} />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmit}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value={formType} />
          </div>
          {formType === "Sign in" &&
            <div className="lh-copy mt3">
              <p
                onClick={handleDisplayRegisterFormChange}
                href="#0"
                className="f6 link dim black db pointer"
              >Register
              </p>
            </div>
          }
        </form>
      </main>
    </article>
  )
}
export default Form