import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function List({ data,setData }) {
  
  const remove = (id) => {

    console.log(`${process.env.REACT_APP_SERVER}/abc/${id}`);

    // axios.delete는 안먹히네? 지우는것도 get으로 가자 는 아니고 express서버측도 delete로 해주면 됨
    axios.delete(`${process.env.REACT_APP_SERVER}/abc/${id}`)
    .then(res=>{
      console.log(res.data);
      setData(res.data)
    })

    // console.log(id)
    // 5
    // console.log(setData)
    // ƒ dispatchSetState(fiber, queue, action) {
      // if (typ....
  }

  return (
    <>
      {
        data.map(obj => (
          <li key={obj.id}>
            {obj.msg}
            <button onClick={() => { remove(obj.id) }}>삭제</button>
          </li>
        ))
      }
    </>
  )
}

function Write({setData}) {

  const insert = (e) => {
    e.preventDefault();

    let msg = e.target.msg.value;

    axios.post(`${process.env.REACT_APP_SERVER}/insert`, { msg })
      // 돌려주는 값이 있으면 .then으로 뽑아서 확인해 볼 수 있다.
      .then(res => {
        console.log(res.data);
        setData(res.data)
      })

  }

  return (
    <div>
      <form onSubmit={insert}>
        <input type='text' name='msg' />
        <input type='submit' value='저장' />
      </form>
    </div>
  );
}



function App() {

  const [data, setData] = useState([]);

  // https://port-0-jsonserver-1xxfe2blm48bdd0.sel5.cloudtype.app 이게 원래 주소인데
  // 환경설정 파일을 만들고 주소를 변수에 담아서 아래처럼 작성
  const getData = () => {
    axios.get(`${process.env.REACT_APP_SERVER}/abc`)
      .then(res => {
        console.log(res);
        setData(res.data)
      });
  }

  // useState가 무한반복되기 때문에 한번만 실행하게 해준다
  useEffect(() => {
    getData();
  }, [])

  // 여기 입력값을 서버측으로 보냄
  /* axios.post('http://localhost:3030/insert', {id:1000,name:'신규데이터'})
  .then(res => {
    console.log(res);
  }) */



  return (
    <div>
      <h2>한줄댓글(7)</h2>
      <Write setData={setData}/>

      <ul>
        {/* 이게바로 프롭스, data뿐 아니라 setData까지 불러올 수 있음 */}
        <List data={data} setData={setData}/>
      </ul>
    </div>
  );
}

export default App;
