import React from 'react';
import './App.scss';
import './components/GetRequest.scss';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { Banner } from './components/Banner';
import { UsersList } from './components/UsersList';
import { Form } from './components/Form';

class App extends React.Component {
  state = {
    users: [],
    next_url: '',
    totalPages: 0,
    currentPage: 1,
  }

  async componentDidMount() {
    await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=5')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.setState({
            next_url: data.links.next_url,
            users: data.users,
          });
        } else {
          
        }
      }
      )
      .catch(() => {
        console.warn('ХУЕТА');
      })
  }

  getNewUsers = (url) => {
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.success) {
          this.setState(prevState => {
            return {
              next_url: data.links.next_url,
              users: [
                ...prevState.users,
                ...data.users
              ],
              totalPages: data.total_pages,
              currentPage: prevState.currentPage + 1,
            }
          });
        }
      }
      )
  }

  render() {
    const { next_url, currentPage, totalPages } = this.state;
    return ( 
      <>
        <Header />
        <Banner />
        <main>
          <section className='get-request' id='users-section'>
            <div className='container'>
              <h2 className='heading'>Working with GET request</h2>
              <UsersList users={this.state.users} />
              {currentPage !== totalPages && (
                <Button
                  text='Show more'
                  disabled={false}
                  type='button'
                  clickHandler={() => this.getNewUsers(next_url)}
                />
              )}
            </div>
          </section>
          <section className='sign-up' id='sign-up-section'>
            <div className='container'>
              <h2 className='heading'>Working with POST request</h2>
              <Form />
            </div>
          </section>
        </main>
      </>
    )
  }
}

export default App;
