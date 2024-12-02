import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { useWallet } from '@suiet/wallet-kit';
import Navbar from '../../components/navbar';
import { Button } from '../../components/ui/button';

const client = new SuiClient({ url: getFullnodeUrl('devnet') });

const AdminPage = () => {
    const tx = new Transaction();
    const wallet = useWallet()

    const execute = async () => {
        const exampleMnemonic = 'bomb code roast cross trust proud size song render spirit travel fitness';
        const keypair = Ed25519Keypair.deriveKeypair(exampleMnemonic);
        const sender = keypair.getPublicKey().toSuiAddress()
        tx.setSender(sender);
        await tx.sign({ client, signer: keypair });
        tx.moveCall({
            target: '0x70e311a35ba70283074d1896b5082e8a349f93b6573f4a8133aaae1487966521::loyalty::reward_user',
            arguments: [tx.object("0x92647b8b0b0a6b3d29daab670d1bea0b755b0e5942d5e2c88aa408a71a49345c"), tx.pure.u64(10), tx.pure.address(wallet.account?.address as string)],
        });
        const result = await client.signAndExecuteTransaction({
            transaction: tx,
            signer: keypair,
            requestType: 'WaitForLocalExecution',
            options: {
                showEffects: true,
            },
        });
        await client.waitForTransaction({ digest: result.digest });
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <Navbar />
            <Button onClick={execute}>Execute Transaction</Button>
        </div>
    )
}

export default AdminPage