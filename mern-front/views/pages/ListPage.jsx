import React from 'react';
import List from "../components/List.jsx";
import AppLayout from "../layout/AppLayout.jsx";
import LoginForm from '../components/Login.jsx';

const ListPage = () => {
    return (
        <AppLayout>
            <LoginForm />
            <List />
        </AppLayout>
    );
};
export default ListPage;
