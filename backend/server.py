import asyncio
import signal
import websockets

async def echo(websocket, path):
    async for message in websocket:
        print(f"Received message: {message}")

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

    # This will keep the server running indefinitely until interrupted
    await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
