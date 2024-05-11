import asyncio
import signal
import websockets

async def echo(websocket, path):
    async for message in websocket:
        print("Transcribing", message)

async def main():
    server = await websockets.serve(echo, "127.0.0.1", 8080)

    # Define a signal handler to handle interrupt signals
    async def shutdown(signal, loop):
        print("Shutting down...")
        server.close()
        await server.wait_closed()
        loop.stop()

    # Register the signal handler for SIGINT (Ctrl+C)
    loop = asyncio.get_running_loop()
    for signame in ('SIGINT', 'SIGTERM'):
        loop.add_signal_handler(
          getattr(signal, signame),
          lambda: asyncio.create_task(shutdown(signame, loop))
        )

    # Wait for the server to complete (keep the event loop running)
    await server.wait_closed()

if __name__ == "__main__":
    print("Listening at ws://127.0.0.1:8080")
    asyncio.run(main())
