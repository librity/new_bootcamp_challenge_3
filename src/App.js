import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
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

  async function handleAddTech() {
    setTechs([...techs, tech]);
  }

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
    <main className="content">
      <ul className="repo_list" data-testid="repository-list">
        {repos.length > 0 &&
          repos.map((repo) => (
            <li className="repo" id={`repo-${repo.id}`} key={repo.id}>
              <a className="repo_link" href={repo.url}>
                {repo.title}
              </a>

              <button
                className="remove_repo_button"
                onClick={() => handleRemoveRepository(repo.id)}
              >
                Remover
              </button>
            </li>
          ))}
      </ul>

      <aside className="new_repo_form">
        <label className="repo_input_label" htmlFor="title">
          Título
        </label>
        <input
          className="repo_input"
          type="text"
          name="title"
          id="title"
          valeu={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="repo_tech_input_group">
          <label className="repo_input_label" htmlFor="tech">
            Tecnologías
          </label>

          <span className="repo_input_tech_input_button">
            <input
              className="repo_tech_input"
              type="text"
              name="tech"
              id="tech"
              valeu={tech}
              onChange={(e) => setTech(e.target.value)}
            />

            <button className="add_tech_button" onClick={handleAddTech}>
              +
            </button>
          </span>
        </div>

        <label className="repo_input_label" htmlFor="url">
          URL
        </label>
        <input
          className="repo_input"
          type="text"
          name="url"
          id="url"
          valeu={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button className="add_repo_button" onClick={handleAddRepository}>
          Adicionar
        </button>
      </aside>

      {techs.length > 0 && (
        <aside className="input_techs">
          <dl>
            {techs.map((tech, index) => (
              <>
                <dt className="tech_index" id={`tech-${index}`} key={index}>
                  {index}
                </dt>
                <dd>{tech}</dd>
              </>
            ))}
          </dl>
        </aside>
      )}
    </main>
  );
}

export default App;
