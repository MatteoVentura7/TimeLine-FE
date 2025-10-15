  import { useEffect, useState } from "react";
  
  export default function WelcomeMessagge() {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    const surname = localStorage.getItem("surname") || "";

    const capitalize = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    setWelcomeMessage(`Hello, ${capitalize(name)} ${capitalize(surname)}`);
  }, []);
    return (<div>{welcomeMessage}</div>);
     }
