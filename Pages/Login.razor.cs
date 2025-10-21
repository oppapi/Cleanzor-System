using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace CleanzorApp.Pages
{
    public partial class Login
    {
        [Inject] private IJSRuntime JS { get; set; } = default!;

        // Variables to hold input values
        private string txtusername { get; set; } = "";
        private string txtpassword { get; set; } = "";
        private string txtmessage { get; set; } = ""; //to return message

        private async Task LoginMethod() //TODO: CHANGE THIS NAME
        {
            // TODO: CHANGE THIS INTO TOAST LATER
            if (string.IsNullOrWhiteSpace(txtusername) || string.IsNullOrWhiteSpace(txtpassword))
            {
                txtmessage = "Please enter both username and txtpassword!";
            }
            await JS.InvokeVoidAsync("alert", txtmessage); 
        }
    }
}
