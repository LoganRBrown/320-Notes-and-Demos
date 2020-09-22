using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using System.Net;
using System.Net.Sockets;
public class ControllerGameClient : MonoBehaviour
{
    static ControllerGameClient singleton;
    
    TcpClient socket = new TcpClient();

    void Start()
    {
        if (singleton)
        {
            //already set...
            Destroy(gameObject); // there's already on out there.... and we dont want two
        }
        else
        {
            singleton = this;
            DontDestroyOnLoad(gameObject); //dont destroy when loading new scenes!
        }
    }



    void Update()
    {
        
    }
}
