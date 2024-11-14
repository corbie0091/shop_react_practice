import { useEffect, useState } from "react";
import axios from "axios";

export function useNameGet() {
  let [username, setUsername] = useState("");
  useEffect(() => {
    axios.get("/username.json").then((r) => {
      setUsername(r.data);
    });
  }, []);

  return username;
}
