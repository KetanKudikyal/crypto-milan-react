import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { useWallet } from '@suiet/wallet-kit';
import Big from 'big.js';
import { OktoContextType, useOkto } from 'okto-sdk-react';
import * as React from 'react';
import toast from 'react-hot-toast';
import { getUserLocation } from '../../lib/helper';
import { ATTESTATION_CONTRACT, COIN_CONTRACT, REWARDS_CONTRACT } from '../../utils/constants';
import Ar from '../Ar';
const client = new SuiClient({ url: getFullnodeUrl('devnet') });

const steps = [
    {
        label: 'Verify your location',
        description: `You need to be within 500m of the event location to be able to verify`,
    },
    {
        label: 'Collect your NFT',
        description: 'NFT collected successfully from booth',
    },
    {
        label: 'Attestating user details',
        description: `Attestating user details`,
    },
    {
        label: 'All set! Claim your NFT ',
        description: `All set!`,
    },
];

function truncateString(
    minLength: number,
    firstHalf: number,
    secondHalf: number,
    input: string
) {
    if (input.length > minLength) {
        const firstPart = input.slice(0, firstHalf);
        const lastPart = input.slice(-secondHalf);
        return `${firstPart}...${lastPart}`;
    }
    return input;
}

export default function VerticalLinearStepper({
    event,
    isUserInRange,
}: {
    event: any;
    isUserInRange: boolean;
}) {
    const wallet = useWallet()
    const [tokenAddress, setTokenAddress] = React.useState("")
    const [txHash1, setTxHash1] = React.useState("")
    const [txHash2, setTxHash2] = React.useState("")
    const { executeRawTransaction } = useOkto() as OktoContextType;
    const [activeStep, setActiveStep] = React.useState(0);
    const [showAR, setShowAR] = React.useState(false);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleARInvokation = () => {
        setShowAR(true);
    };
    const handleCloseAR = () => {
        setShowAR(false);
        handleNext();
    };

    const handleNFTClaim = async () => {
        try {
            toast.loading('Claiming NFT...', {
                duration: Infinity,
            });
            const tx = new Transaction();
            const [dataObj, reqObj] = tx.moveCall({
                target: `${REWARDS_CONTRACT}::loyalty::buy_a_gift`,
                arguments: [tx.object(tokenAddress)],
            });
            tx.moveCall({
                target: "0x2::token::confirm_request_mut",
                arguments: [tx.object("0xc1ac17a3ca3f8bf6ebdb5c6e566d26c83c4bfa03e91ec5c9f7556bdea47c24f4"), reqObj],
                typeArguments: [`${REWARDS_CONTRACT}::loyalty::LOYALTY`]
            })
            tx.transferObjects([dataObj], wallet?.account?.address as string)
            const result = await wallet.signAndExecuteTransaction({
                transaction: tx,
            });
            await client.waitForTransaction({ digest: result.digest });
            toast.dismiss();
            toast.success('User rewarded successfully');
        } catch (error) {
            toast.dismiss();
            toast.error('Error rewarding user');
            throw error;
        }
    }

    const handleRewardUser = async () => {
        try {
            toast.loading('Rewarding user...', {
                duration: Infinity,
            });
            const tx = new Transaction();
            const exampleMnemonic = 'bomb code roast cross trust proud size song render spirit travel fitness';
            const keypair = Ed25519Keypair.deriveKeypair(exampleMnemonic);
            const sender = keypair.getPublicKey().toSuiAddress()
            tx.setSender(sender);
            await tx.sign({ client, signer: keypair });
            tx.moveCall({
                target: `${REWARDS_CONTRACT}::loyalty::reward_user`,
                arguments: [tx.object(COIN_CONTRACT), tx.pure.u64(10), tx.pure.address(wallet.account?.address as string)],
            });
            const result = await client.signAndExecuteTransaction({
                transaction: tx,
                signer: keypair,
                requestType: 'WaitForLocalExecution',
                options: {
                    showEffects: true,
                },
            });
            const address = result.effects?.created?.[0]?.reference?.objectId
            setTokenAddress(address as string)
            setTxHash2(result.digest)
            await client.waitForTransaction({ digest: result.digest });
            toast.dismiss();
            toast.success('User rewarded successfully');
            return address
        } catch (error) {
            toast.dismiss();
            toast.error('Error rewarding user');
            throw error;
        }
    }

    const handleAttestation = async ({
        latitude,
        longitude,
    }: {
        latitude: number;
        longitude: number;
    }) => {
        try {
            toast.loading('Rewarding user...', {
                duration: Infinity,
            });
            const tx = new Transaction();
            const dataObj = tx.moveCall({
                target: `${ATTESTATION_CONTRACT}::attestations::create_attestation`,
                arguments: [
                    tx.pure.address(wallet.account?.address as string),
                    tx.pure.u64(Big(latitude).times(1000000).toFixed(0, 0)),
                    tx.pure.u64(Big(longitude).times(1000000).toFixed(0, 0)),
                    tx.pure.bool(true)
                ],
            });

            tx.transferObjects([dataObj], wallet?.account?.address as string)
            const result = await wallet.signAndExecuteTransaction({
                transaction: tx,
            });
            setTxHash1(result.digest)
            await client.waitForTransaction({ digest: result.digest });
            toast.dismiss();
            toast.success('User rewarded successfully');
        } catch (error) {
            console.log("error", error);
            toast.dismiss();
            toast.error('Error attesting user');
            throw error;
        }
    }

    const handleOnSign = async () => {
        try {
            toast.dismiss();
            toast.loading('Pushing coordinates onchain...');
            const location = await getUserLocation();
            await handleAttestation({
                latitude: location.latitude,
                longitude: location.longitude,
            });
            handleNext();
            await handleRewardUser();
        } catch (error) {
            console.log("error", error);
            toast.dismiss();
            toast.error('Error rewarding user');
        }
    };
    React.useEffect(() => {
        if (isUserInRange && activeStep === 0) {
            handleNext();
        }
        if (activeStep === 1) {
            handleARInvokation();
        }
        if (activeStep === 2) {
            handleOnSign();
        }
    }, [isUserInRange, activeStep]);

    return (
        <>
            {showAR && <Ar onClose={handleCloseAR} />}
            <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step
                            key={step.label}
                            completed={isUserInRange && index === 0}
                        >
                            <StepLabel
                                optional={
                                    index === steps.length - 1 ? (
                                        <Typography variant="caption">
                                            Last step
                                        </Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    {index === steps.length - 1 && (
                                        <Button
                                            variant="contained"
                                            onClick={index === steps.length - 1 ? handleNFTClaim : handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1
                                                ? 'Claim'
                                                : 'Continue'}
                                        </Button>
                                    )}
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {txHash1 && (
                    <Paper square elevation={0} sx={{ p: 3 }} >
                        <Typography>
                            Attestation Hash: <Link href={`https://suiscan.xyz/devnet/object/${txHash1}`} target="_blank" rel="noopener noreferrer">{truncateString(10, 4, 4, txHash1)}</Link>
                        </Typography>
                    </Paper>
                )}
                {txHash2 && (
                    <Paper square elevation={0} sx={{ p: 3 }} >
                        <Typography>
                            Redeem Hash: <Link href={`https://suiscan.xyz/devnet/object/${txHash2}`} target="_blank" rel="noopener noreferrer">{truncateString(10, 4, 4, txHash2)}</Link>
                        </Typography>
                    </Paper>
                )}
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }} >
                        <Typography>
                            Claiming NFT...
                        </Typography>
                    </Paper>
                )}
            </Box>
        </>
    );
}
