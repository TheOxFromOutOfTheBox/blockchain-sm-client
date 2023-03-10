import React, { useState, useEffect } from 'react'
import CreateMessage from './CreateMessage'
import CreateSchema from './CreateSchema'
import ListMessage from './ListMessage'
import ListSchema from './ListSchema'
import Channel from './Channel'
import { createAccountViaService } from "../services/chain/apis/extrinsic";
import * as wallet from "../services/wallets/wallet";
import {
    getMsaId,
    setupChainAndServiceProviders,
} from "../services/dsnpWrapper";
import Post from './Post'

function Main() {

    const [walletAccounts, setWalletAccounts] = useState([]);
    const [msaId, setMsaId] = useState(0n);
    const [serviceMsaId, setServiceMsaId] = useState(0n);
    const [walletAddress, setWalletAddress] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [connectionLabel, setConnectionLabel] = useState("Chain waiting to connect...");
    const [chainConnectionClass, setChainConnectionClass] = useState("Footer--chainConnectionState");
    const [activeChannel,setActiveChannel]=useState(0);

    const walletType = wallet.WalletType.DOTJS;
    const doConnectWallet = async () => {
        const w = wallet.wallet(walletType);
        const availableAccounts = await w.availableAccounts();
        setWalletAccounts(availableAccounts);
    };

    const connectWallet = () => {
        (async () => doConnectWallet())();
    };

    const getAndSetMsaId = async () => {
        let msa_id = await getMsaId(wallet.wallet(walletType));
        if (msa_id !== undefined) setMsaId(msa_id);
    };

    const doLogin = async (addr) => {
        await wallet.wallet(walletType).login(addr);
        await getAndSetMsaId();
    };

    const login = (addr) => {
        (async () => doLogin(addr))();

        setWalletAddress(addr);
        setIsLoggedIn(true)
    };

    const doLogout = async () => {
        await wallet.wallet(walletType).logout();
    };
    const logout = () => {
        (async () => doLogout())();
        setMsaId(0n);
        setWalletAddress("");
        setIsLoggedIn(false)
    };

    const registerMsa = () => {
        (async () => {
            try {
                createAccountViaService(
                    async () => {
                        await getAndSetMsaId();
                    },
                    (error) => {
                        alert("Creating sponsored account failed: \n" + error.message);
                    }
                );
            } catch (e) {
                console.error(e);
            }
        })();
    };
    useEffect(() => {
        (async () => {
            try {
                let serviceMsaId = await setupChainAndServiceProviders(walletType);
                console.log('SET UP!')
                setServiceMsaId(serviceMsaId);
                // console.log(serviceMsaId);
                setConnectionLabel("Chain connected");
                setChainConnectionClass("Footer--chainConnectionState connected");
            } catch (e) {
                console.error(e);
            }
        })();
    });
    return (
        <div className=" bg-gray-800">
            <h1 className='text-center text-white text-xl font-bold'>Vikalp</h1>
            {!isLoggedIn ? (
                <>
                    <button className='bg-white border border-gray-400 text-gray-700 py-2 px-2 rounded-lg shadow-md hover:shadow-lg' onClick={() => { login() }}>Login</button>
                </>
            ) : (
                <>
                    {/* Id - {serviceMsaId.toString()}
                <p>
                    {connectionLabel}
                </p> */}
                    {/* <CreateSchema></CreateSchema> */}
                    {/* <ListSchema smsaid={serviceMsaId}></ListSchema> */}
                    <div className='grid grid-cols-8 align-items-center'>
                        <h2 className="text-white text-xl font-bold col-start-1">Latest Posts</h2>
                        <button className='bg-red-500 col-start-8  text-gray-100 font-bold py-2 rounded-lg shadow-md hover:shadow-lg' onClick={() => { logout() }}>Logout</button>
                    </div>
                    <div className="flex flex-row">
                        <Channel active={activeChannel} setActiveChannel={setActiveChannel}></Channel>
                        <div className="flex-col">
                            <ListMessage active={activeChannel}></ListMessage>
                            <CreateMessage smsaid={serviceMsaId}></CreateMessage>
                        </div>
                    </div>



                </>
            )}
        </div>
    )
}

export default Main