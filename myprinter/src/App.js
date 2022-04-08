import './App.css';
import React from 'react';
function App() {
  const [name,setName] = React.useState("");
  const [filename,setFileName] = React.useState("");
  const [result,setResult] = React.useState('')
  const [data,setGetData] = React.useState([]);
  const sendPrint = async()=>{
    // const result = await fetch('localhost:8000/api/printer',{name,filname});
    // result = result.json();
    // console.log('result',result)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name,filename})
  };
    const result = await fetch('http://localhost:8000/api/printer', requestOptions)
    const result1 = await result.json();
    console.log('result1',result1)
    setResult(result1);
    const getData = await fetch('http://localhost:8001/api/printer');
    const getData1 = await getData.json();
    setGetData(getData1)
  } 
  let resultRows; 
  if(result){
    resultRows = result.message;
  }
  const rows = [<tr className='mr-2'><th>name</th><th>filename</th></tr>];
  data.forEach((printerInfo)=>{
    rows.push(<tr><td>{printerInfo.name}</td><td>{printerInfo.filename}</td></tr>)
  })
  return (
    <div className="App">
      <header className="App-header">
        <h2>Printer Tool</h2>
        <div className='col-md-5'>
        
        <span>User Name: </span>  <input className="form-control m-3 p-3" type="text" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
        <span>File Name:</span> <input className="form-control m-3 p-3"  type="text" value={filename} onChange={(e)=>{setFileName(e.target.value)}} required/>
        <button type="button" onClick={()=>{sendPrint()}} className="btn btn-primary btn-lg mr-5">Send To Print</button>
        </div>
        <div>
        {resultRows}
        </div>
       {/* <input type="button">Send</input> */}
       <div className='col-md-12'>
         Current Queue:
         <table className='table'>
         {rows} 
         </table>
       </div>
      </header>
    </div>
  );
}

export default App;
