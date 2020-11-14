import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
      console.log(res)
    })
  });
  async function handleAddRepository() {
    const res = await api.post('repositories', {
        title: `New Repo ${Date.now()}`,
        techs: `ReactJS`,
        url: `https://www.github.com/me/repo`,
        id: `${Date.now}`
    })
    const repo = res.data;
    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) { 
      const res = await api.delete('repositories/:id', {
        
      })
      const repo = res.data;
      setRepositories([...repositories, repo])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
