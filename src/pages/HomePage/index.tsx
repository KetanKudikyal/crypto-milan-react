import { useWallet } from '@suiet/wallet-kit';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import AuthForm from './authForm';

const HomePage = () => {
    const wallet = useWallet();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(wallet.address);
        if (wallet.address) {
            navigate("/events")
        }
    }, [wallet.address]);

    return (
        <div className='pt-10'>
            <Navbar />
            <AuthForm />
        </div>
    );
};

export default HomePage;
