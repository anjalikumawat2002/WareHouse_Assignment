import {useEffect, useState} from 'react';
import './App.css';
function App() {
 
  //const numRows = 6;
  const [Rows, setRows] = useState([]);
  const [inputRow, setInputRow] = useState(new Array(3).fill(''));
  const [showInputRow, setShowInputRow] = useState(false);

  async function getSheetData(){
    const response = await fetch('http://localhost:5000/api/getSheetData', {
      method:"GET"
    })
    const data = await response.json();
    setRows(data);
    
  }


  function cancelSave(){
    setInputRow(new Array(3).fill(''))
    setShowInputRow(false);
  }

  async function saveRow(){
    if(inputRow.includes('')) {
      alert('please fill all the rows')
      return
    }
    const data = {
      'dataToAdd': [
        inputRow
      ]
    }
    const response = await fetch('http://localhost:5000/api/addRow', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data)
    })

    const responseData = await response.json();
    if(responseData.success === 'true'){
      getSheetData();
      cancelSave();
    }
    else{
      alert('unable to update')
    }
  }

  useEffect(()=>{
    
    getSheetData();
  }, [])



  const addRow = () => {
    setShowInputRow(true);
  };
  return (
    <>
     <root>WareHouse Assignment</root>
     <div className="table-container">
     <table>
        <tbody>
          {Rows.map((item,index) => (
            <tr key={index}>
              <td>{item[0]} </td>
              <td> {item[1]}</td>
              <td>{item[2]}</td>
            </tr>
          ))}
          {
            showInputRow && 
            <>
              <tr>
                <td style={{padding:0}}>
                  <input type="text" style={{display:'block', width:'100%', height:'inherit', padding:'10px 0', outline:'none'}}
                    value={inputRow[0]}
                    onChange={(e)=>{setInputRow(prev=>{
                      const temp = new Array(3);
                      temp[2] = prev[2];
                      temp[1] = prev[1];
                      temp[0] = e.target.value
                      return temp
                    })}}
                  />
                </td>
                <td style={{padding:0}}>
                  <input type="text" style={{display:'block', width:'100%', height:'inherit',padding:'10px 0', outline:'none'}}
                  value={inputRow[1]}
                  onChange={(e)=>{setInputRow(prev=>{
                    const temp = new Array(3);
                    temp[0] = prev[0];
                    temp[2] = prev[2];
                    temp[1] = e.target.value
                    return temp
                  })}}
                  />
                </td>
                <td style={{padding:0}}>
                  <input type="text" style={{display:'block', width:'100%', height:'inherit', padding:'10px 0', outline:'none'}}
                  value={inputRow[2]}
                  onChange={(e)=>{setInputRow(prev=>{
                    const temp = new Array(3);
                    temp[0] = prev[0];
                    temp[1] = prev[1];
                    temp[2] = e.target.value
                    return temp
                  })}}
                  />
                </td>                
            </tr>
            </>
          }
        </tbody>
      </table>
      </div>
      <div className='button'>
        {
          showInputRow?
          <>
            <button style={{margin:5}} onClick={saveRow}>Save</button>
            <button style={{margin:5}} onClick={cancelSave}>Cancel</button>
          </>:
          <button onClick={addRow}>Add new Row</button>
        }
      </div>
      <div className='button'>
            <button onClick={getSheetData}>sync</button>
      </div>
      
    </>
  )
}

export default App
