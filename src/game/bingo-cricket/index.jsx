import { useEffect } from "react";

export default function BingoCricket() {
    useEffect(()=>{
      document.title = 'Bingo Cricket'
    },[])
    return (
      <iframe
        className="h-screen w-screen"
        src="/bingo-cricket.html"
        title="Bingo Cricket"
        width="100%"
        height="100%"
        style={{ border: "none", minHeight: "500px" }}
      />
    );
  }
  