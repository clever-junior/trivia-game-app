import React from 'react';
import PropTypes from 'prop-types';
import { getToken } from '../services/API';

class Login extends React.Component {
    state = {
      nameInput: '',
      email: '',
      btnPlayDisabled: true,
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      const { nameInput, email } = this.state;
      if (nameInput.length > 0 && email.length > 0) {
        this.setState({ btnPlayDisabled: false });
      }
      this.setState({ [name]: value });
    }

    saveOnLocalStorage = async () => {
      const API = await getToken();
      const { token } = API;
      const obj = {
        token,
        ranking: [],
      };
      localStorage.setItem('token', JSON.stringify(obj));
    }

    handleBtnPlay = () => {
      this.saveOnLocalStorage();
      console.log(this.props);
      const { props } = this.props;
      const { history } = props;
      history.push('/game');
    }

    render() {
      const { nameInput, email, btnPlayDisabled } = this.state;
      return (
        <div>
          <form>
            <input
              type="text"
              name="nameInput"
              value={ nameInput }
              placeholder="Digite o seu nome"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
            <input
              type="email"
              name="email"
              value={ email }
              placeholder="Digite o seu email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
            <button
              data-testid="btn-play"
              type="button"
              value="btn-play"
              onClick={ this.handleBtnPlay }
              disabled={ btnPlayDisabled }
            >
              Play
            </button>
          </form>
        </div>
      );
    }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
  props: PropTypes.string.isRequired,
};

export default Login;
