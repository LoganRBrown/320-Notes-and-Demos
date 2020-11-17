using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Net;
using System.Net.Sockets;

public class ClientUDP : MonoBehaviour
{
	private static ClientUDP _singleton;
	public static ClientUDP singleton
	{
		get { return _singleton; }
		private set { _singleton = value; }
	}
	
	UdpClient sock = new UdpClient();

	/// <summary>
	/// Most recent ball update packet 
	/// that has been recieved
	/// </summary>
	uint ackBallUpdate = 0;

	public Transform ball;

	void Start()
	{
		if (singleton != null)
		{
			//alread have a clientUDP...
			Destroy(gameObject);
		}
		else
		{
			singleton = this;

			// set up recieve loop (async)
			ListenForPackets();

			// send a packet to the server (async)
			SendPacket(Buffer.From("JOIN"));
		}
	}

	/// <summary>
	/// This function listens for packets from the server
	/// </summary>
	async void ListenForPackets()
	{

		while (true)
		{
			UdpReceiveResult res;
			try
			{
				res = await sock.ReceiveAsync();
				Buffer packet = Buffer.From(res.Buffer);
				ProcessPacket(packet);
			}
			catch
			{
				break;
			}
		}
	}
	/// <summary>
	/// This function processes a packet and decides what to do next
	/// </summary>
	/// <param name="packet">The packet to send</param>
	private void ProcessPacket(Buffer packet)
	{
		if (packet.Length < 4) return;

		string id = packet.ReadString(0, 4);
		switch (id)
		{
			case "BALL":
				if (packet.Length < 20) return;

				uint packetNum = packet.ReadUInt32BE(4);

				if (packetNum < ackBallUpdate) return; //ignore packet, it's old news

				ackBallUpdate = packetNum;

				float x = packet.ReadSingleLE(8);
				float y = packet.ReadSingleLE(12);
				float z = packet.ReadSingleLE(16);

				ball.position = new Vector3(x, y, z);

				break;
		}
	}

	/// <summary>
	/// This function sends a packet (current to localhost:320)
	/// </summary>
	/// <param name="packet"></param>
	async public void SendPacket(Buffer packet)
	{

		if (sock == null) return;

		// TODO: remove literals from next line
		await sock.SendAsync(packet.bytes, packet.bytes.Length, "127.0.0.1", 320);
	}

	/// <summary>
	/// When destroying, clean up objects.
	/// </summary>
	private void OnDestroy()
	{
		sock.Close();
	}
}
