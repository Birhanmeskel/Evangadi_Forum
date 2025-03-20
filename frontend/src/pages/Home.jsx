import React from 'react';
import { useContext } from 'react';

const Home = () => {
    const {user} = useContext();
    return (
        <div>
            <h1>home</h1>
            <br />
            <br />
            <br />
            <br />
            <h2>Wellcome : {user.username}</h2>
        </div>
    );
}

export default Home;
