import React, { useState, useEffect, createContext } from "react"
import Cookies from "js-cookie"

const UserContext = createContext([{}, () => {}])

// console.log("INITIAL COOKIE", Cookies.get("auth_gisthub"))

const initialUser = Cookies.get("auth_gisthub")

let initialState = { user: initialUser ? JSON.parse(initialUser) : undefined }

const UserProvider = (props) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (state.user) {
      // console.log("NEW STATE", state)
      const inOneWeek = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
      Cookies.set("auth_gisthub", JSON.stringify(state.user), {
        expires: inOneWeek,
      })
    }
  }, [state])
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
