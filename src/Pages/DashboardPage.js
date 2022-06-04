import React, { useContext } from "react"
import { UserContext } from "../Context/UserContext"

const DashboardPage = () => {
  const [userState, setUserState] = useContext(UserContext)
  return (
    <div>
      {" "}
      <h1>DashboardPage</h1>
      {JSON.stringify(userState.user)}
    </div>
  )
}

export default DashboardPage
