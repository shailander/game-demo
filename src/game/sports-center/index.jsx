import { useEffect } from "react";

export default function SportsCenter() {
  useEffect(()=>{
    document.title = 'Sports Center'
  },[])
  return (
    <iframe
      className="h-screen w-screen"
      src="/sports-center.html"
      title="Sports Center"
      width="100%"
      height="100%"
      style={{ border: "none", minHeight: "500px" }}
    />
  );
}
