using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NetworkObject : MonoBehaviour
{
    public int networkID;
    public string classID = "NWOB";

    public virtual void Serialize()
    {
        // TODO: turn into byte array
    }

    public virtual void Deserialize()
    {
        // TODO: Turn object into byte array
    }
}
