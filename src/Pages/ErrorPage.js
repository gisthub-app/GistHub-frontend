import React from "react"
import LoggedOutComponent from "../Components/LoggedOutComponent"
import NotAllowedComponent from "../Components/NotAllowedComponent"

export const ErrorPage = ({ status }) => {
  switch (status) {
    case 403:
      return <NotAllowedComponent />
    case 401:
      return <LoggedOutComponent />
    default:
      return <NotAllowedComponent />
  }
}
