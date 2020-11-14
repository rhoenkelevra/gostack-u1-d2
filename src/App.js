import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    })
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
        title: `New Repo ${Date.now()}`,
        techs: [ "ReactJS", "NodeJS" ],
        url: `https://www.github.com/me/repo`,
    })
    setRepositories([...repositories, res.data])
  }

 async function handleRemoveRepository(id) { 
      await api.delete(`repositories/${ id }`) 
       
     setRepositories(repositories.filter(
       repository => repository.id !== id
     ))
      
 } 

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={()=> handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
