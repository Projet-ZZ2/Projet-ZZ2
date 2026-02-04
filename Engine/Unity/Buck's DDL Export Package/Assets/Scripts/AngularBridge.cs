using UnityEngine;
using System.Runtime.InteropServices;

public class AngularBridge : MonoBehaviour
{
    // 1. Create a static "Instance" that any script can access
    public static AngularBridge Instance { get; private set; }

    [DllImport("__Internal")]
    private static extern void SendToAngular(string str);

    private void Awake()
    {
        // 2. Set the Instance to "this" specific script when the game starts
        if (Instance != null && Instance != this)
        {
            Destroy(this); // Prevent duplicate bridges if you reload scenes
        }
        else
        {
            Instance = this;
        }
    }

    public void ComputerOpen()
    {
        string json = "SwitchToComputer";
        
#if !UNITY_EDITOR && UNITY_WEBGL
        SendToAngular(json);
#else
        Debug.Log($"[Mock Send] JSON: {json}");
#endif
    }
}