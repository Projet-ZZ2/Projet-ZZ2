mergeInto(LibraryManager.library, {
  // This function matches the name we will use in C#
  SendToAngular: function (str) {
    // 1. Convert C# memory pointer to a JS string
    var message = UTF8ToString(str);
    
    // 2. Create a custom event with the data
    // We use a CustomEvent so Angular can simply "listen" for it
    var event = new CustomEvent("UnityToAngular", { detail: message });
    
    // 3. Dispatch to the window
    window.dispatchEvent(event);
  },
});
