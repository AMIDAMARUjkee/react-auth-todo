import { Form, Input, Button, Divider } from 'antd';
import Header from '../Header/Header';
import './RegistrationPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleRegistration = async (values) => {
    const { email, password } = values;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential.user && userCredential.user.uid) {
        const userId = userCredential.user.uid;

        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, { userId });

        const todoCollection = collection(db, `users/${userId}/todos`);

        navigate('/profile');
      } else {
        console.error('User ID not available in userCredential:', userCredential);
      }
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
            onFinish={handleRegistration}
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
              }}>
              <Button className="button button__form" type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
            <Divider>Have an account?</Divider>
            <Link to="/">
              <Button className="button button__link button__link-registration" type="link">
                Login
              </Button>
            </Link>
          </Form>
        </div>
      </main>
    </>
  );
};

export default RegistrationPage;
