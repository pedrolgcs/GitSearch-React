import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner, FaFolderOpen } from 'react-icons/fa';
import api from '../../services/api';
// Components
import Container from '../../components/Container';
// styles
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: '',
  };

  // carregar dados
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // salar dados
  componentDidUpdate(_, prevSatte) {
    const { repositories } = this.state;
    if (prevSatte.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { newRepo, repositories } = this.state;
    this.setState({ loading: true });

    try {
      const response = await api.get(`/repos/${newRepo}`);
      if (repositories.find(repo => repo.id === response.data.id)) {
        throw new Error('Duplicate repository');
      }
      const data = {
        id: response.data.id,
        name: response.data.full_name,
      };
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        error: '',
      });
    } catch (error) {
      this.setState({
        newRepo: '',
        loading: false,
        error: error.message,
      });
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositorys
        </h1>
        {error && <p>{error}</p>}
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="add repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={String(repository.id)}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                <FaFolderOpen size={20} />
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
