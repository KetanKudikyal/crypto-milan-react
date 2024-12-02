import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { WalletProvider } from '@suiet/wallet-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BuildType, OktoProvider } from 'okto-sdk-react';
import { Toaster } from 'react-hot-toast';

const Provider = ({ children }: { children: any }) => {
    const queryClient = new QueryClient();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={darkTheme}>
                <QueryClientProvider client={queryClient}>
                    <GoogleOAuthProvider
                        clientId={
                            '201737013329-1vammkv48a66k8ijo8fq6p1e34veqe0g.apps.googleusercontent.com'
                        }
                    >
                        <WalletProvider>
                            <OktoProvider
                                apiKey={'0601c20e-0298-4fbf-97cb-d62508d253c8'}
                                buildType={BuildType.SANDBOX}
                            >
                                <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                    gutter={8}
                                    containerClassName=""
                                    containerStyle={{}}
                                    toastOptions={{
                                        // Define default options
                                        className: '',
                                        duration: 5000,
                                        style: {
                                            background: '#363636',
                                            color: '#fff',
                                        },

                                        // Default options for specific types
                                        success: {
                                            duration: 3000,
                                        },
                                    }}
                                />
                                {children}
                            </OktoProvider>
                        </WalletProvider>
                    </GoogleOAuthProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default Provider;
