import { Form, Input, Button, Divider } from 'antd';
import Header from '../Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container">
          <Form
            onFinish={handleLogin}
            name="basic"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            labelAlign={'right'}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 10,
                span: 20,
              }}>
              <Button className="button button__form" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Divider>Don't have an account?</Divider>
            <Link to="/registration">
              <Button className="button button__link button__link-registration" type="link">
                Register
              </Button>
            </Link>
          </Form>
        </div>
      </main>
    </>
  );
};

export default HomePage;
