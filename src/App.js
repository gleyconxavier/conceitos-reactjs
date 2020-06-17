import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {

    const repository = {
      url: "https://gleyconxavier.com",
      title: `Ex. de Novo Repo ${Date.now()}`,
      techs: ["React", "NodeJS"]
    };

    const repoResult = await api.post("repositories", repository);
    setRepositories([...repositories, repoResult.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    repositories.splice(repositories
      .findIndex((repository) => repository.id === id), 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
