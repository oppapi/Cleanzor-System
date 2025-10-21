using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace CleanzorApp.Pages
{
    public partial class Signup
    {
        [Inject] private IJSRuntime JS { get; set; } = default!;

        private string txtfullname { get; set; } = "";
        private string txtemail { get; set; } = "";
        private string txtusername { get; set; } = "";
        private string txtpassword { get; set; } = "";
        private string txtcpassword { get; set; } = "";

        private string txtmessage { get; set; } = ""; //to return message

        private async Task SubmitSignup()
        {
            if (string.IsNullOrWhiteSpace(txtfullname) ||
                string.IsNullOrWhiteSpace(txtemail) ||
                string.IsNullOrWhiteSpace(txtusername) ||
                string.IsNullOrWhiteSpace(txtpassword) ||
                string.IsNullOrWhiteSpace(txtcpassword))
            {
                txtmessage = "Please fill in all fields!";
            }
            await JS.InvokeVoidAsync("alert", txtmessage); 
        }
    }
}
