using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

namespace SojaExiles

{
    public class PlayerMovement : MonoBehaviour
    {

        public CharacterController controller;

        public float speed = 5f;
        public float gravity = -15f;

        Vector3 velocity;

        bool isGrounded;

        // Update is called once per frame
        void Update()
        {

            Vector2 moveInput = Vector2.zero;

            if (Keyboard.current != null)
            {
              // Read WASD / Arrow keys
              if (Keyboard.current.wKey.isPressed) moveInput.y = 1;
              if (Keyboard.current.sKey.isPressed) moveInput.y = -1;
              if (Keyboard.current.aKey.isPressed) moveInput.x = -1;
              if (Keyboard.current.dKey.isPressed) moveInput.x = 1;
            }

            Vector3 move = transform.right * moveInput.x + transform.forward * moveInput.y;

            controller.Move(move * speed * Time.deltaTime);

            velocity.y += gravity * Time.deltaTime;

            controller.Move(velocity * Time.deltaTime);

        }
    }
}
