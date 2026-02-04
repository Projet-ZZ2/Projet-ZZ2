/// @DnDAction : YoYo Games.Common.Variable
/// @DnDVersion : 1
/// @DnDHash : 6656242E
/// @DnDArgument : "expr" "4"
/// @DnDArgument : "expr_relative" "1"
/// @DnDArgument : "var" "vitesse"
vitesse += 4;

/// @DnDAction : YoYo Games.Mouse & Keyboard.If_Key_Down
/// @DnDVersion : 1
/// @DnDHash : 4548E1CD
/// @DnDArgument : "key" "ord("Q")"
var l4548E1CD_0;l4548E1CD_0 = keyboard_check(ord("Q"));if (l4548E1CD_0){	/// @DnDAction : YoYo Games.Instances.Create_Instance
	/// @DnDVersion : 1
	/// @DnDHash : 16488483
	/// @DnDParent : 4548E1CD
	/// @DnDArgument : "xpos_relative" "1"
	/// @DnDArgument : "ypos_relative" "1"
	/// @DnDArgument : "objectid" "git_logo"
	instance_create_layer(x + 0, y + 0, "Instances", git_logo);

	/// @DnDAction : YoYo Games.Movement.Wrap_Room
	/// @DnDVersion : 1
	/// @DnDHash : 11B92089
	/// @DnDParent : 4548E1CD
	move_wrap(1, 1, 0);

	/// @DnDAction : YoYo Games.Movement.Add_Motion
	/// @DnDVersion : 1
	/// @DnDHash : 1B340624
	/// @DnDParent : 4548E1CD
	/// @DnDArgument : "dir" "180 "
	/// @DnDArgument : "speed" "vitesse"
	motion_add(180 , vitesse);}