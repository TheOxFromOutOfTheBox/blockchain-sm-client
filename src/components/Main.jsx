import React, { useState, useEffect } from 'react'
import CreateMessage from './CreateMessage'
import CreateSchema from './CreateSchema'
import ListMessage from './ListMessage'
import ListSchema from './ListSchema'
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

    const [connectionLabel, setConnectionLabel] = useState("Chain waiting to connect...");
    const [chainConnectionClass, setChainConnectionClass] = useState("Footer--chainConnectionState");

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
    };

    const doLogout = async () => {
        await wallet.wallet(walletType).logout();
    };
    const logout = () => {
        (async () => doLogout())();
        setMsaId(0n);
        setWalletAddress("");
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
        <div className="">
            {/* Id - {serviceMsaId.toString()}
            <p>
                {connectionLabel}
            </p> */}
            {/* <CreateSchema></CreateSchema> */}
            {/* <ListSchema smsaid={serviceMsaId}></ListSchema> */}
                <CreateMessage smsaid={serviceMsaId}></CreateMessage>

                {/* <ListMessage></ListMessage> */}
                {/* <Post></Post> */}
        </div>
    )
}

export default Main