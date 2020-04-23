import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  const [title, setTitle] = useState("");
  const [techs, setTechs] = useState([]);
  const [url, setUrl] = useState("");

  const getRepos = async () => {
    try {
      const response = await api.get("/repositories");

      setRepos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post("/repositories", { title, techs, url });

      setRepos([...repos, response.data]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const newRepos = repos.filter((repo) => repo.id !== id);

      setRepos(newRepos);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.length > 0 &&
          repos.map((repo) => (
            <li id={`repo-${repo.id}`} key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <input
        type="text"
        name="title"
        id="title"
        valeu={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="techs"
        id="techs"
        valeu={techs}
        onChange={(e) => setTechs(e.target.value)}
      />
      <input
        type="text"
        name="url"
        id="url"
        valeu={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
