export const Dot = ({ color }) => {
    const style = {
      height: 25,
      width: 25,
      margin: "0px 10px",
      background: color,
      borderRadius: "50%",
      display: "inline-block",
  
    };
    
    return <span style={style}></span>;
  }