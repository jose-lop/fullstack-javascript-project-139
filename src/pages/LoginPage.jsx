import { useForm } from '@mantine/form';
import axios from 'axios';
import useAuthStore from '../store/authStore.js';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  return (
    <div>
        <h1>Iniciar sesión</h1>

        <form onSubmit={form.onSubmit(async (values) => {
            try {
                const response = await axios.post('/api/v1/login', values);
                setToken(response.data.token);
                navigate('/');
            } catch (error) {
                form.setErrors({
                username: 'Credenciales incorrectas',
                });
            }
        })}>

            <input
                type="text"
                placeholder="Nombre de usuario"
                {...form.getInputProps('username')}
                />

            <input
                type="password"
                placeholder="Contraseña"
                {...form.getInputProps('password')}
                />

            <button type="submit">
            Iniciar sesión
            </button>
        </form>
    </div>
  );
};

export default LoginPage;