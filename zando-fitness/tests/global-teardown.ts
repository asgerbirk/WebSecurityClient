let server; // Reference the server started in globalSetup

export default async () => {
    if (server) {
        console.log('Closing server...');
        server.close();
    }
};
