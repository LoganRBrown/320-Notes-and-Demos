﻿using System.Collections;
using System.Collections.Generic;
using System.Net;
using UnityEngine;

public class RemoteServer
{

    public IPEndPoint endPoint;
    public string serverName;

    public RemoteServer(IPEndPoint ep, string name)
    {

        endPoint = ep;
        serverName = name;

    }

    public bool IsSameServer(IPEndPoint ep)
    {

        return endPoint.Equals(ep);

    }

}
