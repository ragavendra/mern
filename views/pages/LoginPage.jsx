import React from 'react';
import CreateForm from "../components/CreateForm.jsx";
import AppLayout from "../layout/AppLayout.jsx";
import LoginForm from '../components/Login.jsx';

const LoginPage = () => {
    return (
        <AppLayout>
            <LoginForm />
        </AppLayout>
    );
};
export default LoginPage;
