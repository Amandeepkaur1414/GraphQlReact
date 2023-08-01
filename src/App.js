import logo from './logo.svg';
import './App.css';
import github from "./db.js";
import { useEffect, useState, useCallback } from 'react';
import Query from "./query";

function App() {
  let [userName, setUserName] = useState('');
  let [repoList, setrepoList] = useState([]);
  const fetchData = useCallback(() => {
    fetch(github.baseUrl, {
      method: 'POST',
      headers: github.headers,
      body: JSON.stringify(Query)
    }).then(
      response => response.json()
    ).then(
      data => {

        setUserName(data.data.viewer.name);
        setrepoList(data.data.viewer.repositories.nodes);
        console.log(userName);
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }, []);

  useEffect(() => {
    fetchData();


  }, [fetchData])
  return (
    <div className="App container mt-5">
      <h1 className='text-primary'>
        <i className="bi bi-diagram-3-fill"></i> Repos
      </h1>
      <div>
        Hey there {userName}
      </div>
      <div>
        {
          repoList && (
            <ul className='list-group list-group-flush'>
              {
                repoList.map((item) => (
                  <li className='list-group-item' key={item.id.toString()}>
                    <a className='h5 mb-0 text-decoration-none'>{item.name}</a>
                    <p className='small'>{item.description}</p>
                  </li>
                )

                )
              }
            </ul>
          )
        }
      </div>
    </div>
  );
}

export default App;
