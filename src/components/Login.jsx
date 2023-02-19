import React, { useState, useEffect } from 'react'
import * as wallet from "../services/wallets/wallet";

function Login()
{
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

    return (
        <Layout className="App">
          <Header>
            <Title level={2} className="Header--title">
              Login
            </Title>
          </Header>
          <Content className="Content">
            {walletAccounts.length > 0 && (
              <List
                dataSource={walletAccounts}
                renderItem={(acct) => (
                  <List.Item>
                    <List.Item.Meta title={acct.name} />
                    {walletAddress === acct.address && (
                      <div className="WalletList--walletRow">
                        <Text>Logged in as </Text>
                        {msaId !== 0n && <Text>MSA Id: {msaId.toString()} </Text>}
                        <Text strong className="Main--addressList--walletAddress">
                          Address: {acct.address}{" "}
                        </Text>
                        <Button type="primary" onClick={() => logout()}>
                          logout
                        </Button>
                      </div>
                    )}
                    {walletAddress === "" && (
                      <div>
                        <Text>Address: </Text>
                        <Text strong className="Main--addressList--walletAddress">
                          {acct.address}
                        </Text>
                        <Button type="primary" onClick={() => login(acct.address)}>
                          Login with this account
                        </Button>
                      </div>
                    )}
                  </List.Item>
                )}
              ></List>
            )}
            {walletAccounts.length === 0 && (
              <Title level={3}>Wallet is not connected yet.</Title>
            )}
            {walletAddress !== "" && msaId === 0n && (
              <Button onClick={registerMsa}>Register MSA</Button>
            )}
          </Content>
          <Footer className="Footer">
            {!walletAccounts.length && (
              <Button onClick={connectWallet}>Connect Wallet</Button>
            )}
            {walletAccounts.length > 0 && (
              <Text className="walletConnectionState--connected">
                Wallet connected
              </Text>
            )}
          </Footer>
          <Content>
            {
              <Space direction="vertical">
                <CreateSchema />
                <ListSchemas />
              </Space>
            }
          </Content>
        </Layout>
      );
}

