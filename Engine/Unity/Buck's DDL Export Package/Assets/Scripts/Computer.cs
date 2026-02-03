using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Computer : MonoBehaviour
{
  public Transform Player;
  private bool opening;

  // Start is called once before the first execution of Update after the MonoBehaviour is created
  void Start()
  {
    opening = false;
  }
  void OnMouseOver()
  {
    {
      if (Player)
      {
        float dist = Vector3.Distance(Player.position, transform.position);
        if (dist < 15)
        {
          if (opening == false)
          {
            if (Input.GetMouseButtonDown(0))
            {
              opening = true;
              Debug.Log("Opening Computer !");
              // Call camera animation funcition
            }
          }

        }
      }

    }

  }

}
