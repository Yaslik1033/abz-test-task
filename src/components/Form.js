import React from 'react';
import './Form.scss';
import { Button } from './Button';
import { Input } from './Input';
import { RadioBtn } from './RadioBtn';

export class Form extends React.Component {
  state = {
    name: '',
    email: '',
    phone: '',
    positions: [],
    position: '',
    drag: false,
    photo: '',
    isPhotoLoaded: false,
    isValidForm: false,
    correctFields: {
      name: false,
      email: false,
      photo: false,
      phone: false,
    },
    token: '',
  }

  async componentDidMount() {
    await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.setState({
            positions: data.positions
          });
        } else {}
      })

      await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
        .then(response => response.json())
        .then(data => this.setState({token: data.token}))
        .catch(function(error) {
           // proccess network errors 
        });

      this.setState(prevState => {
        return {
          position: prevState.positions[0].name
        }
      });
  }

  formVerification = (fieldName, value) => {
    switch(fieldName) {
      case 'name': {
        const isCorrectLength = value.length >= 3; 
        this.setState(prevState => (
          {
            correctFields: {
              ...prevState.correctFields,
              name: isCorrectLength,
            }
          }
        ));
        break;
      }

      case 'email': {
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // const isCorrectEmail = this.state.email.match(emailReg);
        const isCorrectEmail = emailReg.test(value)
        this.setState(prevState => (
          {
            correctFields: {
              ...prevState.correctFields,
              email: isCorrectEmail,
            }
          }
        ));
        break;
      }

      case 'phone': {
        const isCorrectPhone = value.length === 10 
          || value.length === 12
          || value.length === 13;

          this.setState(prevState => (
            {
              correctFields: {
                ...prevState.correctFields,
                phone: isCorrectPhone,
              }
            }
          ));

        break;
      }

      case 'photo': {
        const fileExtension = value.split('.')[1];
        const isCorrectFile = !!['png', 'jpg', 'jpeg'].filter(ext => ext === fileExtension).length;

        if (isCorrectFile) {
          this.setState({isPhotoLoaded: true});
        }

        this.setState(prevState => (
          {
            correctFields: {
              ...prevState.correctFields,
              photo: isCorrectFile,
            }
          }
        ));
        break;
      }
    }
  }

  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    if (target.type === 'file') {
      this.setState({isPhotoLoaded: true});
    }

    if (target.name === 'phone') {
      const key = event.nativeEvent.data;
      const number = this.state.phone;
      if(isNaN(key) || key === ' ') {
        if (key === '+') {
          if (number.length) {
            return;
          }
        } else {
          return;
        }
      }
    }

    this.setState(() => {
      return {
        [name]: value
      };
    });

    this.formVerification(name, value);
  }

  isValidFormCheck = () => {
    this.setState({
      isValidForm: !Object.values(this.state.correctFields)
      .filter(field => !field).length
    });
  }

  render () {
    const { name, email, phone, positions, photo, isValidForm } = this.state;

    return (
      <form
        // method='POST'
        // action={this.state.token}
        onSubmit={event => event.preventDefault()}
        className='sign-up-form'
      >
        <Input 
          type='text'
          name='name'
          onChange={this.handleChange}
          placeholder='Your name'
          value={name}
          blur={this.isValidFormCheck}
        />
        <Input 
          type='email'
          name='email'
          onChange={this.handleChange}
          placeholder='Email'
          value={email}
          blur={this.isValidFormCheck}
        />
        <Input 
          type='text'
          name='phone'
          onChange={this.handleChange}
          placeholder='Phone'
          value={phone}
          blur={this.isValidFormCheck}
        />
        <div className='positions'>
          <p>Select your position</p>
          <ul className='positions-list'>
            {positions.map(position => {
              return (
                <li key={position.id}>
                  <RadioBtn
                    position={position}
                    name='position'
                    currentPosition={this.state.position}
                    onChange={this.handleChange}
                  />
                </li>
              )
            })}
          </ul>
        </div>
        <label
          className='photo-label'
        >
          <Input 
            name='photo'
            onChange={this.handleChange}
            value={photo}
            placeholder=''
            type='file'
            blur={this.isValidFormCheck}
          />
          <div className='drag-n-drop--left'>
            {this.state.isPhotoLoaded
              ? ('Success')
              : ('Upload')
            }</div>
          <div className='drag-n-drop--right'>
            {this.state.isPhotoLoaded
              ? (photo)
              : ('Upload your photo')
            }
          </div>
        </label>
        <Button text='Sign up' type='submit' disabled={!isValidForm} />
      </form>
    )
  }
}