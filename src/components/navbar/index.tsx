import { Bell, Calendar, Compass, Search } from 'lucide-react';

import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo-image.webp';
import logo from '../../assets/logo.webp';
import { SUI_DEVNET_FAUCET } from '../../utils/constants';
import { Button } from '../ui/button';

const rpcUrl = getFullnodeUrl("devnet");
const client = new SuiClient({ url: rpcUrl });


export default function Navbar() {
    const wallet = useWallet()

    useQuery({
        enabled: !!wallet.account,
        queryKey: ['faucet', wallet.account ? wallet.account.address : ""],
        queryFn: async () => {
            if (wallet.account?.address) {
                const coinBalanceData = await client.getBalance({
                    owner: wallet.account?.address,
                });
                if (coinBalanceData.totalBalance === "0") {
                    await axios.post(SUI_DEVNET_FAUCET, {
                        FixedAmountRequest: {
                            recipient: wallet.account.address,
                        },
                    });
                }

            }
        }
    })

    return (
        <nav className="flex fixed top-0 w-full h-14 items-center justify-between left-0 px-4 bg-zinc-900 border-b border-zinc-800">
            {/* Left section */}
            <div
                onClick={() => (window.location.href = '/')}
                className="flex items-center space-x-4 cursor-pointer"
            >
                <img
                    src={logoImage}
                    alt="logoImage"
                    className="size-8 md:size-12"
                />
                <img
                    src={logo}
                    alt="logo"
                    className="size-5 md:size-32 object-contain w-full"
                />
            </div>

            <div className="hidden md:block">
                <div className="flex items-center space-x-8">
                    <Link to={"/events"}>
                        <Button variant="ghost" className=" text-white bg-zinc-800">
                            <Calendar className="mr-2 h-4 w-4" />
                            Events
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                        <Compass className="mr-2 h-4 w-4" />
                        Discover
                    </Button>
                </div>
            </div>
            <div>
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden md:block text-zinc-400 hover:text-white  hover:bg-zinc-800"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden md:block text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                        <Bell className="h-5 w-5" />
                    </Button>
                    <ConnectButton
                        style={wallet.account ? {
                            color: "white",
                            width: "100%"
                        } : {
                            backgroundColor: 'transparent',
                            width: "100%"
                        }}
                        children={<Button
                            variant="outline"
                            className="w-full border-zinc-800  bg-transparent hover:bg-zinc-800 hover:text-white text-zinc-300"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Sign in with Google
                        </Button>
                        } />
                </div>
            </div>
        </nav>
    );
}
